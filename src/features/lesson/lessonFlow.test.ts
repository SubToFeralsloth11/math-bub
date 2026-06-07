import { describe, expect, it } from "vitest";

import {
  initLessonFlow,
  lessonFlowReducer,
  masteryAccuracy,
  type LessonFlowState,
} from "./lessonFlow";

import type { Lesson, McqQuestion } from "../../domain/content/types";

function q(id: string): McqQuestion {
  return {
    id,
    type: "mcq",
    prompt: [{ kind: "text", text: "?" }],
    explanation: [{ kind: "text", text: "e" }],
    xp: 10,
    options: [
      { id: "a", label: [{ kind: "text", text: "A" }] },
      { id: "b", label: [{ kind: "text", text: "B" }] },
    ],
    correctOptionId: "a",
  };
}

function lesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    id: "l1",
    order: 1,
    title: "Lesson",
    sourceRef: "X",
    learnCards: [
      { id: "c1", heading: "A", body: [{ kind: "text", text: "x" }] },
      { id: "c2", heading: "B", body: [{ kind: "text", text: "y" }] },
    ],
    practice: [q("p1"), q("p2")],
    mastery: [q("m1"), q("m2")],
    ...overrides,
  };
}

describe("initLessonFlow", () => {
  it("starts in the learn phase when there are learn cards", () => {
    const state = initLessonFlow(lesson());
    expect(state.phase).toBe("learn");
    expect(state.index).toBe(0);
    expect(state.passThreshold).toBe(0.8);
  });

  it("uses a lesson's custom pass threshold", () => {
    expect(initLessonFlow(lesson({ passThreshold: 0.5 })).passThreshold).toBe(
      0.5,
    );
  });
});

describe("lesson flow - learn phase precedes practice", () => {
  it("advances through learn cards then into practice", () => {
    let state = initLessonFlow(lesson());
    state = lessonFlowReducer(state, { type: "ADVANCE_LEARN" });
    expect(state.phase).toBe("learn");
    expect(state.index).toBe(1);
    state = lessonFlowReducer(state, { type: "ADVANCE_LEARN" });
    expect(state.phase).toBe("practice");
    expect(state.index).toBe(0);
  });
});

describe("lesson flow - XP and scoring", () => {
  it("accumulates XP only for correct answers", () => {
    let state: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "practice",
    };
    state = lessonFlowReducer(state, { type: "SUBMIT", correct: true, xp: 10 });
    state = lessonFlowReducer(state, {
      type: "SUBMIT",
      correct: false,
      xp: 10,
    });
    expect(state.xpEarned).toBe(10);
  });

  it("counts mastery-correct answers only during the mastery phase", () => {
    let state: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "practice",
    };
    state = lessonFlowReducer(state, { type: "SUBMIT", correct: true, xp: 10 });
    expect(state.masteryCorrect).toBe(0);
    state = { ...state, phase: "mastery" };
    state = lessonFlowReducer(state, { type: "SUBMIT", correct: true, xp: 10 });
    expect(state.masteryCorrect).toBe(1);
  });
});

describe("lesson flow - mastery outcome", () => {
  it("passes when mastery accuracy meets the threshold", () => {
    let state: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "mastery",
      index: 0,
    };
    // Answer both mastery questions correctly.
    state = lessonFlowReducer(state, { type: "SUBMIT", correct: true, xp: 10 });
    state = lessonFlowReducer(state, { type: "NEXT" });
    state = lessonFlowReducer(state, { type: "SUBMIT", correct: true, xp: 10 });
    state = lessonFlowReducer(state, { type: "NEXT" });
    expect(state.phase).toBe("outcome");
    expect(state.outcome).toBe("passed");
    expect(masteryAccuracy(state)).toBe(1);
  });

  it("fails when mastery accuracy is below the threshold", () => {
    let state: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "mastery",
      index: 0,
    };
    state = lessonFlowReducer(state, {
      type: "SUBMIT",
      correct: false,
      xp: 10,
    });
    state = lessonFlowReducer(state, { type: "NEXT" });
    state = lessonFlowReducer(state, {
      type: "SUBMIT",
      correct: false,
      xp: 10,
    });
    state = lessonFlowReducer(state, { type: "NEXT" });
    expect(state.outcome).toBe("failed");
  });

  it("retrying the mastery check resets its score and outcome", () => {
    let state: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "outcome",
      outcome: "failed",
      masteryCorrect: 0,
    };
    state = lessonFlowReducer(state, { type: "RETRY_MASTERY" });
    expect(state.phase).toBe("mastery");
    expect(state.index).toBe(0);
    expect(state.masteryCorrect).toBe(0);
    expect(state.outcome).toBeNull();
  });
});
