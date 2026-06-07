/**
 * localStorage access for MathBub progress. These functions are the only place
 * that touches the storage API; the parse/recover logic they rely on is pure and
 * lives in `schema.ts` (see contracts/persistence.md).
 *
 * @module domain/persistence/storage
 */

import {
  defaultState,
  parseSavedState,
  STORAGE_KEY,
  type SavedState,
} from "./schema";

/**
 * The subset of the Web Storage API that MathBub depends on. Accepting this
 * interface (rather than the global directly) lets tests inject stubs.
 */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/**
 * Resolves the default storage, returning null when the environment has no
 * localStorage (e.g. SSR or a sandboxed iframe).
 *
 * @returns The global localStorage, or null when unavailable.
 */
function defaultStorage(): StorageLike | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    // Accessing localStorage can throw in privacy modes; treat as unavailable.
    return null;
  }
}

/**
 * Loads saved progress, recovering to a clean default for missing, corrupt, or
 * version-incompatible data, and surviving a storage backend that throws.
 *
 * @param storage - The storage backend; defaults to the global localStorage.
 * @returns A valid {@link SavedState}.
 */
export function loadProgress(
  storage: StorageLike | null = defaultStorage(),
): SavedState {
  if (!storage) return defaultState();
  try {
    return parseSavedState(storage.getItem(STORAGE_KEY));
  } catch {
    console.warn("MathBub: could not read progress storage; starting fresh.");
    return defaultState();
  }
}

/**
 * Persists progress on a best-effort basis, swallowing quota or security errors
 * so a failed write never crashes the app.
 *
 * @param state - The state to persist.
 * @param storage - The storage backend; defaults to the global localStorage.
 * @returns True if the write succeeded, false if it was unavailable or failed.
 */
export function saveProgress(
  state: SavedState,
  storage: StorageLike | null = defaultStorage(),
): boolean {
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    console.warn("MathBub: could not save progress (storage full or blocked).");
    return false;
  }
}

/**
 * Clears all saved progress and returns a clean default state. Invoked only
 * behind an explicit in-UI confirmation (FR-026).
 *
 * @param storage - The storage backend; defaults to the global localStorage.
 * @returns A fresh default {@link SavedState}.
 */
export function resetProgress(
  storage: StorageLike | null = defaultStorage(),
): SavedState {
  if (storage) {
    try {
      storage.removeItem(STORAGE_KEY);
    } catch {
      console.warn("MathBub: could not clear progress storage.");
    }
  }
  return defaultState();
}
