import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { Feedback } from "./Feedback";

import type { Question } from "../../domain/content/types";
import type { MarkResult } from "../../domain/marking/markResult";

/** A minimal question fixture for Feedback. */
function fixtureQ(overrides?: Partial<Question>): Question {
  return {
    id: "q1",
    type: "shortText",
    prompt: [{ kind: "text", text: "What is 2+2?" }],
    explanation: [{ kind: "text", text: "It is 4." }],
    xp: 10,
    accepted: ["4"],
    ...overrides,
  } as Question;
}

/** Renders Feedback inside a MemoryRouter so Link components work. */
function renderFeedback(result: MarkResult, question?: Question) {
  return render(
    <MemoryRouter>
      <Feedback result={result} question={question ?? fixtureQ()} />
    </MemoryRouter>,
  );
}

describe("Feedback", () => {
  it("renders correct without feedback", () => {
    renderFeedback({ status: "correct" });
    expect(screen.getByRole("status")).toHaveTextContent(/correct/i);
    expect(screen.getByRole("status")).toHaveTextContent(/\+10 XP/);
    expect(screen.queryByText(/why:/i)).toBeInTheDocument();
  });

  it("renders correct with feedback", () => {
    renderFeedback({
      status: "correct",
      feedback: "Great job! You identified the answer correctly.",
    });
    expect(screen.getByRole("status")).toHaveTextContent(/correct/i);
    expect(
      screen.getByText("Great job! You identified the answer correctly."),
    ).toBeInTheDocument();
    expect(screen.getByText(/why:/i)).toBeInTheDocument();
  });

  it("renders incorrect without feedback", () => {
    renderFeedback({ status: "incorrect" });
    expect(screen.getByRole("status")).toHaveTextContent(/not quite/i);
    expect(screen.getByText(/why:/i)).toBeInTheDocument();
  });

  it("renders incorrect with feedback", () => {
    renderFeedback({
      status: "incorrect",
      feedback: "Not quite. The answer is 4, not 5.",
    });
    expect(screen.getByRole("status")).toHaveTextContent(/not quite/i);
    expect(
      screen.getByText("Not quite. The answer is 4, not 5."),
    ).toBeInTheDocument();
    expect(screen.getByText(/why:/i)).toBeInTheDocument();
  });

  it("renders unreadable", () => {
    renderFeedback({ status: "unreadable" });
    expect(screen.getByText(/couldn't read that/i)).toBeInTheDocument();
    // Unreadable should not show the worked explanation.
    expect(screen.queryByText(/why:/i)).not.toBeInTheDocument();
  });

  it("renders aiNotConfigured with message and settings link", () => {
    renderFeedback({
      status: "aiNotConfigured",
      message: "AI marking is not configured.",
    });
    expect(screen.getByRole("status")).toHaveTextContent(
      /AI marking is not configured/i,
    );
    expect(
      screen.getByRole("link", { name: /go to settings/i }),
    ).toHaveAttribute("href", "/settings");
  });

  it("renders aiError with message, retry button, and settings link", () => {
    const onRetry = vi.fn();
    render(
      <MemoryRouter>
        <Feedback
          result={{
            status: "aiError",
            message: "Could not reach the AI service.",
          }}
          question={fixtureQ()}
          onRetry={onRetry}
        />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/could not reach the ai service/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /settings/i })).toHaveAttribute(
      "href",
      "/settings",
    );
  });

  it("does not show retry button for aiNotConfigured", () => {
    const onRetry = vi.fn();
    render(
      <MemoryRouter>
        <Feedback
          result={{
            status: "aiNotConfigured",
            message: "Configure first.",
          }}
          question={fixtureQ()}
          onRetry={onRetry}
        />
      </MemoryRouter>,
    );
    expect(
      screen.queryByRole("button", { name: /try again/i }),
    ).not.toBeInTheDocument();
  });
});
