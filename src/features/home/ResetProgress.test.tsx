import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { ResetProgress } from "./ResetProgress";
import { STORAGE_KEY } from "../../domain/persistence/schema";
import { renderApp } from "../../test/renderApp";

beforeEach(() => {
  globalThis.localStorage.clear();
});

describe("ResetProgress", () => {
  it("requires confirmation before clearing progress", async () => {
    // Seed localStorage with some progress.
    globalThis.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ xp: 500, version: 1 }),
    );
    const user = userEvent.setup();
    renderApp(<ResetProgress />);

    // Opening the dialog alone does not reset anything.
    await user.click(screen.getByRole("button", { name: /reset progress/i }));
    expect(
      screen.getByRole("heading", { name: /reset all progress/i }),
    ).toBeVisible();

    // Before confirming, progress should still be intact.
    expect(globalThis.localStorage.getItem(STORAGE_KEY)).not.toBeNull();

    // Confirming clears the stored progress (async via server function).
    await user.click(screen.getByRole("button", { name: /reset everything/i }));

    // Wait for the async reset and re-save to complete.
    await waitFor(
      () => {
        const stored = globalThis.localStorage.getItem(STORAGE_KEY);
        expect(stored).not.toBeNull();
        expect(JSON.parse(stored!).xp).toBe(0);
        expect(JSON.parse(stored!).lessons).toEqual({});
      },
      { timeout: 3000 },
    );
  });
});
