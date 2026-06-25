/**
 * Resolves the track named by the current route's `:trackId` parameter.
 *
 * @module state/useTrackFromRoute
 */

import { useParams } from "@tanstack/react-router";

import { useProgress } from "./progressContext";

import type { ProgressState } from "./progressReducer";
import type { Track } from "../domain/content/types";

interface ResolvedTrack {
  /** The resolved track, or undefined when the id matches no track. */
  track: Track | undefined;
  /** The current progress state. */
  state: ProgressState;
}

/**
 * Looks up the track for the current route, returning it alongside the progress
 * state so screens can render a not-found state and derive lesson/boss status.
 *
 * @returns The resolved track (or undefined) and the progress state.
 */
export function useTrackFromRoute(): ResolvedTrack {
  const { trackId } = useParams({ strict: false });
  const { state, content } = useProgress();
  const track = content.tracks.find((candidate) => candidate.id === trackId);
  return { track, state };
}
