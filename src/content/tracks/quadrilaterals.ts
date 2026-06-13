/**
 * Quadrilaterals track content (Year 8, chapter 2).
 *
 * Covers the properties of quadrilaterals - based on the 2026 Year 8
 * Maths Class Notebook curriculum plan (Term 2, Week 8).
 *
 * @author John Grimes
 * @module content/tracks/quadrilaterals
 */

import { m, t } from "../blocks";

import type { Lesson, Track, Question } from "../../domain/content/types";

/** 2D - Quadrilaterals. */
const quadrilaterals: Lesson = {
  id: "quad-2d-quadrilaterals",
  order: 1,
  title: "2D Quadrilaterals",
  sourceRef: "2D",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "2d-key",
      heading: "Key idea: classifying quadrilaterals",
      body: [
        t("A quadrilateral is any four-sided polygon. The sum of its interior angles is always 360°."),
        t("Key types and their properties:"),
        t("• Square: 4 equal sides, 4 right angles, opposite sides parallel."),
        t("• Rectangle: opposite sides equal, 4 right angles, opposite sides parallel."),
        t("• Rhombus: 4 equal sides, opposite sides parallel, opposite angles equal."),
        t("• Parallelogram: opposite sides equal and parallel, opposite angles equal."),
        t("• Trapezium (AU): at least one pair of parallel sides."),
        t("• Kite: two pairs of adjacent equal sides, one pair of opposite angles equal."),
      ],
    },
    {
      id: "2d-diagonals",
      heading: "Key idea: diagonals",
      body: [
        t("Diagonals of special quadrilaterals have useful properties:"),
        t("• Square: diagonals are equal, bisect each other, and intersect at right angles."),
        t("• Rectangle: diagonals are equal and bisect each other."),
        t("• Rhombus: diagonals bisect each other at right angles and bisect the angles."),
        t("• Parallelogram: diagonals bisect each other."),
        t("• Kite: one diagonal bisects the other at right angles."),
      ],
    },
  ],
  practice: [
    {
      id: "2d-p1",
      type: "mcq",
      prompt: [t("Which quadrilateral always has four equal sides and four right angles?")],
      explanation: [
        t("A square has all sides equal and all angles 90°. A rhombus has equal sides but not necessarily right angles."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Square")] },
        { id: "b", label: [t("Rhombus")] },
        { id: "c", label: [t("Rectangle")] },
        { id: "d", label: [t("Kite")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "2d-p2",
      type: "numeric",
      prompt: [t("What is the sum of the interior angles of any quadrilateral, in degrees?")],
      explanation: [
        t("A quadrilateral can be split into two triangles (180° each), giving 360°."),
      ],
      xp: 10,
      accepted: ["360"],
    },
    {
      id: "2d-p3",
      type: "mcq",
      prompt: [t("A parallelogram has one angle of 70°. What is the measure of the adjacent angle?")],
      explanation: [
        t("Adjacent angles in a parallelogram are supplementary (sum to 180°): 180° - 70° = 110°."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("110°")] },
        { id: "b", label: [t("70°")] },
        { id: "c", label: [t("140°")] },
        { id: "d", label: [t("20°")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "2d-p4",
      type: "mcq",
      prompt: [t("Which statement is true for ALL parallelograms?")],
      explanation: [
        t("In any parallelogram, opposite sides are parallel. Diagonals are not necessarily perpendicular (that's for rhombuses/squares)."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Opposite sides are parallel")] },
        { id: "b", label: [t("All sides are equal")] },
        { id: "c", label: [t("Diagonals are perpendicular")] },
        { id: "d", label: [t("All angles are 90°")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "2d-m1",
      type: "mcq",
      prompt: [t("A quadrilateral has four right angles but its sides are not all equal. It is a:")],
      explanation: [
        t("A rectangle has four right angles and opposite sides equal. A square would need all sides equal."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("Rectangle")] },
        { id: "b", label: [t("Square")] },
        { id: "c", label: [t("Rhombus")] },
        { id: "d", label: [t("Kite")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "2d-m2",
      type: "numeric",
      prompt: [t("A kite has angles of 100°, 80°, 100°, and x°. Find x.")],
      explanation: [
        t("Sum of angles = 360°. 100 + 80 + 100 = 280. x = 360 - 280 = 80°."),
      ],
      xp: 15,
      accepted: ["80"],
    },
    {
      id: "2d-m3",
      type: "mcq",
      prompt: [t("Which quadrilateral has diagonals that are equal in length?")],
      explanation: [
        t("Rectangles and squares have equal diagonals. In a rhombus they are perpendicular but not necessarily equal."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("Rectangle")] },
        { id: "b", label: [t("Rhombus")] },
        { id: "c", label: [t("Trapezium")] },
        { id: "d", label: [t("Kite")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "2d-m4",
      type: "numeric",
      prompt: [t("In a rhombus, one angle is 60°. What is the measure of an adjacent angle, in degrees?")],
      explanation: [
        t("Adjacent angles in a rhombus (a special parallelogram) are supplementary: 180° - 60° = 120°."),
      ],
      xp: 15,
      accepted: ["120"],
    },
    {
      id: "2d-m5",
      type: "mcq",
      prompt: [t("Every square is a rectangle, but not every rectangle is a square. This is because:")],
      explanation: [
        t("A square has all the properties of a rectangle (4 right angles) plus the extra property that all sides are equal. Rectangles don't require equal sides."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("A square has the extra property of equal sides")] },
        { id: "b", label: [t("A square has more angles")] },
        { id: "c", label: [t("A rectangle has more sides")] },
        { id: "d", label: [t("A square is smaller")] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** Boss challenge for the Quadrilaterals track. */
const quadrilateralsChallengeQuestions: Question[] = [
  {
    id: "quad-boss-q1",
    type: "numeric",
    prompt: [t("A trapezium has interior angles of 95°, 85°, 110°, and x°. Find x.")],
    explanation: [t("Sum = 360°. 95 + 85 + 110 = 290. x = 360 - 290 = 70°.")],
    xp: 20,
    accepted: ["70"],
  },
  {
    id: "quad-boss-q2",
    type: "mcq",
    prompt: [t("Which statement is FALSE for a rhombus?")],
    explanation: [
      t("A rhombus has all sides equal (true), opposite angles equal (true), diagonals perpendicular (true). Diagonals are NOT necessarily equal (false - that's for rectangles/squares)."),
    ],
    xp: 25,
    options: [
      { id: "a", label: [t("All sides are equal")] },
      { id: "b", label: [t("Diagonals are equal")] },
      { id: "c", label: [t("Opposite angles are equal")] },
      { id: "d", label: [t("Diagonals are perpendicular")] },
    ],
    correctOptionId: "b",
  },
  {
    id: "quad-boss-q3",
    type: "mcq",
    prompt: [t("A quadrilateral has exactly one pair of parallel sides. It is a:")],
    explanation: [
      t("In Australian usage, a trapezium has at least one pair of parallel sides. A parallelogram needs two pairs."),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("Trapezium")] },
      { id: "b", label: [t("Parallelogram")] },
      { id: "c", label: [t("Kite")] },
      { id: "d", label: [t("Rhombus")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "quad-boss-q4",
    type: "numeric",
    prompt: [t("A parallelogram has one angle of 55°. Find the measure of the angle opposite it, in degrees.")],
    explanation: [
      t("Opposite angles in a parallelogram are equal, so it is also 55°."),
    ],
    xp: 20,
    accepted: ["55"],
  },
  {
    id: "quad-boss-q5",
    type: "mcq",
    prompt: [t("Which shape has diagonals that bisect each other at right angles AND bisect the angles?")],
    explanation: [
      t("A rhombus has diagonals that bisect each other at 90° and bisect the interior angles. In a square this is also true, but square is a special case of rhombus."),
    ],
    xp: 25,
    options: [
      { id: "a", label: [t("Rhombus")] },
      { id: "b", label: [t("Rectangle")] },
      { id: "c", label: [t("Kite")] },
      { id: "d", label: [t("Trapezium")] },
    ],
    correctOptionId: "a",
  },
];

/** The Quadrilaterals track. */
export const quadrilateralsTrack: Track = {
  id: "quadrilaterals",
  subjectId: "maths",
  title: "Quadrilaterals (Year 8)",
  description:
    "Properties of quadrilaterals: squares, rectangles, rhombuses, parallelograms, trapeziums and kites.",
  lessons: [quadrilaterals],
  challenge: {
    id: "quadrilaterals-boss",
    title: "Boss challenge: Quadrilaterals",
    sourceRef: "2026 T2 Yr 8 Maths Planner — Term 2, Week 8",
    questions: quadrilateralsChallengeQuestions,
    bonusXp: 100,
    passBadgeId: "boss-quadrilaterals",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
