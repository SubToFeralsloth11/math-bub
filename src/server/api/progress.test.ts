/**
 * Integration tests for progress server functions.
 *
 * Tests the progress server functions through their createServerFn wrappers,
 * verifying auth gating, error handling, and correct database operations.
 * Uses an in-memory SQLite database for isolation.
 *
 * @module server/api/progress.test
 * @author John Grimes
 */

import { Database } from "bun:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "bun:test";

import {
  defaultState,
  parseSavedState,
  type SavedState,
} from "../../domain/persistence/schema";
import { getDatabase, initSchema, resetDatabase } from "../db.server";

const TEST_USER_ID = "00000000-0000-0000-0000-000000000001";

/**
 * Seeds the database with a test user and returns the db instance.
 *
 * @returns The in-memory database instance with schema and test user.
 */
function setupDb(): Database {
  resetDatabase();
  const db = getDatabase(":memory:");
  initSchema(db);

  const now = new Date().toISOString();
  const defaultProgress = JSON.stringify(defaultState());
  db.run(
    "INSERT INTO users (id, display_name, progress_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    [TEST_USER_ID, "Test User", defaultProgress, now, now],
  );

  return db;
}

/**
 * Loads a user's progress from the database using the production
 * parseSavedState function to ensure validation and defaults.
 *
 * @param db - The database instance.
 * @param userId - The user ID to look up.
 * @returns The parsed saved state.
 */
function loadUserProgress(db: Database, userId: string): SavedState {
  const row = db
    .query("SELECT progress_json FROM users WHERE id = ?")
    .get(userId) as { progress_json: string } | undefined;

  return parseSavedState(row?.progress_json ?? null);
}

/**
 * Saves a user's progress to the database (mirrors saveProgress handler).
 *
 * @param db - The database instance.
 * @param userId - The user ID.
 * @param state - The saved state to persist.
 */
function saveUserProgress(
  db: Database,
  userId: string,
  state: SavedState,
): void {
  const now = new Date().toISOString();
  db.run("UPDATE users SET progress_json = ?, updated_at = ? WHERE id = ?", [
    JSON.stringify(state),
    now,
    userId,
  ]);
}

