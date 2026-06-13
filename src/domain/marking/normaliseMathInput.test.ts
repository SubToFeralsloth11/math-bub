import { describe, expect, it } from "vitest";

import { normaliseExpression, normaliseMathInput } from "./normaliseMathInput";

describe("normaliseMathInput", () => {
  it("is idempotent on plain ASCII expressions", () => {
    expect(normaliseMathInput("2x+3")).toBe("2x+3");
    expect(normaliseMathInput("a*(b+c)")).toBe("a*(b+c)");
  });

  it("converts fullwidth plus and equals via NFKC", () => {
    expect(normaliseMathInput("x＋y")).toBe("x+y");
    expect(normaliseMathInput("x＝5")).toBe("x=5");
  });

  it("converts Unicode minus to hyphen", () => {
    expect(normaliseMathInput("−x")).toBe("-x");
  });

  it("converts multiplication and division signs", () => {
    expect(normaliseMathInput("a×b")).toBe("a*b");
    expect(normaliseMathInput("a÷b")).toBe("a/b");
  });

  it("converts superscript digits to power notation", () => {
    expect(normaliseMathInput("x²")).toBe("x^2");
    expect(normaliseMathInput("x³")).toBe("x^3");
    expect(normaliseMathInput("x⁻¹")).toBe("x^-1");
    expect(normaliseMathInput("x²y³")).toBe("x^2y^3");
    expect(normaliseMathInput("3x²+2x+1")).toBe("3x^2+2x+1");
  });

  it("does not double the caret when the learner already typed one", () => {
    expect(normaliseMathInput("x^2")).toBe("x^2");
    expect(normaliseMathInput("x^-1")).toBe("x^-1");
  });

  it("trims and collapses whitespace", () => {
    expect(normaliseMathInput("  2x  +  3  ")).toBe("2x + 3");
  });
});

describe("normaliseExpression", () => {
  it("returns the expression unchanged when there is no equals", () => {
    expect(normaliseExpression("2x+3")).toEqual({
      expression: "2x+3",
      hadEquals: false,
    });
  });

  it("extracts the right-hand side after the last =", () => {
    expect(normaliseExpression("x=5")).toEqual({
      expression: "5",
      hadEquals: true,
    });
    expect(normaliseExpression("2(a+b)=2a+2b")).toEqual({
      expression: "2a+2b",
      hadEquals: true,
    });
    expect(normaliseExpression("5+3=8")).toEqual({
      expression: "8",
      hadEquals: true,
    });
  });

  it("handles leading equals sign", () => {
    expect(normaliseExpression("=2a+2b")).toEqual({
      expression: "2a+2b",
      hadEquals: true,
    });
  });

  it("normalises Unicode symbols before extracting RHS", () => {
    expect(normaliseExpression("x×y＝z")).toEqual({
      expression: "z",
      hadEquals: true,
    });
  });

  it("returns empty for whitespace-only or bare equals", () => {
    expect(normaliseExpression("   ")).toEqual({
      expression: "",
      hadEquals: false,
    });
    expect(normaliseExpression("=")).toEqual({
      expression: "",
      hadEquals: true,
    });
  });
});
