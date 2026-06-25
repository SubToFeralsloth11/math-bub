// StudyBub CLI tool for user management and progress migration.
// Run with: bun run scripts/migrate.ts <command> [options]

import { Database } from "bun:sqlite";

import { defaultState } from "../src/domain/persistence/schema";

/**
 * Opens the database at the given path (or the default file).
 *
 * @param path - Optional path to the database file.
 * @returns The database instance.
 */
function openDatabase(path?: string): Database {
  const dbPath = path ?? "studybub.db";
  const db = new Database(dbPath);
  db.run("PRAGMA journal_mode = WAL");
  db.run("PRAGMA foreign_keys = ON");
  return db;
}

/**
 * Initialises the database schema. This mirrors the `initSchema` function
 * in `src/server/db.ts` so the CLI tool can create tables without importing
 * server modules.
 *
 * @param db - The database instance.
 */
function initSchema(db: Database): void {
  db.run(`
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

  db.run(`
    CREATE TABLE IF NOT EXISTS invite_tokens (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      consumed INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS webauthn_credentials (
      credential_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE REFERENCES users(id),
      public_key TEXT NOT NULL,
      counter INTEGER NOT NULL DEFAULT 0,
      transports TEXT,
      created_at TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_invite_tokens_user_id
    ON invite_tokens(user_id)
  `);
}

/**
 * Generates a random URL-safe token string for invite links.
 *
 * @returns A URL-safe random string.
 */
function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/**
 * Creates a new user and invite token. Prints the user ID and invitation
 * link.
 *
 * @param db - The database instance.
 * @param displayName - The learner's display name.
 * @param baseUrl - The base URL for the invitation link.
 */
function inviteUser(
  db: Database,
  displayName: string,
  baseUrl: string,
): void {
  const userId = crypto.randomUUID();
  const token = generateToken();
  const now = new Date().toISOString();
  const defaultProgress = JSON.stringify(defaultState());

  // Create the user.
  db.run(
    "INSERT INTO users (id, display_name, progress_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    [userId, displayName, defaultProgress, now, now],
  );

  // Create the invite token.
  db.run(
    "INSERT INTO invite_tokens (token, user_id, created_at) VALUES (?, ?, ?)",
    [token, userId, now],
  );

  console.log(`User created: ${displayName}`);
  console.log(`  User ID: ${userId}`);
  console.log(`  Invitation link: ${baseUrl}/invite/${token}`);
}

/**
 * Prints usage instructions.
 */
function printHelp(): void {
  console.log(`StudyBub CLI

Usage:
  bun run scripts/migrate.ts invite --name <name> [--base-url <url>]

Commands:
  invite     Create a new user and generate an invitation link.

Options:
  --name       The learner's display name (required for invite).
  --base-url   Base URL for invitation links (default: http://localhost:3000).

Examples:
  bun run scripts/migrate.ts invite --name "Oscar"
  bun run scripts/migrate.ts invite --name "Oscar" --base-url "https://studybub.example.com"
`);
}

// --- Main CLI entry point ---

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  printHelp();
  process.exit(0);
}

const command = args[0];

if (command === "invite") {
  const nameIndex = args.indexOf("--name");
  if (nameIndex === -1 || !args[nameIndex + 1]) {
    console.error("Error: --name is required for the invite command.");
    process.exit(1);
  }
  const displayName = args[nameIndex + 1];

  const baseUrlIndex = args.indexOf("--base-url");
  const baseUrl = baseUrlIndex !== -1 && args[baseUrlIndex + 1]
    ? args[baseUrlIndex + 1]
    : "http://localhost:3000";

  const db = openDatabase();
  initSchema(db);
  inviteUser(db, displayName, baseUrl);
} else {
  console.error(`Unknown command: ${command}`);
  printHelp();
  process.exit(1);
}
