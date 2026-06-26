import { createServerFn } from "@tanstack/react-start";

import { requireUserId } from "./requireUserId.server";
import {
  defaultState,
  parseSavedState,
  type SavedState,
} from "../../domain/persistence/schema";
import { getDatabase } from "../../server/db.server";

/**
 * Ensures the given user row exists in the database, inserting a default
 * record when it does not. Safe to call before any progress operation.
 *
 * @param userId - The user ID to ensure.
 * @param db - The database instance.
 */
function ensureUserExists(
  userId: string,
  db: ReturnType<typeof getDatabase>,
): void {
  const now = new Date().toISOString();
  db.query(
    `INSERT OR IGNORE INTO users (id, display_name, progress_json, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(userId, userId, JSON.stringify(defaultState()), now, now);
}

/**
 * Loads the authenticated user's progress state from the database.
 */
export const loadProgress = createServerFn({ method: "GET" }).handler(
  async () => {
    const userId = await requireUserId();
    const db = getDatabase();
    ensureUserExists(userId, db);

    const row = db
      .query("SELECT progress_json FROM users WHERE id = ?")
      .get(userId) as { progress_json: string } | undefined;

    if (!row) {
      return defaultState();
    }

    return parseSavedState(row.progress_json);
  },
);

/**
 * Persists the authenticated user's progress state to the database.
 */
export const saveProgress = createServerFn({ method: "POST" })
  .validator((data: { state: SavedState }) => data)
  .handler(async ({ data }) => {
    const userId = await requireUserId();
    const db = getDatabase();
    const now = new Date().toISOString();
    ensureUserExists(userId, db);

    db.run("UPDATE users SET progress_json = ?, updated_at = ? WHERE id = ?", [
      JSON.stringify(data.state),
      now,
      userId,
    ]);

    return { ok: true };
  });

/**
 * Resets the authenticated user's progress to the default state.
 */
export const resetProgress = createServerFn({ method: "POST" }).handler(
  async () => {
    const userId = await requireUserId();
    const db = getDatabase();
    const now = new Date().toISOString();
    const fresh = defaultState();
    ensureUserExists(userId, db);

    db.run("UPDATE users SET progress_json = ?, updated_at = ? WHERE id = ?", [
      JSON.stringify(fresh),
      now,
      userId,
    ]);

    return fresh;
  },
);
