/**
 * The AI marking settings screen at /settings. Provides a form to configure
 * the OpenAI-compatible API endpoint, key, and model.
 *
 * @module features/settings/SettingsScreen
 * @author John Grimes
 */

import { useEffect, useRef, useState } from "react";

import { AppHeader } from "../../components/AppHeader";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { useAiConfig } from "../../state/aiConfigContext";

/**
 * Returns the initial form values, preferring saved config over environment
 * variables.
 *
 * @returns The initial base URL, API key, and model for the form.
 */
function getInitialValues(): {
  baseUrl: string;
  apiKey: string;
  model: string;
} {
  return {
    baseUrl: import.meta.env.VITE_STUDYBUB_OPENAI_BASE_URL?.toString() ?? "",
    apiKey: import.meta.env.VITE_STUDYBUB_OPENAI_API_KEY?.toString() ?? "",
    model: import.meta.env.VITE_STUDYBUB_OPENAI_MODEL?.toString() ?? "",
  };
}

/**
 * The settings form for AI marking configuration.
 *
 * @returns The rendered settings screen.
 */
export function SettingsScreen() {
  const { aiConfig, setAiConfig, loading } = useAiConfig();
  const hydrated = useRef(false);

  const [baseUrl, setBaseUrl] = useState(
    aiConfig?.baseUrl ?? getInitialValues().baseUrl,
  );
  const [apiKey, setApiKey] = useState(
    aiConfig?.apiKey ?? getInitialValues().apiKey,
  );
  const [model, setModel] = useState(
    aiConfig?.model ?? getInitialValues().model,
  );

  // Populate form fields once the config is loaded from the server.
  useEffect(() => {
    if (!loading && aiConfig && !hydrated.current) {
      setBaseUrl(aiConfig.baseUrl);
      setApiKey(aiConfig.apiKey);
      setModel(aiConfig.model);
      hydrated.current = true;
    }
  }, [loading, aiConfig]);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    // FR-005: all three fields must be non-empty before accepting Save.
    if (baseUrl && apiKey && model) {
      setAiConfig({ baseUrl, apiKey, model });
      setSaved(true);
    } else if (!baseUrl && !apiKey && !model) {
      // All fields empty — clear config.
      setAiConfig(null);
      setSaved(true);
    }
    // Partially filled: do nothing (Save button has no effect).
  }

  return (
    <div>
      <AppHeader back={{ to: "/", label: "Back" }} title="Settings" />
      <main className="mx-auto flex max-w-xl flex-col gap-5 px-6 py-6">
        <Card className="p-6">
          <h2 className="mb-4 font-display text-xl font-semibold text-ink">
            AI Marking
          </h2>
          <p className="mb-5 text-sm text-ink/70">
            Configure an OpenAI-compatible API to enable AI-powered marking for
            short-text questions. Your settings are saved in this browser only.
          </p>

          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-ink">
                API Base URL
              </span>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://api.openai.com/v1"
                className="rounded-lg border border-hairline bg-cream px-3 py-2 text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
              />
              <span className="text-xs text-muted">
                Example: https://api.openai.com/v1/chat/completions
              </span>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-ink">API Key</span>
              <div className="flex gap-2">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1 rounded-lg border border-hairline bg-cream px-3 py-2 text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? "Hide" : "Show"}
                </Button>
              </div>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-ink">Model</span>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="gpt-4o"
                className="rounded-lg border border-hairline bg-cream px-3 py-2 text-ink placeholder:text-ink/40 focus:border-brand focus:outline-none"
              />
            </label>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Button onClick={handleSave}>Save</Button>
            {saved ? (
              <span
                role="status"
                className="text-sm font-medium text-success animate-bub-pop"
              >
                ✓ Saved
              </span>
            ) : null}
          </div>
        </Card>
      </main>
    </div>
  );
}
