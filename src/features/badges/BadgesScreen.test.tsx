import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { BadgesScreen } from "./BadgesScreen";
import { defaultState } from "../../domain/persistence/schema";
import { clearMockProgress, setMockProgress } from "../../test/mocks";
import { renderApp } from "../../test/renderApp";

import type { AppContent } from "../../domain/content/types";

const content: AppContent = {
  subjects: [],
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
  clearMockProgress();
});

describe("BadgesScreen", () => {
  it("renders earned badges distinctly from unearned ones", async () => {
    setMockProgress({
      ...defaultState(),
      badges: ["first-steps"],
    });
    await renderApp(<BadgesScreen />, { content });

    expect(screen.getByText(/1 of 2 earned/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first steps: earned/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/completionist: not yet earned/i),
    ).toBeInTheDocument();
  });
});
