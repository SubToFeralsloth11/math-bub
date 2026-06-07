import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { BadgesScreen } from "./BadgesScreen";
import { STORAGE_KEY } from "../../domain/persistence/schema";
import { renderApp } from "../../test/renderApp";

import type { AppContent } from "../../domain/content/types";

const content: AppContent = {
  tracks: [],
  badges: [
    {
      id: "first-steps",
      title: "First steps",
      description: "Complete your first lesson",
      criterion: "first-lesson",
      icon: "🌱",
    },
    {
      id: "completionist",
      title: "Completionist",
      description: "Master every track",
      criterion: "all-tracks-complete",
      icon: "👑",
    },
  ],
};

beforeEach(() => {
  globalThis.localStorage.clear();
});

describe("BadgesScreen", () => {
  it("renders earned badges distinctly from unearned ones", () => {
    globalThis.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        lessons: {},
        challenges: {},
        xp: 0,
        streak: { count: 0, lastActiveDate: "" },
        badges: ["first-steps"],
      }),
    );
    renderApp(<BadgesScreen />, { content });

    expect(screen.getByText(/1 of 2 earned/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first steps: earned/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/completionist: not yet earned/i),
    ).toBeInTheDocument();
  });
});
