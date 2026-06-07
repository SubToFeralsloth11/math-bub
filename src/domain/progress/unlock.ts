/**
 * Lesson and boss-challenge unlock derivation.
 *
 * Lesson availability is derived from content order and saved completion: the
 * first lesson is always available, and each later lesson unlocks once the one
 * before it is complete. The boss challenge unlocks when every lesson in the
 * track is complete (see data-model.md state transitions).
 *
 * @module domain/progress/unlock
 */

import type { Lesson, Track } from "../content/types";
import type { SavedState } from "../persistence/schema";

/** The derived state of a lesson on the map. */
export type LessonState = "complete" | "available" | "locked";

/**
 * Whether a lesson has been completed in the saved state.
 *
 * @param saved - The saved progress.
 * @param lessonId - The lesson id.
 * @returns True if the lesson is marked complete.
 */
function isComplete(saved: SavedState, lessonId: string): boolean {
  return saved.lessons[lessonId]?.completed === true;
}

/**
 * Derives the map state of a lesson within its track.
 *
 * @param track - The track the lesson belongs to.
 * @param lesson - The lesson to evaluate.
 * @param saved - The saved progress.
 * @returns The lesson's derived {@link LessonState}.
 */
export function lessonState(
  track: Track,
  lesson: Lesson,
  saved: SavedState,
): LessonState {
  if (isComplete(saved, lesson.id)) return "complete";
  if (lesson.order === 1) return "available";
  const previous = track.lessons.find(
    (candidate) => candidate.order === lesson.order - 1,
  );
  if (previous && isComplete(saved, previous.id)) return "available";
  return "locked";
}

/**
 * Whether a track's boss challenge is unlocked (all lessons complete).
 *
 * @param track - The track to evaluate.
 * @param saved - The saved progress.
 * @returns True if every lesson in the track is complete.
 */
export function isBossUnlocked(track: Track, saved: SavedState): boolean {
  return (
    track.lessons.length > 0 &&
    track.lessons.every((lesson) => isComplete(saved, lesson.id))
  );
}

/**
 * Counts completed lessons in a track, for progress summaries.
 *
 * @param track - The track to summarise.
 * @param saved - The saved progress.
 * @returns The completed count and total lesson count.
 */
export function trackProgress(
  track: Track,
  saved: SavedState,
): { completed: number; total: number } {
  const completed = track.lessons.filter((lesson) =>
    isComplete(saved, lesson.id),
  ).length;
  return { completed, total: track.lessons.length };
}
