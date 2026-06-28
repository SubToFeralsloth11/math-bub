import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// The completion screen fires confetti, which needs a real canvas; stub it.
vi.mock("canvas-confetti", () => ({ default: () => Promise.resolve() }));

import { LessonScreen } from "./LessonScreen";
import { appContent, findLesson } from "../../content";
import { clearMockProgress } from "../../test/mocks";
import { renderApp } from "../../test/renderApp";

import type { AppContent, Question } from "../../domain/content/types";

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

// --- Reference surface (US1/US2/US3) ---

const REFERENCE_LESSON_ID = "alg-5a-language";
const referenceLesson = findLesson("algebra", REFERENCE_LESSON_ID)!;

async function renderReferenceLesson(): Promise<void> {
  await renderApp(<LessonScreen />, {
    route: `/lesson/algebra/${REFERENCE_LESSON_ID}`,
    path: "lesson/$trackId/$lessonId",
  });
}

describe("LessonScreen - Reference control", () => {
  it("renders the Reference control during practice", async () => {
    const user = userEvent.setup();
    await renderReferenceLesson();
    await advanceToPractice(user);
    expect(
      screen.getByRole("button", { name: /reference/i }),
    ).toBeInTheDocument();
  });

  it("renders the Reference control during mastery", async () => {
    const user = userEvent.setup();
    await renderReferenceLesson();
    await advanceToPractice(user);
    // Answer through every practice question to reach the mastery phase.
    for (const question of referenceLesson.practice) {
      await answerCorrectly(user, question);
    }
    expect(
      screen.getByRole("button", { name: /reference/i }),
    ).toBeInTheDocument();
  });

  it("opens the surface on the first learn card when the question has no refersTo", async () => {
    const user = userEvent.setup();
    await renderReferenceLesson();
    await advanceToPractice(user);
    await user.click(screen.getByRole("button", { name: /reference/i }));
    expect(
      screen.getByRole("dialog", { name: /reference/i }),
    ).toBeInTheDocument();
    // No refersTo on shipped content yet (US5 backfill is later), so the
    // surface opens on the first learn card of the lesson.
    expect(
      screen.getByText(referenceLesson.learnCards[0].heading),
    ).toBeInTheDocument();
  });

  it("dims and inerts the underlying question while the surface is open", async () => {
    const user = userEvent.setup();
    await renderReferenceLesson();
    await advanceToPractice(user);
    await user.click(screen.getByRole("button", { name: /reference/i }));
    // The first practice question is an MCQ whose answer input is no longer
    // in the accessibility tree while the Reference surface is open.
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
  });

  it("closes via the close control and returns focus to the Reference control", async () => {
    const user = userEvent.setup();
    await renderReferenceLesson();
    await advanceToPractice(user);
    const control = screen.getByRole("button", { name: /reference/i });
    await user.click(control);
    await user.click(screen.getByRole("button", { name: /close reference/i }));
    expect(
      screen.queryByRole("dialog", { name: /reference/i }),
    ).not.toBeInTheDocument();
    expect(control).toHaveFocus();
  });

  it("closes via the backdrop and returns focus to the Reference control", async () => {
    const user = userEvent.setup();
    await renderReferenceLesson();
    await advanceToPractice(user);
    const control = screen.getByRole("button", { name: /reference/i });
    await user.click(control);
    // The scrim backdrop dismisses the surface.
    await user.click(document.querySelector('[data-testid="ref-scrim"]')!);
    expect(
      screen.queryByRole("dialog", { name: /reference/i }),
    ).not.toBeInTheDocument();
    expect(control).toHaveFocus();
  });

  it("closes via the Escape key and returns focus to the Reference control", async () => {
    const user = userEvent.setup();
    await renderReferenceLesson();
    await advanceToPractice(user);
    const control = screen.getByRole("button", { name: /reference/i });
    await user.click(control);
    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("dialog", { name: /reference/i }),
    ).not.toBeInTheDocument();
    expect(control).toHaveFocus();
  });

  it("does not render the Reference control on the outcome screen", async () => {
    // Drive the algebra expanding lesson (proven completable end-to-end) to
    // its passed outcome and confirm the header control disappears there.
    const user = userEvent.setup();
    await renderApp(<LessonScreen />, {
      route: `/lesson/algebra/${LESSON_ID}`,
      path: "lesson/$trackId/$lessonId",
    });
    await advanceToPractice(user);
    // The expanding lesson is fully completable via the shared answer helper
    // (no matching question); duplicating that proven loop reaches the passed
    // outcome so the header control absence can be asserted there.
    for (const question of [...lesson.practice, ...lesson.mastery]) {
      await answerCorrectly(user, question);
    }

    expect(screen.getByText(/lesson mastered/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /reference/i }),
    ).not.toBeInTheDocument();
  });
});

describe("LessonScreen - Reference during the learn phase (US2)", () => {
  it("opens Reference on the card being studied", async () => {
    const user = userEvent.setup();
    await renderReferenceLesson();
    // Advance to the second learn card.
    await user.click(screen.getByRole("button", { name: "Next →" }));
    await user.click(screen.getByRole("button", { name: /reference/i }));
    expect(
      screen.getByRole("dialog", { name: /reference/i }),
    ).toBeInTheDocument();
    // The surface opens on the second of three cards (the one being studied),
    // distinguishable from the dimmed underlying copy via the index indicator.
    expect(screen.getByText(/2 \/ 3 cards/i)).toBeInTheDocument();
  });

  it("browsing in Reference does not move the study position", async () => {
    const user = userEvent.setup();
    await renderReferenceLesson();
    // Studying learn card 1 (heading "Key idea: the building blocks").
    await user.click(screen.getByRole("button", { name: /reference/i }));
    // Browse to the last card then close.
    await user.click(screen.getByRole("button", { name: /next card/i }));
    await user.click(screen.getByRole("button", { name: /next card/i }));
    await user.click(screen.getByRole("button", { name: /close reference/i }));
    // The study position is still the first card.
    expect(
      screen.getByText(referenceLesson.learnCards[0].heading),
    ).toBeInTheDocument();
  });
});

describe("LessonScreen - question-driven default (US3)", () => {
  it("opens Reference on the card named by the question's refersTo", async () => {
    const user = userEvent.setup();
    // Author a fixture content copy that links the first practice question to
    // the second learn card.
    await renderApp(<LessonScreen />, {
      route: `/lesson/algebra/${REFERENCE_LESSON_ID}`,
      path: "lesson/$trackId/$lessonId",
      content: referenceContentWithRefersTo(),
    });
    await advanceToPractice(user);
    await user.click(screen.getByRole("button", { name: /reference/i }));
    expect(
      screen.getByText(referenceLesson.learnCards[1].heading),
    ).toBeInTheDocument();
  });
});

// Builds a copy of the real content with the first algebra lesson's first
// practice question linked to the second learn card.
function referenceContentWithRefersTo(): AppContent {
  // Clone the real authored content and link the first practice question to
  // the second learn card.
  const clone: AppContent = structuredClone(appContent);
  const track = clone.tracks.find((candidate) => candidate.id === "algebra")!;
  const lesson = track.lessons.find(
    (candidate) => candidate.id === REFERENCE_LESSON_ID,
  )!;
  lesson.practice[0].refersTo = referenceLesson.learnCards[1].id;
  return clone;
}
