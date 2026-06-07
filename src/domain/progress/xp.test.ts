import { describe, expect, it } from "vitest";

import {
  accuracy,
  addXp,
  isLevelUp,
  levelFor,
  levelProgress,
  xpForLevel,
} from "./xp";

describe("addXp", () => {
  it("adds a positive amount to the total", () => {
    expect(addXp(100, 25)).toBe(125);
  });

  it("treats adding zero as a no-op", () => {
    expect(addXp(40, 0)).toBe(40);
  });

  it("never returns a negative total", () => {
    expect(addXp(5, -100)).toBe(0);
  });
});

describe("accuracy", () => {
  it("computes a fraction of correct answers", () => {
    expect(accuracy(4, 5)).toBeCloseTo(0.8);
  });

  it("returns 1 for all correct", () => {
    expect(accuracy(5, 5)).toBe(1);
  });

  it("returns 0 when there are no questions", () => {
    expect(accuracy(0, 0)).toBe(0);
  });
});

describe("levelFor and xpForLevel", () => {
  it("starts everyone at level 1 with zero XP", () => {
    expect(levelFor(0)).toBe(1);
    expect(xpForLevel(1)).toBe(0);
  });

  it("uses monotonically increasing thresholds", () => {
    const thresholds = [1, 2, 3, 4, 5, 6].map((level) => xpForLevel(level));
    for (let i = 1; i < thresholds.length; i += 1) {
      expect(thresholds[i]).toBeGreaterThan(thresholds[i - 1]);
    }
  });

  it("derives the level at and just below each threshold boundary", () => {
    expect(levelFor(xpForLevel(2))).toBe(2);
    expect(levelFor(xpForLevel(2) - 1)).toBe(1);
    expect(levelFor(xpForLevel(5))).toBe(5);
    expect(levelFor(xpForLevel(5) - 1)).toBe(4);
  });
});

describe("isLevelUp", () => {
  it("detects crossing a level boundary on an award", () => {
    const boundary = xpForLevel(2);
    expect(isLevelUp(boundary - 10, boundary)).toBe(true);
  });

  it("returns false when staying within a level", () => {
    expect(isLevelUp(10, 20)).toBe(false);
  });
});

describe("levelProgress", () => {
  it("reports a fraction of 0 at the start of a level", () => {
    const progress = levelProgress(xpForLevel(3));
    expect(progress.level).toBe(3);
    expect(progress.intoLevel).toBe(0);
    expect(progress.fraction).toBe(0);
  });

  it("reports progress partway through a level", () => {
    const start = xpForLevel(2);
    const span = xpForLevel(3) - start;
    const progress = levelProgress(start + span / 2);
    expect(progress.fraction).toBeCloseTo(0.5);
    expect(progress.toNext).toBeCloseTo(span / 2);
  });
});
