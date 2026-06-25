import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";

import type {
  AuthenticationResponseJSON,
  AuthenticatorTransportFuture,
  RegistrationResponseJSON,
} from "@simplewebauthn/server";

import { getDatabase } from "../../server/db";
import { useAppSession } from "../../server/session";
import {
  generateAuthenticationOptions,
  generateChallenge,
  generateRegistrationOptions,
  verifyAuthentication,
  verifyRegistration,
} from "../../server/webAuthn";

/**
 * Gets the relying party ID and origin from the incoming request.
 *
 * @returns The rpId and origin for WebAuthn operations.
 */
function getRpInfo(): { rpId: string; origin: string } {
  const request = getRequest();
  const url = new URL(request.url);
  return {
    rpId: url.hostname,
    origin: url.origin,
  };
}

/**
 * Generates WebAuthn credential creation options for a user registering
 * via an invitation token. The challenge is stored in the session for
 * verification when the credential response arrives.
 */
export const getPasskeyRegistrationOptions = createServerFn({
  method: "GET",
})
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const db = getDatabase();
    const { rpId, origin } = getRpInfo();

    // Look up the invite token.
    const tokenRow = db
      .query(
        "SELECT t.token, t.user_id, t.consumed, u.display_name " +
          "FROM invite_tokens t JOIN users u ON t.user_id = u.id " +
          "WHERE t.token = ?",
      )
      .get(data.token) as
      | { token: string; user_id: string; consumed: number; display_name: string }
      | undefined;

    if (!tokenRow) {
      throw new Error("Invalid invitation link.");
    }

    if (tokenRow.consumed === 1) {
      throw new Error("This invitation has already been used.");
    }

    // Generate registration options.
    const options = await generateRegistrationOptions(
      { id: tokenRow.user_id, displayName: tokenRow.display_name },
      rpId,
    );

    // Store the challenge and user info in the session for verification.
    const session = await useAppSession();
    await session.update({
      ...session.data,
      pendingChallenge: options.challenge,
      pendingUserId: tokenRow.user_id,
    } as Record<string, unknown>);

    return {
      ...options,
      displayName: tokenRow.display_name,
    };
  });

/**
 * Verifies the passkey registration attestation response. On success,
 * stores the credential, marks the token as consumed, and creates a
 * session for the user.
 */
export const verifyPasskeyRegistration = createServerFn({
  method: "POST",
})
  .validator(
    (data: {
      token: string;
      credential: RegistrationResponseJSON;
    }) => data,
  )
  .handler(async ({ data }) => {
    const db = getDatabase();
    const { rpId, origin } = getRpInfo();

    // Look up the invite token again to confirm it's still valid.
    const tokenRow = db
      .query(
        "SELECT token, user_id, consumed FROM invite_tokens WHERE token = ?",
      )
      .get(data.token) as
      | { token: string; user_id: string; consumed: number }
      | undefined;

    if (!tokenRow || tokenRow.consumed === 1) {
      throw new Error("Invalid or already-used invitation.");
    }

    // Retrieve the stored challenge from the session.
    const session = await useAppSession();
    const sessionData = session.data as Record<string, unknown>;
    const expectedChallenge = sessionData.pendingChallenge as string;

    if (!expectedChallenge) {
      throw new Error("No pending registration challenge found. Please start again.");
    }

    // Verify the attestation.
    const regInfo = await verifyRegistration(
      data.credential,
      expectedChallenge,
      rpId,
      origin,
    );

    // Store the credential.
    const now = new Date().toISOString();
    const transports = data.credential.response.transports
      ? JSON.stringify(data.credential.response.transports)
      : null;

    db.run(
      "INSERT INTO webauthn_credentials (credential_id, user_id, public_key, counter, transports, created_at) " +
        "VALUES (?, ?, ?, ?, ?, ?)",
      [
        regInfo.credential.id,
        tokenRow.user_id,
        Buffer.from(regInfo.credential.publicKey).toString("base64url"),
        regInfo.credential.counter,
        transports,
        now,
      ],
    );

    // Mark the token as consumed.
    db.run("UPDATE invite_tokens SET consumed = 1 WHERE token = ?", [
      data.token,
    ]);

    // Create the authenticated session.
    await session.update({
      userId: tokenRow.user_id,
      pendingChallenge: undefined,
      pendingUserId: undefined,
    } as Record<string, unknown>);

    throw redirect({ to: "/" });
  });

/**
 * Generates WebAuthn assertion options for a returning user signing in.
 * The challenge is stored in the session for verification.
 */
export const getPasskeyAuthenticationOptions = createServerFn({
  method: "GET",
}).handler(async () => {
  const { rpId } = getRpInfo();

  const options = await generateAuthenticationOptions(rpId);

  // Store the challenge in the session for verification.
  const session = await useAppSession();
  await session.update({
    ...session.data,
    pendingChallenge: options.challenge,
  } as Record<string, unknown>);

  return options;
});

/**
 * Verifies the passkey authentication assertion response. On success,
 * creates a session for the authenticated user.
 */
export const verifyPasskeyAuthentication = createServerFn({
  method: "POST",
})
  .validator(
    (data: { credential: AuthenticationResponseJSON }) => data,
  )
  .handler(async ({ data }) => {
    const db = getDatabase();
    const { rpId, origin } = getRpInfo();

    // Retrieve the stored challenge from the session.
    const session = await useAppSession();
    const sessionData = session.data as Record<string, unknown>;
    const expectedChallenge = sessionData.pendingChallenge as string;

    if (!expectedChallenge) {
      throw new Error(
        "No pending authentication challenge found. Please start again.",
      );
    }

    // Look up the credential by its ID.
    const credentialRow = db
      .query(
        "SELECT credential_id, user_id, public_key, counter, transports " +
          "FROM webauthn_credentials WHERE credential_id = ?",
      )
      .get(data.credential.id) as
      | {
          credential_id: string;
          user_id: string;
          public_key: string;
          counter: number;
          transports: string | null;
        }
      | undefined;

    if (!credentialRow) {
      throw new Error("Passkey not recognised.");
    }

    // Parse transports.
    const transportList = credentialRow.transports
      ? (JSON.parse(credentialRow.transports) as AuthenticatorTransportFuture[])
      : undefined;

    // Verify the assertion.
    const authInfo = await verifyAuthentication(
      data.credential,
      expectedChallenge,
      rpId,
      origin,
      {
        credentialId: credentialRow.credential_id,
        publicKey: Buffer.from(credentialRow.public_key, "base64url"),
        counter: credentialRow.counter,
        transports: transportList,
      },
    );

    // Update the signature counter for replay protection.
    db.run(
      "UPDATE webauthn_credentials SET counter = ? WHERE credential_id = ?",
      [authInfo.newCounter, credentialRow.credential_id],
    );

    // Create the authenticated session.
    await session.update({
      userId: credentialRow.user_id,
      pendingChallenge: undefined,
    } as Record<string, unknown>);

    throw redirect({ to: "/" });
  });

/**
 * Clears the session and redirects to the login page.
 */
export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useAppSession();
  await session.clear();
  throw redirect({ to: "/login" });
});

/**
 * Returns the currently authenticated user, or null.
 */
export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();
    const sessionData = session.data as Record<string, unknown>;
    const userId = sessionData.userId as string | undefined;

    if (!userId) {
      return null;
    }

    const db = getDatabase();
    const user = db
      .query("SELECT id, display_name FROM users WHERE id = ?")
      .get(userId) as { id: string; display_name: string } | undefined;

    if (!user) {
      return null;
    }

    return { id: user.id, displayName: user.display_name };
  },
);
