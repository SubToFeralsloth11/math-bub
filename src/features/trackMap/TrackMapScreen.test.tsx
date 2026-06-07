import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { TrackMapScreen } from "./TrackMapScreen";
import { STORAGE_KEY } from "../../domain/persistence/schema";
import { renderApp } from "../../test/renderApp";

import type { AppContent, Track } from "../../domain/content/types";

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

const content: AppContent = { tracks: [track], badges: [] };

function renderMap() {
  return renderApp(<TrackMapScreen />, {
    route: "/track/geometry",
    path: "/track/:trackId",
    content,
  });
}

beforeEach(() => {
  globalThis.localStorage.clear();
});

describe("TrackMapScreen", () => {
  it("shows the first lesson as available and the rest locked in a fresh track", () => {
    renderMap();
    expect(
      screen.getByRole("link", { name: /lesson 1: lesson 1 \(available\)/i }),
    ).toBeInTheDocument();
    // Locked lessons are not links and cannot be navigated to.
    expect(
      screen.queryByRole("link", { name: /lesson 2/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByLabelText(/lesson 2: lesson 2 \(locked\)/i),
    ).toHaveAttribute("aria-disabled", "true");
  });

  it("reflects saved completion by unlocking the next lesson", () => {
    // Seed storage so lesson 1 is complete before the provider hydrates.
    globalThis.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        lessons: { l1: { completed: true, bestAccuracy: 1 } },
        challenges: {},
        xp: 50,
        streak: { count: 1, lastActiveDate: "2026-06-07" },
        badges: [],
      }),
    );
    renderMap();
    expect(
      screen.getByRole("link", { name: /lesson 1: lesson 1 \(complete\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /lesson 2: lesson 2 \(available\)/i }),
    ).toBeInTheDocument();
  });

  it("keeps the boss challenge locked until all lessons are complete", () => {
    renderMap();
    expect(
      screen.getByLabelText(/boss challenge \(locked\)/i),
    ).toBeInTheDocument();
  });
});
