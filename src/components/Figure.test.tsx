import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Figure } from "./Figure";

const figure = {
  id: "congruent-triangles",
  alt: "Two congruent triangles ABC and DEF",
  textFallback: "Triangle ABC and triangle DEF have equal matching sides.",
};

describe("Figure", () => {
  it("renders an image with descriptive alt text when the asset loads", () => {
    render(<Figure figure={figure} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", figure.alt);
    expect(image).toHaveAttribute("src", `/figures/${figure.id}.png`);
  });

  it("falls back to a labelled text description when the image fails to load", () => {
    render(<Figure figure={figure} />);
    // Simulate the asset being missing.
    fireEvent.error(screen.getByRole("img"));
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText(figure.textFallback)).toBeInTheDocument();
    expect(screen.getByText(/figure description/i)).toBeInTheDocument();
  });
});
