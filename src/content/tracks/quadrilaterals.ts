/**
 * Quadrilaterals track content (Year 8).
 *
 * Covers classifying quadrilaterals, identifying their properties
 * (sides, angles, diagonals, symmetry), and calculating unknown
 * angles using the angle sum of 360° — based on the 2026 Year 8
 * Maths Class Notebook curriculum plan (Term 2, Week 8).
 *
 * @author John Grimes
 * @module content/tracks/quadrilaterals
 */

import { m, t } from "../blocks";

import type { AiProvenance, Lesson, Track } from "../../domain/content/types";

// ---------------------------------------------------------------------------
// Shared AI provenance for every lesson and the boss challenge.
// ---------------------------------------------------------------------------

const provenance: AiProvenance = {
  tool: "Claude",
  sources: ["2026 - Year 8 Maths Class Notebook"],
  role: "generated",
};

// ===========================================================================
// Lesson 1 — 2D Classifying quadrilaterals
// ===========================================================================

const lesson1: Lesson = {
  id: "quad-2d-classification",
  order: 1,
  title: "2D Classifying quadrilaterals",
  sourceRef: "2D",
  aiProvenance: provenance,
  learnCards: [
    {
      id: "c1-key",
      heading: "Key idea: what is a quadrilateral?",
      body: [
        t("A quadrilateral is any closed shape with four straight sides and four vertices. The word comes from Latin: quadri- (four) + latus (side)."),
        t("There are six main types of quadrilateral that you need to know for Year 8:"),
        t("Square — four equal sides, four right angles."),
        t("Rectangle — opposite sides equal, four right angles."),
        t("Rhombus — four equal sides, opposite angles equal."),
        t("Parallelogram — opposite sides equal and parallel, opposite angles equal."),
        t("Trapezium (Australian usage) — at least one pair of parallel sides."),
        t("Kite — two pairs of adjacent equal sides, one pair of opposite angles equal."),
        t("A useful way to remember these is the classification hierarchy: every square is a rectangle, every rectangle is a parallelogram, and every parallelogram is a trapezium."),
      ],
    },
    {
      id: "c1-worked",
      heading: "Worked example: using a decision tree",
      body: [
        t("Question: Classify a quadrilateral with these properties: opposite sides are parallel, all sides are equal, and one angle is 60°."),
        t("Step 1: Opposite sides parallel → it is at least a parallelogram."),
        t("Step 2: All sides equal → it is a rhombus (a parallelogram with equal sides)."),
        t("Step 3: One angle is 60° (not 90°) → it is not a square."),
        t("Answer: The quadrilateral is a rhombus."),
      ],
    },
    {
      id: "c1-mistake",
      heading: "Common mistake: confusing similar-looking shapes",
      body: [
        t("Mistake 1: Calling every rhombus a square. A square must have four right angles; a rhombus does not. All squares are rhombuses, but not all rhombuses are squares."),
        t("Mistake 2: Thinking a trapezium must have exactly one pair of parallel sides. In Australian schools, a trapezium has at least one pair — so parallelograms, rectangles, rhombuses, and squares are all trapeziums too."),
        t("Mistake 3: Thinking a kite always looks like the flying kind. A kite in geometry just means two pairs of adjacent equal sides. A rhombus is actually a special type of kite (all four sides equal means both pairs of adjacent sides are equal)."),
      ],
    },
    {
      id: "c1-venn",
      heading: "Extension: the quadrilateral Venn diagram",
      body: [
        t("Quadrilaterals can be arranged in a nested hierarchy. Think of each shape as a set, with more specific shapes inside more general ones:"),
        t("Quadrilaterals (all four-sided shapes)"),
        t("  └─ Trapeziums (at least one pair of parallel sides)"),
        t("       └─ Parallelograms (two pairs of parallel sides)"),
        t("            └─ Rectangles (parallelogram + four right angles)"),
        t("                 └─ Squares (rectangle + four equal sides)"),
        t("            └─ Rhombuses (parallelogram + four equal sides)"),
        t("                 └─ Squares (rhombus + four right angles)"),
        t("Notice that a square sits inside both rectangles and rhombuses — it is the intersection of the two. A kite is not inside the parallelogram branch because kites do not need parallel sides."),
      ],
    },
  ],
  practice: [
    {
      id: "c1-p1",
      type: "mcq",
      prompt: [t("Which quadrilateral has four equal sides and four right angles?")],
      explanation: [
        t("A square has all four sides equal and all four angles equal to 90°. A rhombus has equal sides but its angles are not necessarily 90°. A rectangle has 90° angles but its sides are not all equal."),
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
      id: "c1-p2",
      type: "mcq",
      prompt: [t("A quadrilateral has exactly one pair of parallel sides. In Australian usage, it is called a:")],
      explanation: [
        t("In Australian schools, a trapezium is defined as a quadrilateral with at least one pair of parallel sides. A parallelogram requires two pairs. A kite has no parallel sides. A rectangle has two pairs of parallel sides."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Trapezium")] },
        { id: "b", label: [t("Parallelogram")] },
        { id: "c", label: [t("Kite")] },
        { id: "d", label: [t("Rectangle")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c1-p3",
      type: "fillInTheBlank",
      prompt: [t("Complete the definition.")],
      explanation: [
        t("The prefix quad- means four. A quadrilateral has four sides and four vertices. The word comes from Latin quadri- (four) + latus (side)."),
      ],
      xp: 10,
      template: [t("A quadrilateral is a polygon with exactly ___ sides.")],
      accepted: ["four", "4"],
    },
    {
      id: "c1-p4",
      type: "mcq",
      prompt: [t("Which of these is NOT a type of parallelogram?")],
      explanation: [
        t("A kite does not require parallel sides — it is defined by two pairs of adjacent equal sides. Rhombuses, rectangles, and squares are all special types of parallelograms because they all have two pairs of parallel sides."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Kite")] },
        { id: "b", label: [t("Rhombus")] },
        { id: "c", label: [t("Rectangle")] },
        { id: "d", label: [t("Square")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c1-p5",
      type: "shortText",
      prompt: [t("Is a square a type of rectangle? Explain why or why not.")],
      explanation: [
        t("Yes. A rectangle is defined as a quadrilateral with four right angles and opposite sides parallel. A square has four right angles and opposite sides parallel, so it meets the definition. The extra condition — that all four sides are equal — makes a square a special type of rectangle, not a different shape."),
      ],
      xp: 15,
      accepted: [
        "yes",
        "yes because a square has four right angles",
        "yes, a square has all the properties of a rectangle",
        "yes, a square is a special rectangle with equal sides",
      ],
    },
    {
      id: "c1-p6",
      type: "mcq",
      prompt: [t("A rhombus is best described as:")],
      explanation: [
        t("A rhombus is a parallelogram in which all four sides are equal. It is a special type of both parallelogram and kite. A rhombus does not need right angles — if it has them, it is also a square."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("A parallelogram with four equal sides")] },
        { id: "b", label: [t("A quadrilateral with four right angles")] },
        { id: "c", label: [t("Any quadrilateral with equal sides")] },
        { id: "d", label: [t("A parallelogram with perpendicular diagonals")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c1-p7",
      type: "numeric",
      prompt: [t("A kite has two pairs of adjacent equal sides. How many pairs of equal adjacent sides does a rhombus have?")],
      explanation: [
        t("A rhombus has all four sides equal. This means both pairs of adjacent sides are equal, so a rhombus has two pairs of equal adjacent sides — making every rhombus a special type of kite."),
      ],
      xp: 15,
      accepted: ["2", "two"],
    },
    {
      id: "c1-p8",
      type: "mcq",
      prompt: [t("A shape has four equal sides but no right angles. It is a:")],
      explanation: [
        t("Four equal sides with no restriction on angles describes a rhombus. A square requires 90° angles. A kite has two pairs of adjacent equal sides but not necessarily four equal sides. A rectangle does not require equal sides."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("Rhombus")] },
        { id: "b", label: [t("Square")] },
        { id: "c", label: [t("Kite (non-rhombus)")] },
        { id: "d", label: [t("Rectangle")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c1-p9",
      type: "mcq",
      prompt: [t("Which statement about the classification of quadrilaterals is correct?")],
      explanation: [
        t("All squares are rectangles (they have four right angles) and all rectangles are parallelograms (opposite sides are parallel). The hierarchy flows: square ⊂ rectangle ⊂ parallelogram ⊂ trapezium ⊂ quadrilateral. A rectangle is not necessarily a square, and a rhombus is not necessarily a square."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("All squares are rectangles, and all rectangles are parallelograms")] },
        { id: "b", label: [t("All rectangles are squares")] },
        { id: "c", label: [t("All rhombuses are squares")] },
        { id: "d", label: [t("A kite is always a parallelogram")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c1-p10",
      type: "matching",
      prompt: [t("Match each quadrilateral to its correct classification.")],
      explanation: [
        t("A square has four equal sides and four right angles. A kite has two pairs of adjacent equal sides and is not a parallelogram. A rhombus is a parallelogram with four equal sides. A trapezium has exactly one pair of parallel sides in this example."),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [t("Four equal sides, four right angles")],
          right: [t("Square")],
        },
        {
          id: "b",
          left: [t("Two pairs of adjacent equal sides, no parallel sides")],
          right: [t("Kite")],
        },
        {
          id: "c",
          left: [t("A parallelogram with four equal sides")],
          right: [t("Rhombus")],
        },
        {
          id: "d",
          left: [t("Exactly one pair of parallel sides")],
          right: [t("Trapezium")],
        },
      ],
    },
  ],
  mastery: [
    {
      id: "c1-m1",
      type: "mcq",
      prompt: [t("A quadrilateral has opposite sides parallel and all angles equal to 90°, but its sides are not all equal. What is it?")],
      explanation: [
        t("A rectangle has opposite sides parallel and four right angles. The fact that not all sides are equal tells us it is not a square, but it is still a rectangle. A rhombus would have equal sides but not necessarily 90° angles. A trapezium only guarantees one pair of parallel sides."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("Rectangle")] },
        { id: "b", label: [t("Square")] },
        { id: "c", label: [t("Rhombus")] },
        { id: "d", label: [t("Trapezium")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c1-m2",
      type: "shortText",
      prompt: [t("Explain why every square is a rhombus, but not every rhombus is a square.")],
      explanation: [
        t("A rhombus is defined as a quadrilateral with four equal sides. A square has four equal sides, so it meets the definition of a rhombus. However, a rhombus does not require right angles — its angles can be any measure. A square additionally requires four right angles. Therefore a rhombus is only a square if all its angles happen to be 90°."),
      ],
      xp: 15,
      accepted: [
        "a square has four equal sides which is the definition of a rhombus",
        "a square meets the rhombus definition but a rhombus does not need right angles",
        "square has equal sides so it is a rhombus, but rhombus angles can be not 90",
        "a square has all rhombus properties plus right angles",
      ],
    },
    {
      id: "c1-m3",
      type: "mcq",
      prompt: [t("Which statement about a trapezium (Australian definition) is always true?")],
      explanation: [
        t("In Australian usage, a trapezium has at least one pair of parallel sides. It does not require equal sides, equal angles, or perpendicular diagonals. This definition means parallelograms, rectangles, rhombuses, and squares are all special types of trapeziums."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("It has at least one pair of parallel sides")] },
        { id: "b", label: [t("It has two pairs of equal sides")] },
        { id: "c", label: [t("All angles are equal")] },
        { id: "d", label: [t("Diagonals are perpendicular")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c1-m4",
      type: "matching",
      prompt: [t("Match each shape to the category it belongs to. A shape may belong to more than one category — select the most specific correct one.")],
      explanation: [
        t("A square is the most specific: it is a rectangle (90° angles), a rhombus (equal sides), and a parallelogram. A rhombus is a parallelogram with equal sides. A kite with unequal adjacent pairs is not a parallelogram. A rectangle without equal sides is a parallelogram but not a rhombus or square."),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [t("Four equal sides and four right angles")],
          right: [t("Square")],
        },
        {
          id: "b",
          left: [t("Four equal sides, angles 60° and 120°")],
          right: [t("Rhombus")],
        },
        {
          id: "c",
          left: [t("Adjacent sides 5 cm and 8 cm, no parallel sides")],
          right: [t("Kite")],
        },
        {
          id: "d",
          left: [t("Opposite sides equal and parallel, angles not 90°")],
          right: [t("Parallelogram")],
        },
      ],
    },
  ],
};

// ===========================================================================
// Lesson 2 — Properties of quadrilaterals
// ===========================================================================

const lesson2: Lesson = {
  id: "quad-properties",
  order: 2,
  title: "Properties of quadrilaterals",
  sourceRef: "2D",
  aiProvenance: provenance,
  learnCards: [
    {
      id: "c2-key",
      heading: "Key idea: four property categories",
      body: [
        t("Every quadrilateral type has a set of defining properties. These fall into four groups:"),
        t("1. Side properties — which sides are equal? Which are parallel?"),
        t("2. Angle properties — which angles are equal? Are any 90°?"),
        t("3. Diagonal properties — are diagonals equal? Do they bisect each other? Are they perpendicular?"),
        t("4. Symmetry — how many lines of symmetry? Does it have rotational symmetry?"),
        t("The table below summarises the key properties. Memorising these will help you identify shapes and solve problems quickly."),
        t("Square: equal sides, parallel opposite sides, 90° angles, equal diagonals that bisect at 90°, 4 lines of symmetry."),
        t("Rectangle: opposite sides equal and parallel, 90° angles, equal diagonals that bisect (not at 90°), 2 lines of symmetry."),
        t("Rhombus: equal sides, parallel opposite sides, equal opposite angles, diagonals bisect at 90° and bisect angles, 2 lines of symmetry."),
        t("Parallelogram: opposite sides equal and parallel, equal opposite angles, diagonals bisect each other, no lines of symmetry (unless a special case)."),
        t("Trapezium: at least one pair of parallel sides; other properties vary."),
        t("Kite: two pairs of adjacent equal sides, one pair of equal opposite angles, one diagonal bisects the other at 90°, 1 line of symmetry."),
      ],
    },
    {
      id: "c2-worked",
      heading: "Worked example: identifying a shape from properties",
      body: [
        t("Question: A quadrilateral has diagonals that bisect each other, are perpendicular, and also bisect the interior angles. All four sides are equal. What is it?"),
        t("Step 1: All four sides equal → it is at least a rhombus."),
        t("Step 2: Diagonals bisect each other at 90° → confirms it is a rhombus (this is a defining property)."),
        t("Step 3: Diagonals also bisect the interior angles → this is true for all rhombuses, and also for squares."),
        t("Step 4: We are not told the angles, so we cannot conclude it is a square. The most precise answer is a rhombus."),
        t("Answer: Rhombus."),
      ],
    },
    {
      id: "c2-mistake",
      heading: "Common mistake: mixing up diagonal properties",
      body: [
        t("Students often confuse which quadrilaterals have equal diagonals and which have perpendicular diagonals. Here is a simple rule:"),
        t("Equal diagonals → rectangles and squares (and sometimes isosceles trapeziums)."),
        t("Perpendicular diagonals → rhombuses, squares, and kites."),
        t("Diagonals that bisect each other → all parallelograms (including rectangles, rhombuses, squares)."),
        t("Diagonals that bisect the angles → rhombuses and squares."),
        t("Notice that a square has ALL of these properties, because a square inherits everything from both rectangles and rhombuses."),
        t("Key memory aid: R-E = Rectangle has Equal diagonals. R-P = Rhombus has Perpendicular diagonals."),
      ],
    },
  ],
  practice: [
    {
      id: "c2-p1",
      type: "mcq",
      prompt: [t("Which quadrilateral has diagonals that are always perpendicular?")],
      explanation: [
        t("A rhombus (including a square, which is a special rhombus) always has perpendicular diagonals. Rectangles and parallelograms in general have diagonals that bisect each other but are not necessarily perpendicular. A trapezium does not guarantee perpendicular diagonals."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Rhombus")] },
        { id: "b", label: [t("Rectangle")] },
        { id: "c", label: [t("Parallelogram (non-rhombus)")] },
        { id: "d", label: [t("Trapezium")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c2-p2",
      type: "mcq",
      prompt: [t("How many lines of symmetry does a rectangle (non-square) have?")],
      explanation: [
        t("A non-square rectangle has two lines of symmetry: one through the midpoints of the longer sides, and one through the midpoints of the shorter sides. The diagonals are not lines of symmetry for a rectangle (they are for a square)."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("2")] },
        { id: "b", label: [t("4")] },
        { id: "c", label: [t("0")] },
        { id: "d", label: [t("1")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c2-p3",
      type: "fillInTheBlank",
      prompt: [t("Complete the property statement.")],
      explanation: [
        t("In any parallelogram, opposite angles are equal. This is a defining property: if you know one angle, the opposite angle is the same, and adjacent angles are supplementary (sum to 180°)."),
      ],
      xp: 10,
      template: [t("In a parallelogram, opposite angles are ___.")],
      accepted: ["equal", "the same", "congruent"],
    },
    {
      id: "c2-p4",
      type: "numeric",
      prompt: [
        t("A parallelogram has one angle of "),
        m(String.raw`70^\circ`),
        t(". What is the measure of the angle opposite it, in degrees?"),
      ],
      explanation: [
        t("Opposite angles in a parallelogram are equal. Since one angle is 70°, the angle opposite it is also 70°. The adjacent angles would each be 180° - 70° = 110°."),
      ],
      xp: 10,
      accepted: ["70"],
    },
    {
      id: "c2-p5",
      type: "mcq",
      prompt: [t("Which quadrilaterals have diagonals that are equal in length?")],
      explanation: [
        t("Rectangles and squares have equal diagonals. In a rectangle, the diagonals are always equal because both are the hypotenuse of congruent right triangles formed by the sides. In a rhombus, diagonals are perpendicular but not equal (unless it is also a square)."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("Rectangle and square")] },
        { id: "b", label: [t("Rhombus and square")] },
        { id: "c", label: [t("Kite and rhombus")] },
        { id: "d", label: [t("All parallelograms")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c2-p6",
      type: "shortText",
      prompt: [t("Describe the symmetry of a kite. How many lines of symmetry does it have, and where are they?")],
      explanation: [
        t("A kite has exactly one line of symmetry, which runs along the diagonal that joins the vertices where the equal sides meet. This diagonal bisects the other diagonal at right angles. The two angles at the ends of the symmetry line are equal. The other two angles are generally not equal to each other."),
      ],
      xp: 15,
      accepted: [
        "one line of symmetry",
        "one",
        "1",
        "one line of symmetry along the diagonal connecting the vertices with equal angles",
        "one line of symmetry through the longer diagonal",
      ],
    },
    {
      id: "c2-p7",
      type: "mcq",
      prompt: [t("Which statement about the diagonals of a rhombus is true?")],
      explanation: [
        t("A rhombus has diagonals that bisect each other (like all parallelograms) AND are perpendicular AND bisect the interior angles. They are not equal in length unless the rhombus is also a square."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("They bisect each other at right angles and bisect the interior angles")] },
        { id: "b", label: [t("They are equal in length")] },
        { id: "c", label: [t("They are not perpendicular")] },
        { id: "d", label: [t("They do not bisect each other")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c2-p8",
      type: "numeric",
      prompt: [
        t("In a parallelogram, one angle measures "),
        m(String.raw`55^\circ`),
        t(". What is the measure of an adjacent angle, in degrees?"),
      ],
      explanation: [
        t("Adjacent angles in a parallelogram are supplementary — they sum to 180°. So the adjacent angle is 180° - 55° = 125°. This is because parallel lines cut by a transversal create co-interior angles that sum to 180°."),
      ],
      xp: 15,
      accepted: ["125"],
    },
    {
      id: "c2-p9",
      type: "matching",
      prompt: [t("Match each quadrilateral to its diagonal properties.")],
      explanation: [
        t("A square has diagonals that are equal, bisect each other, are perpendicular, and bisect the angles — it inherits all diagonal properties. A rectangle has equal diagonals that bisect each other. A rhombus has perpendicular diagonals that bisect each other and the angles. A kite has one diagonal that bisects the other at right angles."),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [t("Diagonals are equal, bisect each other, perpendicular, and bisect angles")],
          right: [t("Square")],
        },
        {
          id: "b",
          left: [t("Diagonals are equal and bisect each other (not perpendicular)")],
          right: [t("Rectangle")],
        },
        {
          id: "c",
          left: [t("Diagonals are perpendicular, bisect each other, and bisect angles")],
          right: [t("Rhombus")],
        },
        {
          id: "d",
          left: [t("One diagonal bisects the other at right angles")],
          right: [t("Kite")],
        },
      ],
    },
    {
      id: "c2-p10",
      type: "mcq",
      prompt: [t("A quadrilateral has two pairs of equal adjacent sides, one line of symmetry, and diagonals that are perpendicular. Which quadrilateral is it?")],
      explanation: [
        t("Two pairs of equal adjacent sides is the defining property of a kite. A rhombus also has equal adjacent sides (since all sides are equal), but it has two lines of symmetry (unless it is a square, which has four). A kite has exactly one line of symmetry along the diagonal that is the axis of symmetry. A parallelogram would not have perpendicular diagonals or one line of symmetry."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("Kite")] },
        { id: "b", label: [t("Rhombus")] },
        { id: "c", label: [t("Parallelogram")] },
        { id: "d", label: [t("Rectangle")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "c2-m1",
      type: "mcq",
      prompt: [t("Which quadrilateral has diagonals that bisect each other, are equal in length, and are perpendicular?")],
      explanation: [
        t("A square is the only quadrilateral with all three of these diagonal properties: they bisect each other (like all parallelograms), they are equal (like rectangles), and they are perpendicular (like rhombuses). A square inherits everything from both parents — rectangle and rhombus."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("Square")] },
        { id: "b", label: [t("Rectangle (non-square)")] },
        { id: "c", label: [t("Rhombus (non-square)")] },
        { id: "d", label: [t("Kite")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c2-m2",
      type: "numeric",
      prompt: [
        t("In a parallelogram, "),
        m(String.raw`\angle A = 48^\circ`),
        t(". Find "),
        m(String.raw`\angle B + \angle C`),
        t(", where "),
        m(String.raw`\angle B`),
        t(" is adjacent to "),
        m(String.raw`\angle A`),
        t(" and "),
        m(String.raw`\angle C`),
        t(" is opposite "),
        m(String.raw`\angle A`),
        t(", in degrees."),
      ],
      explanation: [
        t("In a parallelogram, opposite angles are equal: ∠C = ∠A = 48°. Adjacent angles are supplementary: ∠B = 180° - 48° = 132°. Therefore ∠B + ∠C = 132° + 48° = 180°. Note: adjacent angles in any parallelogram always sum to 180°."),
      ],
      xp: 15,
      accepted: ["180"],
    },
    {
      id: "c2-m3",
      type: "shortText",
      prompt: [t("Explain why a square inherits the diagonal properties of both a rectangle and a rhombus.")],
      explanation: [
        t("A square is both a rectangle (four right angles) and a rhombus (four equal sides). Since rectangles have equal diagonals and rhombuses have perpendicular diagonals that bisect the angles, a square has all of these properties. This is an example of how more specific shapes in the classification hierarchy inherit the properties of their more general 'parents'."),
      ],
      xp: 20,
      accepted: [
        "a square is both a rectangle and a rhombus so it inherits both sets of properties",
        "because a square is a special case of both shapes",
        "squares have the properties of rectangles and rhombuses since they meet both definitions",
        "a square is a rectangle and a rhombus simultaneously",
      ],
    },
  ],
};

// ===========================================================================
// Lesson 3 — Angle sum of quadrilaterals
// ===========================================================================

const lesson3: Lesson = {
  id: "quad-angle-sum",
  order: 3,
  title: "Angle sum of quadrilaterals",
  sourceRef: "2D",
  aiProvenance: provenance,
  learnCards: [
    {
      id: "c3-key",
      heading: "Key idea: the interior angles of any quadrilateral sum to 360°",
      body: [
        t("Every quadrilateral, no matter its shape, has interior angles that sum to 360°."),
        t("Why? Draw one diagonal. This splits the quadrilateral into two triangles. Each triangle has an angle sum of 180°, so the quadrilateral has 2 × 180° = 360°."),
        t("This means if you know three angles of any quadrilateral, you can always find the fourth:"),
        m(String.raw`\text{Unknown angle} = 360^\circ - (\text{angle}_1 + \text{angle}_2 + \text{angle}_3)`),
        t("For special quadrilaterals, you can use angle properties to simplify:"),
        t("Parallelogram: opposite angles are equal, adjacent angles sum to 180°."),
        t("Kite: one pair of opposite angles is equal."),
        t("Rectangle and square: all four angles are 90°."),
      ],
    },
    {
      id: "c3-worked",
      heading: "Worked example: finding an unknown angle",
      body: [
        t("Question: A quadrilateral has angles of 95°, 85°, and 110°. Find the fourth angle."),
        t("Step 1: Write the angle-sum equation."),
        m(String.raw`95^\circ + 85^\circ + 110^\circ + x = 360^\circ`),
        t("Step 2: Add the known angles."),
        m(String.raw`95 + 85 + 110 = 290`),
        t("Step 3: Solve for x."),
        m(String.raw`x = 360^\circ - 290^\circ = 70^\circ`),
        t("Check: 95 + 85 + 110 + 70 = 360 ✓."),
      ],
    },
    {
      id: "c3-mistake",
      heading: "Common mistake: forgetting that every quadrilateral sums to 360°",
      body: [
        t("Mistake 1: Treating a trapezium or kite differently. The rule is the same for ALL quadrilaterals — 360°. A triangle is the only polygon where the sum depends on the number of sides."),
        t("Mistake 2: Adding 180° instead of 360° by confusing with a triangle. Remember: quadrilateral angles sum to twice that of a triangle."),
        t("Mistake 3: Forgetting that opposite angles in a parallelogram are equal. If you know one angle of a parallelogram, you automatically know the opposite angle, and the adjacent two are supplementary."),
        t("Mistake 4: For angle-sum problems with algebra, not substituting back to find all angles. Always check that your final angles sum to 360°."),
      ],
    },
  ],
  practice: [
    {
      id: "c3-p1",
      type: "numeric",
      prompt: [t("What is the sum of the interior angles of any quadrilateral, in degrees?")],
      explanation: [
        t("A quadrilateral can be divided into two triangles by drawing one diagonal. Each triangle has an angle sum of 180°, so the quadrilateral has 2 × 180° = 360°."),
      ],
      xp: 10,
      accepted: ["360"],
    },
    {
      id: "c3-p2",
      type: "numeric",
      prompt: [
        t("A quadrilateral has three interior angles measuring "),
        m(String.raw`95^\circ`),
        t(", "),
        m(String.raw`85^\circ`),
        t(", and "),
        m(String.raw`110^\circ`),
        t(". Find the fourth angle, in degrees."),
      ],
      explanation: [
        t("Sum of known angles = 95 + 85 + 110 = 290. The fourth angle is 360 - 290 = 70°."),
      ],
      xp: 10,
      accepted: ["70"],
    },
    {
      id: "c3-p3",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence explaining the angle sum.")],
      explanation: [
        t("Any quadrilateral can be divided into two triangles by drawing one diagonal. Since each triangle has angles summing to 180°, the quadrilateral's angles sum to 360°."),
      ],
      xp: 10,
      template: [t("A quadrilateral can be divided into ___ triangles, so its angles sum to 360°.")],
      accepted: ["two", "2"],
    },
    {
      id: "c3-p4",
      type: "mcq",
      prompt: [
        t("A quadrilateral has angles "),
        m(String.raw`80^\circ`),
        t(", "),
        m(String.raw`95^\circ`),
        t(", and "),
        m(String.raw`70^\circ`),
        t(". What is the fourth angle?"),
      ],
      explanation: [
        t("80 + 95 + 70 = 245. 360 - 245 = 115°. The fourth angle is 115°."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m(String.raw`115^\circ`)] },
        { id: "b", label: [m(String.raw`105^\circ`)] },
        { id: "c", label: [m(String.raw`125^\circ`)] },
        { id: "d", label: [m(String.raw`95^\circ`)] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c3-p5",
      type: "numeric",
      prompt: [
        t("A kite has angles of "),
        m(String.raw`100^\circ`),
        t(", "),
        m(String.raw`80^\circ`),
        t(", and "),
        m(String.raw`100^\circ`),
        t(". Find the fourth angle, in degrees."),
      ],
      explanation: [
        t("Sum = 360°. Known angles: 100 + 80 + 100 = 280. Fourth angle = 360 - 280 = 80°. Note that a kite has one pair of equal opposite angles, and we can see 100° and 100° are opposite, and 80° pairs with the unknown."),
      ],
      xp: 15,
      accepted: ["80"],
    },
    {
      id: "c3-p6",
      type: "mcq",
      prompt: [
        t("In a parallelogram, one angle measures "),
        m(String.raw`65^\circ`),
        t(". What is the sum of the other three angles?"),
      ],
      explanation: [
        t("Total angle sum = 360°. One angle is 65°, so the sum of the other three is 360° - 65° = 295°. Alternatively: the opposite angle is also 65°, and the two adjacent angles sum to 2 × (180° - 65°) = 230°, giving 65° + 230° = 295°."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m(String.raw`295^\circ`)] },
        { id: "b", label: [m(String.raw`180^\circ`)] },
        { id: "c", label: [m(String.raw`245^\circ`)] },
        { id: "d", label: [m(String.raw`360^\circ`)] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c3-p7",
      type: "numeric",
      prompt: [
        t("A quadrilateral has angles "),
        m(String.raw`x^\circ`),
        t(", "),
        m(String.raw`2x^\circ`),
        t(", "),
        m(String.raw`3x^\circ`),
        t(", and "),
        m(String.raw`4x^\circ`),
        t(". Find the value of x."),
      ],
      explanation: [
        t("The four angles sum to 360°: x + 2x + 3x + 4x = 10x = 360. Therefore x = 36. The angles are 36°, 72°, 108°, and 144°. Check: 36 + 72 + 108 + 144 = 360 ✓."),
      ],
      xp: 15,
      accepted: ["36"],
    },
    {
      id: "c3-p8",
      type: "shortText",
      prompt: [t("Explain the method for finding a missing angle in any quadrilateral when the other three are known.")],
      explanation: [
        t("Add the three known angles, then subtract the sum from 360°. This works because the interior angles of every quadrilateral sum to 360°. For special quadrilaterals like parallelograms or kites, you may not need all three angles — you can use properties like opposite angles being equal to find unknowns with fewer givens."),
      ],
      xp: 15,
      accepted: [
        "add the three known angles and subtract from 360",
        "sum the known angles then subtract from 360 degrees",
        "360 minus the sum of the three known angles",
        "subtract the total of known angles from 360",
      ],
    },
    {
      id: "c3-p9",
      type: "numeric",
      prompt: [
        t("In a parallelogram, "),
        m(String.raw`\angle P`),
        t(" and "),
        m(String.raw`\angle Q`),
        t(" are in the ratio 2:3. Find the measure of the larger angle, in degrees."),
      ],
      explanation: [
        t("Let ∠P = 2x and ∠Q = 3x. These are adjacent angles in a parallelogram, so they are supplementary: 2x + 3x = 180. Therefore 5x = 180, giving x = 36. The larger angle is ∠Q = 3x = 3 × 36 = 108°. The other two angles are 108° and 72° (opposite angles equal). Check: 72 + 108 + 72 + 108 = 360 ✓."),
      ],
      xp: 20,
      accepted: ["108"],
    },
    {
      id: "c3-p10",
      type: "mcq",
      prompt: [
        t("In a kite, two opposite angles are equal. One of the equal angles is "),
        m(String.raw`130^\circ`),
        t(", and another angle is "),
        m(String.raw`50^\circ`),
        t(". Which statement must be true?"),
      ],
      explanation: [
        t("In a kite, one pair of opposite angles is equal. The two equal angles are 130° each, so that accounts for 260°. The remaining two angles sum to 360° - 260° = 100°. We know one of them is 50°, so the other must also be 50°, meaning the second pair is also equal. This kite happens to have both pairs of opposite angles equal — but this is not required for all kites."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("The fourth angle is 50°")] },
        { id: "b", label: [t("The kite must be a rhombus")] },
        { id: "c", label: [t("The kite has two right angles")] },
        { id: "d", label: [t("The angles sum to more than 360°")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "c3-m1",
      type: "numeric",
      prompt: [
        t("A quadrilateral has angles "),
        m(String.raw`(x + 30)^\circ`),
        t(", "),
        m(String.raw`(2x - 10)^\circ`),
        t(", "),
        m(String.raw`(x + 50)^\circ`),
        t(", and "),
        m(String.raw`x^\circ`),
        t(". Find the value of x."),
      ],
      explanation: [
        t("Sum the expressions: (x + 30) + (2x - 10) + (x + 50) + x = 5x + 70. Set equal to 360: 5x + 70 = 360, so 5x = 290, giving x = 58. The angles are 88°, 106°, 108°, and 58°. Check: 88 + 106 + 108 + 58 = 360 ✓."),
      ],
      xp: 15,
      accepted: ["58"],
    },
    {
      id: "c3-m2",
      type: "mcq",
      prompt: [
        t("A trapezium has one pair of parallel sides. The angles on one of the parallel sides are "),
        m(String.raw`75^\circ`),
        t(" and "),
        m(String.raw`105^\circ`),
        t(". What must be true about the other two angles?"),
      ],
      explanation: [
        t("When parallel lines are cut by a transversal, co-interior angles sum to 180°. The angle on the other parallel side that is co-interior with 75° must be 180° - 75° = 105°. The angle co-interior with 105° must be 180° - 105° = 75°. So the other two angles are 105° and 75°. The pairs on each parallel side sum to 180°."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("They are 105° and 75°")] },
        { id: "b", label: [t("They are both 90°")] },
        { id: "c", label: [t("They sum to 180° but their individual values cannot be determined")] },
        { id: "d", label: [t("They are 75° and 105° in the same order")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "c3-m3",
      type: "numeric",
      prompt: [
        t("In a parallelogram "),
        m(String.raw`ABCD`),
        t(", "),
        m(String.raw`\angle A = (3x - 15)^\circ`),
        t(" and "),
        m(String.raw`\angle B = (2x + 35)^\circ`),
        t(". Angles A and B are adjacent. Find the value of x."),
      ],
      explanation: [
        t("Adjacent angles in a parallelogram are supplementary: (3x - 15) + (2x + 35) = 180. Simplify: 5x + 20 = 180, so 5x = 160, giving x = 32. Check: ∠A = 3(32) - 15 = 81°, ∠B = 2(32) + 35 = 99°. 81 + 99 = 180 ✓. The other two angles are 99° and 81° (opposite angles equal)."),
      ],
      xp: 20,
      accepted: ["32"],
    },
    {
      id: "c3-m4",
      type: "shortText",
      prompt: [t("A student says: 'Since a rhombus is a type of parallelogram, and parallelogram angles sum to 360°, a rhombus's angles must sum to 360° too.' Is this reasoning correct? Explain.")],
      explanation: [
        t("The conclusion is correct, but the reasoning is backwards. ALL quadrilaterals sum to 360° — this is a property of having four sides, not of being a parallelogram. The student's logic (parallelogram → 360° → rhombus → 360°) works, but it obscures the simpler fact: a rhombus is a quadrilateral, so its angles sum to 360° regardless of any other properties. The angle sum depends only on the number of sides, not on the type of quadrilateral."),
      ],
      xp: 20,
      accepted: [
        "the conclusion is correct but all quadrilaterals sum to 360 not just parallelograms",
        "yes the angles sum to 360 but that is because it is a quadrilateral not because it is a parallelogram",
        "correct but the reasoning is backwards, all quadrilaterals sum to 360",
        "360 is true for all quadrilaterals not just parallelograms",
      ],
    },
  ],
};

// ===========================================================================
// Boss challenge — Quadrilaterals
// ===========================================================================

const bossQuestions = [
  {
    id: "quad-boss-q1",
    type: "numeric" as const,
    prompt: [
      t("A trapezium has interior angles of "),
      m(String.raw`95^\circ`),
      t(", "),
      m(String.raw`85^\circ`),
      t(", "),
      m(String.raw`110^\circ`),
      t(", and "),
      m(String.raw`x^\circ`),
      t(". Find x."),
    ],
    explanation: [
      t("Sum = 360°. 95 + 85 + 110 = 290. x = 360 - 290 = 70°."),
    ],
    xp: 20,
    accepted: ["70"],
  },
  {
    id: "quad-boss-q2",
    type: "mcq" as const,
    prompt: [t("Which statement about a rhombus is FALSE?")],
    explanation: [
      t("All sides are equal (true), opposite angles are equal (true), and diagonals are perpendicular (true). The diagonals of a rhombus are NOT necessarily equal — equal diagonals is a property of rectangles and squares. A rhombus only has equal diagonals when it is also a square."),
    ],
    xp: 20,
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
    type: "numeric" as const,
    prompt: [
      t("In a parallelogram, "),
      m(String.raw`\angle A`),
      t(" and "),
      m(String.raw`\angle B`),
      t(" are adjacent angles in the ratio 1:2. Find the measure of "),
      m(String.raw`\angle A`),
      t(", in degrees."),
    ],
    explanation: [
      t("Let ∠A = x and ∠B = 2x. Adjacent angles in a parallelogram are supplementary, so x + 2x = 180, giving 3x = 180 and x = 60. Therefore ∠A = 60°. The four angles are 60°, 120°, 60°, 120°. Check: 60 + 120 + 60 + 120 = 360 ✓."),
    ],
    xp: 25,
    accepted: ["60"],
  },
  {
    id: "quad-boss-q4",
    type: "numeric" as const,
    prompt: [
      t("A quadrilateral has angles "),
      m(String.raw`(2x + 10)^\circ`),
      t(", "),
      m(String.raw`(3x - 20)^\circ`),
      t(", "),
      m(String.raw`(x + 40)^\circ`),
      t(", and "),
      m(String.raw`(2x)^\circ`),
      t(". Find the value of x."),
    ],
    explanation: [
      t("Sum the expressions: (2x + 10) + (3x - 20) + (x + 40) + 2x = 8x + 30. Set equal to 360: 8x + 30 = 360, so 8x = 330, giving x = 41.25 or 165/4. The angles are 92.5°, 103.75°, 81.25°, and 82.5°. Check: 92.5 + 103.75 + 81.25 + 82.5 = 360 ✓."),
    ],
    xp: 25,
    accepted: ["41.25", "165/4", "41.3"],
  },
  {
    id: "quad-boss-q5",
    type: "mcq" as const,
    prompt: [t("Which statement correctly describes the relationship between quadrilaterals in the classification hierarchy?")],
    explanation: [
      t("Every square is a rectangle (four right angles) and every rectangle is a parallelogram (opposite sides parallel). The hierarchy flows: square ⊂ rectangle ⊂ parallelogram ⊂ trapezium ⊂ quadrilateral. A rhombus is not necessarily a square, and a kite is not necessarily a parallelogram — kites are on a separate branch of the hierarchy."),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("Every square is a rectangle, and every rectangle is a parallelogram")] },
      { id: "b", label: [t("Every rhombus is a square")] },
      { id: "c", label: [t("Every kite is a parallelogram")] },
      { id: "d", label: [t("A trapezium cannot be a parallelogram")] },
    ],
    correctOptionId: "a",
  },
];

// ===========================================================================
// Track export
// ===========================================================================

/** The Quadrilaterals track for Year 8 maths. */
export const quadrilateralsTrack: Track = {
  id: "quadrilaterals",
  subjectId: "maths",
  title: "Quadrilaterals (Year 8)",
  description:
    "Classifying quadrilaterals, identifying their properties, and calculating unknown angles using angle sum.",
  lessons: [lesson1, lesson2, lesson3],
  challenge: {
    id: "quadrilaterals-boss",
    title: "Boss challenge: Quadrilaterals",
    sourceRef: "2026 T2 Yr 8 Maths Planner — Term 2, Week 8",
    questions: bossQuestions,
    bonusXp: 100,
    passBadgeId: "boss-quadrilaterals",
    aiProvenance: provenance,
  },
};
