/**
 * Versioned persisted-state schema for StudyBub, plus the pure
 * load/recover logic. Persistence is handled server-side via the
 * progress server functions; the schema definition and parseSavedState
 * are shared between client and server.
 *
 * @module domain/persistence/schema
 */

import type { BadgeId } from "../content/types";

/** The localStorage key under which progress is stored (fallback during SSR hydration). */
export const STORAGE_KEY = "studybub.progress.v1";

/** The current schema version. */
export const CURRENT_VERSION = 1;

/** Per-lesson saved progress. */
export interface LessonProgress {
  /** True once a mastery check has been passed. */
  completed: boolean;
  /** Best mastery accuracy seen, 0..1 (used for badges and stats). */
  bestAccuracy: number;
}

/** Best result recorded for a boss challenge. */
export interface ChallengeResult {
  /** Best correct-answer count. */
  bestScore: number;
  /** Number of questions in the challenge. */
  total: number;
  /** Whether the challenge was completed (attempted to the end). */
  passed: boolean;
}

/** The daily-streak record. */
export interface Streak {
  /** Current consecutive-day count. */
  count: number;
  /** ISO local date (YYYY-MM-DD) of the last activity, or "" if none. */
  lastActiveDate: string;
}

/** The complete saved-progress record (schema version 1). */
export interface SavedState {
  /** Schema version. */
  version: number;
  /** Per-lesson progress keyed by lesson id. */
  lessons: Record<string, LessonProgress>;
  /** Per-challenge best result keyed by challenge id. */
  challenges: Record<string, ChallengeResult>;
  /** Total accumulated XP (>= 0). */
  xp: number;
  /** Daily streak state. */
  streak: Streak;
  /** Earned badge ids (unique). */
  badges: BadgeId[];
  /** Sorted array of distinct YYYY-MM-DD dates when the learner was active, capped at 90 entries. */
  activeDates: string[];
}

/**
 * Returns a clean starting state for a brand-new learner.
 *
 * @returns A fresh {@link SavedState} with no progress recorded.
 */
export function defaultState(): SavedState {
  return {
    version: CURRENT_VERSION,
    lessons: {},
    challenges: {},
    xp: 0,
    streak: { count: 0, lastActiveDate: "" },
    badges: [],
    activeDates: [],
  };
}

/**
 * Type guard validating that an unknown value is a well-formed {@link LessonProgress}.
 *
 * @param value - The value to check.
 * @returns True if the value matches the LessonProgress shape.
 */
function isLessonProgress(value: unknown): value is LessonProgress {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.completed === "boolean" &&
    typeof record.bestAccuracy === "number"
  );
}

/**
 * Type guard validating that an unknown value is a well-formed {@link ChallengeResult}.
 *
 * @param value - The value to check.
 * @returns True if the value matches the ChallengeResult shape.
 */
function isChallengeResult(value: unknown): value is ChallengeResult {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.bestScore === "number" &&
    typeof record.total === "number" &&
    typeof record.passed === "boolean"
  );
}

/**
 * Validates that every value in a record passes the supplied guard.
 *
 * @param value - The candidate record.
 * @param guard - The per-value type guard.
 * @returns True if `value` is a record whose values all satisfy `guard`.
 */
function isRecordOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T,
): value is Record<string, T> {
  if (typeof value !== "object" || value === null) return false;
  return Object.values(value).every((item) => guard(item));
}

/**
 * Validates that an unknown value is a fully-formed current-version SavedState.
 *
 * @param value - The candidate value (typically freshly parsed JSON).
 * @returns True if the value is a valid current-version {@link SavedState}.
 */
function isSavedState(value: unknown): value is SavedState {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  const streak = record.streak as Record<string, unknown> | undefined;
  return (
    record.version === CURRENT_VERSION &&
    typeof record.xp === "number" &&
    Number.isFinite(record.xp) &&
    record.xp >= 0 &&
    Array.isArray(record.badges) &&
    record.badges.every((badge) => typeof badge === "string") &&
    typeof streak === "object" &&
    streak !== null &&
    typeof streak.count === "number" &&
    typeof streak.lastActiveDate === "string" &&
    isRecordOf(record.lessons, isLessonProgress) &&
    isRecordOf(record.challenges, isChallengeResult) &&
    Array.isArray(record.activeDates) &&
    record.activeDates.every((d) => typeof d === "string")
  );
}

/**
 * Parses a raw stored string into a {@link SavedState}, recovering to a clean
 * default for any missing, corrupt, or version-incompatible input (FR-025).
 *
 * Recovery from non-empty but unusable data is logged so it is observable and
 * never silently misleading.
 *
 * @param raw - The raw stored value, or null when nothing is stored.
 * @returns A valid current-version {@link SavedState}.
 */
export function parseSavedState(raw: string | null): SavedState {
  if (raw === null || raw.trim() === "") {
    return defaultState();
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.warn("StudyBub: stored progress was unreadable; starting fresh.");
    return defaultState();
  }

  if (isSavedState(parsed)) {
    return parsed;
  }

  // A known older version could be migrated here; there are none yet, so any
  // shape that fails validation recovers to a clean state.
  console.warn(
    "StudyBub: stored progress was invalid or from an incompatible version; starting fresh.",
  );
  return defaultState();
}