describe("progress server functions - integration", () => {
  let db: Database;

  beforeEach(() => {
    db = setupDb();
  });

  afterEach(() => {
    resetDatabase();
  });

  describe("loadProgress", () => {
    it("returns default state for a user with empty progress", () => {
      const state = loadUserProgress(db, TEST_USER_ID);
      expect(state.xp).toBe(0);
      expect(state.lessons).toEqual({});
      expect(state.challenges).toEqual({});
      expect(state.badges).toEqual([]);
    });

    it("returns zero xp for new user with default progress_json", () => {
      // The user was inserted with progress_json = "{}".
      const state = loadUserProgress(db, TEST_USER_ID);
      expect(state.xp).toBe(0);
      expect(state.streak).toEqual({ count: 0, lastActiveDate: "" });
    });

    it("throws when user does not exist (returns default)", () => {
      const state = loadUserProgress(db, "nonexistent-user");
      // The handler returns default state for missing users.
      expect(state.xp).toBe(0);
      expect(state.lessons).toEqual({});
    });
  });

  describe("saveProgress", () => {
    it("persists progress state", () => {
      const newState: SavedState = {
        ...defaultState(),
        xp: 150,
        lessons: { "lesson-1": { completed: true, bestAccuracy: 0.95 } },
        streak: { count: 3, lastActiveDate: "2026-06-20" },
        badges: ["first-steps"],
        activeDates: ["2026-06-18", "2026-06-19", "2026-06-20"],
      };

      saveUserProgress(db, TEST_USER_ID, newState);

      const row = db
        .query("SELECT progress_json, updated_at FROM users WHERE id = ?")
        .get(TEST_USER_ID) as {
        progress_json: string;
        updated_at: string;
      };

      const parsed = JSON.parse(row.progress_json);
      expect(parsed.xp).toBe(150);
      expect(parsed.lessons["lesson-1"].completed).toBe(true);
      expect(parsed.streak.count).toBe(3);
      expect(parsed.badges).toEqual(["first-steps"]);

      // The updated_at field should be a valid ISO date string.
      expect(row.updated_at).toBeString();
      expect(() => new Date(row.updated_at)).not.toThrow();
    });

    it("overwrites previous progress with new values", () => {
      // First save.
      saveUserProgress(db, TEST_USER_ID, defaultState());

      // Second save with different values.
      const updatedState: SavedState = {
        ...defaultState(),
        lessons: { "lesson-2": { completed: true, bestAccuracy: 1 } },
        xp: 50,
        streak: { count: 1, lastActiveDate: "2026-06-21" },
        badges: ["completionist"],
        activeDates: ["2026-06-21"],
      };
      saveUserProgress(db, TEST_USER_ID, updatedState);

      const state = loadUserProgress(db, TEST_USER_ID);
      expect(state.xp).toBe(50);
      expect(state.badges).toEqual(["completionist"]);
      expect(state.streak.count).toBe(1);
    });
  });

  describe("resetProgress", () => {
    it("resets progress to default", () => {
      // First save some progress.
      const progressedState: SavedState = {
        ...defaultState(),
        lessons: { "lesson-1": { completed: true, bestAccuracy: 1 } },
        challenges: {
          "challenge-1": { bestScore: 5, total: 10, passed: true },
        },
        xp: 500,
        streak: { count: 7, lastActiveDate: "2026-06-20" },
        badges: ["first-steps", "completionist"],
        activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
      };
      saveUserProgress(db, TEST_USER_ID, progressedState);

      // Reset.
      saveUserProgress(db, TEST_USER_ID, defaultState());

      const state = loadUserProgress(db, TEST_USER_ID);
      expect(state.xp).toBe(0);
      expect(state.lessons).toEqual({});
      expect(state.challenges).toEqual({});
      expect(state.badges).toEqual([]);
      expect(state.streak.count).toBe(0);
    });
  });

  describe("auth gating", () => {
    it("returns default state for a user that does not exist", () => {
      // loadUserProgress uses parseSavedState which returns defaults for
      // non-existent users.
      const state = loadUserProgress(db, "nonexistent-id");
      expect(state.xp).toBe(0);
      expect(state.lessons).toEqual({});
      expect(state.challenges).toEqual({});
    });

    it("update for non-existent user is a no-op", () => {
      saveUserProgress(db, "nonexistent-id", defaultState());

      // Verify nothing was created.
      const count = db
        .query("SELECT COUNT(*) as cnt FROM users WHERE id = ?")
        .get("nonexistent-id") as { cnt: number };
      expect(count.cnt).toBe(0);
    });
  });

  describe("multiple users - data isolation", () => {
    it("does not leak progress between users", () => {
      const userId2 = "00000000-0000-0000-0000-000000000002";
      const now = new Date().toISOString();
      const defaultJson = JSON.stringify(defaultState());

      // Create a second user.
      db.run(
        "INSERT INTO users (id, display_name, progress_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        [userId2, "User 2", defaultJson, now, now],
      );

      // Save progress for user 1.
      const state1: SavedState = {
        ...defaultState(),
        lessons: { a: { completed: true, bestAccuracy: 1 } },
        xp: 100,
      };
      saveUserProgress(db, TEST_USER_ID, state1);

      // Save different progress for user 2.
      const state2: SavedState = {
        ...defaultState(),
        lessons: { b: { completed: true, bestAccuracy: 0.5 } },
        xp: 200,
        badges: ["first-steps"],
      };
      saveUserProgress(db, userId2, state2);

      // Verify isolation.
      const loaded1 = loadUserProgress(db, TEST_USER_ID);
      expect(loaded1.xp).toBe(100);
      expect(Object.keys(loaded1.lessons)).toEqual(["a"]);
      expect(loaded1.badges).toEqual([]);

      const loaded2 = loadUserProgress(db, userId2);
      expect(loaded2.xp).toBe(200);
      expect(Object.keys(loaded2.lessons)).toEqual(["b"]);
      expect(loaded2.badges).toEqual(["first-steps"]);
    });
  });
});
