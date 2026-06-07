import { describe, expect, it } from "vitest";

import { nextStreak } from "./streak";

import type { Streak } from "../persistence/schema";

const fresh: Streak = { count: 0, lastActiveDate: "" };

describe("nextStreak", () => {
  it("sets the streak to 1 on first-ever activity", () => {
    expect(nextStreak(fresh, "2026-06-07")).toEqual({
      count: 1,
      lastActiveDate: "2026-06-07",
    });
  });

  it("leaves the streak unchanged for same-day activity", () => {
    const current: Streak = { count: 3, lastActiveDate: "2026-06-07" };
    expect(nextStreak(current, "2026-06-07")).toEqual(current);
  });

  it("increments the streak on the next consecutive day", () => {
    const current: Streak = { count: 3, lastActiveDate: "2026-06-07" };
    expect(nextStreak(current, "2026-06-08")).toEqual({
      count: 4,
      lastActiveDate: "2026-06-08",
    });
  });

  it("resets the streak to 1 after a skipped day", () => {
    const current: Streak = { count: 5, lastActiveDate: "2026-06-07" };
    expect(nextStreak(current, "2026-06-09")).toEqual({
      count: 1,
      lastActiveDate: "2026-06-09",
    });
  });

  it("resets across a longer gap", () => {
    const current: Streak = { count: 9, lastActiveDate: "2026-06-01" };
    expect(nextStreak(current, "2026-06-20").count).toBe(1);
  });

  it("handles a month boundary as a single day", () => {
    const current: Streak = { count: 2, lastActiveDate: "2026-06-30" };
    expect(nextStreak(current, "2026-07-01")).toEqual({
      count: 3,
      lastActiveDate: "2026-07-01",
    });
  });
});
