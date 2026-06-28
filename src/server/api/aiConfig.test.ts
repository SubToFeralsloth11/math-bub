/**
 * Integration tests for AI config server functions.
 *
 * Tests encryption, storage, retrieval, and clearing of AI configuration
 * through the database layer. Encryption tests are in encryption.test.ts;
 * this file focuses on database persistence and data isolation.
 *
 * @module server/api/aiConfig.test
 * @author John Grimes
 */

// The handler-level tests ("AI config handlers") run the real server functions.
// createServerFn is replaced with a shim that calls the handler with the
// `{ data }` payload, and the session is mocked so requireUserId resolves to a
// controlled user id. Both live in vi.hoisted so the hoisted vi.mock factories
// can reference them.
const mocks = vi.hoisted(() => {
  const session = { data: {} as Record<string, unknown> };
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
  return { session, createServerFn };
});

vi.mock("@tanstack/react-start", () => ({
  createServerFn: mocks.createServerFn,
}));
vi.mock("@tanstack/react-start/server", () => ({
  useSession: vi.fn(async () => mocks.session),
}));
const session = mocks.session;

import { Database } from "bun:sqlite";

import { getDatabase, initSchema, resetDatabase } from "../db.server";
import { resetEncryptionKey } from "../encryption.server";
import { clearAiConfig, loadAiConfig, saveAiConfig } from "./aiConfig";

import type { AiConfig } from "../../domain/persistence/aiConfig";

const VALID_KEY =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

const validConfig: AiConfig = {
  baseUrl: "https://api.openai.com/v1/chat/completions",
  apiKey: "sk-test-key-12345",
  model: "gpt-4o",
};

const TEST_USER_ID = "00000000-0000-0000-0000-000000000001";

function setupDb(): Database {
  resetDatabase();
  const db = getDatabase(":memory:");
  initSchema(db);

  const now = new Date().toISOString();
  db.run(
    "INSERT INTO users (id, display_name, progress_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    [TEST_USER_ID, "Test User", "{}", now, now],
  );

  return db;
}

