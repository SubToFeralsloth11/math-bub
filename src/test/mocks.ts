/**
 * Test mocks for server API modules. These replace server function calls with
 * localStorage-based equivalents during vitest runs, preventing the bundler
 * from trying to resolve `bun:sqlite` and other server-only imports.
 *
 * @module test/mocks
 * @author John Grimes
 */

import { vi } from "vitest";

import { parseSavedState, defaultState } from "../domain/persistence/schema";

// --- Progress API mock ---

vi.mock("../server/api/progress", () => ({
  loadProgress: vi.fn(() => {
    const raw = localStorage.getItem("studybub.progress.v1");
    return Promise.resolve(parseSavedState(raw));
  }),
  saveProgress: vi.fn(
    (data: { state: unknown }) => {
      localStorage.setItem(
        "studybub.progress.v1",
        JSON.stringify(data.state),
      );
      return Promise.resolve({ ok: true });
    },
  ),
  resetProgress: vi.fn(() => {
    localStorage.removeItem("studybub.progress.v1");
    return Promise.resolve(defaultState());
  }),
}));

// --- AI Config API mock ---

vi.mock("../server/api/aiConfig", () => ({
  loadAiConfig: vi.fn(async () => {
    const raw = localStorage.getItem("studybub.aiConfig.v1");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  }),
  saveAiConfig: vi.fn(
    (data: { config: unknown }) => {
      localStorage.setItem(
        "studybub.aiConfig.v1",
        JSON.stringify(data.config),
      );
      return Promise.resolve({ ok: true });
    },
  ),
  clearAiConfig: vi.fn(() => {
    localStorage.removeItem("studybub.aiConfig.v1");
    return Promise.resolve({ ok: true });
  }),
}));

// --- Auth API mock ---

vi.mock("../server/api/auth", () => ({
  getCurrentUser: vi.fn(async () => ({
    id: "test-user-1",
    displayName: "Test User",
  })),
  getPasskeyRegistrationOptions: vi.fn(),
  verifyPasskeyRegistration: vi.fn(),
  getPasskeyAuthenticationOptions: vi.fn(),
  verifyPasskeyAuthentication: vi.fn(),
  logout: vi.fn(),
}));
