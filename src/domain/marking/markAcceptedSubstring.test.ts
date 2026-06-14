import { describe, expect, it } from "vitest";

import { markAcceptedSubstring } from "./markAcceptedSubstring";

describe("markAcceptedSubstring", () => {
  it("marks exact single-value match correct", () => {
    expect(markAcceptedSubstring("Paris", ["Paris"])).toEqual({
      status: "correct",
    });
  });

  it("marks sentence with all keywords matched correct", () => {
    // 4 accepted, ceil(4/2) = 2 threshold — 4 matched, passes.
    expect(
      markAcceptedSubstring(
        "Yes, a raw mushroom is a living organism made of cells",
        ["yes", "living", "organism", "made of cells"],
      ),
    ).toEqual({ status: "correct" });
  });

  it("marks sentence with exactly threshold met correct", () => {
    // 4 accepted, ceil(4/2) = 2 threshold — 2 matched, passes.
    expect(
      markAcceptedSubstring("Plants store water because they cannot move", [
        "store water",
        "cannot move",
        "turgor pressure",
        "upright",
      ]),
    ).toEqual({ status: "correct" });
  });

  it("marks sentence below threshold as incorrect", () => {
    // 4 accepted, ceil(4/2) = 2 threshold — 0 matched.
    expect(
      markAcceptedSubstring("I don't know", [
        "yes",
        "living",
        "organism",
        "made of cells",
      ]),
    ).toEqual({ status: "incorrect" });
  });

  it("marks empty input as incorrect", () => {
    expect(markAcceptedSubstring("", ["Paris"])).toEqual({
      status: "incorrect",
    });
  });

  it("marks whitespace-only input as incorrect", () => {
    expect(markAcceptedSubstring("   ", ["Paris"])).toEqual({
      status: "incorrect",
    });
  });

  it("matches case-insensitively", () => {
    expect(markAcceptedSubstring("PARIS", ["Paris"])).toEqual({
      status: "correct",
    });
  });

  it("matches diacritic-insensitively", () => {
    // "café" normalises to "cafe", matching accepted "cafe".
    expect(markAcceptedSubstring("café", ["cafe"])).toEqual({
      status: "correct",
    });
  });

  it("enforces word boundaries so '12' does not match in '123'", () => {
    expect(markAcceptedSubstring("123", ["12"])).toEqual({
      status: "incorrect",
    });
  });

  it("matches '12' as a standalone word in a sentence", () => {
    expect(markAcceptedSubstring("The answer is 12", ["12"])).toEqual({
      status: "correct",
    });
  });

  it("matches multi-word accepted phrase", () => {
    // "made of cells" must appear as a contiguous phrase.
    expect(
      markAcceptedSubstring("It is made of cells because", ["made of cells"]),
    ).toEqual({ status: "correct" });
  });

  it("handles single accepted value with threshold ceil(1/2)=1", () => {
    // Single keyword appearing as substring in a sentence.
    expect(
      markAcceptedSubstring("The capital of France is Paris", ["Paris"]),
    ).toEqual({ status: "correct" });
  });

  it("does not match a keyword that appears only inside another word", () => {
    // "cat" should not match inside "catalog" due to \b.
    expect(markAcceptedSubstring("catalog", ["cat"])).toEqual({
      status: "incorrect",
    });
  });

  it("matches a keyword followed by punctuation", () => {
    // Comma creates a word boundary after "living".
    expect(
      markAcceptedSubstring("it is living, so it is an organism", [
        "living",
        "organism",
      ]),
    ).toEqual({ status: "correct" });
  });

  it("counts each accepted value at most once", () => {
    // "living" appears twice in input; still only counts as 1 match.
    // 4 accepted, ceil(4/2) = 2 threshold. "living" alone = 1 < 2 → incorrect.
    expect(
      markAcceptedSubstring("A living thing is a living being", [
        "yes",
        "living",
        "organism",
        "made of cells",
      ]),
    ).toEqual({ status: "incorrect" });
  });

  it("handles 2-item list where threshold is ceil(2/2)=1", () => {
    // Only one keyword needed.
    expect(markAcceptedSubstring("yes", ["yes", "living"])).toEqual({
      status: "correct",
    });
  });

  it("handles 3-item list where threshold is ceil(3/2)=2", () => {
    // Needs 2 of 3 keywords.
    expect(
      markAcceptedSubstring("cells have a nucleus", [
        "nucleus",
        "cell membrane",
        "mitochondria",
      ]),
    ).toEqual({ status: "incorrect" });
  });

  it("handles 5-item list where threshold is ceil(5/2)=3", () => {
    // 3 of 5 needed — only 2 matched.
    expect(
      markAcceptedSubstring("Cells have a nucleus and cell membrane", [
        "cell membrane",
        "nucleus",
        "mitochondria",
        "cell wall",
        "chloroplasts",
      ]),
    ).toEqual({ status: "incorrect" });
  });

  it("matches when multiple spaces are collapsed during normalisation", () => {
    // Multiple spaces between words collapse to single space.
    expect(
      markAcceptedSubstring("made   of   cells", ["made of cells"]),
    ).toEqual({ status: "correct" });
  });

  it("escapes regex metacharacters without throwing", () => {
    // Regex metacharacters in accepted values must not cause syntax errors.
    // Word-boundary matching fails for values ending in non-word chars,
    // but the escaping itself must be safe.
    expect(() => markAcceptedSubstring("a+b", ["a+"])).not.toThrow();
  });
});
