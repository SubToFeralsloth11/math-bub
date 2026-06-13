/**
 * Pythagoras track content (Year 8).
 *
 * Covers introduction to Pythagoras' theorem, using it to find the
 * hypotenuse, and calculating the length of a shorter side - based on
 * the 2026 Year 8 Maths Class Notebook (Term 1, Week 6, chapters 4K-4M).
 *
 * @author John Grimes
 * @module content/tracks/pythagoras
 */

import { m, t } from "../blocks";

import type { Lesson, BossChallenge, Track } from "../../domain/content/types";

// ---------------------------------------------------------------------------
// 4K - Introduction to Pythagoras' theorem
// ---------------------------------------------------------------------------

const lesson4K: Lesson = {
  id: "pyth-4k-intro",
  order: 1,
  title: "4K Introduction to Pythagoras' theorem",
  sourceRef: "4K",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  } as const,
  learnCards: [
    {
      id: "4k-key",
      heading: "Key idea: Pythagoras' theorem",
      body: [
        t("Pythagoras' theorem applies to right-angled triangles only."),
        t("It states that the square of the hypotenuse (c) equals the sum of the squares of the other two sides (a and b):"),
        m("c^2 = a^2 + b^2"),
        t("The hypotenuse is the longest side, always opposite the right angle."),
        t("The other two sides are called the legs."),
      ],
    },
    {
      id: "4k-worked",
      heading: "Worked example: finding the hypotenuse",
      body: [
        t("In a right-angled triangle, the two legs are 3 cm and 4 cm. Find the hypotenuse."),
        m(String.raw`c^2 = 3^2 + 4^2 = 9 + 16 = 25`),
        m(String.raw`c = \sqrt{25} = 5`),
        t("The hypotenuse is 5 cm."),
        t("The set (3, 4, 5) is called a Pythagorean triple - three whole numbers that satisfy the theorem."),
      ],
    },
    {
      id: "4k-mistake",
      heading: "Common mistake: identifying the hypotenuse",
      body: [
        t("The hypotenuse is always the side opposite the right angle. It is always the longest side."),
        t("Do not assume a side is the hypotenuse just because it is labelled c."),
        t("Always check: find the right angle first, then look at the side directly across from it."),
        t("Pythagoras' theorem only works for right-angled triangles. If a triangle does not have a right angle, you cannot use this theorem."),
      ],
    },
  ],
  practice: [
    // Fluency 1 (mcq)
    {
      id: "4k-p1",
      type: "mcq",
      prompt: [t("In a right-angled triangle, the hypotenuse is the:")],
      explanation: [
        t("The hypotenuse is always the longest side and lies opposite the right angle."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Longest side, opposite the right angle")] },
        { id: "b", label: [t("Shortest side")] },
        { id: "c", label: [t("Side next to the right angle")] },
        { id: "d", label: [t("Any of the three sides")] },
      ],
      correctOptionId: "a",
    },
    // Fluency 2 (numeric)
    {
      id: "4k-p2",
      type: "numeric",
      prompt: [
        t("In a right-angled triangle, the two shorter sides are 3 cm and 4 cm. Find the length of the hypotenuse, in cm."),
      ],
      explanation: [
        m(String.raw`c^2 = 3^2 + 4^2 = 9 + 16 = 25`),
        m(String.raw`c = \sqrt{25} = 5`),
        t("This is the classic 3-4-5 Pythagorean triple."),
      ],
      xp: 10,
      accepted: ["5"],
      unit: "cm",
    },
    // Fluency 3 (numeric)
    {
      id: "4k-p3",
      type: "numeric",
      prompt: [
        t("Find the hypotenuse of a right-angled triangle with legs 6 cm and 8 cm. Give your answer in cm."),
      ],
      explanation: [
        m(String.raw`c^2 = 6^2 + 8^2 = 36 + 64 = 100`),
        m(String.raw`c = \sqrt{100} = 10`),
        t("The 6-8-10 triple is the 3-4-5 triple scaled up by 2."),
      ],
      xp: 10,
      accepted: ["10"],
      unit: "cm",
    },
    // Fluency 4 (numeric)
    {
      id: "4k-p4",
      type: "numeric",
      prompt: [
        t("Find the hypotenuse of a right-angled triangle with legs 5 cm and 12 cm. Give your answer in cm."),
      ],
      explanation: [
        m(String.raw`c^2 = 5^2 + 12^2 = 25 + 144 = 169`),
        m(String.raw`c = \sqrt{169} = 13`),
        t("The 5-12-13 Pythagorean triple is another well-known triple."),
      ],
      xp: 10,
      accepted: ["13"],
      unit: "cm",
    },
    // Problem solving 1 (numeric)
    {
      id: "4k-p5",
      type: "numeric",
      prompt: [
        t("A ladder 5 m long leans against a vertical wall. The foot of the ladder is 3 m from the base of the wall. How high up the wall does the ladder reach, in m?"),
      ],
      explanation: [
        t("The ladder forms the hypotenuse (c = 5), the ground distance is one leg (a = 3)."),
        m(String.raw`b^2 = 5^2 - 3^2 = 25 - 9 = 16`),
        m(String.raw`b = \sqrt{16} = 4`),
        t("The ladder reaches 4 m up the wall. This is a 3-4-5 triangle."),
      ],
      xp: 15,
      accepted: ["4"],
      unit: "m",
    },
    // Problem solving 2 (numeric)
    {
      id: "4k-p6",
      type: "numeric",
      prompt: [
        t("A rectangular playing field is 30 m wide and 40 m long. A path runs diagonally from one corner to the opposite corner. How long is this diagonal path, in m?"),
      ],
      explanation: [
        t("The width and length are the legs of a right triangle. The diagonal is the hypotenuse."),
        m(String.raw`d^2 = 30^2 + 40^2 = 900 + 1600 = 2500`),
        m(String.raw`d = \sqrt{2500} = 50`),
        t("The diagonal path is 50 m. This is the 3-4-5 triple scaled by 10."),
      ],
      xp: 15,
      accepted: ["50"],
      unit: "m",
    },
    // Problem solving 3 (numeric)
    {
      id: "4k-p7",
      type: "numeric",
      prompt: [
        t("A ship sails 12 km north and then 5 km east. How far is the ship from its starting point (as the crow flies), in km?"),
      ],
      explanation: [
        t("The north and east legs form a right triangle. The straight-line distance is the hypotenuse."),
        m(String.raw`d^2 = 12^2 + 5^2 = 144 + 25 = 169`),
        m(String.raw`d = \sqrt{169} = 13`),
        t("The ship is 13 km from its starting point. This is a 5-12-13 triple."),
      ],
      xp: 15,
      accepted: ["13"],
      unit: "km",
    },
    // Enrichment 1 (mcq) - testing if a set is a Pythagorean triple
    {
      id: "4k-p8",
      type: "mcq",
      prompt: [
        t("Which of these sets of numbers CANNOT be the side lengths of a right-angled triangle?"),
      ],
      explanation: [
        t("Check each set:"),
        m(String.raw`3^2 + 4^2 = 9 + 16 = 25 = 5^2 \checkmark`),
        m(String.raw`6^2 + 8^2 = 36 + 64 = 100 = 10^2 \checkmark`),
        m(String.raw`5^2 + 12^2 = 25 + 144 = 169 = 13^2 \checkmark`),
        m(String.raw`2^2 + 3^2 = 4 + 9 = 13 \neq 4^2 = 16 \ \times`),
        t("The set (2, 3, 4) does not satisfy the theorem."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("3, 4, 5")] },
        { id: "b", label: [t("6, 8, 10")] },
        { id: "c", label: [t("5, 12, 13")] },
        { id: "d", label: [t("2, 3, 4")] },
      ],
      correctOptionId: "d",
    },
    // Enrichment 2 (mcq) - theorem scope
    {
      id: "4k-p9",
      type: "mcq",
      prompt: [
        t("For which type of triangle can Pythagoras' theorem be used?"),
      ],
      explanation: [
        t("Pythagoras' theorem only applies to right-angled triangles. It does not work for acute, obtuse, isosceles (unless right-angled), or equilateral triangles."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("Right-angled triangles only")] },
        { id: "b", label: [t("All triangles")] },
        { id: "c", label: [t("Isosceles triangles only")] },
        { id: "d", label: [t("Equilateral triangles only")] },
      ],
      correctOptionId: "a",
    },
    // Enrichment 3 (fillInTheBlank)
    {
      id: "4k-p10",
      type: "fillInTheBlank",
      prompt: [t("Complete the statement of Pythagoras' theorem.")],
      explanation: [
        t("In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: c² = a² + b²."),
      ],
      xp: 20,
      template: [t("In a right-angled triangle, the square of the ___ equals the sum of the squares of the other two sides.")],
      accepted: ["hypotenuse", "longest side"],
    },
  ],
  mastery: [
    {
      id: "4k-m1",
      type: "numeric",
      prompt: [
        t("Find the length of the hypotenuse when the two shorter sides are 9 cm and 12 cm. Give your answer in cm."),
      ],
      explanation: [
        m(String.raw`c^2 = 9^2 + 12^2 = 81 + 144 = 225`),
        m(String.raw`c = \sqrt{225} = 15`),
        t("This is the 3-4-5 triple scaled by 3. (9, 12, 15)."),
      ],
      xp: 15,
      accepted: ["15"],
      unit: "cm",
    },
    {
      id: "4k-m2",
      type: "mcq",
      prompt: [
        t("Which equation correctly states Pythagoras' theorem?"),
      ],
      explanation: [
        t("Pythagoras' theorem is c² = a² + b², where c is the hypotenuse and a and b are the legs."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("c^2 = a^2 + b^2")] },
        { id: "b", label: [m("c = a + b")] },
        { id: "c", label: [m("a^2 = b^2 + c^2")] },
        { id: "d", label: [m("c^2 = a^2 - b^2")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4k-m3",
      type: "numeric",
      prompt: [
        t("A right-angled triangle has shorter sides of 7 m and 24 m. Find the length of the hypotenuse, in m."),
      ],
      explanation: [
        m(String.raw`c^2 = 7^2 + 24^2 = 49 + 576 = 625`),
        m(String.raw`c = \sqrt{625} = 25`),
        t("The 7-24-25 triple is a Pythagorean triple."),
      ],
      xp: 15,
      accepted: ["25"],
      unit: "m",
    },
    {
      id: "4k-m4",
      type: "shortText",
      prompt: [
        t("Explain why a triangle with side lengths 4 cm, 5 cm and 6 cm is NOT a right-angled triangle."),
      ],
      explanation: [
        t("For a right-angled triangle, the square of the longest side must equal the sum of the squares of the other two."),
        m(String.raw`6^2 = 36`),
        m(String.raw`4^2 + 5^2 = 16 + 25 = 41`),
        t("Since 36 ≠ 41, the triangle does not satisfy Pythagoras' theorem and is not right-angled."),
      ],
      xp: 15,
      accepted: [
        "4 squared plus 5 squared does not equal 6 squared",
        "16 + 25 does not equal 36",
        "41 does not equal 36",
        "the squares do not add up",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 4L - Using Pythagoras' theorem
// ---------------------------------------------------------------------------

const lesson4L: Lesson = {
  id: "pyth-4l-using",
  order: 2,
  title: "4L Using Pythagoras' theorem",
  sourceRef: "4L",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  } as const,
  learnCards: [
    {
      id: "4l-key",
      heading: "Key idea: using Pythagoras' theorem",
      body: [
        t("Pythagoras' theorem is used to find unknown side lengths in right-angled triangles and to solve real-world problems involving distances."),
        t("To find the hypotenuse when you know both legs:"),
        m(String.raw`c = \sqrt{a^2 + b^2}`),
        t("Steps: 1. Square each leg. 2. Add the squares. 3. Take the square root of the sum."),
        t("Many real-world situations form right triangles: ladders against walls, diagonals of rectangles, navigation paths, and distances between points on a grid."),
      ],
    },
    {
      id: "4l-worked",
      heading: "Worked example: finding the hypotenuse",
      body: [
        t("Find the hypotenuse of a right-angled triangle when the legs are 8 cm and 15 cm."),
        m(String.raw`c^2 = 8^2 + 15^2 = 64 + 225 = 289`),
        m(String.raw`c = \sqrt{289} = 17`),
        t("The hypotenuse is 17 cm."),
        t("Always check: is the hypotenuse larger than both legs? 17 > 8 and 17 > 15 ✓."),
      ],
    },
    {
      id: "4l-mistake",
      heading: "Common mistake: forgetting the square root",
      body: [
        t("A common error is to stop after adding the squares. Remember:"),
        m(String.raw`c^2`),
        t("is the square of the hypotenuse - you still need to take the square root to find c."),
        t("Another mistake is to add the side lengths first and then square:"),
        m(String.raw`\sqrt{6^2 + 8^2} = \sqrt{36 + 64} = \sqrt{100} = 10`),
        t("The correct approach is to square first, add, then take the square root."),
        m(String.raw`6 + 8 = 14`),
        t("is NOT the hypotenuse."),
      ],
    },
  ],
  practice: [
    // Fluency 1 (numeric)
    {
      id: "4l-p1",
      type: "numeric",
      prompt: [
        t("Find the hypotenuse when the two shorter sides are 9 cm and 12 cm. Give your answer in cm."),
      ],
      explanation: [
        m(String.raw`c^2 = 9^2 + 12^2 = 81 + 144 = 225`),
        m(String.raw`c = \sqrt{225} = 15`),
        t("The 9-12-15 triple is the 3-4-5 triple scaled by 3."),
      ],
      xp: 10,
      accepted: ["15"],
      unit: "cm",
    },
    // Fluency 2 (numeric)
    {
      id: "4l-p2",
      type: "numeric",
      prompt: [
        t("Find the length of the hypotenuse when the shorter sides are 8 cm and 15 cm. Give your answer in cm."),
      ],
      explanation: [
        m(String.raw`c^2 = 8^2 + 15^2 = 64 + 225 = 289`),
        m(String.raw`c = \sqrt{289} = 17`),
        t("The 8-15-17 is a Pythagorean triple."),
      ],
      xp: 10,
      accepted: ["17"],
      unit: "cm",
    },
    // Problem solving 1 (numeric) - TV diagonal
    {
      id: "4l-p3",
      type: "numeric",
      prompt: [
        t("A television screen is 80 cm wide and 60 cm tall. What is the length of the diagonal of the screen, in cm?"),
      ],
      explanation: [
        t("The width and height form the legs of a right triangle. The diagonal is the hypotenuse."),
        m(String.raw`d^2 = 80^2 + 60^2 = 6400 + 3600 = 10000`),
        m(String.raw`d = \sqrt{10000} = 100`),
        t("The diagonal is 100 cm. This is the 3-4-5 triple scaled by 20."),
      ],
      xp: 15,
      accepted: ["100"],
      unit: "cm",
    },
    // Problem solving 2 (numeric) - ship navigation
    {
      id: "4l-p4",
      type: "numeric",
      prompt: [
        t("A ship sails 24 km east and then 10 km north. How far is it from its starting point, in km?"),
      ],
      explanation: [
        t("The east and north distances form a right triangle. The straight-line distance is the hypotenuse."),
        m(String.raw`d^2 = 24^2 + 10^2 = 576 + 100 = 676`),
        m(String.raw`d = \sqrt{676} = 26`),
        t("The ship is 26 km from its starting point. This is the 5-12-13 triple scaled by 2: 10-24-26."),
      ],
      xp: 15,
      accepted: ["26"],
      unit: "km",
    },
    // Problem solving 3 (numeric) - garden diagonal
    {
      id: "4l-p5",
      type: "numeric",
      prompt: [
        t("A rectangular garden is 16 m by 12 m. What is the length of the diagonal path across it, in m?"),
      ],
      explanation: [
        t("The width and length form the legs. The diagonal is the hypotenuse."),
        m(String.raw`d^2 = 16^2 + 12^2 = 256 + 144 = 400`),
        m(String.raw`d = \sqrt{400} = 20`),
        t("The diagonal is 20 m. This is the 3-4-5 triple scaled by 4: 12-16-20."),
      ],
      xp: 15,
      accepted: ["20"],
      unit: "m",
    },
    // Problem solving 4 (numeric) - large triple
    {
      id: "4l-p6",
      type: "numeric",
      prompt: [
        t("In a right-angled triangle, the two shorter sides are 20 cm and 21 cm. Find the hypotenuse, in cm."),
      ],
      explanation: [
        m(String.raw`c^2 = 20^2 + 21^2 = 400 + 441 = 841`),
        m(String.raw`c = \sqrt{841} = 29`),
        t("The 20-21-29 is a Pythagorean triple."),
      ],
      xp: 15,
      accepted: ["29"],
      unit: "cm",
    },
    // Problem solving 5 (numeric) - grid distance
    {
      id: "4l-p7",
      type: "numeric",
      prompt: [
        t("A point on a map is 15 km east and 8 km north of a town. What is the straight-line distance from the town to the point, in km?"),
      ],
      explanation: [
        t("The east and north distances are the legs. The straight-line distance is the hypotenuse."),
        m(String.raw`d^2 = 15^2 + 8^2 = 225 + 64 = 289`),
        m(String.raw`d = \sqrt{289} = 17`),
        t("The distance is 17 km. This is the 8-15-17 Pythagorean triple."),
      ],
      xp: 15,
      accepted: ["17"],
      unit: "km",
    },
    // Enrichment 1 (mcq) - method step
    {
      id: "4l-p8",
      type: "mcq",
      prompt: [
        t("After you have squared both shorter sides and added them, what must you do next to find the hypotenuse?"),
      ],
      explanation: [
        t("Finding the hypotenuse is a three-step process: square, add, then take the square root. Forgetting the square root leaves you with c², not c."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("Take the square root")] },
        { id: "b", label: [t("Divide by 2")] },
        { id: "c", label: [t("Multiply by 2")] },
        { id: "d", label: [t("Subtract the smaller square")] },
      ],
      correctOptionId: "a",
    },
    // Enrichment 2 (fillInTheBlank)
    {
      id: "4l-p9",
      type: "fillInTheBlank",
      prompt: [t("Complete the formula for finding the hypotenuse.")],
      explanation: [
        t("The hypotenuse c is found by c = √(a² + b²). The formula c² = a² + b² is the standard statement."),
      ],
      xp: 20,
      template: [t("The formula for Pythagoras' theorem is: c² = a² + ___")],
      accepted: ["b²", "b^2", "b squared"],
    },
    // Enrichment 3 (mcq) - hypotenuse of a given triangle
    {
      id: "4l-p10",
      type: "mcq",
      prompt: [
        t("A right-angled triangle has shorter sides of 7 cm and 24 cm. What is the length of the hypotenuse?"),
      ],
      explanation: [
        m(String.raw`c^2 = 7^2 + 24^2 = 49 + 576 = 625`),
        m(String.raw`c = \sqrt{625} = 25`),
        t("The 7-24-25 is a Pythagorean triple."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("25 cm")] },
        { id: "b", label: [t("31 cm")] },
        { id: "c", label: [t("17 cm")] },
        { id: "d", label: [t("20 cm")] },
      ],
      correctOptionId: "a",
    },
    // Enrichment 4 (shortText) - common student error
    {
      id: "4l-p11",
      type: "shortText",
      prompt: [
        t("A student claims that for a right triangle with legs 6 and 8, the hypotenuse is 14 because 6 + 8 = 14. What mistake has the student made?"),
      ],
      explanation: [
        t("The student added the legs instead of squaring them first. The correct method is: square each leg (36 and 64), add (100), then take the square root (10). The hypotenuse is 10, not 14."),
        m(String.raw`\sqrt{6^2 + 8^2} \neq 6 + 8`),
        t(". The square root of a sum is not equal to the sum of the square roots."),
      ],
      xp: 20,
      accepted: [
        "they added the sides instead of squaring them",
        "they did not use the formula correctly",
        "they should square each leg first, add, then take the square root",
        "added instead of squaring",
        "forgot to square the sides",
      ],
    },
    // Enrichment 5 (matching)
    {
      id: "4l-p12",
      type: "matching",
      prompt: [
        t("Match each pair of shorter sides with the correct length of the hypotenuse."),
      ],
      explanation: [
        t("3² + 4² = 9 + 16 = 25, √25 = 5."),
        t("5² + 12² = 25 + 144 = 169, √169 = 13."),
        t("8² + 15² = 64 + 225 = 289, √289 = 17."),
        t("9² + 12² = 81 + 144 = 225, √225 = 15."),
        t("These are all Pythagorean triples."),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [t("Legs 3 and 4")],
          right: [t("Hypotenuse 5")],
        },
        {
          id: "b",
          left: [t("Legs 5 and 12")],
          right: [t("Hypotenuse 13")],
        },
        {
          id: "c",
          left: [t("Legs 8 and 15")],
          right: [t("Hypotenuse 17")],
        },
        {
          id: "d",
          left: [t("Legs 9 and 12")],
          right: [t("Hypotenuse 15")],
        },
      ],
    },
  ],
  mastery: [
    {
      id: "4l-m1",
      type: "numeric",
      prompt: [
        t("A right-angled triangle has shorter sides of 11 cm and 60 cm. Find the length of the hypotenuse, in cm."),
      ],
      explanation: [
        m(String.raw`c^2 = 11^2 + 60^2 = 121 + 3600 = 3721`),
        m(String.raw`c = \sqrt{3721} = 61`),
        t("The 11-60-61 is a Pythagorean triple."),
      ],
      xp: 15,
      accepted: ["61"],
      unit: "cm",
    },
    {
      id: "4l-m2",
      type: "numeric",
      prompt: [
        t("A rectangular room is 12 m long and 9 m wide. What is the diagonal distance from one corner to the opposite corner, in m?"),
      ],
      explanation: [
        t("The length and width are legs. The diagonal is the hypotenuse."),
        m(String.raw`d^2 = 12^2 + 9^2 = 144 + 81 = 225`),
        m(String.raw`d = \sqrt{225} = 15`),
        t("The diagonal is 15 m. This is the 3-4-5 triple scaled by 3: 9-12-15."),
      ],
      xp: 15,
      accepted: ["15"],
      unit: "m",
    },
    {
      id: "4l-m3",
      type: "mcq",
      prompt: [
        t("A right-angled triangle has legs of length 10 cm and 24 cm. The length of the hypotenuse is:"),
      ],
      explanation: [
        m(String.raw`c^2 = 10^2 + 24^2 = 100 + 576 = 676`),
        m(String.raw`c = \sqrt{676} = 26`),
        t("Double-check: 10² + 24² = 100 + 576 = 676, √676 = 26."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("26 cm")] },
        { id: "b", label: [t("34 cm")] },
        { id: "c", label: [t("14 cm")] },
        { id: "d", label: [t("28 cm")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4l-m4",
      type: "shortText",
      prompt: [
        t("A friend tells you that √(x² + y²) = x + y for all numbers x and y. Is your friend correct? Give a counterexample to prove your answer."),
      ],
      explanation: [
        t("The statement is false. For example, if x = 3 and y = 4: √(3² + 4²) = √(9 + 16) = √25 = 5, but 3 + 4 = 7. Not equal. You cannot distribute a square root over addition."),
      ],
      xp: 15,
      accepted: [
        "no",
        "false",
        "incorrect",
        "no because square root does not distribute",
        "no, 3 and 4 gives 5 not 7",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 4M - Calculating the length of a shorter side
// ---------------------------------------------------------------------------

const lesson4M: Lesson = {
  id: "pyth-4m-shorter-side",
  order: 3,
  title: "4M Calculating the length of a shorter side",
  sourceRef: "4M",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  } as const,
  learnCards: [
    {
      id: "4m-key",
      heading: "Key idea: finding a shorter side",
      body: [
        t("When you know the hypotenuse and one leg, you can find the other leg by rearranging Pythagoras' theorem:"),
        m(String.raw`a^2 = c^2 - b^2`),
        m(String.raw`b^2 = c^2 - a^2`),
        t("Steps: 1. Square the hypotenuse. 2. Subtract the square of the known leg. 3. Take the square root of the result."),
        t("Always check: the shorter side must be less than the hypotenuse. If your answer is larger than the hypotenuse, you have made a mistake."),
      ],
    },
    {
      id: "4m-worked",
      heading: "Worked example: finding a shorter side",
      body: [
        t("A right-angled triangle has hypotenuse 15 cm and one leg 9 cm. Find the other leg."),
        m(String.raw`a^2 = 15^2 - 9^2 = 225 - 81 = 144`),
        m(String.raw`a = \sqrt{144} = 12`),
        t("The unknown leg is 12 cm. Check: 12 < 15 ✓."),
        t("Notice that we subtracted, not added. This is the key difference from finding the hypotenuse."),
      ],
    },
    {
      id: "4m-mistake",
      heading: "Common mistake: adding instead of subtracting",
      body: [
        t("When finding a shorter side, you must subtract, not add. A common error is to use c² + a² or to add the squares of the two known sides."),
        t("Remember: the hypotenuse is the longest side, so its square is the largest number. When you subtract a smaller square from it, you get a positive number that is less than the square of the hypotenuse."),
        t("If your calculated leg is longer than the hypotenuse, you probably added instead of subtracted."),
        t("Also: check that your answer is reasonable. A leg must be shorter than the hypotenuse."),
      ],
    },
  ],
  practice: [
    // Fluency 1 (numeric)
    {
      id: "4m-p1",
      type: "numeric",
      prompt: [
        t("Find the unknown shorter side: hypotenuse = 10 cm, one shorter side = 8 cm. Give your answer in cm."),
      ],
      explanation: [
        m(String.raw`a^2 = 10^2 - 8^2 = 100 - 64 = 36`),
        m(String.raw`a = \sqrt{36} = 6`),
        t("The unknown side is 6 cm. This is a 6-8-10 triangle (the 3-4-5 triple scaled by 2)."),
      ],
      xp: 10,
      accepted: ["6"],
      unit: "cm",
    },
    // Fluency 2 (numeric)
    {
      id: "4m-p2",
      type: "numeric",
      prompt: [
        t("Find the unknown shorter side: hypotenuse = 13 cm, one shorter side = 5 cm. Give your answer in cm."),
      ],
      explanation: [
        m(String.raw`a^2 = 13^2 - 5^2 = 169 - 25 = 144`),
        m(String.raw`a = \sqrt{144} = 12`),
        t("The unknown side is 12 cm. This is the 5-12-13 Pythagorean triple."),
      ],
      xp: 10,
      accepted: ["12"],
      unit: "cm",
    },
    // Problem solving 1 (numeric)
    {
      id: "4m-p3",
      type: "numeric",
      prompt: [
        t("In a right-angled triangle, the hypotenuse is 25 cm and one leg is 24 cm. Find the other leg, in cm."),
      ],
      explanation: [
        m(String.raw`a^2 = 25^2 - 24^2 = 625 - 576 = 49`),
        m(String.raw`a = \sqrt{49} = 7`),
        t("The unknown leg is 7 cm. This is the 7-24-25 Pythagorean triple."),
      ],
      xp: 15,
      accepted: ["7"],
      unit: "cm",
    },
    // Problem solving 2 (numeric) - ladder against wall
    {
      id: "4m-p4",
      type: "numeric",
      prompt: [
        t("A ladder 13 m long leans against a wall. The foot of the ladder is 12 m from the wall. How high up the wall does the ladder reach, in m?"),
      ],
      explanation: [
        t("The ladder is the hypotenuse (c = 13), the ground distance is one leg (a = 12)."),
        m(String.raw`b^2 = 13^2 - 12^2 = 169 - 144 = 25`),
        m(String.raw`b = \sqrt{25} = 5`),
        t("The ladder reaches 5 m up the wall. This is a 5-12-13 triangle."),
      ],
      xp: 15,
      accepted: ["5"],
      unit: "m",
    },
    // Problem solving 3 (numeric) - wire and pole
    {
      id: "4m-p5",
      type: "numeric",
      prompt: [
        t("A wire 17 m long runs from the top of a pole to a point on the ground 15 m from the base of the pole. How tall is the pole, in m?"),
      ],
      explanation: [
        t("The wire is the hypotenuse (c = 17), the ground distance is one leg (a = 15)."),
        m(String.raw`h^2 = 17^2 - 15^2 = 289 - 225 = 64`),
        m(String.raw`h = \sqrt{64} = 8`),
        t("The pole is 8 m tall. This is the 8-15-17 Pythagorean triple."),
      ],
      xp: 15,
      accepted: ["8"],
      unit: "m",
    },
    // Problem solving 4 (numeric)
    {
      id: "4m-p6",
      type: "numeric",
      prompt: [
        t("In a right-angled triangle, the hypotenuse is 15 cm and one leg is 9 cm. Find the other leg, in cm."),
      ],
      explanation: [
        m(String.raw`a^2 = 15^2 - 9^2 = 225 - 81 = 144`),
        m(String.raw`a = \sqrt{144} = 12`),
        t("The unknown leg is 12 cm. This is the 9-12-15 triple (the 3-4-5 scaled by 3)."),
      ],
      xp: 15,
      accepted: ["12"],
      unit: "cm",
    },
    // Problem solving 5 (numeric) - kite string
    {
      id: "4m-p7",
      type: "numeric",
      prompt: [
        t("A kite string is 50 m long. The kite is directly above a point on the ground that is 30 m from the person holding the string. How high is the kite, in m?"),
      ],
      explanation: [
        t("The string is the hypotenuse (c = 50), the ground distance is one leg (a = 30)."),
        m(String.raw`h^2 = 50^2 - 30^2 = 2500 - 900 = 1600`),
        m(String.raw`h = \sqrt{1600} = 40`),
        t("The kite is 40 m high. This is the 3-4-5 triple scaled by 10: 30-40-50."),
      ],
      xp: 15,
      accepted: ["40"],
      unit: "m",
    },
    // Enrichment 1 (mcq) - correct formula
    {
      id: "4m-p8",
      type: "mcq",
      prompt: [
        t("To find the length of a shorter side in a right-angled triangle when you know the hypotenuse and the other leg, you should use:"),
      ],
      explanation: [
        t("The correct formula is a² = c² - b², where c is the hypotenuse and b is the known leg. You subtract, not add, because the hypotenuse is the longest side."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [m("a^2 = c^2 - b^2")] },
        { id: "b", label: [m("a^2 = c^2 + b^2")] },
        { id: "c", label: [m("a = c - b")] },
        { id: "d", label: [m("a^2 = b^2 - c^2")] },
      ],
      correctOptionId: "a",
    },
    // Enrichment 2 (fillInTheBlank)
    {
      id: "4m-p9",
      type: "fillInTheBlank",
      prompt: [t("Complete the rule for checking your answer when finding a shorter side.")],
      explanation: [
        t("The hypotenuse is always the longest side in a right-angled triangle. Any shorter side must have a length less than the hypotenuse. This is a quick way to check your answer is reasonable."),
      ],
      xp: 20,
      template: [t("The calculated shorter side must always be ___ than the hypotenuse.")],
      accepted: ["less", "shorter", "smaller"],
    },
    // Enrichment 3 (mcq) - given numbers
    {
      id: "4m-p10",
      type: "mcq",
      prompt: [
        t("Given the hypotenuse c = 10 cm and one leg b = 6 cm, the other leg a is:"),
      ],
      explanation: [
        m(String.raw`a^2 = 10^2 - 6^2 = 100 - 36 = 64`),
        m(String.raw`a = \sqrt{64} = 8`),
        t("Always check: 8 < 10 ✓. Options b and c are common mistakes from adding (100 + 36) or misunderstanding the formula."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("8 cm")] },
        { id: "b", label: [t("4 cm")] },
        { id: "c", label: [t("16 cm")] },
        { id: "d", label: [m(String.raw`\sqrt{136}`), t(" cm")] },
      ],
      correctOptionId: "a",
    },
    // Enrichment 4 (mcq) - student error
    {
      id: "4m-p11",
      type: "mcq",
      prompt: [
        t("A student calculates a shorter side and gets 15 cm, but the hypotenuse is 10 cm. The student has probably:"),
      ],
      explanation: [
        t("If the calculated leg (15 cm) is longer than the hypotenuse (10 cm), the student likely added the squares instead of subtracting. You must use a² = c² - b², not c² + b²."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("Added instead of subtracted the squares")] },
        { id: "b", label: [t("Used the wrong units")] },
        { id: "c", label: [t("Forgotten to square the numbers")] },
        { id: "d", label: [t("Divided instead of taking the square root")] },
      ],
      correctOptionId: "a",
    },
    // Enrichment 5 (shortText) - why check
    {
      id: "4m-p12",
      type: "shortText",
      prompt: [
        t("Why should you always check that your answer for a shorter side is less than the given hypotenuse?"),
      ],
      explanation: [
        t("The hypotenuse is defined as the longest side of a right-angled triangle. If a calculated shorter side turned out to be longer than the hypotenuse, it would contradict the definition and indicate a mistake in calculation."),
      ],
      xp: 20,
      accepted: [
        "because the hypotenuse is the longest side",
        "the hypotenuse is always the longest side",
        "a shorter side cannot be longer than the hypotenuse",
        "to check the answer makes sense",
        "it is a quick way to spot errors",
      ],
    },
  ],
  mastery: [
    {
      id: "4m-m1",
      type: "numeric",
      prompt: [
        t("Find the unknown side: hypotenuse = 41, one leg = 9."),
      ],
      explanation: [
        m(String.raw`a^2 = 41^2 - 9^2 = 1681 - 81 = 1600`),
        m(String.raw`a = \sqrt{1600} = 40`),
        t("The unknown leg is 40. The 9-40-41 is a Pythagorean triple."),
      ],
      xp: 15,
      accepted: ["40"],
    },
    {
      id: "4m-m2",
      type: "numeric",
      prompt: [
        t("A right-angled triangle has hypotenuse 29 cm and one leg 20 cm. Find the other leg, in cm."),
      ],
      explanation: [
        m(String.raw`a^2 = 29^2 - 20^2 = 841 - 400 = 441`),
        m(String.raw`a = \sqrt{441} = 21`),
        t("The unknown leg is 21 cm. The 20-21-29 is a Pythagorean triple."),
      ],
      xp: 15,
      accepted: ["21"],
      unit: "cm",
    },
    {
      id: "4m-m3",
      type: "mcq",
      prompt: [
        t("When rearranging Pythagoras' theorem to find a shorter side, which statement is true?"),
      ],
      explanation: [
        t("The hypotenuse (c) must be the longest side and is the one you subtract from: a² = c² - b². If you subtract from the wrong side, you may get a negative number under the square root, which has no real solution."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("You always subtract the known leg's square from the hypotenuse's square")] },
        { id: "b", label: [t("You can subtract either way and get the same answer")] },
        { id: "c", label: [t("You add the two known squares")] },
        { id: "d", label: [t("You divide the hypotenuse's square by the leg's square")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4m-m4",
      type: "shortText",
      prompt: [
        t("Can a right-angled triangle have a hypotenuse of 10 cm and a shorter side of 12 cm? Explain your answer."),
      ],
      explanation: [
        t("No, this is impossible. The hypotenuse is defined as the longest side of a right-angled triangle. If a side measured 12 cm and the hypotenuse only 10 cm, that side would be longer than the hypotenuse, which contradicts the definition of the hypotenuse."),
      ],
      xp: 15,
      accepted: [
        "no",
        "no because the hypotenuse is the longest side",
        "no, a shorter side cannot be longer than the hypotenuse",
        "impossible, the hypotenuse must be the longest",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Boss challenge: Pythagoras' theorem
// ---------------------------------------------------------------------------

const bossChallenge: BossChallenge = {
  id: "pythagoras-boss",
  title: "Boss challenge: Pythagoras' theorem",
  sourceRef: "2026 T1 Yr 8 Maths Planner — Term 1, Week 6",
  questions: [
    // Medium 1 (20 XP) - find hypotenuse
    {
      id: "pyth-boss-q1",
      type: "numeric",
      prompt: [
        t("Find the hypotenuse when the shorter sides are 10 cm and 24 cm. Give your answer in cm."),
      ],
      explanation: [
        m(String.raw`c^2 = 10^2 + 24^2 = 100 + 576 = 676`),
        m(String.raw`c = \sqrt{676} = 26`),
        t("The hypotenuse is 26 cm. This is the 5-12-13 triple scaled by 2: 10-24-26."),
      ],
      xp: 20,
      accepted: ["26"],
      unit: "cm",
    },
    // Medium 2 (20 XP) - find shorter side
    {
      id: "pyth-boss-q2",
      type: "numeric",
      prompt: [
        t("In a right-angled triangle, the hypotenuse is 37 cm and one leg is 35 cm. Find the other leg, in cm."),
      ],
      explanation: [
        m(String.raw`a^2 = 37^2 - 35^2 = 1369 - 1225 = 144`),
        m(String.raw`a = \sqrt{144} = 12`),
        t("The unknown leg is 12 cm. The 12-35-37 is a Pythagorean triple."),
      ],
      xp: 20,
      accepted: ["12"],
      unit: "cm",
    },
    // Hard 1 (25 XP) - rhombus side length
    {
      id: "pyth-boss-q3",
      type: "numeric",
      prompt: [
        t("A rhombus has diagonals of length 10 cm and 24 cm. The diagonals of a rhombus bisect each other at right angles. Find the length of each side of the rhombus, in cm."),
      ],
      explanation: [
        t("The diagonals bisect each other at right angles, creating four congruent right triangles."),
        t("Each right triangle has legs of half the diagonals: 5 cm and 12 cm."),
        m(String.raw`s^2 = 5^2 + 12^2 = 25 + 144 = 169`),
        m(String.raw`s = \sqrt{169} = 13`),
        t("Each side of the rhombus is 13 cm. This is the 5-12-13 Pythagorean triple."),
      ],
      xp: 25,
      accepted: ["13"],
      unit: "cm",
    },
    // Hard 2 (25 XP) - park diagonal savings
    {
      id: "pyth-boss-q4",
      type: "numeric",
      prompt: [
        t("A rectangular park is 80 m by 60 m. A person walks diagonally across the park from one corner to the opposite corner. How many metres do they save compared to walking around the two sides?"),
      ],
      explanation: [
        t("Walking two sides: 80 + 60 = 140 m."),
        t("Diagonal path (hypotenuse):"),
        m(String.raw`d^2 = 80^2 + 60^2 = 6400 + 3600 = 10000`),
        m(String.raw`d = \sqrt{10000} = 100`),
        t("Distance saved: 140 - 100 = 40 m."),
        t("The diagonal is always the shortest distance between two points. This is the 3-4-5 triple scaled by 20: 60-80-100."),
      ],
      xp: 25,
      accepted: ["40"],
      unit: "m",
    },
    // Conceptual/MCQ (20 XP)
    {
      id: "pyth-boss-q5",
      type: "mcq",
      prompt: [
        t("Pythagoras' theorem is used to find an unknown side length in which of the following?"),
      ],
      explanation: [
        t("Pythagoras' theorem (c² = a² + b²) applies exclusively to right-angled triangles. It does not work for acute, obtuse, or non-right triangles. For other triangles, different rules like the sine or cosine rule are needed."),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("Right-angled triangles only")] },
        { id: "b", label: [t("Any triangle")] },
        { id: "c", label: [t("Any triangle where two sides are known")] },
        { id: "d", label: [t("Isosceles and equilateral triangles only")] },
      ],
      correctOptionId: "a",
    },
  ],
  bonusXp: 100,
  passBadgeId: "boss-pythagoras",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  } as const,
};

// ---------------------------------------------------------------------------
// Track
// ---------------------------------------------------------------------------

/** The complete Pythagoras' Theorem track for Year 8. */
export const pythagorasTrack: Track = {
  id: "pythagoras",
  subjectId: "maths",
  title: "Pythagoras' Theorem (Year 8)",
  description:
    "Applying Pythagoras' theorem to find unknown side lengths in right-angled triangles.",
  lessons: [lesson4K, lesson4L, lesson4M],
  challenge: bossChallenge,
};
