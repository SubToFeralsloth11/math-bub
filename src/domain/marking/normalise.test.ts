import { describe, expect, it } from "vitest";

import { normalise } from "./normalise";

describe("normalise", () => {
  it("trims surrounding whitespace", () => {
    expect(normalise("  42  ")).toBe("42");
  });

  it("collapses internal whitespace to single spaces", () => {
    expect(normalise("3   apples")).toBe("3 apples");
  });

  it("case-folds short text answers", () => {
    expect(normalise("Obtuse")).toBe("obtuse");
  });

  it("strips a trailing unit when one is supplied", () => {
    expect(normalise("12 cm", "cm")).toBe("12");
    expect(normalise("12cm", "cm")).toBe("12");
  });

  it("is case-insensitive when stripping the unit", () => {
    expect(normalise("5 KG", "kg")).toBe("5");
  });

  it("normalises a unicode minus sign to a hyphen", () => {
    expect(normalise("−5")).toBe("-5");
  });

  it("returns an empty string for whitespace-only input", () => {
    expect(normalise("   ")).toBe("");
  });
});
