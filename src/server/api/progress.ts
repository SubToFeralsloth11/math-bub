import { createServerFn } from "@tanstack/react-start";

import { getDatabase } from "../../server/db";
import { useAppSession } from "../../server/session";
import {
  defaultState,
  parseSavedState,
  type SavedState,
} from "../../domain/persistence/schema";

/**
 * Retrieves the authenticated user's ID from the session, throwing a 401
 * error if no session exists.
 *
 * @returns The authenticated user's ID.
 * @throws If the user is not authenticated.
 */
async function requireUserId(): Promise<string> {
  const session = await useAppSession();
  const sessionData = session.data as Record<string, unknown>;
  const userId = sessionData.userId as string | undefined;
  if (!userId) {
    throw new Error("Sign in required.");
  }
  return userId;
}

/**
 * Loads the authenticated user's progress state from the database.
 */
export const loadProgress = createServerFn({ method: "GET" }).handler(
  async () => {
    const userId = await requireUserId();
    const db = getDatabase();

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

    db.run(
      "UPDATE users SET progress_json = ?, updated_at = ? WHERE id = ?",
      [JSON.stringify(data.state), now, userId],
    );

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

    db.run(
      "UPDATE users SET progress_json = ?, updated_at = ? WHERE id = ?",
      [JSON.stringify(fresh), now, userId],
    );

    return fresh;
  },
);
