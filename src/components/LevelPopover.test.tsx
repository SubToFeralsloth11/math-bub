import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LevelPopover } from "./LevelPopover";

describe("LevelPopover", () => {
  it("shows the current level", () => {
    render(
      <LevelPopover
        level={3}
        intoLevel={120}
        span={150}
        toNext={30}
        nextLevel={4}
        nextSpan={200}
      />,
    );
    expect(screen.getByText(/Level 3/i)).toBeInTheDocument();
  });

  it("shows the target next level", () => {
    render(
      <LevelPopover
        level={3}
        intoLevel={0}
        span={150}
        toNext={150}
        nextLevel={4}
        nextSpan={200}
      />,
    );
    expect(screen.getByText(/→ Level 4/)).toBeInTheDocument();
  });

  it("shows the numeric XP label", () => {
    render(
      <LevelPopover
        level={3}
        intoLevel={120}
        span={150}
        toNext={30}
        nextLevel={4}
        nextSpan={200}
      />,
    );
    expect(screen.getByText("120 / 150 XP")).toBeInTheDocument();
  });

  it("shows the remaining XP to the next level", () => {
    render(
      <LevelPopover
        level={3}
        intoLevel={90}
        span={150}
        toNext={60}
        nextLevel={4}
        nextSpan={200}
      />,
    );
    expect(screen.getByText(/60 XP to Level 4/i)).toBeInTheDocument();
  });

  it("renders a progress bar with the correct percentage", () => {
    render(
      <LevelPopover
        level={3}
        intoLevel={120}
        span={150}
        toNext={30}
        nextLevel={4}
        nextSpan={200}
      />,
    );
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "80");
  });

  it("shows Level 1 with 0 XP correctly", () => {
    render(
      <LevelPopover
        level={1}
        intoLevel={0}
        span={50}
        toNext={50}
        nextLevel={2}
        nextSpan={100}
      />,
    );
    expect(screen.getByText("0 / 50 XP")).toBeInTheDocument();
    expect(screen.getByText(/50 XP to Level 2/i)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  });
});
