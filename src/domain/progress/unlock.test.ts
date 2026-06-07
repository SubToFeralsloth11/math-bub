import { describe, expect, it } from "vitest";

import { isBossUnlocked, lessonState, trackProgress } from "./unlock";
import { defaultState, type SavedState } from "../persistence/schema";

import type { Lesson, Track } from "../content/types";

function lesson(order: number): Lesson {
  return {
    id: `l${order}`,
    order,
    title: `Lesson ${order}`,
    sourceRef: "X",
    learnCards: [
      { id: "c", heading: "k", body: [{ kind: "text", text: "x" }] },
    ],
    practice: [],
    mastery: [],
  };
}

const track: Track = {
  id: "algebra",
  title: "Algebra",
  description: "d",
  lessons: [lesson(1), lesson(2), lesson(3)],
  challenge: {
    id: "algebra-boss",
    title: "Boss",
    sourceRef: "P",
    questions: [],
    bonusXp: 100,
    passBadgeId: "boss-algebra",
  },
};

function withCompleted(...ids: string[]): SavedState {
  const saved = defaultState();
  for (const id of ids)
    saved.lessons[id] = { completed: true, bestAccuracy: 1 };
  return saved;
}

describe("lessonState", () => {
  it("makes only the first lesson available in a fresh track", () => {
    const saved = defaultState();
    expect(lessonState(track, track.lessons[0], saved)).toBe("available");
    expect(lessonState(track, track.lessons[1], saved)).toBe("locked");
    expect(lessonState(track, track.lessons[2], saved)).toBe("locked");
  });

  it("marks a completed lesson complete", () => {
    const saved = withCompleted("l1");
    expect(lessonState(track, track.lessons[0], saved)).toBe("complete");
  });

  it("unlocks the next lesson once the prior one is complete", () => {
    const saved = withCompleted("l1");
    expect(lessonState(track, track.lessons[1], saved)).toBe("available");
    // Lesson 3 stays locked until lesson 2 is complete.
    expect(lessonState(track, track.lessons[2], saved)).toBe("locked");
  });
});

describe("isBossUnlocked", () => {
  it("is locked until every lesson is complete", () => {
    expect(isBossUnlocked(track, withCompleted("l1", "l2"))).toBe(false);
  });

  it("unlocks when all lessons are complete", () => {
    expect(isBossUnlocked(track, withCompleted("l1", "l2", "l3"))).toBe(true);
  });
});

describe("trackProgress", () => {
  it("counts completed lessons out of the total", () => {
    expect(trackProgress(track, withCompleted("l1", "l2"))).toEqual({
      completed: 2,
      total: 3,
    });
  });
});
