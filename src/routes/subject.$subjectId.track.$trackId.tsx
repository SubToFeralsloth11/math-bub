import { createFileRoute } from "@tanstack/react-router";

import { TrackMapScreen } from "../features/trackMap/TrackMapScreen";

/**
 * The track map page route. Shows the lesson/challenge nodes within a track.
 */
export const Route = createFileRoute("/subject/$subjectId/track/$trackId")({
  component: TrackMapScreen,
});
