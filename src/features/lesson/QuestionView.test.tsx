/**
 * Tests for the QuestionView component with short-text AI marking.
 *
 * Mocks the AI config server functions to verify marking behaviour with
 * and without AI configuration.
 *
 * @module features/lesson/QuestionView.test
 * @author John Grimes
 */

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { QuestionView } from "./QuestionView";
import { setMockAiConfig, clearMockProgress } from "../../test/mocks";
import { renderApp } from "../../test/renderApp";

import type { ShortTextQuestion } from "../../domain/content/types";
import type { AiConfig } from "../../domain/persistence/aiConfig";

/** A short-text question fixture. */
function shortTextQ(overrides?: Partial<ShortTextQuestion>): ShortTextQuestion {
  return {
    id: "q1",
    type: "shortText",
    prompt: [{ kind: "text", text: "What is 2+2?" }],
    explanation: [{ kind: "text", text: "It is 4." }],
    xp: 10,
    accepted: ["4"],
    ...overrides,
  };
}

/** A valid AI config fixture. */
const validConfig: AiConfig = {
  baseUrl: "https://example.com/v1",
  apiKey: "sk-test",
  model: "gpt-4o",
};

describe("QuestionView — short-text AI marking", () => {
  const onAnswered = vi.fn();
  const onContinue = vi.fn();

  beforeEach(() => {
    onAnswered.mockClear();
    onContinue.mockClear();
    clearMockProgress();
    setMockAiConfig(null);
  });

  it("shows loading state on submit when AI is configured", async () => {
    setMockAiConfig(validConfig);

    const user = userEvent.setup();
    await renderApp(
      <QuestionView
        question={shortTextQ()}
        onAnswered={onAnswered}
        onContinue={onContinue}
      />,
    );

    await user.type(screen.getByRole("textbox"), "4");
    await user.click(screen.getByRole("button", { name: /check answer/i }));

    expect(
      screen.getByRole("button", { name: /judging your answer/i }),
    ).toBeInTheDocument();
  });

  it("shows aiNotConfigured when no config is saved", async () => {
    const user = userEvent.setup();
    await renderApp(
      <QuestionView
        question={shortTextQ()}
        onAnswered={onAnswered}
        onContinue={onContinue}
      />,
    );

    await user.type(screen.getByRole("textbox"), "4");
    await user.click(screen.getByRole("button", { name: /check answer/i }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(/not configured/i);
    });
  });

  it("disables submit button during loading for short-text", async () => {
    setMockAiConfig(validConfig);

    const user = userEvent.setup();
    await renderApp(
      <QuestionView
        question={shortTextQ()}
        onAnswered={onAnswered}
        onContinue={onContinue}
      />,
    );

    await user.type(screen.getByRole("textbox"), "4");
    await user.click(screen.getByRole("button", { name: /check answer/i }));

    const judgingButton = screen.getByRole("button", {
      name: /judging your answer/i,
    });
    expect(judgingButton).toBeDisabled();
  });
});
