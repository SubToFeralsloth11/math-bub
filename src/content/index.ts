/**
 * Aggregated authored content and lookups.
 *
 * This module assembles every track and badge into a single {@link AppContent}
 * value and exposes lookup helpers. In development it runs `validateContent` and
 * logs any structural problems so authoring mistakes surface immediately.
 *
 * @module content/index
 */

import { badges } from "./badges";
import { algebraTrack } from "./tracks/algebra";
import { geometryTrack } from "./tracks/geometry";
import { timeTrack } from "./tracks/time";
import { validateContent } from "../domain/content/validateContent";

import type {
  AppContent,
  Badge,
  BossChallenge,
  Lesson,
  Track,
  TrackId,
} from "../domain/content/types";

/** The complete authored content shipped with the app. */
export const appContent: AppContent = {
  tracks: [algebraTrack, geometryTrack, timeTrack],
  badges,
};

/**
 * Finds a track by id.
 *
 * @param trackId - The track id to look up.
 * @returns The track, or undefined if not found.
 */
export function findTrack(trackId: string): Track | undefined {
  return appContent.tracks.find((track) => track.id === trackId);
}

/**
 * Finds a lesson within a track.
 *
 * @param trackId - The track id.
 * @param lessonId - The lesson id.
 * @returns The lesson, or undefined if not found.
 */
export function findLesson(
  trackId: string,
  lessonId: string,
): Lesson | undefined {
  return findTrack(trackId)?.lessons.find((lesson) => lesson.id === lessonId);
}

/**
 * Finds a track's boss challenge.
 *
 * @param trackId - The track id.
 * @returns The boss challenge, or undefined if the track is not found.
 */
export function findChallenge(trackId: string): BossChallenge | undefined {
  return findTrack(trackId)?.challenge;
}

/**
 * Looks up a badge definition by id.
 *
 * @param badgeId - The badge id.
 * @returns The badge, or undefined if not found.
 */
export function findBadge(badgeId: string): Badge | undefined {
  return appContent.badges.find((badge) => badge.id === badgeId);
}

/** The ordered list of track ids. */
export const trackIds: TrackId[] = appContent.tracks.map((track) => track.id);

// Surface authoring problems during development without blocking startup.
if (import.meta.env?.DEV) {
  const issues = validateContent(appContent);
  if (issues.length > 0) {
    console.error("MathBub content validation issues:\n" + issues.join("\n"));
  }
}
