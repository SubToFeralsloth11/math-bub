import { describe, expect, it } from "vitest";

import { markShortText } from "./markShortText";

import type { ShortTextQuestion } from "../content/types";

function shortText(accepted: string[]): ShortTextQuestion {
  return {
    id: "q1",
    type: "shortText",
    prompt: [{ kind: "text", text: "What is the capital?" }],
    explanation: [{ kind: "text", text: "Paris." }],
    xp: 10,
    accepted,
  };
}

describe("markShortText", () => {
  it("marks exact match correct", () => {
    expect(markShortText(shortText(["Paris"]), "Paris")).toEqual({
      status: "correct",
    });
  });

  it("marks case-insensitive match correct", () => {
    expect(markShortText(shortText(["Paris"]), "paris")).toEqual({
      status: "correct",
    });
    expect(markShortText(shortText(["Paris"]), "PARIS")).toEqual({
      status: "correct",
    });
  });

  it("marks match with diacritics as correct after normalisation", () => {
    expect(markShortText(shortText(["cafe"]), "café")).toEqual({
      status: "correct",
    });
  });

  it("marks trimmed whitespace match correct", () => {
    expect(markShortText(shortText(["Paris"]), "  Paris  ")).toEqual({
      status: "correct",
    });
  });

  it("marks incorrect when no match", () => {
    expect(markShortText(shortText(["Paris"]), "London")).toEqual({
      status: "incorrect",
    });
  });

  it("marks empty input as incorrect", () => {
    expect(markShortText(shortText(["Paris"]), "")).toEqual({
      status: "incorrect",
    });
  });

  it("matches any accepted answer", () => {
    expect(markShortText(shortText(["Paris", "paris"]), "paris")).toEqual({
      status: "correct",
    });
  });

  // --- Substring matching: sentence answer scenarios (US1). ---

  it("marks a sentence answer with sufficient keyword matches correct", () => {
    // 4 accepted, ceil(4/2) = 2 threshold. All 4 appear in the sentence.
    const q = shortText(["yes", "living", "organism", "made of cells"]);
    expect(
      markShortText(
        q,
        "Yes, a raw mushroom is a living organism made of cells",
      ),
    ).toEqual({ status: "correct" });
  });

  it("marks a nonsense answer as incorrect under substring matching", () => {
    // 4 accepted, ceil(4/2) = 2 threshold. 0 matched.
    const q = shortText(["yes", "living", "organism", "made of cells"]);
    expect(markShortText(q, "I don't know")).toEqual({
      status: "incorrect",
    });
  });

  it("marks a short sentence hitting 2 of 4 keywords correct", () => {
    // 4 accepted, ceil(4/2) = 2 threshold. Exactly 2 matched.
    const q = shortText([
      "store water",
      "cannot move",
      "turgor pressure",
      "upright",
    ]);
    expect(
      markShortText(q, "Plants store water because they cannot move"),
    ).toEqual({ status: "correct" });
  });

  it("marks a sentence with only one keyword below threshold incorrect", () => {
    // 4 accepted, ceil(4/2) = 2 threshold. Only 1 matched.
    const q = shortText(["yes", "living", "organism", "made of cells"]);
    expect(markShortText(q, "yes")).toEqual({ status: "incorrect" });
  });

  it("respects word boundaries in sentence input", () => {
    // "12" must not match inside "123 bottles".
    const q = shortText(["12"]);
    expect(markShortText(q, "123 bottles")).toEqual({
      status: "incorrect",
    });
  });

  it("marks a sentence where keyword appears with punctuation correct", () => {
    const q = shortText(["living", "organism"]);
    expect(markShortText(q, "it is living, so it is an organism")).toEqual({
      status: "correct",
    });
  });

  it("handles multi-word accepted phrase within a sentence", () => {
    const q = shortText(["made of cells"]);
    expect(markShortText(q, "It is made of cells because")).toEqual({
      status: "correct",
    });
  });

  it("handles the ct-p2 biology question", () => {
    // Acceptance scenario from the spec: ct-p2 asks if a raw mushroom is
    // made of cells, expecting the learner to use keywords.
    const q = shortText(["yes", "living", "organism", "made of cells"]);
    expect(
      markShortText(
        q,
        "Yes, a raw mushroom is made of cells because it is a living organism",
      ),
    ).toEqual({ status: "correct" });
  });

  it("marks an answer with all 2 keywords in a 2-item list correct", () => {
    // 2 accepted, ceil(2/2) = 1 threshold. Both appear.
    const q = shortText(["living", "organism"]);
    expect(markShortText(q, "It is not a living organism")).toEqual({
      status: "correct",
    });
  });

  it("preserves existing exact-match behaviour for single accepted value", () => {
    // Single keyword, ceil(1/2) = 1 threshold. Full sentence still passes.
    const q = shortText(["Paris"]);
    expect(markShortText(q, "The capital of France is Paris")).toEqual({
      status: "correct",
    });
  });
});
