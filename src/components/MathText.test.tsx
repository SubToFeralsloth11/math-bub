import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MathText } from "./MathText";

describe("MathText", () => {
  it("renders typeset output for valid TeX", () => {
    const { container } = render(<MathText tex="x^2 + 1" fallback="x^2 + 1" />);
    // KaTeX wraps output in an element carrying the `katex` class.
    expect(container.querySelector(".katex")).not.toBeNull();
  });

  it("falls back to plain text when TeX cannot be typeset", () => {
    // Suppress the expected warning from the fallback path.
    vi.spyOn(console, "warn").mockImplementation(() => {});
    // An unterminated group is invalid TeX and makes KaTeX throw.
    render(<MathText tex="\\frac{1}{" fallback="1 over 2" />);
    expect(screen.getByText("1 over 2")).toBeInTheDocument();
  });
});
