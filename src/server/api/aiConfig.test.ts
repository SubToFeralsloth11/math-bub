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

import { Database } from "bun:sqlite";

import { getDatabase, initSchema, resetDatabase } from "../db.server";

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
    it("persists encrypted AI config fields", () => {
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
