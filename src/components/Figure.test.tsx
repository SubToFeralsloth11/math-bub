import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Figure } from "./Figure";

const figure = {
  id: "congruent-triangles",
  alt: "Two congruent triangles ABC and DEF",
  textFallback: "Triangle ABC and triangle DEF have equal matching sides.",
};

describe("Figure", () => {
  it("renders an image with descriptive alt text, trying WebP first", () => {
    render(<Figure figure={figure} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", figure.alt);
    expect(image).toHaveAttribute("src", `/figures/${figure.id}.webp`);
  });

  it("falls back to PNG when the WebP asset is missing", () => {
    render(<Figure figure={figure} />);
    const image = screen.getByRole("img");
    // Simulate WebP being missing.
    fireEvent.error(image);
    expect(image).toHaveAttribute("src", `/figures/${figure.id}.png`);
  });

  it("falls back to a labelled text description when both WebP and PNG fail", () => {
    render(<Figure figure={figure} />);
    const image = screen.getByRole("img");
    // Simulate WebP being missing.
    fireEvent.error(image);
    // Simulate PNG also being missing.
    fireEvent.error(image);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText(figure.textFallback)).toBeInTheDocument();
    expect(screen.getByText(/figure description/i)).toBeInTheDocument();
  });
});
