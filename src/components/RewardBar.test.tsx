import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { RewardBar } from "./RewardBar";
import { defaultState, type SavedState } from "../domain/persistence/schema";
import { ProgressProvider } from "../state/progressContext";

import type { AppContent } from "../domain/content/types";

const emptyContent: AppContent = { subjects: [], tracks: [], badges: [] };

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
    seedProgress({
      ...defaultState(),
      streak: { count: 3, lastActiveDate: "2026-06-16" },
      activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
    });
    // Force the hydrated state to re-read from localStorage.
    localStorage.setItem(
      "studybub.progress.v1",
      JSON.stringify({
        ...defaultState(),
        streak: { count: 3, lastActiveDate: "2026-06-16" },
        activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
      }),
    );

    renderRewardBar();

    const chip = screen.getByLabelText("3 day streak");
    await user.click(chip);

    // The popover should show the streak count and activity strip.
    expect(screen.getByText(/3-day streak/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent activity/i)).toBeInTheDocument();
  });

  it("dismisses the streak popover when clicking the chip again", async () => {
    const user = userEvent.setup();
    seedProgress({
      ...defaultState(),
      streak: { count: 2, lastActiveDate: "2026-06-16" },
      activeDates: ["2026-06-15", "2026-06-16"],
    });

    renderRewardBar();

    const chip = screen.getByLabelText("2 day streak");
    await user.click(chip);
    expect(screen.getByText(/2-day streak/i)).toBeInTheDocument();

    await user.click(chip);
    await waitFor(() => {
      expect(screen.queryByText(/2-day streak/i)).not.toBeInTheDocument();
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
    seedProgress({
      ...defaultState(),
      xp: 50,
      streak: { count: 3, lastActiveDate: "2026-06-16" },
      activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
    });

    renderRewardBar();

    // Open streak popover.
    await user.click(screen.getByLabelText("3 day streak"));
    expect(screen.getByText(/3-day streak/i)).toBeInTheDocument();

    // Open level popover.
    await user.click(screen.getByLabelText(/Level/));

    // Streak popover should be gone, level popover present.
    await waitFor(() => {
      expect(screen.queryByText(/3-day streak/i)).not.toBeInTheDocument();
    });
    expect(screen.getByText(/XP to Level/)).toBeInTheDocument();
  });

  it("closes the level popover when opening the streak popover", async () => {
    const user = userEvent.setup();
    seedProgress({
      ...defaultState(),
      xp: 50,
      streak: { count: 3, lastActiveDate: "2026-06-16" },
      activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
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
    expect(screen.getByText(/3-day streak/i)).toBeInTheDocument();
  });
});
