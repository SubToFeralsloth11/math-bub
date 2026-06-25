import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { ResetProgress } from "./ResetProgress";
import { defaultState } from "../../domain/persistence/schema";
import { clearMockProgress, setMockProgress } from "../../test/mocks";
import { renderApp } from "../../test/renderApp";

beforeEach(() => {
  clearMockProgress();
});

describe("ResetProgress", () => {
  it("requires confirmation before clearing progress", async () => {
    // Seed the mock with some progress.
    setMockProgress({
      ...defaultState(),
      xp: 500,
    });
    const user = userEvent.setup();
    await renderApp(<ResetProgress />);

    // Opening the dialog alone does not reset anything.
    await user.click(screen.getByRole("button", { name: /reset progress/i }));
    expect(
      screen.getByRole("heading", { name: /reset all progress/i }),
    ).toBeVisible();

    // Confirming resets via the server function.
    await user.click(screen.getByRole("button", { name: /reset everything/i }));

    // Wait for the async reset to complete.
    await waitFor(
      () => {
        // The UI should reflect the reset - the dialog closes and
        // the reset button remains visible.
        expect(
          screen.getByRole("button", { name: /reset progress/i }),
        ).toBeInTheDocument();
        expect(
          screen.queryByRole("heading", { name: /reset all progress/i }),
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});
