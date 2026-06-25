/**
 * Tests for the AI config context provider.
 *
 * Verifies server-backed load/save/clear operations, loading state
 * handling, and error resilience.
 *
 * @module state/aiConfigContext.test
 * @author John Grimes
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock the server functions used by the AI config provider.
const mockLoadAiConfig = vi.fn();
const mockSaveAiConfig = vi.fn();
const mockClearAiConfig = vi.fn();

vi.mock("../server/api/aiConfig", () => ({
  loadAiConfig: (...args: unknown[]) => mockLoadAiConfig(...args),
  saveAiConfig: (...args: unknown[]) => mockSaveAiConfig(...args),
  clearAiConfig: (...args: unknown[]) => mockClearAiConfig(...args),
}));

import { AiConfigProvider, useAiConfig } from "./aiConfigContext";

import type { AiConfig } from "../domain/persistence/aiConfig";

/** A valid AI config fixture. */
const validConfig: AiConfig = {
  baseUrl: "https://api.example.com/v1/chat/completions",
  apiKey: "sk-test-key",
  model: "gpt-4o",
};

/** Test component that reads from the AI config context. */
function Consumer() {
  const { aiConfig, setAiConfig, loading } = useAiConfig();
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="config">
        {aiConfig ? JSON.stringify(aiConfig) : "null"}
      </span>
      <button data-testid="save" onClick={() => setAiConfig(validConfig)}>
        Save Config
      </button>
      <button data-testid="clear" onClick={() => setAiConfig(null)}>
        Clear Config
      </button>
    </div>
  );
}

function renderProvider() {
  return render(
    <AiConfigProvider>
      <Consumer />
    </AiConfigProvider>,
  );
}

describe("AiConfigProvider", () => {
  beforeEach(() => {
    mockLoadAiConfig.mockReset();
    mockSaveAiConfig.mockReset();
    mockClearAiConfig.mockReset();
  });

  it("starts in loading state and resolves to not loading after mount", async () => {
    mockLoadAiConfig.mockResolvedValueOnce(null);

    renderProvider();

    // Initially loading.
    expect(screen.getByTestId("loading").textContent).toBe("true");

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });
  });

  it("loads config from server on mount", async () => {
    mockLoadAiConfig.mockResolvedValueOnce(validConfig);

    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId("config").textContent).toBe(
        JSON.stringify(validConfig),
      );
    });
    expect(mockLoadAiConfig).toHaveBeenCalledTimes(1);
  });

  it("shows null config when server returns null", async () => {
    mockLoadAiConfig.mockResolvedValueOnce(null);

    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId("config").textContent).toBe("null");
    });
  });

  it("handles server error gracefully on load", async () => {
    mockLoadAiConfig.mockRejectedValueOnce(new Error("Server error"));

    renderProvider();

    await waitFor(() => {
      // Should still finish loading and show null config.
      expect(screen.getByTestId("loading").textContent).toBe("false");
      expect(screen.getByTestId("config").textContent).toBe("null");
    });
  });

  it("calls saveAiConfig when setAiConfig is called with a config", async () => {
    const user = userEvent.setup();
    mockLoadAiConfig.mockResolvedValueOnce(null);
    mockSaveAiConfig.mockResolvedValueOnce({ ok: true });

    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    await user.click(screen.getByTestId("save"));

    await waitFor(() => {
      expect(mockSaveAiConfig).toHaveBeenCalledWith({
        data: { config: validConfig },
      });
    });
  });

  it("calls clearAiConfig when setAiConfig is called with null", async () => {
    const user = userEvent.setup();
    mockLoadAiConfig.mockResolvedValueOnce(validConfig);
    mockClearAiConfig.mockResolvedValueOnce({ ok: true });

    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    await user.click(screen.getByTestId("clear"));

    await waitFor(() => {
      expect(mockClearAiConfig).toHaveBeenCalled();
    });
  });

  it("updates local state even if server save fails", async () => {
    const user = userEvent.setup();
    mockLoadAiConfig.mockResolvedValueOnce(null);
    mockSaveAiConfig.mockRejectedValueOnce(new Error("Save failed"));

    renderProvider();

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    await user.click(screen.getByTestId("save"));

    await waitFor(() => {
      // Local state should still be updated with the config.
      expect(screen.getByTestId("config").textContent).toBe(
        JSON.stringify(validConfig),
      );
    });
  });

  it("throws when useAiConfig is called outside provider", () => {
    // Suppress error output from the expected throw.
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    function BadConsumer() {
      useAiConfig();
      return null;
    }

    expect(() => render(<BadConsumer />)).toThrow(
      "useAiConfig must be used within an AiConfigProvider",
    );

    consoleError.mockRestore();
  });
});
