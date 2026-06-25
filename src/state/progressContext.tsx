import {
  createContext,
  use,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import {
  createProgressReducer,
  initProgressState,
  type ProgressAction,
  type ProgressState,
} from "./progressReducer";
import {
  loadProgress,
  migrateProgress,
  saveProgress,
} from "../domain/persistence/storage";

import type { AppContent } from "../domain/content/types";

/** Whether the most recent persistence write succeeded (for status display). */
type SaveStatus = "idle" | "saved" | "error";

interface ProgressContextValue {
  /** The current progress state. */
  state: ProgressState;
  /** Dispatches a progress action. */
  dispatch: (action: ProgressAction) => void;
  /** The authored content this provider was created with. */
  content: AppContent;
  /** Status of the last persistence write. */
  saveStatus: SaveStatus;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

interface ProgressProviderProps {
  /** The authored content driving content-dependent rules. */
  content: AppContent;
  /** The subtree with access to progress state. */
  children: ReactNode;
}

/**
 * Provides MathBub progress state to its subtree. It hydrates from localStorage
 * on mount, persists the saved portion whenever it changes, and surfaces a
 * save status so the UI can communicate persistence failures (FR-028).
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
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    migrateProgress();
    return initProgressState(loadProgress());
  });
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  // Persist the saved portion whenever it changes. This is a genuine external
  // synchronisation (localStorage), which is the legitimate use of an effect.
  useEffect(() => {
    const ok = saveProgress(state.saved);
    setSaveStatus(ok ? "saved" : "error");
  }, [state.saved]);

  const value = useMemo<ProgressContextValue>(
    () => ({ state, dispatch, content, saveStatus }),
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
