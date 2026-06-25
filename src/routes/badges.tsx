import { createFileRoute } from "@tanstack/react-router";

import { BadgesScreen } from "../features/badges/BadgesScreen";

/**
 * The badges page route. Shows earned and locked badges.
 */
export const Route = createFileRoute("/badges")({
  component: BadgesScreen,
});
