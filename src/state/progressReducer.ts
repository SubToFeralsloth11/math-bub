/**
 * The MathBub progress reducer and its state shape.
 *
 * The reducer is a pure function over (state, action). It is created via a
 * factory closed over the authored content so that content-dependent rules
 * (unlocking, track-completion badges) can be evaluated without the reducer
 * performing any I/O. Action cases grow with the user-story phases.
 *
 * @module state/progressReducer
 */

import { defaultState, type SavedState } from "../domain/persistence/schema";
import { recordActiveDate } from "../domain/progress/activity";
import { earnedBadgeIds } from "../domain/progress/badges";
import { nextStreak } from "../domain/progress/streak";
import { addXp, isLevelUp, levelFor } from "../domain/progress/xp";

import type { AppContent, BadgeId } from "../domain/content/types";

/** Transient celebration signals produced by the last action, consumed by the UI. */
export interface Celebration {
  /** The level just reached, or null if no level-up occurred. */
  levelUpTo: number | null;
  /** Badge ids newly earned by the last action. */
  newBadges: BadgeId[];
}

/** The full progress state: persisted data plus transient celebration signals. */
export interface ProgressState {
  /** The portion persisted to localStorage. */
  saved: SavedState;
  /** Transient celebration signals (never persisted). */
  celebration: Celebration;
}

/** Actions the progress reducer understands. */
export type ProgressAction =
  | { type: "RESET" }
  | { type: "HYDRATE"; saved: SavedState }
  | { type: "DISMISS_CELEBRATION" }
  | { type: "ANSWER_CORRECT"; xp: number; today: string }
  | {
      type: "COMPLETE_LESSON";
      lessonId: string;
      accuracy: number;
      passThreshold: number;
      today: string;
    }
  | {
      type: "COMPLETE_CHALLENGE";
      challengeId: string;
      score: number;
      total: number;
      bonusXp: number;
      today: string;
    };

const NO_CELEBRATION: Celebration = { levelUpTo: null, newBadges: [] };

/**
 * Builds the initial reducer state from a persisted saved state.
 *
 * @param saved - The hydrated saved state (or a default).
 * @returns A fresh {@link ProgressState} with no pending celebration.
 */
export function initProgressState(saved: SavedState): ProgressState {
  return { saved, celebration: { ...NO_CELEBRATION } };
}

/**
 * Awards any newly-satisfied badges (at most once each), recording them in the
 * saved state and surfacing them as a celebration.
 *
 * @param content - The authored content.
 * @param state - The state after the triggering change.
 * @returns The state with newly-earned badges added, or the same state if none.
 */
function awardBadges(content: AppContent, state: ProgressState): ProgressState {
  const earned = earnedBadgeIds(content, state.saved);
  const already = new Set(state.saved.badges);
  const newly = earned.filter((id) => !already.has(id));
  if (newly.length === 0) return state;
  return {
    saved: { ...state.saved, badges: [...state.saved.badges, ...newly] },
    celebration: {
      ...state.celebration,
      newBadges: [...state.celebration.newBadges, ...newly],
    },
  };
}

/**
 * Creates the progress reducer, closed over the authored content.
 *
 * @param content - The authored content used by content-dependent rules.
 * @returns A pure reducer function `(state, action) => state`.
 */
/**
 * Applies the daily progress side effects (streak and active-date recording)
 * to a saved state, returning the updated saved state.
 *
 * @param saved - The current saved state.
 * @param today - The local date of the activity (`YYYY-MM-DD`).
 * @returns The saved state with updated streak and active dates.
 */
function applyDailyProgress(saved: SavedState, today: string): SavedState {
  return {
    ...saved,
    streak: nextStreak(saved.streak, today),
    activeDates: recordActiveDate(saved.activeDates, today),
  };
}

/**
 * Creates the progress reducer, closed over the authored content.
 *
 * @param content - The authored content used by content-dependent rules.
 * @returns A pure reducer function `(state, action) => state`.
 */
export function createProgressReducer(content: AppContent) {
  /**
   * The progress reducer.
   *
   * @param state - The current progress state.
   * @param action - The action to apply.
   * @returns The next progress state.
   */
  return function progressReducer(
    state: ProgressState,
    action: ProgressAction,
  ): ProgressState {
    switch (action.type) {
      case "RESET": {
        return initProgressState(defaultState());
      }

      case "HYDRATE": {
        return initProgressState(action.saved);
      }

      case "DISMISS_CELEBRATION": {
        return { ...state, celebration: { ...NO_CELEBRATION } };
      }

      case "ANSWER_CORRECT": {
        const xp = addXp(state.saved.xp, action.xp);
        const leveledUp = isLevelUp(state.saved.xp, xp);
        const next: ProgressState = {
          saved: {
            ...applyDailyProgress(state.saved, action.today),
            xp,
          },
          celebration: leveledUp
            ? { ...state.celebration, levelUpTo: levelFor(xp) }
            : state.celebration,
        };
        // Streak milestones can earn a badge on a correct answer.
        return awardBadges(content, next);
      }

      case "COMPLETE_LESSON": {
        const previous = state.saved.lessons[action.lessonId] ?? {
          completed: false,
          bestAccuracy: 0,
        };
        const completed =
          previous.completed || action.accuracy >= action.passThreshold;
        const bestAccuracy = Math.max(previous.bestAccuracy, action.accuracy);
        const next: ProgressState = {
          ...state,
          saved: {
            ...applyDailyProgress(state.saved, action.today),
            lessons: {
              ...state.saved.lessons,
              [action.lessonId]: { completed, bestAccuracy },
            },
          },
        };
        return awardBadges(content, next);
      }

      case "COMPLETE_CHALLENGE": {
        const previous = state.saved.challenges[action.challengeId];
        const alreadyPassed = previous?.passed === true;
        // Bonus XP is granted only on the first completion to prevent farming.
        const xp = alreadyPassed
          ? state.saved.xp
          : addXp(state.saved.xp, action.bonusXp);
        const leveledUp = isLevelUp(state.saved.xp, xp);
        const next: ProgressState = {
          saved: {
            ...applyDailyProgress(state.saved, action.today),
            xp,
            challenges: {
              ...state.saved.challenges,
              [action.challengeId]: {
                bestScore: Math.max(previous?.bestScore ?? 0, action.score),
                total: action.total,
                passed: true,
              },
            },
          },
          celebration: leveledUp
            ? { ...state.celebration, levelUpTo: levelFor(xp) }
            : state.celebration,
        };
        return awardBadges(content, next);
      }

      default: {
        return state;
      }
    }
  };
}
