import { describe, expect, it } from "vitest";

import { earnedBadgeIds } from "./badges";
import { defaultState, type SavedState } from "../persistence/schema";

import type { AppContent, Badge, Track } from "../content/types";

function track(id: Track["id"], lessonIds: string[]): Track {
  return {
    id,
    title: id,
    description: "d",
    lessons: lessonIds.map((lessonId, index) => ({
      id: lessonId,
      order: index + 1,
      title: lessonId,
      sourceRef: "X",
      learnCards: [
        { id: "c", heading: "k", body: [{ kind: "text", text: "x" }] },
      ],
      practice: [],
      mastery: [],
    })),
    challenge: {
      id: `${id}-boss`,
      title: "Boss",
      sourceRef: "P",
      questions: [],
      bonusXp: 100,
      passBadgeId: `boss-${id}`,
    },
  };
}

const badges: Badge[] = [
  {
    id: "first-steps",
    title: "F",
    description: "d",
    criterion: "first-lesson",
    icon: "🌱",
  },
  {
    id: "perfect",
    title: "P",
    description: "d",
    criterion: "perfect-mastery",
    icon: "💯",
  },
  {
    id: "streak5",
    title: "S",
    description: "d",
    criterion: "streak-5",
    icon: "🔥",
  },
  {
    id: "algebra-master",
    title: "A",
    description: "d",
    criterion: "track-complete:algebra",
    icon: "🧮",
  },
  {
    id: "boss-algebra",
    title: "B",
    description: "d",
    criterion: "boss-pass:algebra",
    icon: "🏆",
  },
  {
    id: "completionist",
    title: "C",
    description: "d",
    criterion: "all-tracks-complete",
    icon: "👑",
  },
];

const content: AppContent = {
  tracks: [track("algebra", ["a1", "a2"])],
  badges,
};

describe("earnedBadgeIds", () => {
  it("awards nothing for a fresh learner", () => {
    expect(earnedBadgeIds(content, defaultState())).toEqual([]);
  });

  it("awards first-steps once any lesson is complete", () => {
    const saved: SavedState = {
      ...defaultState(),
      lessons: { a1: { completed: true, bestAccuracy: 0.8 } },
    };
    expect(earnedBadgeIds(content, saved)).toContain("first-steps");
    expect(earnedBadgeIds(content, saved)).not.toContain("perfect");
  });

  it("awards perfect-mastery only at full accuracy", () => {
    const saved: SavedState = {
      ...defaultState(),
      lessons: { a1: { completed: true, bestAccuracy: 1 } },
    };
    expect(earnedBadgeIds(content, saved)).toContain("perfect");
  });

  it("awards the streak badge at the threshold", () => {
    const saved: SavedState = {
      ...defaultState(),
      streak: { count: 5, lastActiveDate: "2026-06-07" },
    };
    expect(earnedBadgeIds(content, saved)).toContain("streak5");
  });

  it("awards track-complete only when every lesson is done", () => {
    const partial: SavedState = {
      ...defaultState(),
      lessons: { a1: { completed: true, bestAccuracy: 1 } },
    };
    expect(earnedBadgeIds(content, partial)).not.toContain("algebra-master");
    const full: SavedState = {
      ...defaultState(),
      lessons: {
        a1: { completed: true, bestAccuracy: 1 },
        a2: { completed: true, bestAccuracy: 1 },
      },
    };
    expect(earnedBadgeIds(content, full)).toContain("algebra-master");
    // With all tracks complete, the completionist badge is also earned.
    expect(earnedBadgeIds(content, full)).toContain("completionist");
  });

  it("awards boss-pass when the challenge result is passed", () => {
    const saved: SavedState = {
      ...defaultState(),
      challenges: { "algebra-boss": { bestScore: 9, total: 10, passed: true } },
    };
    expect(earnedBadgeIds(content, saved)).toContain("boss-algebra");
  });
});
