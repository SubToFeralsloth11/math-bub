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

// --- Reference surface state (T006-T012) ---

describe("reference state - initialisation", () => {
  it("starts closed with a null current card id", () => {
    const state = initLessonFlow(lesson());
    expect(state.reference).toEqual({
      open: false,
      currentCardId: null,
      rememberedCardId: null,
      rememberedForId: null,
    });
  });
});

describe("reference state - OPEN_REFERENCE", () => {
  it("opens on the carried defaultCardId", () => {
    let state = initLessonFlow(lesson());
    state = lessonFlowReducer(state, {
      type: "OPEN_REFERENCE",
      defaultCardId: "c1",
      sourceId: "p1",
    });
    expect(state.reference.open).toBe(true);
    expect(state.reference.currentCardId).toBe("c1");
  });

  it("reopens on the remembered card when rememberedForId matches sourceId", () => {
    let state = initLessonFlow(lesson());
    state = lessonFlowReducer(state, {
      type: "OPEN_REFERENCE",
      defaultCardId: "c1",
      sourceId: "p1",
    });
    state = lessonFlowReducer(state, {
      type: "BROWSE_REFERENCE",
      cardId: "c2",
      sourceId: "p1",
    });
    state = lessonFlowReducer(state, { type: "CLOSE_REFERENCE" });
    state = lessonFlowReducer(state, {
      type: "OPEN_REFERENCE",
      defaultCardId: "c1",
      sourceId: "p1",
    });
    expect(state.reference.currentCardId).toBe("c2");
  });

  it("opens on defaultCardId when rememberedForId does not match sourceId", () => {
    let state = initLessonFlow(lesson());
    // Remember a position for p1.
    state = lessonFlowReducer(state, {
      type: "OPEN_REFERENCE",
      defaultCardId: "c1",
      sourceId: "p1",
    });
    state = lessonFlowReducer(state, {
      type: "BROWSE_REFERENCE",
      cardId: "c2",
      sourceId: "p1",
    });
    state = lessonFlowReducer(state, { type: "CLOSE_REFERENCE" });
    // Reopen from a different source.
    state = lessonFlowReducer(state, {
      type: "OPEN_REFERENCE",
      defaultCardId: "c1",
      sourceId: "p2",
    });
    expect(state.reference.currentCardId).toBe("c1");
  });
});

describe("reference state - BROWSE_REFERENCE", () => {
  it("updates currentCardId and records the remembered position keyed to sourceId", () => {
    let state = initLessonFlow(lesson());
    state = lessonFlowReducer(state, {
      type: "OPEN_REFERENCE",
      defaultCardId: "c1",
      sourceId: "p1",
    });
    state = lessonFlowReducer(state, {
      type: "BROWSE_REFERENCE",
      cardId: "c2",
      sourceId: "p1",
    });
    expect(state.reference.currentCardId).toBe("c2");
    expect(state.reference.rememberedCardId).toBe("c2");
    expect(state.reference.rememberedForId).toBe("p1");
  });
});

describe("reference state - CLOSE_REFERENCE", () => {
  it("closes the surface and preserves the remembered position", () => {
    let state = initLessonFlow(lesson());
    state = lessonFlowReducer(state, {
      type: "OPEN_REFERENCE",
      defaultCardId: "c1",
      sourceId: "p1",
    });
    state = lessonFlowReducer(state, {
      type: "BROWSE_REFERENCE",
      cardId: "c2",
      sourceId: "p1",
    });
    state = lessonFlowReducer(state, { type: "CLOSE_REFERENCE" });
    expect(state.reference.open).toBe(false);
    expect(state.reference.rememberedCardId).toBe("c2");
    expect(state.reference.rememberedForId).toBe("p1");
  });
});

