import { describe, expect, it } from "vitest";

import { createProgressReducer, initProgressState } from "./progressReducer";
import { defaultState, type SavedState } from "../domain/persistence/schema";

import type { AppContent } from "../domain/content/types";

// A minimal content set is enough for the reducer's initialisation behaviour.
const emptyContent: AppContent = { tracks: [], badges: [] };
const reducer = createProgressReducer(emptyContent);

// Content with a first-lesson badge, for exercising badge awarding.
const badgedContent: AppContent = {
  tracks: [],
  badges: [
    {
      id: "first-steps",
      title: "First steps",
      description: "Complete your first lesson",
      criterion: "first-lesson",
      icon: "🌱",
    },
  ],
};
const badgedReducer = createProgressReducer(badgedContent);

describe("initProgressState", () => {
  it("derives initial state from a saved state with no pending celebration", () => {
    const saved: SavedState = {
      ...defaultState(),
      xp: 120,
      badges: ["first-lesson"],
    };
    const state = initProgressState(saved);
    expect(state.saved).toEqual(saved);
    expect(state.celebration).toEqual({ levelUpTo: null, newBadges: [] });
  });
});

describe("progress reducer - foundational actions", () => {
  it("RESET returns a clean default state", () => {
    const dirty = initProgressState({ ...defaultState(), xp: 500 });
    const next = reducer(dirty, { type: "RESET" });
    expect(next.saved).toEqual(defaultState());
  });

  it("DISMISS_CELEBRATION clears any pending celebration", () => {
    const withCelebration = {
      saved: defaultState(),
      celebration: { levelUpTo: 3, newBadges: ["first-lesson"] },
    };
    const next = reducer(withCelebration, { type: "DISMISS_CELEBRATION" });
    expect(next.celebration).toEqual({ levelUpTo: null, newBadges: [] });
  });
});

describe("progress reducer - US1 XP accumulation", () => {
  it("ANSWER_CORRECT adds the awarded XP to the total", () => {
    const state = initProgressState({ ...defaultState(), xp: 30 });
    const next = reducer(state, {
      type: "ANSWER_CORRECT",
      xp: 10,
      today: "2026-06-07",
    });
    expect(next.saved.xp).toBe(40);
  });

  it("does not mutate the previous state", () => {
    const state = initProgressState({ ...defaultState(), xp: 30 });
    reducer(state, { type: "ANSWER_CORRECT", xp: 10, today: "2026-06-07" });
    expect(state.saved.xp).toBe(30);
  });
});

describe("progress reducer - US4 streak and level-up", () => {
  it("starts the streak on first correct activity", () => {
    const state = initProgressState(defaultState());
    const next = reducer(state, {
      type: "ANSWER_CORRECT",
      xp: 10,
      today: "2026-06-07",
    });
    expect(next.saved.streak).toEqual({
      count: 1,
      lastActiveDate: "2026-06-07",
    });
  });

  it("emits a level-up celebration when XP crosses a level boundary", () => {
    // 40 XP is level 1; +20 reaches 60, which is past the level-2 threshold (50).
    const state = initProgressState({ ...defaultState(), xp: 40 });
    const next = reducer(state, {
      type: "ANSWER_CORRECT",
      xp: 20,
      today: "2026-06-07",
    });
    expect(next.celebration.levelUpTo).toBe(2);
  });

  it("does not emit a level-up when staying within a level", () => {
    const state = initProgressState({ ...defaultState(), xp: 10 });
    const next = reducer(state, {
      type: "ANSWER_CORRECT",
      xp: 10,
      today: "2026-06-07",
    });
    expect(next.celebration.levelUpTo).toBeNull();
  });

  it("advances the streak on lesson completion activity", () => {
    const state = initProgressState({
      ...defaultState(),
      streak: { count: 2, lastActiveDate: "2026-06-07" },
    });
    const next = reducer(state, {
      type: "COMPLETE_LESSON",
      lessonId: "alg-5g",
      accuracy: 1,
      passThreshold: 0.8,
      today: "2026-06-08",
    });
    expect(next.saved.streak.count).toBe(3);
  });
});

