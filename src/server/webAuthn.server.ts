import {
  generateAuthenticationOptions as genAuthOptions,
  generateRegistrationOptions as genRegOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";

import type {
  AuthenticationResponseJSON,
  AuthenticatorTransportFuture,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/server";

/** The relying party name shown to the user during passkey registration. */
const RP_NAME = "StudyBub";

/**
 * Generates WebAuthn credential creation options for a user who is
 * registering a passkey via an invitation link.
 *
 * @param user - The user's id and display name.
 * @param rpId - The relying party ID (typically the hostname).
 * @returns The credential creation options to pass to
 * `@simplewebauthn/browser`'s `startRegistration()`.
 */
export async function generateRegistrationOptions(
  user: { id: string; displayName: string },
  rpId: string,
): Promise<PublicKeyCredentialCreationOptionsJSON> {
  return genRegOptions({
    rpName: RP_NAME,
    rpID: rpId,
    userID: new TextEncoder().encode(user.id),
    userName: user.displayName,
    userDisplayName: user.displayName,
    attestationType: "none",
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
    },
    supportedAlgorithmIDs: [-7, -257], // ES256 and RS256.
  });
}

/**
 * Verifies the attestation response from the browser after the user creates
 * a passkey.
 *
 * @param response - The registration response from the browser.
 * @param expectedChallenge - The challenge that was sent to the client.
 * @param rpId - The relying party ID.
 * @param rpOrigin - The origin of the request (e.g., `http://localhost:3000`).
 * @returns Verification result with credential info on success.
 * @throws If verification fails.
 */
export async function verifyRegistration(
  response: RegistrationResponseJSON,
  expectedChallenge: string,
  rpId: string,
  rpOrigin: string,
): Promise<{
  credential: {
    id: string;
    publicKey: Uint8Array;
    counter: number;
  };
}> {
  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge,
    expectedOrigin: rpOrigin,
    expectedRPID: rpId,
  });

  if (!verification.verified || !verification.registrationInfo) {
    throw new Error("Passkey registration verification failed.");
  }

  return verification.registrationInfo;
}

/**
 * Generates WebAuthn assertion options for a returning user signing in.
 *
 * @param rpId - The relying party ID.
 * @returns The assertion options to pass to `@simplewebauthn/browser`'s
 * `startAuthentication()`.
 */
export async function generateAuthenticationOptions(
  rpId: string,
): Promise<PublicKeyCredentialRequestOptionsJSON> {
  return genAuthOptions({
    rpID: rpId,
    userVerification: "preferred",
  });
}

/**
 * Verifies the assertion response and returns the credential info on
 * success.
 *
 * @param response - The authentication response from the browser.
 * @param expectedChallenge - The challenge that was sent to the client.
 * @param rpId - The relying party ID.
 * @param rpOrigin - The origin of the request.
 * @param storedCredential - The stored credential for the claimed user.
 * @returns Verification result with credential info on success.
 * @throws If verification fails.
 */
export async function verifyAuthentication(
  response: AuthenticationResponseJSON,
  expectedChallenge: string,
  rpId: string,
  rpOrigin: string,
  storedCredential: {
    credentialId: string;
    publicKey: Uint8Array;
    counter: number;
    transports?: AuthenticatorTransportFuture[];
  },
): Promise<{ newCounter: number }> {
  const verification = await verifyAuthenticationResponse({
    response,
    expectedChallenge,
    expectedOrigin: rpOrigin,
    expectedRPID: rpId,
    credential: {
      id: storedCredential.credentialId,
      publicKey: storedCredential.publicKey as any,
      counter: storedCredential.counter,
      transports: storedCredential.transports,
    },
  });

  if (!verification.verified) {
    throw new Error("Passkey authentication verification failed.");
  }

  return verification.authenticationInfo;
}

/**
 * Generates a random challenge string for WebAuthn ceremonies. The
 * challenge is base64url-encoded random bytes.
 *
 * @returns A random challenge string.
 */
export function generateChallenge(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCodePoint(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}
