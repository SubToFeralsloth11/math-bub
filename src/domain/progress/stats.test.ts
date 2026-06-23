/**
 * Unit tests for domain/progress/stats.ts.
 *
 * Tests cover edge cases and normal operation for:
 * - computeLongestStreak
 * - computeFirstLogin
 * - findLevelMessage
 * - computeTotalLessonsCompleted
 * - computeBadgeProgress
 */

import { describe, expect, it } from "vitest";

import { localDateIso } from "./dates";
import {
  computeLongestStreak,
  computeFirstLogin,
  findLevelMessage,
  computeTotalLessonsCompleted,
  computeBadgeProgress,
  levelMessages,
} from "./stats";

describe("levelMessages", () => {
  it("should have 7 level message ranges", () => {
    expect(levelMessages.length).toBe(7);
  });

  it("should have correct level ranges", () => {
    expect(levelMessages[0]).toEqual({
      from: 1,
      to: 4,
      message: "Just starting your journey",
    });
    expect(levelMessages[1]).toEqual({
      from: 5,
      to: 9,
      message: "You're on fire! 🔥",
    });
    expect(levelMessages[2]).toEqual({
      from: 10,
      to: 14,
      message: "Halfway to mastery!",
    });
    expect(levelMessages[3]).toEqual({
      from: 15,
      to: 19,
      message: "Getting there...",
    });
    expect(levelMessages[4]).toEqual({
      from: 20,
      to: 24,
      message: "Almost a master!",
    });
    expect(levelMessages[5]).toEqual({
      from: 25,
      to: 29,
      message: "Expert in training",
    });
    expect(levelMessages[6]).toEqual({
      from: 30,
      to: Infinity,
      message: "LEGENDARY! 🏆",
    });
  });
});

describe("computeLongestStreak", () => {
  it("should return 0 for empty array", () => {
    expect(computeLongestStreak([])).toBe(0);
  });

  it("should return 1 for single date", () => {
    expect(computeLongestStreak(["2024-06-10"])).toBe(1);
  });

  it("should return 2 for two consecutive dates", () => {
    expect(computeLongestStreak(["2024-06-10", "2024-06-11"])).toBe(2);
  });

  it("should reset streak correctly on gap", () => {
    expect(
      computeLongestStreak([
        "2024-06-10",
        "2024-06-11",
        "2024-06-13",
        "2024-06-14",
      ]),
    ).toBe(2);
  });

  it("should return max run with multiple gaps", () => {
    expect(
      computeLongestStreak([
        "2024-06-10",
        "2024-06-11",
        "2024-06-12",
        "2024-06-15",
        "2024-06-16",
      ]),
    ).toBe(3);
  });

  it("should handle all consecutive dates", () => {
    expect(
      computeLongestStreak([
        "2024-06-01",
        "2024-06-02",
        "2024-06-03",
        "2024-06-04",
        "2024-06-05",
      ]),
    ).toBe(5);
  });

  it("should handle dates spanning new year", () => {
    expect(
      computeLongestStreak([
        "2023-12-30",
        "2023-12-31",
        "2024-01-01",
        "2024-01-02",
      ]),
    ).toBe(4);
  });

  it("should handle large array efficiently", () => {
    const dates: string[] = [];
    // 90 consecutive days starting 2024-01-01
    for (let i = 0; i < 90; i++) {
      const date = new Date(2024, 0, i + 1);
      dates.push(date.toISOString().split("T")[0]);
    }
    expect(computeLongestStreak(dates)).toBe(90);
  });
});

describe("computeFirstLogin", () => {
  const today = localDateIso();

  it("should return today's date for empty array", () => {
    expect(computeFirstLogin([])).toBe(today);
  });

  it("should return earliest date for multiple dates", () => {
    expect(computeFirstLogin(["2024-06-10", "2024-06-12", "2024-06-15"])).toBe(
      "2024-06-10",
    );
  });

  it("should return single date for single entry", () => {
    expect(computeFirstLogin(["2024-06-15"])).toBe("2024-06-15");
  });

  it("should return first date from sorted array", () => {
    expect(computeFirstLogin(["2024-06-01", "2024-06-15", "2024-06-03"])).toBe(
      "2024-06-01",
    );
  });
});

