import { fireEvent, screen, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MatchingInput } from "./MatchingInput";

import type { MatchingPair } from "../../../domain/content/types";

const pairs: MatchingPair[] = [
  {
    id: "p1",
    left: [{ kind: "text", text: "H2O" }],
    right: [{ kind: "text", text: "Water" }],
  },
  {
    id: "p2",
    left: [{ kind: "text", text: "CO2" }],
    right: [{ kind: "text", text: "Carbon dioxide" }],
  },
];

describe("MatchingInput", () => {
  it("renders pairs in left and right columns", () => {
    render(
      <MatchingInput
        pairs={pairs}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    expect(screen.getByText("H2O")).toBeInTheDocument();
    expect(screen.getByText("CO2")).toBeInTheDocument();
    expect(screen.getByText("Water")).toBeInTheDocument();
    expect(screen.getByText("Carbon dioxide")).toBeInTheDocument();
  });

  it("disables the Check answer button until all pairs are matched", () => {
    render(
      <MatchingInput
        pairs={pairs}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    expect(
      screen.getByRole("button", { name: /check answer/i }),
    ).toBeDisabled();
  });

  it("calls onSubmit with mapping when all pairs connected", () => {
    const onSubmit = vi.fn();
    render(
      <MatchingInput
        pairs={pairs}
        onSubmit={onSubmit}
        revealed={false}
        result={null}
      />,
    );

    // Tap left "H2O"
    fireEvent.click(screen.getByText("H2O"));
    // Tap right "Water" - note: we need to find the button containing "Water"
    const waterButton = screen.getByText("Water").closest("button")!;
    fireEvent.click(waterButton);

    // Tap left "CO2"
    fireEvent.click(screen.getByText("CO2"));
    const co2Button = screen.getByText("Carbon dioxide").closest("button")!;
    fireEvent.click(co2Button);

    fireEvent.click(screen.getByRole("button", { name: /check answer/i }));
    expect(onSubmit).toHaveBeenCalled();
  });
});
