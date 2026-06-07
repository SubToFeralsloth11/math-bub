/**
 * Badge definitions.
 *
 * Each badge has a machine-evaluable criterion (see `domain/progress/badges.ts`).
 * Track-scoped badges are added as their tracks are authored, so that content
 * validation - which checks every track reference resolves - always passes.
 *
 * @author John Grimes
 * @module content/badges
 */

import type { Badge } from "../domain/content/types";

/** All badge definitions, in display order. */
export const badges: Badge[] = [
  {
    id: "first-steps",
    title: "First steps",
    description: "Complete your first lesson",
    criterion: "first-lesson",
    icon: "🌱",
  },
  {
    id: "perfect-mastery",
    title: "Perfect mastery",
    description: "Score full marks on a mastery check",
    criterion: "perfect-mastery",
    icon: "💯",
  },
  {
    id: "on-a-roll",
    title: "On a roll",
    description: "Reach a 5-day streak",
    criterion: "streak-5",
    icon: "🔥",
  },
  {
    id: "week-warrior",
    title: "Week warrior",
    description: "Reach a 7-day streak",
    criterion: "streak-7",
    icon: "📅",
  },
  {
    id: "algebra-master",
    title: "Algebra master",
    description: "Finish every Algebra lesson",
    criterion: "track-complete:algebra",
    icon: "🧮",
  },
  {
    id: "geometry-master",
    title: "Geometry master",
    description: "Finish every Geometry lesson",
    criterion: "track-complete:geometry",
    icon: "📐",
  },
  {
    id: "timekeeper",
    title: "Timekeeper",
    description: "Finish every Time lesson",
    criterion: "track-complete:time",
    icon: "⏰",
  },
  {
    id: "boss-algebra",
    title: "Algebra boss slayer",
    description: "Pass the Algebra boss challenge",
    criterion: "boss-pass:algebra",
    icon: "🏆",
  },
  {
    id: "boss-geometry",
    title: "Geometry boss slayer",
    description: "Pass the Geometry boss challenge",
    criterion: "boss-pass:geometry",
    icon: "🏆",
  },
  {
    id: "boss-time",
    title: "Time boss slayer",
    description: "Pass the Time boss challenge",
    criterion: "boss-pass:time",
    icon: "🏆",
  },
  {
    id: "completionist",
    title: "Completionist",
    description: "Master every track",
    criterion: "all-tracks-complete",
    icon: "👑",
  },
];