describe("reference state - advancing clears the remembered position", () => {
  it("ADVANCE_LEARN clears rememberedCardId and rememberedForId", () => {
    let state = initLessonFlow(lesson());
    state = lessonFlowReducer(state, {
      type: "OPEN_REFERENCE",
      defaultCardId: "c1",
      sourceId: "c1",
    });
    state = lessonFlowReducer(state, {
      type: "BROWSE_REFERENCE",
      cardId: "c2",
      sourceId: "c1",
    });
    state = lessonFlowReducer(state, { type: "ADVANCE_LEARN" });
    expect(state.reference.rememberedCardId).toBeNull();
    expect(state.reference.rememberedForId).toBeNull();
  });

  it("NEXT clears rememberedCardId and rememberedForId", () => {
    let state: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "practice",
      reference: {
        open: false,
        currentCardId: null,
        rememberedCardId: "c2",
        rememberedForId: "p1",
      },
    };
    state = lessonFlowReducer(state, { type: "NEXT" });
    expect(state.reference.rememberedCardId).toBeNull();
    expect(state.reference.rememberedForId).toBeNull();
  });

  it("RETRY_MASTERY clears rememberedCardId and rememberedForId", () => {
    let state: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "outcome",
      outcome: "failed",
      reference: {
        open: false,
        currentCardId: null,
        rememberedCardId: "c2",
        rememberedForId: "m1",
      },
    };
    state = lessonFlowReducer(state, { type: "RETRY_MASTERY" });
    expect(state.reference.rememberedCardId).toBeNull();
    expect(state.reference.rememberedForId).toBeNull();
  });

  it("advancing only clears the remembered fields and nothing else", () => {
    let state: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "practice",
      index: 0,
      masteryCorrect: 0,
      xpEarned: 20,
      reference: {
        open: false,
        currentCardId: null,
        rememberedCardId: "c2",
        rememberedForId: "p1",
      },
    };
    state = lessonFlowReducer(state, { type: "NEXT" });
    expect(state.phase).toBe("practice");
    expect(state.index).toBe(1);
    expect(state.masteryCorrect).toBe(0);
    expect(state.xpEarned).toBe(20);
  });
});

describe("reference state - FR-007 identity invariant", () => {
  it("OPEN_REFERENCE does not alter phase, index, masteryCorrect, xpEarned, or outcome", () => {
    const before: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "practice",
      index: 1,
      masteryCorrect: 0,
      xpEarned: 30,
    };
    const after = lessonFlowReducer(before, {
      type: "OPEN_REFERENCE",
      defaultCardId: "c1",
      sourceId: "p1",
    });
    expect(after.phase).toBe(before.phase);
    expect(after.index).toBe(before.index);
    expect(after.masteryCorrect).toBe(before.masteryCorrect);
    expect(after.xpEarned).toBe(before.xpEarned);
    expect(after.outcome).toBe(before.outcome);
  });

  it("BROWSE_REFERENCE does not alter phase, index, masteryCorrect, xpEarned, or outcome", () => {
    const before: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "mastery",
      index: 0,
      masteryCorrect: 1,
      xpEarned: 40,
    };
    const after = lessonFlowReducer(before, {
      type: "BROWSE_REFERENCE",
      cardId: "c2",
      sourceId: "m1",
    });
    expect(after.phase).toBe(before.phase);
    expect(after.index).toBe(before.index);
    expect(after.masteryCorrect).toBe(before.masteryCorrect);
    expect(after.xpEarned).toBe(before.xpEarned);
    expect(after.outcome).toBe(before.outcome);
  });

  it("browsing a different card during the learn phase does not change phase or index", () => {
    let state = initLessonFlow(lesson());
    expect(state.phase).toBe("learn");
    expect(state.index).toBe(0);
    state = lessonFlowReducer(state, {
      type: "OPEN_REFERENCE",
      defaultCardId: "c1",
      sourceId: "c1",
    });
    state = lessonFlowReducer(state, {
      type: "BROWSE_REFERENCE",
      cardId: "c2",
      sourceId: "c1",
    });
    expect(state.phase).toBe("learn");
    expect(state.index).toBe(0);
  });

  it("CLOSE_REFERENCE does not alter phase, index, masteryCorrect, xpEarned, or outcome", () => {
    const before: LessonFlowState = {
      ...initLessonFlow(lesson()),
      phase: "practice",
      index: 1,
      masteryCorrect: 0,
      xpEarned: 30,
      reference: {
        open: true,
        currentCardId: "c1",
        rememberedCardId: "c1",
        rememberedForId: "p1",
      },
    };
    const after = lessonFlowReducer(before, { type: "CLOSE_REFERENCE" });
    expect(after.phase).toBe(before.phase);
    expect(after.index).toBe(before.index);
    expect(after.masteryCorrect).toBe(before.masteryCorrect);
    expect(after.xpEarned).toBe(before.xpEarned);
    expect(after.outcome).toBe(before.outcome);
  });
});
