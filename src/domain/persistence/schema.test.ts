import { describe, expect, it } from "vitest";

import {
  CURRENT_VERSION,
  defaultState,
  parseSavedState,
  type SavedState,
} from "./schema";

// A representative fully-populated valid state used for round-trip assertions.
function populatedState(): SavedState {
  return {
    version: CURRENT_VERSION,
    lessons: {
      "alg-5g": { completed: true, bestAccuracy: 1 },
      "alg-5h": { completed: false, bestAccuracy: 0.4 },
    },
    challenges: {
      "algebra-boss": { bestScore: 8, total: 10, passed: true },
    },
    xp: 320,
    streak: { count: 5, lastActiveDate: "2026-06-07" },
    badges: ["first-lesson", "perfect-mastery"],
  };
}

describe("defaultState", () => {
  it("returns a clean current-version state with no progress", () => {
    const state = defaultState();
    expect(state).toEqual({
      version: CURRENT_VERSION,
      lessons: {},
      challenges: {},
      xp: 0,
      streak: { count: 0, lastActiveDate: "" },
      badges: [],
    });
  });

  it("returns a fresh object each call (no shared mutable references)", () => {
    const a = defaultState();
    const b = defaultState();
    a.lessons["x"] = { completed: true, bestAccuracy: 1 };
    // Mutating one must not leak into the other.
    expect(b.lessons).toEqual({});
  });
});

describe("parseSavedState", () => {
  it("round-trips a valid serialised state", () => {
    const state = populatedState();
    expect(parseSavedState(JSON.stringify(state))).toEqual(state);
  });

  it("recovers to default for null", () => {
    expect(parseSavedState(null)).toEqual(defaultState());
  });

  it("recovers to default for empty/whitespace input", () => {
    expect(parseSavedState("")).toEqual(defaultState());
    expect(parseSavedState("   ")).toEqual(defaultState());
  });

  it("recovers to default for unparseable JSON without throwing", () => {
    expect(() => parseSavedState("{")).not.toThrow();
    expect(parseSavedState("{")).toEqual(defaultState());
    expect(parseSavedState("not json at all")).toEqual(defaultState());
  });

  it('recovers to default for the literal "null"', () => {
    expect(parseSavedState("null")).toEqual(defaultState());
  });

  it("recovers to default for a future version with no migration path", () => {
    const future = { ...populatedState(), version: 999 };
    expect(parseSavedState(JSON.stringify(future))).toEqual(defaultState());
  });

  it("recovers to default for valid JSON with wrong-typed fields", () => {
    const broken = { ...populatedState(), xp: "lots" };
    expect(parseSavedState(JSON.stringify(broken))).toEqual(defaultState());
  });

  it("recovers to default for a negative xp value", () => {
    const broken = { ...populatedState(), xp: -10 };
    expect(parseSavedState(JSON.stringify(broken))).toEqual(defaultState());
  });

  it("recovers to default when a lessons entry is malformed", () => {
    const broken = {
      ...populatedState(),
      lessons: { "alg-5g": { completed: "yes" } },
    };
    expect(parseSavedState(JSON.stringify(broken))).toEqual(defaultState());
  });

  it("recovers to default when the streak shape is wrong", () => {
    const broken = { ...populatedState(), streak: { count: 5 } };
    expect(parseSavedState(JSON.stringify(broken))).toEqual(defaultState());
  });
});
