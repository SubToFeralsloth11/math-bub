import { describe, expect, it } from "vitest";

import { markFillInTheBlank } from "./markFillInTheBlank";

import type { FillInTheBlankQuestion } from "../content/types";

function fitb(accepted: string[]): FillInTheBlankQuestion {
  return {
    id: "q1",
    type: "fillInTheBlank",
    prompt: [{ kind: "text", text: "Complete the sentence." }],
    explanation: [{ kind: "text", text: "Correct." }],
    xp: 10,
    template: [{ kind: "text", text: "The ___ is the powerhouse." }],
    accepted,
  };
}

describe("markFillInTheBlank", () => {
  it("marks exact match correct", () => {
    expect(markFillInTheBlank(fitb(["mitochondria"]), "mitochondria")).toEqual({
      status: "correct",
    });
  });

  it("marks case-insensitive match correct", () => {
    expect(markFillInTheBlank(fitb(["mitochondria"]), "Mitochondria")).toEqual({
      status: "correct",
    });
  });

  it("marks trimmed input correct", () => {
    expect(
      markFillInTheBlank(fitb(["mitochondria"]), "  mitochondria  "),
    ).toEqual({
      status: "correct",
    });
  });

  it("marks incorrect when no match", () => {
    expect(markFillInTheBlank(fitb(["mitochondria"]), "nucleus")).toEqual({
      status: "incorrect",
    });
  });

  it("marks empty input as incorrect", () => {
    expect(markFillInTheBlank(fitb(["mitochondria"]), "")).toEqual({
      status: "incorrect",
    });
  });

  it("matches any accepted answer", () => {
    expect(markFillInTheBlank(fitb(["water", "H2O"]), "H2O")).toEqual({
      status: "correct",
    });
  });
});
