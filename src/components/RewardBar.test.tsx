import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { RewardBar } from "./RewardBar";
import { defaultState, type SavedState } from "../domain/persistence/schema";
import { ProgressProvider } from "../state/progressContext";

import type { AppContent } from "../domain/content/types";

const emptyContent: AppContent = { subjects: [], tracks: [], badges: [] };

/**
 * Returns a local-date string (YYYY-MM-DD) offset by the given number of days
 * from today.
 *
 * @param offset - Days from today (0 = today, -1 = yesterday, etc.).
 * @returns The local date string.
 */
function relativeDate(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const yyyy = d.getFullYear().toString().padStart(4, "0");
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const dd = d.getDate().toString().padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Produces an array of consecutive active-date strings ending at today for the
 * given number of days.
 *
 * @param days - How many consecutive days to include.
 * @returns Sorted YYYY-MM-DD strings.
 */
function consecutiveDates(days: number): string[] {
  return Array.from({ length: days }, (_, index) =>
    relativeDate(index - days + 1),
  );
}

/** Seeds localStorage with the given state before the provider hydrates. */
function seedProgress(saved: SavedState): void {
  localStorage.setItem("studybub.progress.v1", JSON.stringify(saved));
}

function renderRewardBar(content: AppContent = emptyContent) {
  return render(
    <MemoryRouter>
      <ProgressProvider content={content}>
        <RewardBar />
      </ProgressProvider>
    </MemoryRouter>,
  );
}

describe("RewardBar streak popover", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("opens the streak popover on chip click", async () => {
    const user = userEvent.setup();
    const yesterday = relativeDate(-1);
    const state = {
      ...defaultState(),
      streak: { count: 3, lastActiveDate: yesterday },
      activeDates: consecutiveDates(7),
    };
    seedProgress(state);
    // Force the hydrated state to re-read from localStorage.
    localStorage.setItem("studybub.progress.v1", JSON.stringify(state));

    renderRewardBar();

    const chip = screen.getByLabelText("3 day streak");
    await user.click(chip);

    // The popover should show the streak count and activity strip.
    expect(screen.getByText(/🔥.*3-day streak/)).toBeInTheDocument();
    expect(screen.getByText(/Recent activity/i)).toBeInTheDocument();
  });

  it("dismisses the streak popover when clicking the chip again", async () => {
    const user = userEvent.setup();
    const yesterday = relativeDate(-1);
    seedProgress({
      ...defaultState(),
      streak: { count: 2, lastActiveDate: yesterday },
      activeDates: consecutiveDates(7),
    });

    renderRewardBar();

    const chip = screen.getByLabelText("2 day streak");
    await user.click(chip);
    expect(screen.getByText(/🔥.*2-day streak/)).toBeInTheDocument();

    await user.click(chip);
    await waitFor(() => {
      expect(screen.queryByText(/🔥.*2-day streak/)).not.toBeInTheDocument();
    });
  });

  it("shows the start prompt when there is no streak", async () => {
    const user = userEvent.setup();
    seedProgress(defaultState());

    renderRewardBar();

    const chip = screen.getByLabelText(/no streak yet/i);
    await user.click(chip);

    expect(
      screen.getByText("Complete a lesson to start your streak!"),
    ).toBeInTheDocument();
  });

  it("renders seven day cells in the activity strip", async () => {
    const user = userEvent.setup();
    seedProgress({
      ...defaultState(),
      streak: { count: 1, lastActiveDate: "2026-06-16" },
      activeDates: ["2026-06-16"],
    });

    renderRewardBar();

    await user.click(screen.getByLabelText("1 day streak"));

    const dayCells = screen.getAllByLabelText(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/);
    expect(dayCells).toHaveLength(7);
  });
});

describe("RewardBar level popover", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("opens the level popover on badge click", async () => {
    const user = userEvent.setup();
    seedProgress({
      ...defaultState(),
      xp: 120,
      streak: { count: 1, lastActiveDate: "2026-06-16" },
      activeDates: ["2026-06-16"],
    });

    renderRewardBar();

    const badge = screen.getByLabelText(/Level/);
    await user.click(badge);

    expect(screen.getByText(/→ Level/)).toBeInTheDocument();
    expect(screen.getByText(/XP to Level/)).toBeInTheDocument();
  });

  it("shows correct XP progress in the level popover", async () => {
    const user = userEvent.setup();
    seedProgress({
      ...defaultState(),
      xp: 120,
      streak: { count: 1, lastActiveDate: "2026-06-16" },
      activeDates: ["2026-06-16"],
    });

    renderRewardBar();

    await user.click(screen.getByLabelText(/Level/));

    // Level 3 starts at 150 XP, so at 120 XP we are at Level 2.
    // Level 2: span = xpForLevel(3) - xpForLevel(2) = 150 - 50 = 100
    // intoLevel = 120 - 50 = 70
    expect(screen.getByText("70 / 100 XP")).toBeInTheDocument();
    expect(screen.getByText(/30 XP to Level 3/i)).toBeInTheDocument();
  });

  it("dismisses the level popover when clicking the badge again", async () => {
    const user = userEvent.setup();
    seedProgress({
      ...defaultState(),
      xp: 50,
      streak: { count: 1, lastActiveDate: "2026-06-16" },
      activeDates: ["2026-06-16"],
    });

    renderRewardBar();

    const badge = screen.getByLabelText(/Level/);
    await user.click(badge);
    expect(screen.getByText(/XP to Level/)).toBeInTheDocument();

    await user.click(badge);
    await waitFor(() => {
      expect(screen.queryByText(/XP to Level/)).not.toBeInTheDocument();
    });
  });
});

describe("RewardBar mutual exclusion", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("closes the streak popover when opening the level popover", async () => {
    const user = userEvent.setup();
    const yesterday = relativeDate(-1);
    seedProgress({
      ...defaultState(),
      xp: 50,
      streak: { count: 3, lastActiveDate: yesterday },
      activeDates: consecutiveDates(7),
    });

    renderRewardBar();

    // Open streak popover.
    await user.click(screen.getByLabelText("3 day streak"));
    expect(screen.getByText(/🔥.*3-day streak/)).toBeInTheDocument();

    // Open level popover.
    await user.click(screen.getByLabelText(/Level/));

    // Streak popover should be gone, level popover present.
    await waitFor(() => {
      expect(screen.queryByText(/🔥.*3-day streak/)).not.toBeInTheDocument();
    });
    expect(screen.getByText(/XP to Level/)).toBeInTheDocument();
  });

  it("closes the level popover when opening the streak popover", async () => {
    const user = userEvent.setup();
    const yesterday = relativeDate(-1);
    seedProgress({
      ...defaultState(),
      xp: 50,
      streak: { count: 3, lastActiveDate: yesterday },
      activeDates: consecutiveDates(7),
    });

    renderRewardBar();

    // Open level popover.
    await user.click(screen.getByLabelText(/Level/));
    expect(screen.getByText(/XP to Level/)).toBeInTheDocument();

    // Open streak popover.
    await user.click(screen.getByLabelText("3 day streak"));

    // Level popover should be gone, streak popover present.
    await waitFor(() => {
      expect(screen.queryByText(/XP to Level/)).not.toBeInTheDocument();
    });
    expect(screen.getByText(/🔥.*3-day streak/)).toBeInTheDocument();
  });
});
