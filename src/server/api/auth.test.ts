/**
 * Unit tests for the authentication server functions.
 *
 * The handlers run end-to-end against an in-memory SQLite database. TanStack
 * Start is stubbed out (createServerFn, useSession, getRequest) and the
 * WebAuthn wrappers and redirect helper are mocked so the database, branching,
 * and session-update logic can be asserted deterministically.
 *
 * @module server/api/auth.test
 * @author John Grimes
 */

import { Database } from "bun:sqlite";
import { beforeEach, describe, expect, it, vi } from "vitest";

const TEST_USER_ID = "00000000-0000-0000-0000-000000000001";
const TEST_TOKEN = "invite-token-abc";

// --- Mocks --------------------------------------------------------------
//
// All mock state lives in a single vi.hoisted block so the vi.mock factories
// (hoisted above the test imports) can reference it safely.

const mocks = vi.hoisted(() => {
  const sessionData: Record<string, unknown> = {};
  const session = {
    get data() {
      return sessionData;
    },
    update: vi.fn(async (patch: Record<string, unknown>) => {
      Object.assign(sessionData, patch);
    }),
    clear: vi.fn(async () => {
      for (const key of Object.keys(sessionData)) delete sessionData[key];
    }),
  };
  const request = {
    url: "http://localhost:3000/invite/abc",
    proto: null as string | null,
  };
  const webAuthn = {
    generateRegistrationOptions: vi.fn(async () => ({
      challenge: "reg-challenge",
    })),
    generateAuthenticationOptions: vi.fn(async () => ({
      challenge: "auth-challenge",
    })),
    verifyRegistration: vi.fn(async (response: { id?: string }) => ({
      credential: {
        id: response?.id ?? "cred-id-1",
        publicKey: new Uint8Array([1, 2, 3]),
        counter: 5,
      },
    })),
    verifyAuthentication: vi.fn(async () => ({ newCounter: 9 })),
  };
  const createServerFn = () => {
    const api = {
      validator() {
        return api;
      },
      inputValidator() {
        return api;
      },
      middleware() {
        return api;
      },
    } as Record<string, (...args: any[]) => unknown>;
    api.handler =
      (fn: (ctx: { data: unknown }) => unknown) =>
      async (opts?: { data?: unknown }) =>
        fn({ data: opts?.data });
    return api;
  };
  // redirect throws a tagged Error so `throw redirect(...)` surfaces as a
  // rejected promise carrying the destination route.
  const redirect = vi.fn(({ to }: { to: string }) =>
    Object.assign(new Error("redirect"), { __redirect: true, to }),
  );
  return { sessionData, session, request, webAuthn, createServerFn, redirect };
});

vi.mock("@tanstack/react-start", () => ({
  createServerFn: mocks.createServerFn,
}));
vi.mock("@tanstack/react-start/server", () => ({
  useSession: vi.fn(async () => mocks.session),
  getRequest: vi.fn(() => ({
    url: mocks.request.url,
    headers: {
      get(name: string) {
        return name === "x-forwarded-proto" ? mocks.request.proto : null;
      },
    },
  })),
}));
vi.mock("@tanstack/react-router", () => ({ redirect: mocks.redirect }));
vi.mock("../webAuthn.server", () => ({
  generateRegistrationOptions: mocks.webAuthn.generateRegistrationOptions,
  generateAuthenticationOptions: mocks.webAuthn.generateAuthenticationOptions,
  verifyRegistration: mocks.webAuthn.verifyRegistration,
  verifyAuthentication: mocks.webAuthn.verifyAuthentication,
}));

// --- Imports (after mocks) ---------------------------------------------

import { getDatabase, initSchema, resetDatabase } from "../db.server";
import {
  getCurrentUser,
  getPasskeyAuthenticationOptions,
  getPasskeyRegistrationOptions,
  logout,
  verifyPasskeyAuthentication,
  verifyPasskeyRegistration,
} from "./auth";

/** Builds a fresh in-memory database and seeds a user + invite token. */
function setupDb(): Database {
  resetDatabase();
  const db = getDatabase(":memory:");
  initSchema(db);
  const now = new Date().toISOString();
  db.run(
    "INSERT INTO users (id, display_name, progress_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    [TEST_USER_ID, "Oscar", "{}", now, now],
  );
  db.run(
    "INSERT INTO invite_tokens (token, user_id, consumed, created_at) VALUES (?, ?, ?, ?)",
    [TEST_TOKEN, TEST_USER_ID, 0, now],
  );
  return db;
}

/** Inserts a stored credential for the seeded user. */
function insertCredential(
  db: Database,
  credentialId: string,
  opts: { transports?: string | null } = {},
): void {
  const now = new Date().toISOString();
  db.run(
    "INSERT INTO webauthn_credentials (credential_id, user_id, public_key, counter, transports, created_at) " +
      "VALUES (?, ?, ?, ?, ?, ?)",
    [
      credentialId,
      TEST_USER_ID,
      Buffer.from(new Uint8Array([1, 2, 3])).toString("base64url"),
      0,
      opts.transports ?? null,
      now,
    ],
  );
}

