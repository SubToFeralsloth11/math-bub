import { describe, expect, it } from "vitest";

import { markExpression } from "./markExpression";

import type { ExpressionQuestion } from "../content/types";

function expression(target: string, variables: string[]): ExpressionQuestion {
  return {
    id: "e1",
    type: "expression",
    prompt: [{ kind: "text", text: "Expand" }],
    explanation: [{ kind: "text", text: "e" }],
    xp: 10,
    target,
    variables,
  };
}

const expanding = expression("2a+2b", ["a", "b"]);

describe("markExpression", () => {
  it("marks an equivalent expression correct", () => {
    expect(markExpression(expanding, "2(a+b)")).toEqual({ status: "correct" });
    expect(markExpression(expanding, "2b + 2a")).toEqual({ status: "correct" });
  });

  it("accepts the concatenated-variable form the lesson teaches", () => {
    const product = expression("6*a*b", ["a", "b"]);
    expect(markExpression(product, "6ab")).toEqual({ status: "correct" });
    expect(markExpression(product, "3a*2b")).toEqual({ status: "correct" });
  });

  it("marks a non-equivalent expression incorrect", () => {
    expect(markExpression(expanding, "2a + 3b")).toEqual({
      status: "incorrect",
    });
    expect(markExpression(expanding, "2a")).toEqual({ status: "incorrect" });
  });

  it("reports unparseable input as unreadable", () => {
    expect(markExpression(expanding, "2a +")).toEqual({ status: "unreadable" });
    expect(markExpression(expanding, ")(")).toEqual({ status: "unreadable" });
  });

  it("reports empty input as unreadable", () => {
    expect(markExpression(expanding, "")).toEqual({ status: "unreadable" });
    expect(markExpression(expanding, "   ")).toEqual({ status: "unreadable" });
  });

  it("never throws on adversarial input", () => {
    expect(() => markExpression(expanding, "@@@")).not.toThrow();
    expect(() => markExpression(expanding, "1/")).not.toThrow();
  });
});
