import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// The completion screen fires confetti, which needs a real canvas; stub it.
vi.mock("canvas-confetti", () => ({ default: () => Promise.resolve() }));

import { LessonScreen } from "./LessonScreen";
import { findLesson } from "../../content";
import { clearMockProgress } from "../../test/mocks";
import { renderApp } from "../../test/renderApp";

import type { Question } from "../../domain/content/types";

const LESSON_ID = "alg-5g-expanding";
const lesson = findLesson("algebra", LESSON_ID)!;

async function renderLesson() {
  return renderApp(<LessonScreen />, {
    route: `/lesson/algebra/${LESSON_ID}`,
    path: "lesson/$trackId/$lessonId",
  });
}

// Answers the current question correctly and advances to the next step.
async function answerCorrectly(
  user: ReturnType<typeof userEvent.setup>,
  question: Question,
) {
  switch (question.type) {
    case "mcq": {
      const radios = screen.getAllByRole("radio");
      const correct = radios.find(
        (radio) => radio.getAttribute("value") === question.correctOptionId,
      );
      await user.click(correct!);

      break;
    }
    case "numeric": {
      await user.type(screen.getByRole("textbox"), question.accepted[0]);

      break;
    }
    case "shortText": {
      await user.type(screen.getByRole("textbox"), question.accepted[0]);

      break;
    }
    case "fillInTheBlank": {
      await user.type(screen.getByRole("textbox"), question.accepted[0]);

      break;
    }
    case "expression": {
      await user.type(screen.getByRole("textbox"), question.target);

      break;
    }
    // No default
  }
  await user.click(screen.getByRole("button", { name: /check answer/i }));
  await user.click(screen.getByRole("button", { name: /next|finish/i }));
}

// Advances through all learn cards to reach the practice phase.
async function advanceToPractice(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: "Next →" }));
  await user.click(screen.getByRole("button", { name: "Next →" }));
  await user.click(screen.getByRole("button", { name: "Start practice →" }));
}

beforeEach(() => {
  clearMockProgress();
});

describe("LessonScreen", () => {
  it("shows learn cards before any practice question", async () => {
    await renderLesson();
    expect(
      screen.getByText(/key idea: the distributive law/i),
    ).toBeInTheDocument();
    // No answer inputs are present during the learn phase.
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("advances from the last learn card into practice", async () => {
    const user = userEvent.setup();
    await renderLesson();
    await advanceToPractice(user);
    // The first practice question is an expression-type question with a
    // textbox input, not radio buttons.
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("reveals a worked explanation on a wrong answer", async () => {
    const user = userEvent.setup();
    await renderLesson();
    await advanceToPractice(user);

    // The first practice question is an expression-type. Type a wrong answer.
    const firstQuestion = lesson.practice[0];
    expect(firstQuestion.type).toBe("expression");
    await user.type(screen.getByRole("textbox"), "wrong answer");
    await user.click(screen.getByRole("button", { name: /check answer/i }));

    const status = screen.getByRole("status");
    expect(within(status).getByText(/not quite/i)).toBeInTheDocument();
    expect(within(status).getByText(/why:/i)).toBeInTheDocument();
  });

  it("routes to the completion screen after passing the mastery check", async () => {
    const user = userEvent.setup();
    await renderLesson();

    await advanceToPractice(user);

    // Answer every practice and mastery question correctly.
    for (const question of [...lesson.practice, ...lesson.mastery]) {
      await answerCorrectly(user, question);
    }

    expect(screen.getByText(/lesson mastered/i)).toBeInTheDocument();
    expect(screen.getByText(/100%/)).toBeInTheDocument();
  });
});
