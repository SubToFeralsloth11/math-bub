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

import { loadProgress, saveProgress, resetProgress } from "../server/api/progress";
import {
  createProgressReducer,
  initProgressState,
  type ProgressAction,
  type ProgressState,
} from "./progressReducer";

import type { AppContent } from "../domain/content/types";
import type { SavedState } from "../domain/persistence/schema";

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
 * server on mount and persists on every state change. Surfaces a save status
 * so the UI can communicate persistence failures (FR-028).
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
    initProgressState({
      version: 1,
      lessons: {},
      challenges: {},
      xp: 0,
      streak: { count: 0, lastActiveDate: "" },
      badges: [],
      activeDates: [],
    }),
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [hydrated, setHydrated] = useState(false);
  const saveVersionRef = useRef(0);

  // Hydrate progress from the server on mount.
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const saved = await loadProgress();
        if (!cancelled) {
          // Replace the initial default state with the server state.
          dispatch({ type: "HYDRATE", saved });
          setHydrated(true);
        }
      } catch {
        // If loading fails, continue with the default state (no auth, or
        // server error). The state stays as the clean default.
        if (!cancelled) {
          setHydrated(true);
        }
      }
    }

    hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist the saved portion whenever it changes (after hydration).
  const lastSavedRef = useRef<SavedState | null>(null);
  useEffect(() => {
    if (!hydrated) return;

    const saved = state.saved;
    // Skip saving if the state hasn't actually changed.
    if (lastSavedRef.current === saved) return;

    lastSavedRef.current = saved;

    const version = ++saveVersionRef.current;
    setSaveStatus("loading");

    async function persist() {
      try {
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
  }, [state.saved, hydrated]);

  const handleReset = async () => {
    try {
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
