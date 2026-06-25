/**
 * Integration tests for server-side database operations.
 *
 * Tests authentication, progress, and AI config database logic against a
 * real SQLite database using Bun's built-in SQLite module. These tests
 * run with `bun test` (not Vitest) because they require Bun APIs.
 *
 * @module tests/integration/db
 * @author John Grimes
 */

import { Database } from "bun:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";

import {
  defaultState,
  parseSavedState,
} from "../../src/domain/persistence/schema";

let database: Database;

beforeEach(() => {
  database = new Database(":memory:");
  database.run("PRAGMA foreign_keys = ON");

  // Create the schema exactly as initSchema would.
  database.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      progress_json TEXT NOT NULL DEFAULT '{}',
      ai_config_encrypted TEXT,
      ai_config_iv TEXT,
      ai_config_auth_tag TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS invite_tokens (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      consumed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS webauthn_credentials (
      credential_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE REFERENCES users(id),
      public_key TEXT NOT NULL,
      counter INTEGER NOT NULL DEFAULT 0,
      transports TEXT,
      created_at TEXT NOT NULL
    )
  `);
});

afterEach(() => {
  database.close();
});

/** Helper to create a user with default progress. */
function createUser(
  id: string,
  displayName: string,
  progressJson?: string,
): void {
  const now = new Date().toISOString();
  database.run(
    "INSERT INTO users (id, display_name, progress_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    [id, displayName, progressJson ?? JSON.stringify(defaultState()), now, now],
  );
}

/** Helper to create an invite token. */
function createToken(token: string, userId: string, consumed = 0): void {
  const now = new Date().toISOString();
  database.run(
    "INSERT INTO invite_tokens (token, user_id, consumed, created_at) VALUES (?, ?, ?, ?)",
    [token, userId, consumed, now],
  );
}

describe("Database - auth operations (T017-T018)", () => {
  it("looks up a valid invite token and returns user info", () => {
    createUser("user-1", "Oscar");
    createToken("valid-token", "user-1");

    const row = database
      .query(
        "SELECT t.token, t.user_id, t.consumed, u.display_name " +
          "FROM invite_tokens t JOIN users u ON t.user_id = u.id " +
          "WHERE t.token = ?",
      )
      .get("valid-token") as {
      token: string;
      user_id: string;
      consumed: number;
      display_name: string;
    };

    expect(row).not.toBeNull();
    expect(row.display_name).toBe("Oscar");
    expect(row.consumed).toBe(0);
  });

  it("returns null for a non-existent token", () => {
    const row = database
      .query(
        "SELECT t.token, t.user_id, t.consumed, u.display_name " +
          "FROM invite_tokens t JOIN users u ON t.user_id = u.id " +
          "WHERE t.token = ?",
      )
      .get("nonexistent");
    expect(row).toBeNull();
  });

  it("marks a token as consumed", () => {
    createUser("user-1", "Oscar");
    createToken("valid-token", "user-1");

    database.run("UPDATE invite_tokens SET consumed = 1 WHERE token = ?", [
      "valid-token",
    ]);

    const row = database
      .query("SELECT consumed FROM invite_tokens WHERE token = ?")
      .get("valid-token") as { consumed: number };
    expect(row.consumed).toBe(1);
  });

  it("stores and retrieves a WebAuthn credential", () => {
    createUser("user-1", "Oscar");
    const now = new Date().toISOString();

    database.run(
      "INSERT INTO webauthn_credentials (credential_id, user_id, public_key, counter, transports, created_at) " +
        "VALUES (?, ?, ?, ?, ?, ?)",
      ["cred-id-1", "user-1", "base64-public-key", 0, '["internal"]', now],
    );

    const row = database
      .query(
        "SELECT credential_id, user_id, public_key, counter " +
          "FROM webauthn_credentials WHERE credential_id = ?",
      )
      .get("cred-id-1") as {
      credential_id: string;
      user_id: string;
      public_key: string;
      counter: number;
    };

    expect(row.credential_id).toBe("cred-id-1");
    expect(row.user_id).toBe("user-1");
    expect(row.public_key).toBe("base64-public-key");
    expect(row.counter).toBe(0);
  });

  it("enforces one credential per user (UNIQUE constraint)", () => {
    createUser("user-1", "Oscar");
    const now = new Date().toISOString();

    database.run(
      "INSERT INTO webauthn_credentials (credential_id, user_id, public_key, counter, created_at) " +
        "VALUES (?, ?, ?, ?, ?)",
      ["cred-id-1", "user-1", "key1", 0, now],
    );

    expect(() =>
      database.run(
        "INSERT INTO webauthn_credentials (credential_id, user_id, public_key, counter, created_at) " +
          "VALUES (?, ?, ?, ?, ?)",
        ["cred-id-2", "user-1", "key2", 0, now],
      ),
    ).toThrow();
  });

  it("updates the signature counter for replay protection", () => {
    createUser("user-1", "Oscar");
    const now = new Date().toISOString();

    database.run(
      "INSERT INTO webauthn_credentials (credential_id, user_id, public_key, counter, created_at) " +
        "VALUES (?, ?, ?, ?, ?)",
      ["cred-id-1", "user-1", "key1", 0, now],
    );

    database.run(
      "UPDATE webauthn_credentials SET counter = ? WHERE credential_id = ?",
      [5, "cred-id-1"],
    );

    const row = database
      .query("SELECT counter FROM webauthn_credentials WHERE credential_id = ?")
      .get("cred-id-1") as { counter: number };
    expect(row.counter).toBe(5);
  });
});

describe("Database - progress persistence (T027)", () => {
  it("loads default progress for a user with no saved state", () => {
    createUser("user-1", "Oscar");

    const row = database
      .query("SELECT progress_json FROM users WHERE id = ?")
      .get("user-1") as { progress_json: string };

    const state = parseSavedState(row.progress_json);
    expect(state.xp).toBe(0);
    expect(state.lessons).toEqual({});
    expect(state.challenges).toEqual({});
  });

  it("saves and loads progress round-trip", () => {
    createUser("user-1", "Oscar");

    const saved = {
      ...defaultState(),
      xp: 500,
      lessons: { "lesson-1": { completed: true, bestAccuracy: 0.9 } },
      challenges: { "boss-1": { bestScore: 8, total: 10, passed: true } },
      badges: ["first-lesson"],
      activeDates: ["2026-06-07", "2026-06-08"],
      streak: { count: 2, lastActiveDate: "2026-06-08" },
    };

    const now = new Date().toISOString();
    database.run("UPDATE users SET progress_json = ?, updated_at = ? WHERE id = ?", [
      JSON.stringify(saved),
      now,
      "user-1",
    ]);

    const row = database
      .query("SELECT progress_json FROM users WHERE id = ?")
      .get("user-1") as { progress_json: string };

    const loaded = parseSavedState(row.progress_json);
    expect(loaded.xp).toBe(500);
    expect(loaded.lessons["lesson-1"]).toEqual({
      completed: true,
      bestAccuracy: 0.9,
    });
    expect(loaded.badges).toEqual(["first-lesson"]);
    expect(loaded.activeDates).toEqual(["2026-06-07", "2026-06-08"]);
    expect(loaded.streak.count).toBe(2);
  });

  it("resets progress to default state", () => {
    createUser(
      "user-1",
      "Oscar",
      JSON.stringify({
        ...defaultState(),
        xp: 500,
        badges: ["first-lesson"],
      }),
    );

    const fresh = defaultState();
    const now = new Date().toISOString();
    database.run("UPDATE users SET progress_json = ?, updated_at = ? WHERE id = ?", [
      JSON.stringify(fresh),
      now,
      "user-1",
    ]);

    const row = database
      .query("SELECT progress_json FROM users WHERE id = ?")
      .get("user-1") as { progress_json: string };

    const loaded = parseSavedState(row.progress_json);
    expect(loaded.xp).toBe(0);
    expect(loaded.badges).toEqual([]);
    expect(loaded.lessons).toEqual({});
  });
});

describe("Database - AI config persistence (T036)", () => {
  it("stores and retrieves encrypted AI config columns", () => {
    createUser("user-1", "Oscar");
    const now = new Date().toISOString();

    database.run(
      "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
        "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
      ["ciphertext-hex", "iv-hex", "auth-tag-hex", now, "user-1"],
    );

    const row = database
      .query(
        "SELECT ai_config_encrypted, ai_config_iv, ai_config_auth_tag " +
          "FROM users WHERE id = ?",
      )
      .get("user-1") as {
      ai_config_encrypted: string;
      ai_config_iv: string;
      ai_config_auth_tag: string;
    };

    expect(row.ai_config_encrypted).toBe("ciphertext-hex");
    expect(row.ai_config_iv).toBe("iv-hex");
    expect(row.ai_config_auth_tag).toBe("auth-tag-hex");
  });

  it("clears AI config by setting columns to NULL", () => {
    createUser("user-1", "Oscar");
    const now = new Date().toISOString();

    // First, set some config.
    database.run(
      "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
        "ai_config_auth_tag = ? WHERE id = ?",
      ["ciphertext", "iv", "tag", "user-1"],
    );

    // Then clear it.
    database.run(
      "UPDATE users SET ai_config_encrypted = NULL, ai_config_iv = NULL, " +
        "ai_config_auth_tag = NULL, updated_at = ? WHERE id = ?",
      [now, "user-1"],
    );

    const row = database
      .query(
        "SELECT ai_config_encrypted, ai_config_iv, ai_config_auth_tag " +
          "FROM users WHERE id = ?",
      )
      .get("user-1") as {
      ai_config_encrypted: string | null;
      ai_config_iv: string | null;
      ai_config_auth_tag: string | null;
    };

    expect(row.ai_config_encrypted).toBeNull();
    expect(row.ai_config_iv).toBeNull();
    expect(row.ai_config_auth_tag).toBeNull();
  });

  it("returns NULL for all AI config columns when unconfigured", () => {
    createUser("user-1", "Oscar");

    const row = database
      .query(
        "SELECT ai_config_encrypted, ai_config_iv, ai_config_auth_tag " +
          "FROM users WHERE id = ?",
      )
      .get("user-1") as {
      ai_config_encrypted: string | null;
      ai_config_iv: string | null;
      ai_config_auth_tag: string | null;
    };

    expect(row.ai_config_encrypted).toBeNull();
    expect(row.ai_config_iv).toBeNull();
    expect(row.ai_config_auth_tag).toBeNull();
  });
});
