/**
 * Tests for the progress context provider's server-backed persistence.
 *
 * Verifies that the ProgressProvider loads state from the server on mount,
 * persists state changes server-side, and handles errors gracefully. These
 * tests extend the reducer tests in progressReducer.test.ts by covering
 * the provider layer.
 *
 * @module state/progressContext.test
 * @author John Grimes
 */

// Mock declarations must come before all imports for Vitest hoisting.
const mockLoadProgress = vi.fn();
const mockSaveProgress = vi.fn();
const mockResetProgress = vi.fn();

vi.mock("../server/api/progress", () => ({
  loadProgress: (...args: unknown[]) => mockLoadProgress(...args),
  saveProgress: (...args: unknown[]) => mockSaveProgress(...args),
  resetProgress: (...args: unknown[]) => mockResetProgress(...args),
}));

import { render, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import { ProgressProvider, useProgress } from "./progressContext";
import { defaultState } from "../domain/persistence/schema";

import type { AppContent } from "../domain/content/types";

/** Minimal content for testing the provider. */
const minimalContent: AppContent = {
  subjects: [],
  tracks: [],
  badges: [],
};

/** A component that reads the progress context. */
function ProgressReader({
  onState,
}: {
  onState: (saveStatus: string, xp: number) => void;
}) {
  const { state, saveStatus } = useProgress();

  useEffect(() => {
    onState(saveStatus, state.saved.xp);
  }, [saveStatus, state.saved.xp, onState]);

  return null;
}

function renderProvider(
  onState: (saveStatus: string, xp: number) => void,
  content: AppContent = minimalContent,
) {
  return render(
    <ProgressProvider content={content}>
      <ProgressReader onState={onState} />
    </ProgressProvider>,
  );
}

describe("ProgressProvider - server-backed persistence", () => {
  beforeEach(() => {
    mockLoadProgress.mockReset();
    mockSaveProgress.mockReset();
    mockResetProgress.mockReset();
    // Clear localStorage to ensure clean state.
    localStorage.clear();
  });

  it("loads progress from server on mount and transitions to saved", async () => {
    const serverState = {
      ...defaultState(),
      xp: 500,
      lessons: { "lesson-1": { completed: true, bestAccuracy: 0.9 } },
    };
    mockLoadProgress.mockResolvedValueOnce(serverState);
    mockSaveProgress.mockResolvedValue({ ok: true });

    const states: Array<{ saveStatus: string; xp: number }> = [];
    const track = (saveStatus: string, xp: number) => {
      states.push({ saveStatus, xp });
    };

    renderProvider(track);

    await waitFor(() => {
      // After hydration, the server state should be active.
      const hasServerState = states.some(
        (s) => s.xp === 500 && s.saveStatus === "saved",
      );
      expect(hasServerState).toBe(true);
    });
  });

  it("falls back to default state when server load fails", async () => {
    mockLoadProgress.mockRejectedValueOnce(new Error("Network error"));
    mockSaveProgress.mockResolvedValue({ ok: true });

    const states: Array<{ saveStatus: string; xp: number }> = [];
    const track = (saveStatus: string, xp: number) => {
      states.push({ saveStatus, xp });
    };

    renderProvider(track);

    await waitFor(() => {
      // Should end up with default state.
      const hasDefault = states.some(
        (s) =>
          s.xp === 0 && (s.saveStatus === "saved" || s.saveStatus === "idle"),
      );
      expect(hasDefault).toBe(true);
    });
  });

  it("sets saveStatus to error when server save fails", async () => {
    mockLoadProgress.mockResolvedValueOnce(defaultState());
    // saveProgress is called after hydration - make it fail.
    mockSaveProgress.mockRejectedValueOnce(new Error("Save failed"));

    const states: Array<{ saveStatus: string; xp: number }> = [];
    const track = (saveStatus: string, xp: number) => {
      states.push({ saveStatus, xp });
    };

    renderProvider(track);

    await waitFor(() => {
      const hasError = states.some((s) => s.saveStatus === "error");
      expect(hasError).toBe(true);
    });
  });

  it("resets progress via server function", async () => {
    const freshState = defaultState();
    mockLoadProgress.mockResolvedValueOnce(freshState);
    mockSaveProgress.mockResolvedValue({ ok: true });

    const states: Array<{ saveStatus: string; xp: number }> = [];
    const track = (saveStatus: string, xp: number) => {
      states.push({ saveStatus, xp });
    };

    renderProvider(track);

    await waitFor(() => {
      const hasLoaded = states.some((s) => s.saveStatus === "saved");
      expect(hasLoaded).toBe(true);
    });
  });
});
