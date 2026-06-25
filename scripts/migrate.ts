// StudyBub CLI tool for user management and progress migration.
// Run with: bun run scripts/migrate.ts <command> [options]

import { Database } from "bun:sqlite";
import { readFileSync } from "node:fs";

import { parseSavedState } from "../src/domain/persistence/schema";

/**
 * Opens the database at the given path (or the default file).
 *
 * @param path - Optional path to the database file.
 * @returns The database instance.
 */
function openDatabase(path = "studybub.db"): Database {
  const db = new Database(path);
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
  return btoa(String.fromCodePoint(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

/**
 * Creates a new user and invite token. Prints the user ID and invitation
 * link.
 *
 * @param db - The database instance.
 * @param displayName - The learner's display name.
 * @param baseUrl - The base URL for the invitation link.
 */
function inviteUser(db: Database, displayName: string, baseUrl: string): void {
  const userId = crypto.randomUUID();
  const token = generateToken();
  const now = new Date().toISOString();
  const defaultProgress = JSON.stringify({
    version: 1,
    lessons: {},
    challenges: {},
    xp: 0,
    streak: { count: 0, lastActiveDate: "" },
    badges: [],
    activeDates: [],
  });

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
 * Imports progress (and optionally AI config) from JSON files into a
 * specified user's database profile.
 *
 * @param db - The database instance.
 * @param userId - The target user ID.
 * @param progressFile - Path to the progress JSON file.
 * @param aiConfigFile - Optional path to the AI config JSON file.
 */
function importProgress(
  db: Database,
  userId: string,
  progressFile: string,
  _aiConfigFile?: string,
): void {
  // Verify the user exists.
  const user = db
    .query("SELECT id, display_name FROM users WHERE id = ?")
    .get(userId) as { id: string; display_name: string } | undefined;

  if (!user) {
    console.error(`Error: User not found: ${userId}`);
    process.exit(1);
  }

  // Read and validate the progress JSON.
  const progressRaw = readFileSync(progressFile, "utf8");
  if (!progressRaw || progressRaw.trim() === "") {
    console.error("Error: Progress file is empty.");
    process.exit(1);
  }

  let progressJson: unknown;
  try {
    progressJson = JSON.parse(progressRaw);
  } catch {
    console.error("Error: Progress file contains malformed JSON.");
    process.exit(1);
  }

  const savedState = parseSavedState(
    typeof progressJson === "object" ? progressRaw : null,
  );

  // If parseSavedState fell back to default, the input was invalid.
  if (
    savedState.xp === 0 &&
    Object.keys(savedState.lessons).length === 0 &&
    savedState.badges.length === 0 &&
    progressRaw.trim() !== "{}"
  ) {
    console.error(
      "Error: Progress file is not a valid StudyBub progress state.",
    );
    process.exit(1);
  }

  const now = new Date().toISOString();

  // Update the user's progress.
  db.run("UPDATE users SET progress_json = ?, updated_at = ? WHERE id = ?", [
    JSON.stringify(savedState),
    now,
    userId,
  ]);

  const lessonCount = Object.keys(savedState.lessons).length;
  const challengeCount = Object.keys(savedState.challenges).length;
  console.log(
    `Progress imported for ${user.display_name} (${userId}): ` +
      `${lessonCount} lessons, ${challengeCount} challenges, ` +
      `${savedState.xp} XP, streak ${savedState.streak.count}.`,
  );

  // Handle optional AI config file.
  if (_aiConfigFile) {
    importAiConfig(db, userId, _aiConfigFile, user.display_name);
  }
}

/**
 * Imports AI config from a JSON file into the database for a user.
 * The config is validated and encrypted before storage.
 *
 * @param db - The database instance.
 * @param userId - The target user ID.
 * @param aiConfigFile - Path to the AI config JSON file.
 * @param displayName - The user's display name for messages.
 */
async function importAiConfig(
  db: Database,
  userId: string,
  aiConfigFile: string,
  displayName: string,
): Promise<void> {
  const { encryptAiConfig } = await import("../src/server/encryption.server");

  const raw = readFileSync(aiConfigFile, "utf8");
  if (!raw || raw.trim() === "") {
    console.error("Error: AI config file is empty.");
    process.exit(1);
  }

  let config: unknown;
  try {
    config = JSON.parse(raw);
  } catch {
    console.error("Error: AI config file contains malformed JSON.");
    process.exit(1);
  }

  if (
    typeof config !== "object" ||
    config === null ||
    typeof (config as Record<string, unknown>).baseUrl !== "string" ||
    typeof (config as Record<string, unknown>).apiKey !== "string" ||
    typeof (config as Record<string, unknown>).model !== "string"
  ) {
    console.error(
      "Error: AI config file does not contain a valid config " +
        "(requires baseUrl, apiKey, and model).",
    );
    process.exit(1);
  }

  const aiConfig = config as {
    baseUrl: string;
    apiKey: string;
    model: string;
  };

  try {
    const encrypted = await encryptAiConfig(aiConfig);
    const now = new Date().toISOString();

    db.run(
      "UPDATE users SET ai_config_encrypted = ?, ai_config_iv = ?, " +
        "ai_config_auth_tag = ?, updated_at = ? WHERE id = ?",
      [encrypted.ciphertext, encrypted.iv, encrypted.authTag, now, userId],
    );

    console.log(
      `AI config imported for ${displayName}: ` +
        `model ${aiConfig.model}, endpoint ${aiConfig.baseUrl}.`,
    );
  } catch (error_) {
    console.error(
      "Error: Failed to encrypt AI config. " +
        "Ensure ENCRYPTION_KEY is set in the environment. ",
      error_ instanceof Error ? error_.message : "",
    );
    process.exit(1);
  }
}

/**
 * Prints usage instructions.
 */
function printHelp(): void {
  console.log(`StudyBub CLI

Usage:
  bun run scripts/migrate.ts invite --name <name> [--base-url <url>]
  bun run scripts/migrate.ts import --user-id <id> --progress-file <path> [--ai-config-file <path>]

Commands:
  invite     Create a new user and generate an invitation link.
  import     Import progress (and optionally AI config) from JSON files.

Options for invite:
  --name       The learner's display name (required).
  --base-url   Base URL for invitation links (default: http://localhost:3000).

Options for import:
  --user-id          Target user ID in the database (required).
  --progress-file    Path to the progress JSON file (required).
  --ai-config-file   Path to the AI config JSON file (optional).

Examples:
  bun run scripts/migrate.ts invite --name "Oscar"
  bun run scripts/migrate.ts import --user-id "abc123" --progress-file progress.json
  bun run scripts/migrate.ts import --user-id "abc123" --progress-file progress.json --ai-config-file aiConfig.json

Extracting localStorage data from browser DevTools:
  1. Open the StudyBub app in your browser.
  2. Open DevTools (F12) and go to the Console tab.
  3. Run: copy(localStorage.getItem("studybub.progress.v1"))
  4. Paste into a file (e.g., progress.json).
  5. (Optional) For AI config: copy(localStorage.getItem("studybub.aiConfig.v1"))
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
  const baseUrl =
    baseUrlIndex !== -1 && args[baseUrlIndex + 1]
      ? args[baseUrlIndex + 1]
      : "http://localhost:3000";

  const db = openDatabase();
  initSchema(db);
  inviteUser(db, displayName, baseUrl);
} else if (command === "import") {
  const userIdIndex = args.indexOf("--user-id");
  if (userIdIndex === -1 || !args[userIdIndex + 1]) {
    console.error("Error: --user-id is required for the import command.");
    process.exit(1);
  }
  const userId = args[userIdIndex + 1];

  const progressFileIndex = args.indexOf("--progress-file");
  if (progressFileIndex === -1 || !args[progressFileIndex + 1]) {
    console.error("Error: --progress-file is required for the import command.");
    process.exit(1);
  }
  const progressFile = args[progressFileIndex + 1];

  const aiConfigFileIndex = args.indexOf("--ai-config-file");
  const aiConfigFile =
    aiConfigFileIndex !== -1 && args[aiConfigFileIndex + 1]
      ? args[aiConfigFileIndex + 1]
      : undefined;

  const db = openDatabase();
  initSchema(db);
  importProgress(db, userId, progressFile, aiConfigFile);
} else {
  console.error(`Unknown command: ${command}`);
  printHelp();
  process.exit(1);
}
