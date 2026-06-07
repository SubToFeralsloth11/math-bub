import { describe, expect, it } from "vitest";

import { areEquivalent } from "./equivalence";

describe("areEquivalent - equivalent forms accepted", () => {
  it("treats reordered sums as equivalent", () => {
    expect(areEquivalent("2a+2b", "2b+2a", ["a", "b"])).toBe(true);
  });

  it("treats a factorised form as equivalent to its expansion", () => {
    expect(areEquivalent("2a+2b", "2(a+b)", ["a", "b"])).toBe(true);
  });

  it("treats repeated multiplication as a power", () => {
    expect(areEquivalent("x^5", "x*x*x*x*x", ["x"])).toBe(true);
  });

  it("treats a perfect square as equivalent to its expansion", () => {
    expect(areEquivalent("(x+1)^2", "x^2+2x+1", ["x"])).toBe(true);
  });

  it("reads concatenated variables as a product", () => {
    // A learner typing the taught form `6ab` must match the target `6*a*b`.
    expect(areEquivalent("6ab", "6*a*b", ["a", "b"])).toBe(true);
    expect(areEquivalent("ab", "a*b", ["a", "b"])).toBe(true);
    expect(areEquivalent("xy", "y*x", ["x", "y"])).toBe(true);
  });
});

describe("areEquivalent - non-equivalent forms rejected", () => {
  it("rejects different coefficients", () => {
    expect(areEquivalent("2a+2b", "2a+3b", ["a", "b"])).toBe(false);
  });

  it("rejects different powers", () => {
    expect(areEquivalent("x^5", "x^4", ["x"])).toBe(false);
  });

  it("does not falsely accept close-but-distinct expressions", () => {
    // These agree at x = 0 but diverge elsewhere; sampling must catch it.
    expect(areEquivalent("x^2", "x^3", ["x"])).toBe(false);
  });
});

describe("areEquivalent - determinism", () => {
  it("returns the same result across repeated calls", () => {
    const first = areEquivalent("3(x+2)", "3x+6", ["x"]);
    const second = areEquivalent("3(x+2)", "3x+6", ["x"]);
    expect(first).toBe(true);
    expect(second).toBe(true);
  });
});