describe("auth handlers", () => {
  let originalSecret: string | undefined;
  let db: Database;

  beforeEach(() => {
    originalSecret = process.env.SESSION_SECRET;
    process.env.SESSION_SECRET = "s".repeat(40);
    mocks.session.update.mockClear();
    mocks.session.clear.mockClear();
    mocks.redirect.mockClear();
    for (const k of Object.keys(mocks.sessionData)) delete mocks.sessionData[k];
    mocks.request.url = "http://localhost:3000/invite/abc";
    mocks.request.proto = null;
    mocks.webAuthn.generateRegistrationOptions.mockClear();
    mocks.webAuthn.generateAuthenticationOptions.mockClear();
    mocks.webAuthn.verifyRegistration.mockClear();
    mocks.webAuthn.verifyAuthentication.mockClear();
    db = setupDb();
  });

  afterEach(() => {
    resetDatabase();
    if (originalSecret === undefined) {
      delete process.env.SESSION_SECRET;
    } else {
      process.env.SESSION_SECRET = originalSecret;
    }
  });

  // --- getPasskeyRegistrationOptions -----------------------------------

  describe("getPasskeyRegistrationOptions", () => {
    it("generates options and stores the challenge and pending user id", async () => {
      const options = await getPasskeyRegistrationOptions({
        data: { token: TEST_TOKEN },
      });

      expect(options.displayName).toBe("Oscar");
      expect(options.challenge).toBe("reg-challenge");
      expect(mocks.webAuthn.generateRegistrationOptions).toHaveBeenCalledWith(
        { id: TEST_USER_ID, displayName: "Oscar" },
        "localhost",
      );
      expect(mocks.session.update).toHaveBeenCalledWith(
        expect.objectContaining({
          pendingChallenge: "reg-challenge",
          pendingUserId: TEST_USER_ID,
        }),
      );
    });

    it("throws when the invitation token is unknown", async () => {
      await expect(
        getPasskeyRegistrationOptions({ data: { token: "bogus" } }),
      ).rejects.toThrow("Invalid invitation link.");
    });

    it("throws when the invitation token has already been consumed", async () => {
      db.run("UPDATE invite_tokens SET consumed = 1 WHERE token = ?", [
        TEST_TOKEN,
      ]);

      await expect(
        getPasskeyRegistrationOptions({ data: { token: TEST_TOKEN } }),
      ).rejects.toThrow("already been used.");
    });

    it("honours the X-Forwarded-Proto header for the relying-party id", async () => {
      mocks.request.url = "http://studybub.example/invite/abc";
      mocks.request.proto = "https";

      await getPasskeyRegistrationOptions({ data: { token: TEST_TOKEN } });

      expect(mocks.webAuthn.generateRegistrationOptions).toHaveBeenCalledWith(
        { id: TEST_USER_ID, displayName: "Oscar" },
        "studybub.example",
      );
    });
  });

  // --- verifyPasskeyRegistration --------------------------------------

  describe("verifyPasskeyRegistration", () => {
    const credential = {
      id: "cred-id-1",
      response: { transports: ["internal", "hybrid"] },
    } as never;

    it("stores the credential, consumes the token, and redirects on success", async () => {
      mocks.sessionData.pendingChallenge = "reg-challenge";
      mocks.sessionData.pendingUserId = TEST_USER_ID;

      await expect(
        verifyPasskeyRegistration({ data: { token: TEST_TOKEN, credential } }),
      ).rejects.toMatchObject({ __redirect: true, to: "/" });

      // Credential stored with the transports array serialised to JSON.
      const credRow = db
        .query(
          "SELECT user_id, public_key, counter, transports FROM webauthn_credentials WHERE credential_id = ?",
        )
        .get("cred-id-1") as {
        user_id: string;
        public_key: string;
        counter: number;
        transports: string;
      };
      expect(credRow.user_id).toBe(TEST_USER_ID);
      expect(credRow.counter).toBe(5);
      expect(JSON.parse(credRow.transports)).toEqual(["internal", "hybrid"]);

      // Token consumed.
      const tokenRow = db
        .query("SELECT consumed FROM invite_tokens WHERE token = ?")
        .get(TEST_TOKEN) as { consumed: number };
      expect(tokenRow.consumed).toBe(1);

      // Authenticated session established, pending state cleared.
      expect(mocks.session.update).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: TEST_USER_ID,
          pendingChallenge: undefined,
          pendingUserId: undefined,
        }),
      );
      expect(mocks.webAuthn.verifyRegistration).toHaveBeenCalledWith(
        credential,
        "reg-challenge",
        "localhost",
        "http://localhost:3000",
      );
    });

    it("stores a null transport when the credential omits transports", async () => {
      mocks.sessionData.pendingChallenge = "reg-challenge";
      mocks.sessionData.pendingUserId = TEST_USER_ID;
      const cred = { id: "cred-id-2", response: {} } as never;

      await expect(
        verifyPasskeyRegistration({
          data: { token: TEST_TOKEN, credential: cred },
        }),
      ).rejects.toMatchObject({ __redirect: true });

      const credRow = db
        .query(
          "SELECT transports FROM webauthn_credentials WHERE credential_id = ?",
        )
        .get("cred-id-2") as { transports: string | null };
      expect(credRow.transports).toBeNull();
    });

    it("throws when the token is invalid or already consumed", async () => {
      db.run("UPDATE invite_tokens SET consumed = 1 WHERE token = ?", [
        TEST_TOKEN,
      ]);

      await expect(
        verifyPasskeyRegistration({ data: { token: TEST_TOKEN, credential } }),
      ).rejects.toThrow("Invalid or already-used invitation.");
    });

    it("throws when no pending challenge is stored in the session", async () => {
      // No pendingChallenge set on the session.

      await expect(
        verifyPasskeyRegistration({ data: { token: TEST_TOKEN, credential } }),
      ).rejects.toThrow("No pending registration challenge");
    });
  });

  // --- getPasskeyAuthenticationOptions --------------------------------

  describe("getPasskeyAuthenticationOptions", () => {
    it("generates assertion options and stores the challenge", async () => {
      const options = await getPasskeyAuthenticationOptions();

      expect(options).toEqual({ challenge: "auth-challenge" });
      expect(mocks.webAuthn.generateAuthenticationOptions).toHaveBeenCalledWith(
        "localhost",
      );
      expect(mocks.session.update).toHaveBeenCalledWith(
        expect.objectContaining({ pendingChallenge: "auth-challenge" }),
      );
    });
  });

  // --- verifyPasskeyAuthentication -------------------------------------

  describe("verifyPasskeyAuthentication", () => {
    it("rotates the counter, establishes the session, and redirects", async () => {
      insertCredential(db, "cred-id-1", { transports: '["internal"]' });
      mocks.sessionData.pendingChallenge = "auth-challenge";

      await expect(
        verifyPasskeyAuthentication({
          data: { credential: { id: "cred-id-1" } as never },
        }),
      ).rejects.toMatchObject({ __redirect: true, to: "/" });

      const credRow = db
        .query(
          "SELECT counter FROM webauthn_credentials WHERE credential_id = ?",
        )
        .get("cred-id-1") as { counter: number };
      expect(credRow.counter).toBe(9);

      expect(mocks.session.update).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: TEST_USER_ID,
          pendingChallenge: undefined,
        }),
      );
    });

    it("handles a stored credential with null transports", async () => {
      insertCredential(db, "cred-id-1", { transports: null });
      mocks.sessionData.pendingChallenge = "auth-challenge";

      await expect(
        verifyPasskeyAuthentication({
          data: { credential: { id: "cred-id-1" } as never },
        }),
      ).rejects.toMatchObject({ __redirect: true, to: "/" });

      // verifyAuthentication should have been called with undefined transports.
      expect(mocks.webAuthn.verifyAuthentication).toHaveBeenCalledWith(
        { id: "cred-id-1" },
        "auth-challenge",
        "localhost",
        "http://localhost:3000",
        expect.objectContaining({ transports: undefined }),
      );
    });

    it("throws when no pending challenge is stored", async () => {
      insertCredential(db, "cred-id-1");

      await expect(
        verifyPasskeyAuthentication({
          data: { credential: { id: "cred-id-1" } as never },
        }),
      ).rejects.toThrow("No pending authentication challenge");
    });

    it("throws when the credential is not recognised", async () => {
      mocks.sessionData.pendingChallenge = "auth-challenge";

      await expect(
        verifyPasskeyAuthentication({
          data: { credential: { id: "unknown" } as never },
        }),
      ).rejects.toThrow("Passkey not recognised.");
    });
  });

  // --- logout ----------------------------------------------------------

  describe("logout", () => {
    it("clears the session and redirects to the login page", async () => {
      await expect(logout()).rejects.toMatchObject({
        __redirect: true,
        to: "/login",
      });

      expect(mocks.session.clear).toHaveBeenCalledTimes(1);
    });
  });

  // --- getCurrentUser --------------------------------------------------

  describe("getCurrentUser", () => {
    it("returns null when no session userId is set", async () => {
      await expect(getCurrentUser()).resolves.toBeNull();
    });

    it("returns null when the user row does not exist", async () => {
      mocks.sessionData.userId = "no-such-user";

      await expect(getCurrentUser()).resolves.toBeNull();
    });

    it("returns the id and display name of the authenticated user", async () => {
      mocks.sessionData.userId = TEST_USER_ID;

      await expect(getCurrentUser()).resolves.toEqual({
        id: TEST_USER_ID,
        displayName: "Oscar",
      });
    });
  });
});