describe("progress reducer - US1 completion gating", () => {
  it("COMPLETE_LESSON marks complete when accuracy meets the threshold", () => {
    const state = initProgressState(defaultState());
    const next = reducer(state, {
      type: "COMPLETE_LESSON",
      lessonId: "alg-5g",
      accuracy: 0.8,
      passThreshold: 0.8,
      today: "2026-06-07",
    });
    expect(next.saved.lessons["alg-5g"]).toEqual({
      completed: true,
      bestAccuracy: 0.8,
    });
  });

  it("does not mark complete when accuracy is below the threshold", () => {
    const state = initProgressState(defaultState());
    const next = reducer(state, {
      type: "COMPLETE_LESSON",
      lessonId: "alg-5g",
      accuracy: 0.6,
      passThreshold: 0.8,
      today: "2026-06-07",
    });
    expect(next.saved.lessons["alg-5g"].completed).toBe(false);
    // A failed attempt still records best accuracy for stats.
    expect(next.saved.lessons["alg-5g"].bestAccuracy).toBe(0.6);
  });

  it("keeps a lesson complete and records the best accuracy across attempts", () => {
    const state = initProgressState({
      ...defaultState(),
      lessons: { "alg-5g": { completed: true, bestAccuracy: 0.8 } },
    });
    const next = reducer(state, {
      type: "COMPLETE_LESSON",
      lessonId: "alg-5g",
      accuracy: 1,
      passThreshold: 0.8,
      today: "2026-06-08",
    });
    expect(next.saved.lessons["alg-5g"]).toEqual({
      completed: true,
      bestAccuracy: 1,
    });
  });

  it("does not regress a completed lesson when a later attempt fails", () => {
    const state = initProgressState({
      ...defaultState(),
      lessons: { "alg-5g": { completed: true, bestAccuracy: 1 } },
    });
    const next = reducer(state, {
      type: "COMPLETE_LESSON",
      lessonId: "alg-5g",
      accuracy: 0.4,
      passThreshold: 0.8,
      today: "2026-06-09",
    });
    expect(next.saved.lessons["alg-5g"].completed).toBe(true);
    expect(next.saved.lessons["alg-5g"].bestAccuracy).toBe(1);
  });
});

describe("progress reducer - US5 badge awarding", () => {
  it("awards a newly-earned badge once and surfaces it as a celebration", () => {
    const state = initProgressState(defaultState());
    const next = badgedReducer(state, {
      type: "COMPLETE_LESSON",
      lessonId: "alg-5g",
      accuracy: 1,
      passThreshold: 0.8,
      today: "2026-06-07",
    });
    expect(next.saved.badges).toContain("first-steps");
    expect(next.celebration.newBadges).toContain("first-steps");
  });

  it("does not award the same badge twice", () => {
    const state = initProgressState({
      ...defaultState(),
      badges: ["first-steps"],
      lessons: { "alg-5g": { completed: true, bestAccuracy: 1 } },
    });
    const next = badgedReducer(state, {
      type: "COMPLETE_LESSON",
      lessonId: "alg-5h",
      accuracy: 1,
      passThreshold: 0.8,
      today: "2026-06-08",
    });
    // Still exactly one occurrence; no duplicate and no new celebration.
    expect(next.saved.badges.filter((id) => id === "first-steps")).toHaveLength(
      1,
    );
    expect(next.celebration.newBadges).not.toContain("first-steps");
  });
});

describe("progress reducer - US6 boss challenge", () => {
  it("records a challenge result and awards bonus XP on first completion", () => {
    const state = initProgressState({ ...defaultState(), xp: 100 });
    const next = reducer(state, {
      type: "COMPLETE_CHALLENGE",
      challengeId: "algebra-boss",
      score: 8,
      total: 10,
      bonusXp: 120,
      today: "2026-06-07",
    });
    expect(next.saved.xp).toBe(220);
    expect(next.saved.challenges["algebra-boss"]).toEqual({
      bestScore: 8,
      total: 10,
      passed: true,
    });
  });

  it("does not re-award bonus XP on a repeat completion but keeps the best score", () => {
    const state = initProgressState({
      ...defaultState(),
      xp: 220,
      challenges: {
        "algebra-boss": { bestScore: 8, total: 10, passed: true },
      },
    });
    const next = reducer(state, {
      type: "COMPLETE_CHALLENGE",
      challengeId: "algebra-boss",
      score: 10,
      total: 10,
      bonusXp: 120,
      today: "2026-06-08",
    });
    expect(next.saved.xp).toBe(220);
    expect(next.saved.challenges["algebra-boss"].bestScore).toBe(10);
  });

  it("awards the boss badge via its criterion on completion", () => {
    // A reducer over content with an algebra track and a boss-pass badge.
    const badged = createProgressReducer({
      tracks: [
        {
          id: "algebra",
          title: "Algebra",
          description: "d",
          lessons: [],
          challenge: {
            id: "algebra-boss",
            title: "Boss",
            sourceRef: "P",
            questions: [],
            bonusXp: 120,
            passBadgeId: "boss-algebra",
          },
        },
      ],
      badges: [
        {
          id: "boss-algebra",
          title: "Boss slayer",
          description: "Pass the Algebra boss",
          criterion: "boss-pass:algebra",
          icon: "🏆",
        },
      ],
    });
    const next = badged(initProgressState(defaultState()), {
      type: "COMPLETE_CHALLENGE",
      challengeId: "algebra-boss",
      score: 7,
      total: 8,
      bonusXp: 120,
      today: "2026-06-07",
    });
    expect(next.saved.badges).toContain("boss-algebra");
    expect(next.celebration.newBadges).toContain("boss-algebra");
  });
});
