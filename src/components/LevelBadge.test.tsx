import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { LevelBadge } from "./LevelBadge";

describe("LevelBadge", () => {
  it("shows the current level", () => {
    render(<LevelBadge level={3} />);
    expect(screen.getByLabelText("Level 3")).toBeInTheDocument();
    expect(screen.getByLabelText("Level 3")).toHaveTextContent("3");
  });

  it("shows Level 1 by default", () => {
    render(<LevelBadge level={1} />);
    expect(screen.getByLabelText("Level 1")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(
      <LevelBadge
        level={3}
        onClick={() => {
          clicked = true;
        }}
      />,
    );
    await user.click(screen.getByLabelText("Level 3"));
    expect(clicked).toBe(true);
  });

  it("applies an active ring when the popover is open", () => {
    render(<LevelBadge level={3} active />);
    const badge = screen.getByLabelText("Level 3");
    expect(badge.className).toContain("ring-2");
  });

  it("does not apply the active ring when not active", () => {
    render(<LevelBadge level={3} />);
    const badge = screen.getByLabelText("Level 3");
    expect(badge.className).not.toContain("ring-2");
  });

  it("uses button role when onClick is provided", () => {
    render(<LevelBadge level={3} onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Level 3" })).toBeInTheDocument();
  });

  it("does not use button role when onClick is not provided", () => {
    render(<LevelBadge level={3} />);
    expect(
      screen.queryByRole("button", { name: "Level 3" }),
    ).not.toBeInTheDocument();
  });
});
