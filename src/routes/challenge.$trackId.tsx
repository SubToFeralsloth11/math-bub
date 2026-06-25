import { createFileRoute } from "@tanstack/react-router";

import { BossChallengeScreen } from "../features/challenge/BossChallengeScreen";

/**
 * The boss challenge page route. Shows timed assessment questions for a track.
 */
export const Route = createFileRoute("/challenge/$trackId")({
  component: BossChallengeScreen,
});
