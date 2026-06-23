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
    title: "Algebra ace",
    description: "Finish every Algebra lesson",
    criterion: "track-complete:algebra",
    icon: "📐",
  },
  {
    id: "decimals-master",
    title: "Decimal decoder",
    description: "Finish every Decimals lesson",
    criterion: "track-complete:decimals",
    icon: "🔢",
  },
  {
    id: "geometry-master",
    title: "Geometry genius",
    description: "Finish every Congruence and Similarity lesson",
    criterion: "track-complete:geometry",
    icon: "📏",
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
    icon: "📐",
  },
  {
    id: "pythagoras-master",
    title: "Pythagoras prover",
    description: "Finish every Pythagoras' Theorem lesson",
    criterion: "track-complete:pythagoras",
    icon: "🔺",
  },
  {
    id: "quadrilaterals-master",
    title: "Quadrilateral queen",
    description: "Finish every Quadrilaterals lesson",
    criterion: "track-complete:quadrilaterals",
    icon: "🔷",
  },
  {
    id: "time-master",
    title: "Time traveller",
    description: "Finish every Time lesson",
    criterion: "track-complete:time",
    icon: "⏰",
  },
  {
    id: "volume-master",
    title: "Volume virtuoso",
    description: "Finish every Volume lesson",
    criterion: "track-complete:volume",
    icon: "🧊",
  },
  {
    id: "boss-algebra",
    title: "Algebra boss slayer",
    description: "Pass the Algebra boss challenge",
    criterion: "boss-pass:algebra",
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
    id: "boss-geometry",
    title: "Geometry boss slayer",
    description: "Pass the Congruence and Similarity boss challenge",
    criterion: "boss-pass:geometry",
    icon: "🏆",
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
    description: "Pass the Pythagoras' Theorem boss challenge",
    criterion: "boss-pass:pythagoras",
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
    id: "boss-time",
    title: "Time boss slayer",
    description: "Pass the Time boss challenge",
    criterion: "boss-pass:time",
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
    id: "completionist",
    title: "Completionist",
    description: "Master every track",
    criterion: "all-tracks-complete",
    icon: "👑",
  },
  {
    id: "conquest-master",
    title: "Conquest chronicler",
    description: "Finish every Spanish Conquest lesson",
    criterion: "track-complete:spanish-conquest",
    icon: "⚔️",
  },
  {
    id: "boss-spanish-conquest",
    title: "Spanish Conquest boss slayer",
    description: "Pass the Spanish Conquest boss challenge",
    criterion: "boss-pass:spanish-conquest",
    icon: "🏆",
  },
  {
    id: "biology-master",
    title: "Biologist",
    description: "Finish every Year 8 Biology lesson",
    criterion: "track-complete:biology",
    icon: "🧫",
  },
  {
    id: "boss-biology",
    title: "Biology boss slayer",
    description: "Pass the Year 8 Biology boss challenge",
    criterion: "boss-pass:biology",
    icon: "🏆",
  },
  {
    id: "earth-science-master",
    title: "Geologist",
    description: "Finish every Year 8 Earth Science lesson",
    criterion: "track-complete:earth-science-rocks",
    icon: "🪨",
  },
  {
    id: "boss-earth-science-rocks",
    title: "Earth Science boss slayer",
    description: "Pass the Year 8 Earth Science boss challenge",
    criterion: "boss-pass:earth-science-rocks",
    icon: "🏆",
  },
  {
    id: "german-wir-reisen-master",
    title: "Weltenbummler",
    description: "Finish every German: Wir reisen! lesson",
    criterion: "track-complete:german-wir-reisen",
    icon: "✈️",
  },
  {
    id: "boss-german-wir-reisen",
    title: "German boss slayer",
    description: "Pass the German: Wir reisen! boss challenge",
    criterion: "boss-pass:german-wir-reisen",
    icon: "🏆",
  },
  {
    id: "three-d-coordinates-master",
    title: "3D explorer",
    description: "Finish every 3D Coordinate Systems lesson",
    criterion: "track-complete:three-d-coordinates",
    icon: "🧭",
  },
  {
    id: "boss-three-d-coordinates",
    title: "3D coordinates boss slayer",
    description: "Pass the 3D Coordinates boss challenge",
    criterion: "boss-pass:three-d-coordinates",
    icon: "🏆",
  },
  {
    id: "algebraic-fractions-adding-master",
    title: "Fraction adder",
    description:
      "Finish every Algebraic Fractions: Adding and Subtracting lesson",
    criterion: "track-complete:algebraic-fractions-adding",
    icon: "➕",
  },
  {
    id: "boss-algebraic-fractions-adding",
    title: "Adding fractions boss slayer",
    description:
      "Pass the Algebraic Fractions: Adding and Subtracting boss challenge",
    criterion: "boss-pass:algebraic-fractions-adding",
    icon: "🏆",
  },
  {
    id: "algebraic-fractions-multiplying-master",
    title: "Fraction multiplier",
    description:
      "Finish every Algebraic Fractions: Multiplying and Dividing lesson",
    criterion: "track-complete:algebraic-fractions-multiplying",
    icon: "✖️",
  },
  {
    id: "boss-algebraic-fractions-multiplying",
    title: "Multiplying fractions boss slayer",
    description:
      "Pass the Algebraic Fractions: Multiplying and Dividing boss challenge",
    criterion: "boss-pass:algebraic-fractions-multiplying",
    icon: "🏆",
  },
];
