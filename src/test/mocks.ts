/**
 * Test mocks for server API modules. These replace server function calls with
 * in-memory equivalents during vitest runs, preventing the bundler from
 * trying to resolve `bun:sqlite` and other server-only imports.
 *
 * Tests seed mock state via {@link setMockProgress} and
 * {@link setMockAiConfig} before rendering components.
 *
 * @module test/mocks
 * @author John Grimes
 */

import { vi } from "vitest";

import { defaultState } from "../domain/persistence/schema";

import type { AiConfig } from "../domain/persistence/aiConfig";
import type { SavedState } from "../domain/persistence/schema";

// --- In-memory mock state stores ---

let mockProgressState: SavedState | null = null;
let mockAiConfigValue: AiConfig | null = null;

/**
 * Seeds the mock progress server functions with the given saved state. The
 * next call to `loadProgress` will return this state.
 *
 * @param state - The saved state to seed.
 */
export function setMockProgress(state: SavedState): void {
  mockProgressState = state;
}

/** Resets the mock progress state to null (clean default on next load). */
export function clearMockProgress(): void {
  mockProgressState = null;
}

/**
 * Seeds the mock AI config server functions with the given config. The next
 * call to `loadAiConfig` will return this config.
 *
 * @param config - The AI config to seed, or null to clear.
 */
export function setMockAiConfig(config: AiConfig | null): void {
  mockAiConfigValue = config;
}

// --- Progress API mock ---

vi.mock("../server/api/progress", () => ({
  loadProgress: vi.fn(() => {
    if (mockProgressState) {
      return { ...mockProgressState };
    }
    return defaultState();
  }),
  saveProgress: vi.fn((args: { data: { state: SavedState } }) => {
    mockProgressState = args.data.state;
    return { ok: true };
  }),
  resetProgress: vi.fn(() => {
    const fresh = defaultState();
    mockProgressState = fresh;
    return fresh;
  }),
}));

// --- AI Config API mock ---

vi.mock("../server/api/aiConfig", () => ({
  loadAiConfig: vi.fn(() => mockAiConfigValue),
  saveAiConfig: vi.fn((args: { data: { config: AiConfig } }) => {
    mockAiConfigValue = args.data.config;
    return { ok: true };
  }),
  clearAiConfig: vi.fn(() => {
    mockAiConfigValue = null;
    return { ok: true };
  }),
}));

// --- Auth API mock ---

vi.mock("../server/api/auth", () => ({
  getCurrentUser: vi.fn(() => ({
    id: "test-user-1",
    displayName: "Test User",
  })),
  getPasskeyRegistrationOptions: vi.fn(),
  verifyPasskeyRegistration: vi.fn(),
  getPasskeyAuthenticationOptions: vi.fn(),
  verifyPasskeyAuthentication: vi.fn(),
  logout: vi.fn(),
}));
