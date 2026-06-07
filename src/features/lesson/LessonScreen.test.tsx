import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// The completion screen fires confetti, which needs a real canvas; stub it.
vi.mock("canvas-confetti", () => ({ default: () => Promise.resolve() }));

import { LessonScreen } from "./LessonScreen";
import { findLesson } from "../../content";
import { renderApp } from "../../test/renderApp";

import type { Question } from "../../domain/content/types";

const LESSON_ID = "alg-5g-expanding-brackets";
const lesson = findLesson("algebra", LESSON_ID)!;

function renderLesson() {
  return renderApp(<LessonScreen />, {
    route: `/lesson/algebra/${LESSON_ID}`,
    path: "/lesson/:trackId/:lessonId",
  });
}

// Answers the current question correctly and advances to the next step.
async function answerCorrectly(
  user: ReturnType<typeof userEvent.setup>,
  question: Question,
) {
  if (question.type === "mcq") {
    const radios = screen.getAllByRole("radio");
    const correct = radios.find(
      (radio) => radio.getAttribute("value") === question.correctOptionId,
    );
    await user.click(correct!);
  } else if (question.type === "numeric") {
    await user.type(screen.getByRole("textbox"), question.accepted[0]);
  } else {
    // Expression: typing the target itself is an accepted equivalent form.
    await user.type(screen.getByRole("textbox"), question.target);
  }
  await user.click(screen.getByRole("button", { name: /check answer/i }));
  await user.click(screen.getByRole("button", { name: /next|finish/i }));
}

beforeEach(() => {
  globalThis.localStorage.clear();
});

describe("LessonScreen", () => {
  it("shows learn cards before any practice question", () => {
    renderLesson();
    expect(
      screen.getByText(/key idea: the distributive law/i),
    ).toBeInTheDocument();
    // No answer inputs are present during the learn phase.
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("advances from the last learn card into practice", async () => {
    const user = userEvent.setup();
    renderLesson();
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /start practice/i }));
    // The first practice question is an MCQ, so radios now appear.
    expect(screen.getAllByRole("radio").length).toBeGreaterThan(0);
  });

  it("reveals a worked explanation on a wrong answer", async () => {
    const user = userEvent.setup();
    renderLesson();
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /start practice/i }));

    // Select a deliberately wrong option, then check.
    const firstQuestion = lesson.practice[0];
    if (firstQuestion.type !== "mcq") throw new Error("expected an MCQ");
    const wrong = screen
      .getAllByRole("radio")
      .find(
        (radio) =>
          radio.getAttribute("value") !== firstQuestion.correctOptionId,
      );
    await user.click(wrong!);
    await user.click(screen.getByRole("button", { name: /check answer/i }));

    const status = screen.getByRole("status");
    expect(within(status).getByText(/not quite/i)).toBeInTheDocument();
    expect(within(status).getByText(/why:/i)).toBeInTheDocument();
  });

  it("routes to the completion screen after passing the mastery check", async () => {
    const user = userEvent.setup();
    renderLesson();

    // Advance through both learn cards.
    await user.click(screen.getByRole("button", { name: /next/i }));
    await user.click(screen.getByRole("button", { name: /start practice/i }));

    // Answer every practice and mastery question correctly.
    for (const question of [...lesson.practice, ...lesson.mastery]) {
      await answerCorrectly(user, question);
    }

    expect(screen.getByText(/lesson mastered/i)).toBeInTheDocument();
    expect(screen.getByText(/100%/)).toBeInTheDocument();
  });
});
