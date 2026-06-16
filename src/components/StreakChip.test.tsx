import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { StreakChip } from "./StreakChip";

describe("StreakChip", () => {
  it("shows a prompt when there is no streak", () => {
    render(<StreakChip count={0} />);
    expect(screen.getByLabelText(/no streak yet/i)).toBeInTheDocument();
  });

  it("reflects an active streak count", () => {
    render(<StreakChip count={5} />);
    const chip = screen.getByLabelText("5 day streak");
    expect(chip).toHaveTextContent("5");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(
      <StreakChip
        count={3}
        onClick={() => {
          clicked = true;
        }}
      />,
    );
    await user.click(screen.getByLabelText("3 day streak"));
    expect(clicked).toBe(true);
  });

  it("calls onClick when the zero-streak prompt is clicked", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(
      <StreakChip
        count={0}
        onClick={() => {
          clicked = true;
        }}
      />,
    );
    await user.click(screen.getByLabelText(/no streak yet/i));
    expect(clicked).toBe(true);
  });

  it("applies a visual distinction when active", () => {
    render(<StreakChip count={3} active />);
    const chip = screen.getByLabelText("3 day streak");
    // The active chip should use a ring that distinguishes it.
    expect(chip.className).toContain("ring-2");
  });

  it("does not apply the active ring when not active", () => {
    render(<StreakChip count={3} />);
    const chip = screen.getByLabelText("3 day streak");
    expect(chip.className).not.toContain("ring-2");
  });

  it("uses button role when onClick is provided", () => {
    render(<StreakChip count={3} onClick={() => {}} />);
    expect(
      screen.getByRole("button", { name: "3 day streak" }),
    ).toBeInTheDocument();
  });

  it("does not use button role when onClick is not provided", () => {
    render(<StreakChip count={3} />);
    expect(
      screen.queryByRole("button", { name: "3 day streak" }),
    ).not.toBeInTheDocument();
  });
});
