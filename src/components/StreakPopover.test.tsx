import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StreakPopover } from "./StreakPopover";

describe("StreakPopover", () => {
  it("shows the streak count", () => {
    render(
      <StreakPopover
        streakCount={5}
        activeDays={[true, true, true, true, true, false, true]}
        message="Active today"
      />,
    );
    expect(screen.getByText(/5-day streak/i)).toBeInTheDocument();
  });

  it("shows the contextual message", () => {
    render(
      <StreakPopover
        streakCount={3}
        activeDays={[false, false, false, false, false, false, false]}
        message="Complete a lesson to start your streak!"
      />,
    );
    expect(
      screen.getByText("Complete a lesson to start your streak!"),
    ).toBeInTheDocument();
  });

  it("renders seven day cells in the activity strip", () => {
    render(
      <StreakPopover
        streakCount={3}
        activeDays={[true, false, true, false, true, false, true]}
        message="Keep going"
      />,
    );
    const dayCells = screen.getAllByLabelText(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/);
    expect(dayCells).toHaveLength(7);
  });

  it("marks active days correctly", () => {
    render(
      <StreakPopover
        streakCount={3}
        activeDays={[true, false, false, false, false, false, false]}
        message="Keep going"
      />,
    );
    // The first day is active, all others inactive.
    const activeDay = screen.getByLabelText(/Mon active/);
    expect(activeDay).toBeInTheDocument();
    const inactiveDay = screen.getByLabelText(/Tue inactive/);
    expect(inactiveDay).toBeInTheDocument();
  });

  it("marks today with a distinct label", () => {
    render(
      <StreakPopover
        streakCount={3}
        activeDays={[false, false, false, false, false, false, true]}
        message="Active today"
      />,
    );
    // The last day (today) should be labelled with "today".
    expect(screen.getByLabelText(/today active/i)).toBeInTheDocument();
  });
});