describe("AI config server functions - integration", () => {
  let db: Database;

  beforeEach(() => {
    db = setupDb();
  });

  afterEach(() => {
    resetDatabase();
  });

  describe("saveAiConfig", () => {
    it("persists encrypted AI config fields via raw SQL", () => {
      const now = new Date().toISOString();
      db.run(
        "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
          "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
        ["encrypted-hex", "iv-hex", "auth-tag-hex", now, TEST_USER_ID],
      );

      const row = db
        .query(
          "SELECT ai_config_encrypted, ai_config_iv, ai_config_auth_tag " +
            "FROM users WHERE id = ?",
        )
        .get(TEST_USER_ID) as {
        ai_config_encrypted: string;
        ai_config_iv: string;
        ai_config_auth_tag: string;
      };

      expect(row.ai_config_encrypted).toBe("encrypted-hex");
      expect(row.ai_config_iv).toBe("iv-hex");
      expect(row.ai_config_auth_tag).toBe("auth-tag-hex");
    });

    it("updates existing AI config (overwrites)", () => {
      const now = new Date().toISOString();

      // First save.
      db.run(
        "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
          "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
        ["old-cipher", "old-iv", "old-tag", now, TEST_USER_ID],
      );

      // Overwrite.
      db.run(
        "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
          "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
        ["new-cipher", "new-iv", "new-tag", now, TEST_USER_ID],
      );

      const row = db
        .query("SELECT ai_config_encrypted FROM users WHERE id = ?")
        .get(TEST_USER_ID) as { ai_config_encrypted: string };

      expect(row.ai_config_encrypted).toBe("new-cipher");
    });
  });

  describe("loadAiConfig", () => {
    it("returns null when no AI config is stored", () => {
      const row = db
        .query(
          "SELECT ai_config_encrypted, ai_config_iv, ai_config_auth_tag " +
            "FROM users WHERE id = ?",
        )
        .get(TEST_USER_ID) as
        | {
            ai_config_encrypted: string | null;
            ai_config_iv: string | null;
            ai_config_auth_tag: string | null;
          }
        | undefined;

      expect(row?.ai_config_encrypted).toBeNull();
      expect(row?.ai_config_iv).toBeNull();
      expect(row?.ai_config_auth_tag).toBeNull();
    });

    it("retrieves encrypted fields when stored", () => {
      const now = new Date().toISOString();
      db.run(
        "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
          "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
        ["enc-123", "iv-456", "tag-789", now, TEST_USER_ID],
      );

      const row = db
        .query(
          "SELECT ai_config_encrypted, ai_config_iv, ai_config_auth_tag " +
            "FROM users WHERE id = ?",
        )
        .get(TEST_USER_ID) as {
        ai_config_encrypted: string;
        ai_config_iv: string;
        ai_config_auth_tag: string;
      };

      expect(row.ai_config_encrypted).toBe("enc-123");
      expect(row.ai_config_iv).toBe("iv-456");
      expect(row.ai_config_auth_tag).toBe("tag-789");
    });

    it("returns null for non-existent user", () => {
      const row = db
        .query("SELECT ai_config_encrypted FROM users WHERE id = ?")
        .get("nonexistent-id") as { ai_config_encrypted: string } | undefined;

      expect(row).toBeNull();
    });
  });

  describe("clearAiConfig", () => {
    it("clears all AI config fields", () => {
      const now = new Date().toISOString();

      // First save some config.
      db.run(
        "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
          "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
        ["enc", "iv", "tag", now, TEST_USER_ID],
      );

      // Clear.
      db.run(
        "UPDATE users SET ai_config_encrypted = NULL, ai_config_iv = NULL, " +
          "ai_config_auth_tag = NULL, updated_at = ? WHERE id = ?",
        [now, TEST_USER_ID],
      );

      const row = db
        .query(
          "SELECT ai_config_encrypted, ai_config_iv, ai_config_auth_tag " +
            "FROM users WHERE id = ?",
        )
        .get(TEST_USER_ID) as {
        ai_config_encrypted: string | null;
        ai_config_iv: string | null;
        ai_config_auth_tag: string | null;
      };

      expect(row.ai_config_encrypted).toBeNull();
      expect(row.ai_config_iv).toBeNull();
      expect(row.ai_config_auth_tag).toBeNull();
    });
  });

  describe("data isolation", () => {
    it("does not leak AI config between users", () => {
      const userId2 = "00000000-0000-0000-0000-000000000002";
      const now = new Date().toISOString();

      // Create second user.
      db.run(
        "INSERT INTO users (id, display_name, progress_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        [userId2, "User 2", "{}", now, now],
      );

      // Save config for user 1.
      db.run(
        "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
          "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
        ["user1-enc", "user1-iv", "user1-tag", now, TEST_USER_ID],
      );

      // Save different config for user 2.
      db.run(
        "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
          "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
        ["user2-enc", "user2-iv", "user2-tag", now, userId2],
      );

      const row1 = db
        .query("SELECT ai_config_encrypted FROM users WHERE id = ?")
        .get(TEST_USER_ID) as { ai_config_encrypted: string };
      const row2 = db
        .query("SELECT ai_config_encrypted FROM users WHERE id = ?")
        .get(userId2) as { ai_config_encrypted: string };

      expect(row1.ai_config_encrypted).toBe("user1-enc");
      expect(row2.ai_config_encrypted).toBe("user2-enc");
    });
  });
});

