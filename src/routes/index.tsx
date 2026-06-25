import { createFileRoute } from "@tanstack/react-router";

import { HomeScreen } from "../features/home/HomeScreen";

/**
 * The home page route. Displays the subject picker and learner stats.
 */
export const Route = createFileRoute("/")({
  component: HomeScreen,
});
