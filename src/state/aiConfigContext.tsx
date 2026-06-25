/**
 * React context for AI marking configuration. Provides the current AiConfig
 * and a setter, backed by localStorage.
 *
 * @module state/aiConfigContext
 * @author John Grimes
 */

import { createContext, use, useMemo, useState, type ReactNode } from "react";

import {
  clearAiConfig,
  loadAiConfig,
  saveAiConfig,
  type AiConfig,
} from "../domain/persistence/aiConfig";

/** The shape of the AI config context value. */
export interface AiConfigContextValue {
  /** The current AI config, or null if not configured. */
  aiConfig: AiConfig | null;
  /** Sets the AI config (null to clear). */
  setAiConfig: (config: AiConfig | null) => void;
}

const AiConfigContext = createContext<AiConfigContextValue | null>(null);

interface AiConfigProviderProps {
  /** The subtree with access to AI config. */
  children: ReactNode;
}

/**
 * Provides AI config state to the subtree, hydrating from localStorage on
 * mount and persisting on every change.
 *
 * @param props - The provider props.
 * @param props.children - The subtree to provide state to.
 * @returns The context provider element.
 */
export function AiConfigProvider({
  children,
}: Readonly<AiConfigProviderProps>) {
  const [aiConfig, setAiConfigState] = useState<AiConfig | null>(() =>
    loadAiConfig(),
  );

  function setAiConfig(config: AiConfig | null): void {
    setAiConfigState(config);
    if (config) {
      saveAiConfig(config);
    } else {
      clearAiConfig();
    }
  }

  const value = useMemo<AiConfigContextValue>(
    () => ({ aiConfig, setAiConfig }),
    [aiConfig],
  );

  return <AiConfigContext value={value}>{children}</AiConfigContext>;
}

/**
 * Accesses the AI config context.
 *
 * @returns The AI config context value.
 * @throws If called outside an {@link AiConfigProvider}.
 */
export function useAiConfig(): AiConfigContextValue {
  const value = use(AiConfigContext);
  if (value === null) {
    throw new Error("useAiConfig must be used within an AiConfigProvider");
  }
  return value;
}
