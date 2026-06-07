import { screen } from "@testing-library/react";
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
    globalThis.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 1,
        lessons: { l1: { completed: true, bestAccuracy: 1 } },
        challenges: {},
        xp: 200,
        streak: { count: 3, lastActiveDate: "2026-06-07" },
        badges: ["first-steps"],
      }),
    );
    const user = userEvent.setup();
    renderApp(<ResetProgress />);

    // Opening the dialog alone does not reset anything.
    await user.click(screen.getByRole("button", { name: /reset progress/i }));
    expect(
      screen.getByRole("heading", { name: /reset all progress/i }),
    ).toBeVisible();

    // Confirming clears the stored progress.
    await user.click(screen.getByRole("button", { name: /reset everything/i }));
    const stored = globalThis.localStorage.getItem(STORAGE_KEY);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored as string).xp).toBe(0);
    expect(JSON.parse(stored as string).lessons).toEqual({});
  });
});
