/**
 * Unit tests for the StatsScreen component.
 *
 * @author John Grimes
 */

import { screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";

import { StatsScreen } from "./StatsScreen";
import { defaultState, type SavedState } from "../domain/persistence/schema";
import { ProgressProvider } from "../state/progressContext";
import { setMockProgress, clearMockProgress } from "../test/mocks";
import { renderInRouter } from "../test/renderApp";

import type { AppContent } from "../domain/content/types";

const emptyContent: AppContent = { subjects: [], tracks: [], badges: [] };

/**
 * Seeds the mock server response with the given saved state.
 *
 * @param saved - The saved state to seed.
 */
function seedProgress(saved: SavedState): void {
  setMockProgress(saved);
}

/**
 * Renders the StatsScreen inside the required providers.
 *
 * @param content - Optional content to provide to ProgressProvider.
 * @returns The render result.
 */
async function renderStatsScreen(content: AppContent = emptyContent) {
  return renderInRouter(
    <ProgressProvider content={content}>
      <StatsScreen />
    </ProgressProvider>,
  );
}

describe("StatsScreen", () => {
  beforeEach(() => {
    clearMockProgress();
  });

  it("renders the page heading", async () => {
    seedProgress(defaultState());
    await renderStatsScreen();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "My Progress",
    );
  });

  it("renders six stat cards with correct labels", async () => {
    seedProgress(defaultState());
    await renderStatsScreen();

    expect(screen.getByText("Level")).toBeInTheDocument();
    expect(screen.getByText("Total XP")).toBeInTheDocument();
    expect(screen.getByText("Current Streak")).toBeInTheDocument();
    expect(screen.getByText("Longest Streak")).toBeInTheDocument();
    expect(screen.getByText("Badges Earned")).toBeInTheDocument();
    expect(screen.getByText("Lessons Completed")).toBeInTheDocument();
  });

  it("displays the correct level for the learner's XP", async () => {
    seedProgress({ ...defaultState(), xp: 120 });
    await renderStatsScreen();

    // 120 XP = Level 2 (level 2 starts at 50 XP, level 3 at 150 XP).
    expect(screen.getByText("Level 2")).toBeInTheDocument();
  });

  it("displays formatted XP", async () => {
    seedProgress({ ...defaultState(), xp: 250 });
    await renderStatsScreen();

    expect(screen.getByText("250")).toBeInTheDocument();
  });

  it("formats large XP with thousands separators", async () => {
    seedProgress({ ...defaultState(), xp: 1_234_567 });
    await renderStatsScreen();

    expect(screen.getByText("1,234,567")).toBeInTheDocument();
  });

  it("displays the current streak count", async () => {
    seedProgress({
      ...defaultState(),
      streak: { count: 3, lastActiveDate: "2026-06-16" },
    });
    await renderStatsScreen();

    expect(screen.getByText("🔥 3-day streak")).toBeInTheDocument();
  });

  it("shows no streak message when streak is zero", async () => {
    seedProgress(defaultState());
    await renderStatsScreen();

    expect(screen.getByText("🔥 0-day streak")).toBeInTheDocument();
  });

  it("displays the longest streak", async () => {
    seedProgress({
      ...defaultState(),
      activeDates: ["2026-06-14", "2026-06-15", "2026-06-16"],
    });
    await renderStatsScreen();

    // Three consecutive dates = longest streak of 3.
    expect(screen.getByText(/Longest: 🔥 3 days/)).toBeInTheDocument();
  });

  it("displays zero for longest streak when there are no active dates", async () => {
    seedProgress(defaultState());
    await renderStatsScreen();

    expect(screen.getByText(/Longest: 🔥 0 days/)).toBeInTheDocument();
  });

  it("displays badge progress", async () => {
    seedProgress({
      ...defaultState(),
      badges: ["badge-1", "badge-2", "badge-3"],
    });
    await renderStatsScreen();

    expect(screen.getByText("3 of 30 badges")).toBeInTheDocument();
  });

  it("displays zero badges when none earned", async () => {
    seedProgress(defaultState());
    await renderStatsScreen();

    expect(screen.getByText("0 of 30 badges")).toBeInTheDocument();
  });

  it("displays lessons completed count", async () => {
    seedProgress({
      ...defaultState(),
      lessons: {
        "lesson-1": { completed: true, bestAccuracy: 0.9 },
        "lesson-2": { completed: true, bestAccuracy: 0.8 },
        "lesson-3": { completed: false, bestAccuracy: 0 },
      },
    });
    await renderStatsScreen();

    expect(screen.getByText("2 lessons completed")).toBeInTheDocument();
  });

  it("displays zero lessons completed when none done", async () => {
    seedProgress(defaultState());
    await renderStatsScreen();

    expect(screen.getByText("0 lessons completed")).toBeInTheDocument();
  });

  it("displays the level message subtitle", async () => {
    seedProgress({ ...defaultState(), xp: 120 });
    await renderStatsScreen();

    // Level 2 is in range 1-4, so the message is "Just starting your journey".
    expect(screen.getByText("Just starting your journey")).toBeInTheDocument();
  });

  it("displays first login and active days in the summary", async () => {
    seedProgress({
      ...defaultState(),
      activeDates: ["2026-06-01", "2026-06-15"],
    });
    await renderStatsScreen();

    expect(screen.getByText("First login")).toBeInTheDocument();
    expect(screen.getByText("Active days")).toBeInTheDocument();
    expect(screen.getByText("2026-06-01")).toBeInTheDocument();
    // Two active dates.
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders the progress summary heading", async () => {
    seedProgress(defaultState());
    await renderStatsScreen();

    expect(screen.getByText("Progress Summary")).toBeInTheDocument();
  });

  it("renders the level progress heading", async () => {
    seedProgress(defaultState());
    await renderStatsScreen();

    expect(screen.getByText("Level Progress")).toBeInTheDocument();
  });

  it("renders the XP progress bar", async () => {
    seedProgress({ ...defaultState(), xp: 100 });
    await renderStatsScreen();

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });

  it("renders icons for each stat card", async () => {
    seedProgress(defaultState());
    await renderStatsScreen();

    expect(screen.getByText("🎯")).toBeInTheDocument();
    expect(screen.getByText("⭐")).toBeInTheDocument();
    expect(screen.getByText("📚")).toBeInTheDocument();
    // Fire emoji appears in the current streak card value text.
    expect(screen.getByText(/🔥 \d-day streak/)).toBeInTheDocument();
  });

  it("redirects when badges exceed 30 (migration guard)", async () => {
    seedProgress({
      ...defaultState(),
      badges: Array.from({ length: 31 }, (_, i) => `badge-${i}`),
    });
    await renderStatsScreen();

    // The component redirects to /badges, so the stats content should not be
    // visible.
    expect(screen.queryByText("My Progress")).not.toBeInTheDocument();
  });

  it("shows the current streak with fire emoji prefix", async () => {
    seedProgress({
      ...defaultState(),
      streak: { count: 5, lastActiveDate: "2026-06-16" },
    });
    await renderStatsScreen();

    expect(screen.getByText("🔥 5-day streak")).toBeInTheDocument();
  });
});
