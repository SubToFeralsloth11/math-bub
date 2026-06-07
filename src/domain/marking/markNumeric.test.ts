import { describe, expect, it } from "vitest";

import { markNumeric } from "./markNumeric";

import type { NumericQuestion } from "../content/types";

function numeric(accepted: string[], unit?: string): NumericQuestion {
  return {
    id: "n1",
    type: "numeric",
    prompt: [{ kind: "text", text: "How many?" }],
    explanation: [{ kind: "text", text: "Count them." }],
    xp: 10,
    accepted,
    unit,
  };
}

describe("markNumeric", () => {
  it("marks an exact match correct", () => {
    expect(markNumeric(numeric(["42"]), "42")).toEqual({ status: "correct" });
  });

  it("tolerates surrounding whitespace", () => {
    expect(markNumeric(numeric(["42"]), "  42 ")).toEqual({
      status: "correct",
    });
  });

  it("matches any of several accepted answers", () => {
    expect(markNumeric(numeric(["half", "1/2", "0.5"]), "1/2")).toEqual({
      status: "correct",
    });
  });

  it("is case-insensitive for short text", () => {
    expect(markNumeric(numeric(["Obtuse"]), "obtuse")).toEqual({
      status: "correct",
    });
  });

  it("strips a configured unit before comparison", () => {
    expect(markNumeric(numeric(["12"], "cm"), "12 cm")).toEqual({
      status: "correct",
    });
  });

  it("marks a non-matching answer incorrect", () => {
    expect(markNumeric(numeric(["42"]), "41")).toEqual({ status: "incorrect" });
  });

  it("marks empty input incorrect (never unreadable)", () => {
    expect(markNumeric(numeric(["42"]), "")).toEqual({ status: "incorrect" });
    expect(markNumeric(numeric(["42"]), "   ")).toEqual({
      status: "incorrect",
    });
  });
});
