import {
  createContext,
  use,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AiConfig } from "../domain/persistence/aiConfig";

/** The shape of the AI config context value. */
export interface AiConfigContextValue {
  /** The current AI config, or null if not configured. */
  aiConfig: AiConfig | null;
  /** Sets the AI config (null to clear). */
  setAiConfig: (config: AiConfig | null) => void;
  /** Whether the config is currently loading from the server. */
  loading: boolean;
}

const AiConfigContext = createContext<AiConfigContextValue | null>(null);

interface AiConfigProviderProps {
  /** The subtree with access to AI config. */
  children: ReactNode;
}

/**
 * Provides AI config state to the subtree, loading from the server on mount
 * and persisting on every change. The AI config is encrypted at rest in the
 * server-side database when the server is available.
 *
 * @param props - The provider props.
 * @param props.children - The subtree to provide state to.
 * @returns The context provider element.
 */
export function AiConfigProvider({
  children,
}: Readonly<AiConfigProviderProps>) {
  const [aiConfig, setAiConfigState] = useState<AiConfig | null>(null);
  const [loading, setLoading] = useState(true);

  // Hydrate the AI config from the server on mount.
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const { loadAiConfig } = await import("../server/api/aiConfig");
        const config = await loadAiConfig();
        if (!cancelled) {
          setAiConfigState(config);
        }
      } catch {
        // Server unavailable - leave as null.
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  async function setAiConfig(config: AiConfig | null): Promise<void> {
    setAiConfigState(config);
    try {
      const { saveAiConfig, clearAiConfig } =
        await import("../server/api/aiConfig");
      await (config ? saveAiConfig({ data: { config } }) : clearAiConfig());
    } catch {
      // Persistence failed silently.
    }
  }

  const value = useMemo<AiConfigContextValue>(
    () => ({ aiConfig, setAiConfig, loading }),
    [aiConfig, loading],
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
