import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  CURRENT_VERSION,
  defaultState,
  STORAGE_KEY,
  type SavedState,
} from "./schema";
import {
  loadProgress,
  resetProgress,
  saveProgress,
  type StorageLike,
} from "./storage";

// An in-memory storage stub implementing the StorageLike interface.
function memoryStorage(initial: Record<string, string> = {}): StorageLike {
  const map = new Map(Object.entries(initial));
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: (key) => {
      map.delete(key);
    },
  };
}

// A storage stub whose every method throws, simulating a disabled backend.
function throwingStorage(): StorageLike {
  return {
    getItem: () => {
      throw new Error("storage disabled");
    },
    setItem: () => {
      throw new Error("storage disabled");
    },
    removeItem: () => {
      throw new Error("storage disabled");
    },
  };
}

const sample: SavedState = {
  version: CURRENT_VERSION,
  lessons: { "alg-5g": { completed: true, bestAccuracy: 1 } },
  challenges: {},
  xp: 50,
  streak: { count: 1, lastActiveDate: "2026-06-07" },
  badges: ["first-lesson"],
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("saveProgress / loadProgress round-trip", () => {
  it("persists and reloads an identical state", () => {
    const storage = memoryStorage();
    expect(saveProgress(sample, storage)).toBe(true);
    expect(loadProgress(storage)).toEqual(sample);
  });

  it("writes under the versioned storage key", () => {
    const storage = memoryStorage();
    saveProgress(sample, storage);
    expect(storage.getItem(STORAGE_KEY)).toContain('"version":1');
  });
});

describe("loadProgress recovery", () => {
  it("returns default state when nothing is stored", () => {
    expect(loadProgress(memoryStorage())).toEqual(defaultState());
  });

  it("returns default state for corrupt stored data", () => {
    const storage = memoryStorage({ [STORAGE_KEY]: "{ broken" });
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(loadProgress(storage)).toEqual(defaultState());
  });

  it("survives a throwing storage backend", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(() => loadProgress(throwingStorage())).not.toThrow();
    expect(loadProgress(throwingStorage())).toEqual(defaultState());
  });

  it("returns default state when storage is unavailable (null)", () => {
    expect(loadProgress(null)).toEqual(defaultState());
  });
});

describe("saveProgress failure handling", () => {
  it("returns false without throwing when the write fails", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(saveProgress(sample, throwingStorage())).toBe(false);
  });

  it("returns false when storage is unavailable (null)", () => {
    expect(saveProgress(sample, null)).toBe(false);
  });
});

describe("resetProgress", () => {
  it("clears the stored key and returns a clean default", () => {
    const storage = memoryStorage();
    saveProgress(sample, storage);
    const result = resetProgress(storage);
    expect(result).toEqual(defaultState());
    expect(storage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("returns a clean default even when clearing throws", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(resetProgress(throwingStorage())).toEqual(defaultState());
  });
});
