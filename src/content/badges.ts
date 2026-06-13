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
    id: "integer-ops-master",
    title: "Number ninja",
    description: "Finish every Integer Operations lesson",
    criterion: "track-complete:integer-operations",
    icon: "➖",
  },
  {
    id: "perimeter-area-master",
    title: "Shape surveyor",
    description: "Finish every Perimeter and Area lesson",
    criterion: "track-complete:perimeter-and-area",
    icon: "📏",
  },
  {
    id: "pythagoras-master",
    title: "Pythagoras prover",
    description: "Finish every Pythagoras lesson",
    criterion: "track-complete:pythagoras",
    icon: "🔺",
  },
  {
    id: "volume-master",
    title: "Volume virtuoso",
    description: "Finish every Volume lesson",
    criterion: "track-complete:volume",
    icon: "🧊",
  },
  {
    id: "decimals-master",
    title: "Decimal decoder",
    description: "Finish every Decimals lesson",
    criterion: "track-complete:decimals",
    icon: "🔢",
  },
  {
    id: "quadrilaterals-master",
    title: "Quadrilateral queen",
    description: "Finish every Quadrilaterals lesson",
    criterion: "track-complete:quadrilaterals",
    icon: "🔷",
  },
  {
    id: "boss-integer-operations",
    title: "Integer boss slayer",
    description: "Pass the Integer Operations boss challenge",
    criterion: "boss-pass:integer-operations",
    icon: "🏆",
  },
  {
    id: "boss-perimeter-and-area",
    title: "Perimeter boss slayer",
    description: "Pass the Perimeter and Area boss challenge",
    criterion: "boss-pass:perimeter-and-area",
    icon: "🏆",
  },
  {
    id: "boss-pythagoras",
    title: "Pythagoras boss slayer",
    description: "Pass the Pythagoras boss challenge",
    criterion: "boss-pass:pythagoras",
    icon: "🏆",
  },
  {
    id: "boss-volume",
    title: "Volume boss slayer",
    description: "Pass the Volume boss challenge",
    criterion: "boss-pass:volume",
    icon: "🏆",
  },
  {
    id: "boss-decimals",
    title: "Decimals boss slayer",
    description: "Pass the Decimals boss challenge",
    criterion: "boss-pass:decimals",
    icon: "🏆",
  },
  {
    id: "boss-quadrilaterals",
    title: "Quadrilaterals boss slayer",
    description: "Pass the Quadrilaterals boss challenge",
    criterion: "boss-pass:quadrilaterals",
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
