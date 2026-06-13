/**
 * Aggregated authored content and lookups.
 *
 * This module assembles every subject, track, and badge into a single
 * {@link AppContent} value and exposes lookup helpers. In development it runs
 * `validateContent` and logs any structural problems so authoring mistakes
 * surface immediately.
 *
 * @module content/index
 */

import { badges } from "./badges";
import { englishSubject } from "./subjects/english";
import { germanSubject } from "./subjects/german";
import { hassSubject } from "./subjects/hass";
import { hpeSubject } from "./subjects/hpe";
import { mathsSubject } from "./subjects/maths";
import { scienceSubject } from "./subjects/science";
import { algebraTrack } from "./tracks/algebra";
import { decimalsTrack } from "./tracks/decimals";
import { geometryTrack } from "./tracks/geometry";
import { integerOperationsTrack } from "./tracks/integerOperations";
import { perimeterAndAreaTrack } from "./tracks/perimeterAndArea";
import { pythagorasTrack } from "./tracks/pythagoras";
import { quadrilateralsTrack } from "./tracks/quadrilaterals";
import { scienceDemoTrack } from "./tracks/science-demo";
import { timeTrack } from "./tracks/time";
import { volumeTrack } from "./tracks/volume";
import { validateContent } from "../domain/content/validateContent";

import type {
  AppContent,
  Badge,
  BossChallenge,
  Lesson,
  Subject,
  Track,
} from "../domain/content/types";

/** The complete authored content shipped with the app. */
export const appContent: AppContent = {
  subjects: [
    mathsSubject,
    scienceSubject,
    hassSubject,
    englishSubject,
    germanSubject,
    hpeSubject,
  ],
  tracks: [
    algebraTrack,
    decimalsTrack,
    geometryTrack,
    integerOperationsTrack,
    perimeterAndAreaTrack,
    pythagorasTrack,
    quadrilateralsTrack,
    scienceDemoTrack,
    timeTrack,
    volumeTrack,
  ],
  badges,
};

/**
 * Finds a subject by id.
 *
 * @param subjectId - The subject id to look up.
 * @returns The subject, or undefined if not found.
 */
export function findSubject(subjectId: string): Subject | undefined {
  return appContent.subjects.find((subject) => subject.id === subjectId);
}

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

/**
 * Returns all tracks belonging to a subject.
 *
 * @param subjectId - The subject id.
 * @returns The tracks with that subjectId, in content order.
 */
export function tracksForSubject(subjectId: string): Track[] {
  return appContent.tracks.filter((track) => track.subjectId === subjectId);
}

/**
 * Finds the subject a track belongs to.
 *
 * @param trackId - The track id.
 * @returns The subject, or undefined if the track is not found or has no subject.
 */
export function findSubjectForTrack(trackId: string): Subject | undefined {
  const track = findTrack(trackId);
  if (!track) return undefined;
  return findSubject(track.subjectId);
}

/** The ordered list of track ids. */
export const trackIds: string[] = appContent.tracks.map((track) => track.id);

// Surface authoring problems during development without blocking startup.
if (import.meta.env?.DEV) {
  const issues = validateContent(appContent);
  if (issues.length > 0) {
    console.error(
      "StudyBub content validation issues:\n" + issues.join("\n"),
    );
  }
}
