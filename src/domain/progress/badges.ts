/**
 * Badge-criteria evaluation.
 *
 * Each badge has a machine-evaluable criterion. `earnedBadgeIds` returns the ids
 * of every badge whose criterion is currently satisfied by the saved state; the
 * reducer compares this against already-earned badges to award new ones at most
 * once (see data-model.md badge criteria).
 *
 * @module domain/progress/badges
 */

import type { AppContent, BadgeId, Track } from "../content/types";
import type { SavedState } from "../persistence/schema";

/**
 * Whether every lesson in a track is complete.
 *
 * @param track - The track to check.
 * @param saved - The saved progress.
 * @returns True if all lessons are complete.
 */
function trackComplete(track: Track, saved: SavedState): boolean {
  return (
    track.lessons.length > 0 &&
    track.lessons.every(
      (lesson) => saved.lessons[lesson.id]?.completed === true,
    )
  );
}

/**
 * Whether a track's boss challenge has been passed.
 *
 * @param track - The track to check.
 * @param saved - The saved progress.
 * @returns True if the track's challenge result is marked passed.
 */
function bossPassed(track: Track, saved: SavedState): boolean {
  return saved.challenges[track.challenge.id]?.passed === true;
}

/**
 * Evaluates whether a single criterion is satisfied.
 *
 * @param criterion - The badge criterion tag.
 * @param content - The authored content (for track lookups).
 * @param saved - The saved progress.
 * @returns True if the criterion currently holds.
 */
function criterionMet(
  criterion: string,
  content: AppContent,
  saved: SavedState,
): boolean {
  const lessons = Object.values(saved.lessons);

  if (criterion === "first-lesson") {
    return lessons.some((lesson) => lesson.completed);
  }
  if (criterion === "perfect-mastery") {
    return lessons.some(
      (lesson) => lesson.completed && lesson.bestAccuracy >= 1,
    );
  }
  if (criterion === "streak-5") return saved.streak.count >= 5;
  if (criterion === "streak-7") return saved.streak.count >= 7;
  if (criterion === "all-tracks-complete") {
    return content.tracks.every((track) => trackComplete(track, saved));
  }

  const trackComplm = /^track-complete:(.+)$/.exec(criterion);
  if (trackComplm) {
    const track = content.tracks.find((t) => t.id === trackComplm[1]);
    return track ? trackComplete(track, saved) : false;
  }

  const bossm = /^boss-pass:(.+)$/.exec(criterion);
  if (bossm) {
    const track = content.tracks.find((t) => t.id === bossm[1]);
    return track ? bossPassed(track, saved) : false;
  }

  return false;
}

/**
 * Returns the ids of every badge whose criterion is currently satisfied.
 *
 * @param content - The authored content.
 * @param saved - The saved progress.
 * @returns The earned badge ids, in content order.
 */
export function earnedBadgeIds(
  content: AppContent,
  saved: SavedState,
): BadgeId[] {
  return content.badges
    .filter((badge) => criterionMet(badge.criterion, content, saved))
    .map((badge) => badge.id);
}
