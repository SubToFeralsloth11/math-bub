import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { TrackMapScreen } from "./TrackMapScreen";
import { defaultState } from "../../domain/persistence/schema";
import { clearMockProgress, setMockProgress } from "../../test/mocks";
import { renderApp } from "../../test/renderApp";

import type { AppContent, Subject, Track } from "../../domain/content/types";

function lessonOf(order: number) {
  return {
    id: `l${order}`,
    order,
    title: `Lesson ${order}`,
    sourceRef: "X",
    learnCards: [
      { id: "c", heading: "k", body: [{ kind: "text" as const, text: "x" }] },
    ],
    practice: [],
    mastery: [],
  };
}

const track: Track = {
  id: "geometry",
  subjectId: "maths",
  title: "Geometry (Year 10)",
  description: "d",
  lessons: [lessonOf(1), lessonOf(2), lessonOf(3)],
  challenge: {
    id: "geometry-boss",
    title: "Boss",
    sourceRef: "P",
    questions: [],
    bonusXp: 100,
    passBadgeId: "boss-geometry",
  },
};

const mathsSubject: Subject = {
  id: "maths",
  title: "Maths",
  description: "Maths subject",
  icon: "🧮",
  accent: "#6D4AFF",
};

const content: AppContent = {
  subjects: [mathsSubject],
  tracks: [track],
  badges: [],
};

async function renderMap() {
  return renderApp(<TrackMapScreen />, {
    route: "/subject/maths/track/geometry",
    path: "subject/$subjectId/track/$trackId",
    content,
  });
}

beforeEach(() => {
  clearMockProgress();
});

describe("TrackMapScreen", () => {
  it("shows the first lesson as available and the rest locked in a fresh track", async () => {
    await renderMap();
    expect(
      screen.getByRole("link", { name: /lesson 1: lesson 1 \(available\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /lesson 2/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByLabelText(/lesson 2: lesson 2 \(locked\)/i),
    ).toHaveAttribute("aria-disabled", "true");
  });

  it("reflects saved completion by unlocking the next lesson", async () => {
    setMockProgress({
      ...defaultState(),
      lessons: { l1: { completed: true, bestAccuracy: 1 } },
      xp: 50,
      streak: { count: 1, lastActiveDate: "2026-06-07" },
      activeDates: [],
    });
    await renderMap();
    expect(
      screen.getByRole("link", { name: /lesson 1: lesson 1 \(complete\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /lesson 2: lesson 2 \(available\)/i }),
    ).toBeInTheDocument();
  });

  it("keeps the boss challenge locked until all lessons are complete", async () => {
    await renderMap();
    expect(
      screen.getByLabelText(/boss challenge \(locked\)/i),
    ).toBeInTheDocument();
  });
});