describe("findLevelMessage", () => {
  it("should return Level 1-4 message for level 3", () => {
    const result = findLevelMessage(3);
    expect(result.from).toBe(1);
    expect(result.to).toBe(4);
    expect(result.message).toBe("Just starting your journey");
  });

  it("should return Level 5-9 message for level 7", () => {
    const result = findLevelMessage(7);
    expect(result.from).toBe(5);
    expect(result.to).toBe(9);
    expect(result.message).toBe("You're on fire! 🔥");
  });

  it("should return Level 10-14 message for level 12", () => {
    const result = findLevelMessage(12);
    expect(result.from).toBe(10);
    expect(result.to).toBe(14);
    expect(result.message).toBe("Halfway to mastery!");
  });

  it("should return Level 15-19 message for level 17", () => {
    const result = findLevelMessage(17);
    expect(result.from).toBe(15);
    expect(result.to).toBe(19);
    expect(result.message).toBe("Getting there...");
  });

  it("should return Level 20-24 message for level 22", () => {
    const result = findLevelMessage(22);
    expect(result.from).toBe(20);
    expect(result.to).toBe(24);
    expect(result.message).toBe("Almost a master!");
  });

  it("should return Level 25-29 message for level 27", () => {
    const result = findLevelMessage(27);
    expect(result.from).toBe(25);
    expect(result.to).toBe(29);
    expect(result.message).toBe("Expert in training");
  });

  it("should return LEGENDARY message for level 35", () => {
    const result = findLevelMessage(35);
    expect(result.from).toBe(30);
    expect(result.to).toBe(Infinity);
    expect(result.message).toBe("LEGENDARY! 🏆");
  });

  it("should return LEGENDARY message for level 100", () => {
    const result = findLevelMessage(100);
    expect(result.from).toBe(30);
    expect(result.to).toBe(Infinity);
    expect(result.message).toBe("LEGENDARY! 🏆");
  });

  it("should handle level 1 (boundary)", () => {
    const result = findLevelMessage(1);
    expect(result.from).toBe(1);
    expect(result.to).toBe(4);
    expect(result.message).toBe("Just starting your journey");
  });

  it("should handle level 30 (boundary)", () => {
    const result = findLevelMessage(30);
    expect(result.from).toBe(30);
    expect(result.to).toBe(Infinity);
    expect(result.message).toBe("LEGENDARY! 🏆");
  });
});

describe("computeTotalLessonsCompleted", () => {
  it("should return 0 for empty lessons", () => {
    expect(computeTotalLessonsCompleted({})).toBe(0);
  });

  it("should return count for all completed", () => {
    const lessons = {
      "lesson-1": { completed: true },
      "lesson-2": { completed: true },
      "lesson-3": { completed: true },
    };
    expect(computeTotalLessonsCompleted(lessons)).toBe(3);
  });

  it("should count correctly for mixed completion", () => {
    const lessons = {
      "lesson-1": { completed: true },
      "lesson-2": { completed: false },
      "lesson-3": { completed: true },
      "lesson-4": { completed: false },
    };
    expect(computeTotalLessonsCompleted(lessons)).toBe(2);
  });

  it("should return 0 for all incomplete", () => {
    const lessons = {
      "lesson-1": { completed: false },
      "lesson-2": { completed: false },
    };
    expect(computeTotalLessonsCompleted(lessons)).toBe(0);
  });
});

describe("computeBadgeProgress", () => {
  it("should return 0% for 0/30", () => {
    const result = computeBadgeProgress(0, 30);
    expect(result.earned).toBe(0);
    expect(result.total).toBe(30);
    expect(result.percentage).toBe(0);
  });

  it("should return 50% for 15/30", () => {
    const result = computeBadgeProgress(15, 30);
    expect(result.earned).toBe(15);
    expect(result.total).toBe(30);
    expect(result.percentage).toBe(50);
  });

  it("should return 100% for 30/30", () => {
    const result = computeBadgeProgress(30, 30);
    expect(result.earned).toBe(30);
    expect(result.total).toBe(30);
    expect(result.percentage).toBe(100);
  });

  it("should return 33% for 10/30", () => {
    const result = computeBadgeProgress(10, 30);
    expect(result.percentage).toBe(33);
  });

  it("should return 17% for 5/30", () => {
    const result = computeBadgeProgress(5, 30);
    expect(result.percentage).toBe(17);
  });
});
