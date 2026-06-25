import { Database } from "bun:sqlite";

import { getDatabase, initSchema, resetDatabase } from "./db";

describe("getDatabase", () => {
  afterEach(() => {
    resetDatabase();
  });

  it("returns a Database instance", () => {
    const db = getDatabase(":memory:");
    expect(db).toBeInstanceOf(Database);
  });

  it("returns the same instance on subsequent calls", () => {
    const db1 = getDatabase(":memory:");
    const db2 = getDatabase();
    expect(db1).toBe(db2);
  });

  // WAL journal mode is not available for :memory: databases. In-memory
  // databases use a built-in journal mode that returns "memory".
  it("uses memory journal mode for :memory: databases", () => {
    const db = getDatabase(":memory:");
    const result = db.query("PRAGMA journal_mode").get() as {
      journal_mode: string;
    };
    // :memory: databases report "memory" as the journal mode.
    expect(result.journal_mode).toBe("memory");
  });

  it("enables foreign keys", () => {
    const db = getDatabase(":memory:");
    const result = db.query("PRAGMA foreign_keys").get() as {
      foreign_keys: number;
    };
    expect(result.foreign_keys).toBe(1);
  });
});

describe("initSchema", () => {
  let db: Database;

  beforeEach(() => {
    resetDatabase();
    db = getDatabase(":memory:");
  });

  afterEach(() => {
    resetDatabase();
  });

  function tableNames(database: Database): string[] {
    return (
      database
        .query(
          "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
        )
        .all() as { name: string }[]
    ).map((row) => row.name);
  }

  it("creates the users, invite_tokens, and webauthn_credentials tables", () => {
    initSchema(db);
    const tables = tableNames(db);
    expect(tables).toContain("users");
    expect(tables).toContain("invite_tokens");
    expect(tables).toContain("webauthn_credentials");
  });

  it("is idempotent - calling initSchema twice succeeds", () => {
    initSchema(db);
    expect(() => initSchema(db)).not.toThrow();
  });

  it("creates the invite_tokens user_id index", () => {
    initSchema(db);
    const indexes = db
      .query(
        "SELECT name FROM sqlite_master WHERE type='index' AND name='idx_invite_tokens_user_id'",
      )
      .all();
    expect(indexes).toHaveLength(1);
  });
});

describe("CRUD on users table", () => {
  let db: Database;

  beforeEach(() => {
    resetDatabase();
    db = getDatabase(":memory:");
    initSchema(db);
  });

  afterEach(() => {
    resetDatabase();
  });

  it("inserts and reads a user row", () => {
    const now = new Date().toISOString();
    db.run(
      "INSERT INTO users (id, display_name, created_at, updated_at) VALUES (?, ?, ?, ?)",
      ["user-1", "Oscar", now, now],
    );
    const user = db
      .query("SELECT id, display_name FROM users WHERE id = ?")
      .get("user-1") as { id: string; display_name: string } | null;
    expect(user).not.toBeNull();
    expect(user!.id).toBe("user-1");
    expect(user!.display_name).toBe("Oscar");
  });

  it("updates a user row", () => {
    const now = new Date().toISOString();
    db.run(
      "INSERT INTO users (id, display_name, created_at, updated_at) VALUES (?, ?, ?, ?)",
      ["user-1", "Oscar", now, now],
    );
    db.run("UPDATE users SET display_name = ? WHERE id = ?", [
      "Oscar Updated",
      "user-1",
    ]);
    const user = db
      .query("SELECT display_name FROM users WHERE id = ?")
      .get("user-1") as { display_name: string } | null;
    expect(user!.display_name).toBe("Oscar Updated");
  });

  it("deletes a user row", () => {
    const now = new Date().toISOString();
    db.run(
      "INSERT INTO users (id, display_name, created_at, updated_at) VALUES (?, ?, ?, ?)",
      ["user-1", "Oscar", now, now],
    );
    db.run("DELETE FROM users WHERE id = ?", ["user-1"]);
    const user = db
      .query("SELECT id FROM users WHERE id = ?")
      .get("user-1") as { id: string } | null;
    expect(user).toBeNull();
  });

  it("initialises progress_json to empty object by default", () => {
    const now = new Date().toISOString();
    db.run(
      "INSERT INTO users (id, display_name, created_at, updated_at) VALUES (?, ?, ?, ?)",
      ["user-1", "Oscar", now, now],
    );
    const user = db
      .query("SELECT progress_json FROM users WHERE id = ?")
      .get("user-1") as { progress_json: string } | null;
    expect(user!.progress_json).toBe("{}");
  });
});
