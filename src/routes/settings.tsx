import { createFileRoute } from "@tanstack/react-router";

import { SettingsScreen } from "../features/settings/SettingsScreen";

/**
 * The settings page route. Shows AI config and other preferences.
 */
export const Route = createFileRoute("/settings")({
  component: SettingsScreen,
});
