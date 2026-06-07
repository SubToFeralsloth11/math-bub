import { describe, expect, it } from "vitest";

import { markMcq } from "./markMcq";

import type { McqQuestion } from "../content/types";

const question: McqQuestion = {
  id: "q1",
  type: "mcq",
  prompt: [{ kind: "text", text: "2 + 2 = ?" }],
  explanation: [{ kind: "text", text: "Add them." }],
  xp: 10,
  options: [
    { id: "a", label: [{ kind: "text", text: "3" }] },
    { id: "b", label: [{ kind: "text", text: "4" }] },
    { id: "c", label: [{ kind: "text", text: "5" }] },
  ],
  correctOptionId: "b",
};

describe("markMcq", () => {
  it("marks the correct option correct", () => {
    expect(markMcq(question, "b")).toEqual({ status: "correct" });
  });

  it("marks a wrong option incorrect", () => {
    expect(markMcq(question, "a")).toEqual({ status: "incorrect" });
  });

  it("marks an unknown option id incorrect (never unreadable)", () => {
    expect(markMcq(question, "zzz")).toEqual({ status: "incorrect" });
  });
});
