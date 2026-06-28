import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BossChallengeScreen } from "./BossChallengeScreen";
import { defaultState } from "../../domain/persistence/schema";
import { clearMockProgress, setMockProgress } from "../../test/mocks";
import { renderApp } from "../../test/renderApp";

import type {
  AppContent,
  McqQuestion,
  Track,
} from "../../domain/content/types";

// The result screen fires confetti, which needs a real canvas; stub it.
vi.mock("canvas-confetti", () => ({ default: () => Promise.resolve() }));

function mcq(id: string, correct: string): McqQuestion {
  return {
    id,
    type: "mcq",
    prompt: [{ kind: "text", text: `Q ${id}` }],
    explanation: [{ kind: "text", text: "e" }],
    xp: 10,
    options: [
      { id: "a", label: [{ kind: "text", text: "A" }] },
      { id: "b", label: [{ kind: "text", text: "B" }] },
    ],
    correctOptionId: correct,
  };
}

const track: Track = {
  id: "time",
  subjectId: "maths",
  title: "Time (Year 4)",
  description: "d",
  lessons: [
    {
      id: "t1",
      order: 1,
      title: "Lesson 1",
      sourceRef: "X",
      learnCards: [
        { id: "c", heading: "k", body: [{ kind: "text", text: "x" }] },
      ],
      practice: [],
      mastery: [],
    },
  ],
  challenge: {
    id: "time-boss",
    title: "Boss challenge: Time review",
    sourceRef: "P",
    questions: [mcq("q1", "a"), mcq("q2", "b")],
    bonusXp: 80,
    passBadgeId: "boss-time",
  },
};

const content: AppContent = {
  subjects: [
    {
      id: "maths",
      title: "Maths",
      description: "Maths",
      icon: "🧮",
      accent: "#6D4AFF",
    },
  ],
  tracks: [track],
  badges: [
    {
      id: "boss-time",
      title: "Time boss slayer",
      description: "Pass the Time boss",
      criterion: "boss-pass:time",
      icon: "🏆",
    },
  ],
};

async function renderChallenge() {
  return renderApp(<BossChallengeScreen />, {
    route: "/challenge/time",
    path: "challenge/$trackId",
    content,
  });
}

function seedAllLessonsComplete() {
  setMockProgress({
    ...defaultState(),
    lessons: { t1: { completed: true, bestAccuracy: 1 } },
  });
}

beforeEach(() => {
  clearMockProgress();
});

describe("BossChallengeScreen", () => {
  it("shows a locked state until every lesson is complete", async () => {
    await renderChallenge();
    expect(screen.getByText(/boss challenge locked/i)).toBeInTheDocument();
  });

  it("plays through the questions and reports a score with rewards", async () => {
    seedAllLessonsComplete();
    const user = userEvent.setup();
    await renderChallenge();

    // Intro -> start.
    await user.click(screen.getByRole("button", { name: /start challenge/i }));

    // Answer question 1 correctly (option a).
    const q1 = screen.getAllByRole("radio");
    await user.click(q1.find((r) => r.getAttribute("value") === "a")!);
    await user.click(screen.getByRole("button", { name: /submit answer/i }));

    // Answer question 2 correctly (option b) and finish.
    const q2 = screen.getAllByRole("radio");
    await user.click(q2.find((r) => r.getAttribute("value") === "b")!);
    await user.click(screen.getByRole("button", { name: /finish/i }));

    expect(screen.getByText(/challenge complete/i)).toBeInTheDocument();
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
    expect(screen.getByText(/\+80 bonus XP/i)).toBeInTheDocument();
  });

  it("does not render a Reference control on the boss challenge screen", async () => {
    seedAllLessonsComplete();
    const user = userEvent.setup();
    await renderChallenge();
    await user.click(screen.getByRole("button", { name: /start challenge/i }));
    expect(
      screen.queryByRole("button", { name: /reference/i }),
    ).not.toBeInTheDocument();
  });
});
