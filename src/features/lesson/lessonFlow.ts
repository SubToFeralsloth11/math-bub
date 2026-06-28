/**
 * The pure lesson-flow state machine.
 *
 * A lesson moves through learn cards, a practice set, and a mastery check, then
 * resolves to a pass or fail outcome. Keeping this logic as a pure reducer (with
 * no React) makes the progression rules straightforward to unit test; the
 * LessonScreen component is a thin wrapper around it.
 *
 * @module features/lesson/lessonFlow
 */

import { accuracy } from "../../domain/progress/xp";

import type { Lesson } from "../../domain/content/types";

/** The default mastery pass threshold when a lesson does not set one. */
export const DEFAULT_PASS_THRESHOLD = 0.8;

/** The phase of a lesson the learner is currently in. */
export type LessonPhase = "learn" | "practice" | "mastery" | "outcome";

/** The resolved outcome of the mastery check. */
export type LessonOutcome = "passed" | "failed" | null;

/**
 * The transient reference-surface sub-state. Not persisted; reset on every
 * {@link initLessonFlow} and lesson remount.
 */
export interface ReferenceState {
  /** Whether the Reference surface is currently open. */
  open: boolean;
  /** The learn-card id currently shown in the surface. */
  currentCardId: string | null;
  /** The last card browsed in the current open context, if any. */
  rememberedCardId: string | null;
  /**
   * The question or learn-card id the remembered position applies to.
   * Cleared on advancing so the next open is question/study-driven.
   */
  rememberedForId: string | null;
}

/** The initial (closed) reference sub-state. */
export const initialReferenceState: ReferenceState = {
  open: false,
  currentCardId: null,
  rememberedCardId: null,
  rememberedForId: null,
};

/** The lesson-flow state. */
export interface LessonFlowState {
  /** Number of learn cards. */
  learnTotal: number;
  /** Number of practice questions. */
  practiceTotal: number;
  /** Number of mastery questions. */
  masteryTotal: number;
  /** Mastery pass threshold (0..1). */
  passThreshold: number;
  /** Current phase. */
  phase: LessonPhase;
  /** Zero-based index within the current phase's items. */
  index: number;
  /** Correct answers given in the mastery check so far. */
  masteryCorrect: number;
  /** XP earned across the whole lesson so far. */
  xpEarned: number;
  /** The mastery outcome once the lesson resolves. */
  outcome: LessonOutcome;
  /** The reference-surface sub-state. */
  reference: ReferenceState;
}

/** Actions driving the lesson flow. */
export type LessonFlowAction =
  | { type: "ADVANCE_LEARN" }
  | { type: "SUBMIT"; correct: boolean; xp: number }
  | { type: "NEXT" }
  | { type: "RETRY_MASTERY" }
  | { type: "OPEN_REFERENCE"; defaultCardId: string; sourceId: string }
  | { type: "BROWSE_REFERENCE"; cardId: string; sourceId: string }
  | { type: "CLOSE_REFERENCE" };

/**
 * Builds the initial flow state for a lesson.
 *
 * @param lesson - The lesson to play.
 * @returns The initial {@link LessonFlowState}.
 */
export function initLessonFlow(lesson: Lesson): LessonFlowState {
  const learnTotal = lesson.learnCards.length;
  return {
    learnTotal,
    practiceTotal: lesson.practice.length,
    masteryTotal: lesson.mastery.length,
    passThreshold: lesson.passThreshold ?? DEFAULT_PASS_THRESHOLD,
    phase: learnTotal > 0 ? "learn" : "practice",
    index: 0,
    masteryCorrect: 0,
    xpEarned: 0,
    outcome: null,
    reference: { ...initialReferenceState },
  };
}

/**
 * Computes the mastery accuracy of the resolved lesson.
 *
 * @param state - The flow state.
 * @returns The mastery accuracy as a fraction 0..1.
 */
export function masteryAccuracy(state: LessonFlowState): number {
  return accuracy(state.masteryCorrect, state.masteryTotal);
}

/**
 * Advances the lesson flow in response to an action.
 *
 * @param state - The current flow state.
 * @param action - The action to apply.
 * @returns The next flow state.
 */
export function lessonFlowReducer(
  state: LessonFlowState,
  action: LessonFlowAction,
): LessonFlowState {
  switch (action.type) {
    case "ADVANCE_LEARN": {
      const reference = {
        ...state.reference,
        rememberedCardId: null,
        rememberedForId: null,
      };
      if (state.index + 1 < state.learnTotal) {
        return { ...state, index: state.index + 1, reference };
      }
      return { ...state, phase: "practice", index: 0, reference };
    }

    case "SUBMIT": {
      const xpEarned = state.xpEarned + (action.correct ? action.xp : 0);
      const masteryCorrect =
        state.phase === "mastery" && action.correct
          ? state.masteryCorrect + 1
          : state.masteryCorrect;
      return { ...state, xpEarned, masteryCorrect };
    }

    case "NEXT": {
      const reference = {
        ...state.reference,
        rememberedCardId: null,
        rememberedForId: null,
      };
      if (state.phase === "practice") {
        if (state.index + 1 < state.practiceTotal) {
          return { ...state, index: state.index + 1, reference };
        }
        return { ...state, phase: "mastery", index: 0, reference };
      }
      if (state.phase === "mastery") {
        if (state.index + 1 < state.masteryTotal) {
          return { ...state, index: state.index + 1, reference };
        }
        const passed =
          accuracy(state.masteryCorrect, state.masteryTotal) >=
          state.passThreshold;
        return {
          ...state,
          phase: "outcome",
          outcome: passed ? "passed" : "failed",
          reference,
        };
      }
      return state;
    }

    case "RETRY_MASTERY": {
      return {
        ...state,
        phase: "mastery",
        index: 0,
        masteryCorrect: 0,
        outcome: null,
        reference: {
          ...state.reference,
          rememberedCardId: null,
          rememberedForId: null,
        },
      };
    }

    case "OPEN_REFERENCE": {
      const remembered =
        state.reference.rememberedForId === action.sourceId &&
        state.reference.rememberedCardId !== null
          ? state.reference.rememberedCardId
          : action.defaultCardId;
      return {
        ...state,
        reference: {
          ...state.reference,
          open: true,
          currentCardId: remembered,
        },
      };
    }

    case "BROWSE_REFERENCE": {
      return {
        ...state,
        reference: {
          ...state.reference,
          currentCardId: action.cardId,
          rememberedCardId: action.cardId,
          rememberedForId: action.sourceId,
        },
      };
    }

    case "CLOSE_REFERENCE": {
      return {
        ...state,
        reference: { ...state.reference, open: false },
      };
    }

    default: {
      return state;
    }
  }
}
