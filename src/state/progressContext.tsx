import {
  createContext,
  use,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  createProgressReducer,
  initProgressState,
  type ProgressAction,
  type ProgressState,
} from "./progressReducer";
import { defaultState, type SavedState } from "../domain/persistence/schema";

import type { AppContent } from "../domain/content/types";

/** Whether the most recent persistence write succeeded (for status display). */
type SaveStatus = "idle" | "loading" | "saved" | "error";

interface ProgressContextValue {
  /** The current progress state. */
  state: ProgressState;
  /** Dispatches a progress action. */
  dispatch: (action: ProgressAction) => void;
  /** The authored content this provider was created with. */
  content: AppContent;
  /** Status of the last persistence write. */
  saveStatus: SaveStatus;
  /** Resets progress to the default state server-side. */
  handleReset: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

interface ProgressProviderProps {
  /** The authored content driving content-dependent rules. */
  content: AppContent;
  /** The subtree with access to progress state. */
  children: ReactNode;
}

/**
 * Provides StudyBub progress state to its subtree. Loads progress from the
 * server on mount and persists on every state change. All progress is stored
 * server-side in the database.
 *
 * @param props - The provider props.
 * @param props.content - The authored content.
 * @param props.children - The subtree to provide state to.
 * @returns The context provider element.
 */
export function ProgressProvider({
  content,
  children,
}: Readonly<ProgressProviderProps>) {
  const reducer = useMemo(() => createProgressReducer(content), [content]);
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    initProgressState(defaultState()),
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [hydrated, setHydrated] = useState(false);
  const saveVersionRef = useRef(0);

  // In E2E test mode the dev server cannot reach the database (Nitro's
  // SSR runner uses Node.js module resolution which does not support
  // Bun-native modules like bun:sqlite). Progress is stored in
  // localStorage so Playwright can seed and verify state.
  const isE2e = import.meta.env.VITE_BYPASS_AUTH === "true";

  // Hydrate progress from the server on mount. Falls back to
  // localStorage in E2E mode so tests can seed state via addInitScript.
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (isE2e) {
        const raw = localStorage.getItem("studybub.progress.v1");
        let saved: SavedState;
        try {
          saved = raw ? (JSON.parse(raw) as SavedState) : defaultState();
        } catch {
          saved = defaultState();
        }
        if (!cancelled) {
          dispatch({ type: "HYDRATE", saved });
          setHydrated(true);
        }
        return;
      }

      try {
        const { loadProgress } = await import("../server/api/progress");
        const saved = await loadProgress();
        if (!cancelled) {
          dispatch({ type: "HYDRATE", saved });
          setHydrated(true);
        }
      } catch {
        // Server unavailable - stay with default state.
        if (!cancelled) {
          setHydrated(true);
        }
      }
    }

    hydrate();
    return () => {
      cancelled = true;
    };
  }, [isE2e]);

  // Persist the saved portion whenever it changes (after hydration).
  const lastSavedRef = useRef<SavedState | null>(null);
  useEffect(() => {
    if (!hydrated) return;

    const saved = state.saved;
    if (lastSavedRef.current === saved) return;

    lastSavedRef.current = saved;
    const version = ++saveVersionRef.current;
    setSaveStatus("loading");

    async function persist() {
      if (isE2e) {
        localStorage.setItem("studybub.progress.v1", JSON.stringify(saved));
        setSaveStatus("saved");
        return;
      }

      try {
        const { saveProgress } = await import("../server/api/progress");
        await saveProgress({ data: { state: saved } });
        if (version === saveVersionRef.current) {
          setSaveStatus("saved");
        }
      } catch {
        if (version === saveVersionRef.current) {
          setSaveStatus("error");
        }
      }
    }

    persist();
  }, [state.saved, hydrated, isE2e]);

  const handleReset = async () => {
    if (isE2e) {
      const fresh = defaultState();
      localStorage.removeItem("studybub.progress.v1");
      dispatch({ type: "HYDRATE", saved: fresh });
      setSaveStatus("saved");
      return;
    }

    try {
      const { resetProgress } = await import("../server/api/progress");
      const fresh = await resetProgress();
      dispatch({ type: "HYDRATE", saved: fresh });
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  };

  const value = useMemo<ProgressContextValue>(
    () => ({ state, dispatch, content, saveStatus, handleReset }),
    [state, content, saveStatus],
  );

  return <ProgressContext value={value}>{children}</ProgressContext>;
}

/**
 * Accesses the progress context.
 *
 * @returns The progress context value.
 * @throws If called outside a {@link ProgressProvider}.
 */
export function useProgress(): ProgressContextValue {
  const value = use(ProgressContext);
  if (value === null) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return value;
}
