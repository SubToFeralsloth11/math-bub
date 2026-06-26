import { Database } from "bun:sqlite";

/**
 * The SQLite database instance for StudyBub. Uses a file-based database by
 * default; pass `:memory:` for testing.
 */
let dbInstance: Database | null = null;

/** Whether the database schema has been initialised. */
let schemaInitialised = false;

/**
 * Gets or creates the SQLite database instance. When `path` is omitted the
 * default file `studybub.db` is used in the current working directory.
 *
 * The database schema is lazily initialised on the first call so that
 * tables exist before any query is executed. This avoids importing the
 * native database module during SSR module evaluation.
 *
 * @param path - Optional path to the database file.
 * @returns The database instance.
 */
export function getDatabase(path?: string): Database {
  if (!dbInstance) {
    const resolvedPath = path ?? process.env.STUDYBUB_DB_PATH ?? "studybub.db";
    dbInstance = new Database(resolvedPath);
    dbInstance.run("PRAGMA journal_mode = WAL");
    dbInstance.run("PRAGMA foreign_keys = ON");
  }
  if (!schemaInitialised) {
    schemaInitialised = true;
    initSchema(dbInstance);
  }
  return dbInstance;
}

/**
 * Initialises the database schema, creating all required tables if they do
 * not already exist. This function is idempotent - it uses CREATE TABLE IF
 * NOT EXISTS so it is safe to call on every server start.
 *
 * The schema includes users, invite_tokens, and webauthn_credentials tables
 * as defined in the data model.
 *
 * @param db - The database instance, defaults to the shared instance.
 */
export function initSchema(db?: Database): void {
  const database = db ?? getDatabase();

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

  // Index for looking up tokens by user.
  database.run(`
    CREATE INDEX IF NOT EXISTS idx_invite_tokens_user_id
    ON invite_tokens(user_id)
  `);
}

/**
 * Resets the database singleton. Used in tests to ensure a clean state
 * between test runs.
 */
export function resetDatabase(): void {
  dbInstance = null;
}