// These tests exercise the real createServerFn handlers end-to-end. Encryption
// is real (round-tripped through AES-256-GCM) so the isValidAiConfig branch and
// the decrypt path are both covered.
describe("AI config handlers", () => {
  let originalKey: string | undefined;
  let originalSecret: string | undefined;
  let db: Database;

  beforeEach(() => {
    originalKey = process.env.ENCRYPTION_KEY;
    originalSecret = process.env.SESSION_SECRET;
    process.env.ENCRYPTION_KEY = VALID_KEY;
    process.env.SESSION_SECRET = "s".repeat(40);
    resetEncryptionKey();
    session.data = { userId: TEST_USER_ID };

    db = setupDb();
  });

  afterEach(() => {
    resetDatabase();
    resetEncryptionKey();
    if (originalKey === undefined) {
      delete process.env.ENCRYPTION_KEY;
    } else {
      process.env.ENCRYPTION_KEY = originalKey;
    }
    if (originalSecret === undefined) {
      delete process.env.SESSION_SECRET;
    } else {
      process.env.SESSION_SECRET = originalSecret;
    }
  });

  it("loadAiConfig returns null when no config is stored", async () => {
    await expect(loadAiConfig()).resolves.toBeNull();
  });

  it("loadAiConfig round-trips a saved config", async () => {
    await saveAiConfig({ data: { config: validConfig } });

    const loaded = await loadAiConfig();
    expect(loaded).toEqual(validConfig);
  });

  it("saveAiConfig encrypts the config before persisting", async () => {
    await saveAiConfig({ data: { config: validConfig } });

    const row = db
      .query(
        "SELECT ai_config_encrypted, ai_config_iv, ai_config_auth_tag " +
          "FROM users WHERE id = ?",
      )
      .get(TEST_USER_ID) as {
      ai_config_encrypted: string;
      ai_config_iv: string;
      ai_config_auth_tag: string;
    };

    // The persisted ciphertext must not contain the plaintext key.
    expect(row.ai_config_encrypted).not.toContain("sk-test-key-12345");
    expect(row.ai_config_iv).toHaveLength(24);
    expect(row.ai_config_auth_tag).toHaveLength(32);
  });

  it("saveAiConfig rejects an invalid config shape", async () => {
    // Object is intentionally missing `model`; cast through unknown so it can
    // be passed while still being invalid at runtime.
    const invalidConfig = {
      baseUrl: "x",
      apiKey: "y",
    } as unknown as AiConfig;
    await expect(
      saveAiConfig({
        data: { config: invalidConfig },
      }),
    ).rejects.toThrow("Invalid AI config.");
  });

  it("loadAiConfig returns null when the stored config is not a valid shape", async () => {
    // Reset to a fresh encryption key identity, then encrypt a non-AiConfig
    // object and persist it directly so the decrypt succeeds but shape
    // validation fails.
    const { encryptAiConfig } = await import("../encryption.server");
    const enc = await encryptAiConfig({
      baseUrl: "x",
      apiKey: "y",
      // model intentionally missing.
    } as unknown as AiConfig);
    const now = new Date().toISOString();
    db.run(
      "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
        "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
      [enc.ciphertext, enc.iv, enc.authTag, now, TEST_USER_ID],
    );

    await expect(loadAiConfig()).resolves.toBeNull();
  });

  it("loadAiConfig returns null for a user with no row", async () => {
    session.data = { userId: "no-such-user" };

    await expect(loadAiConfig()).resolves.toBeNull();
  });

  it("clearAiConfig nulls all config fields", async () => {
    await saveAiConfig({ data: { config: validConfig } });

    await clearAiConfig();

    const row = db
      .query(
        "SELECT ai_config_encrypted, ai_config_iv, ai_config_auth_tag " +
          "FROM users WHERE id = ?",
      )
      .get(TEST_USER_ID) as {
      ai_config_encrypted: string | null;
      ai_config_iv: string | null;
      ai_config_auth_tag: string | null;
    };
    expect(row.ai_config_encrypted).toBeNull();
    expect(row.ai_config_iv).toBeNull();
    expect(row.ai_config_auth_tag).toBeNull();
  });

  it("clearAiConfig returns ok", async () => {
    await expect(clearAiConfig()).resolves.toEqual({ ok: true });
  });

  it("loadAiConfig rejects when the session has no userId", async () => {
    session.data = {};

    await expect(loadAiConfig()).rejects.toThrow("Sign in required.");
  });
});
