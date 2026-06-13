/**
 * Pythagoras track content (Year 8, chapter 4).
 *
 * Covers introduction to Pythagoras' theorem, using it to find the
 * hypotenuse, and calculating the length of a shorter side - based on
 * the 2026 Year 8 Maths Class Notebook curriculum plan (Term 1, Week 6).
 *
 * @author John Grimes
 * @module content/tracks/pythagoras
 */

import { m, t } from "../blocks";

import type { Lesson, Track, Question } from "../../domain/content/types";

/** 4K - Introduction to Pythagoras' theorem. */
const introPythagoras: Lesson = {
  id: "pyt-4k-intro",
  order: 1,
  title: "4K Introduction to Pythagoras' theorem",
  sourceRef: "4K",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4k-key",
      heading: "Key idea: Pythagoras' theorem",
      body: [
        t("Pythagoras' theorem applies to right-angled triangles only."),
        t("It states that the square of the hypotenuse (the longest side, opposite the right angle) equals the sum of the squares of the other two sides:"),
        m("c^2 = a^2 + b^2"),
        t("where c is the hypotenuse and a and b are the legs (shorter sides)."),
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
        t("This is the 3-4-5 Pythagorean triple - a common right triangle."),
      ],
    },
  ],
  practice: [
    {
      id: "4k-p1",
      type: "mcq",
      prompt: [t("Which side is the hypotenuse in a right-angled triangle?")],
      explanation: [
        t("The hypotenuse is always the longest side, opposite the right angle."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("The longest side")] },
        { id: "b", label: [t("Any side")] },
        { id: "c", label: [t("The shortest side")] },
        { id: "d", label: [t("The side next to the right angle")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4k-p2",
      type: "numeric",
      prompt: [t("In a right-angled triangle, a = 6 and b = 8. Find the hypotenuse c.")],
      explanation: [
        m(String.raw`c^2 = 6^2 + 8^2 = 36 + 64 = 100`),
        m(String.raw`c = 10`),
        t("This is the 6-8-10 triple (a scaled 3-4-5)."),
      ],
      xp: 10,
      accepted: ["10"],
    },
    {
      id: "4k-p3",
      type: "numeric",
      prompt: [t("True or false: Pythagoras' theorem works for all triangles. Enter 1 for true or 0 for false.")],
      explanation: [
        t("False. Pythagoras' theorem only applies to right-angled triangles."),
      ],
      xp: 10,
      accepted: ["0", "false"],
    },
    {
      id: "4k-p4",
      type: "numeric",
      prompt: [t("In a right-angled triangle, the legs are 5 cm and 12 cm. Find the hypotenuse, in cm.")],
      explanation: [
        m(String.raw`c^2 = 5^2 + 12^2 = 25 + 144 = 169`),
        m(String.raw`c = 13`),
        t("This is the 5-12-13 Pythagorean triple."),
      ],
      xp: 10,
      accepted: ["13"],
      unit: "cm",
    },
  ],
  mastery: [
    {
      id: "4k-m1",
      type: "numeric",
      prompt: [t("Find the hypotenuse when the legs are 9 cm and 12 cm. Give your answer in cm.")],
      explanation: [
        m(String.raw`c^2 = 9^2 + 12^2 = 81 + 144 = 225`),
        m(String.raw`c = 15`),
      ],
      xp: 15,
      accepted: ["15"],
      unit: "cm",
    },
    {
      id: "4k-m2",
      type: "mcq",
      prompt: [t("For a right-angled triangle, the equation is:")],
      explanation: [
        m("c^2 = a^2 + b^2"),
        t(", where c is the hypotenuse."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("c^2 = a^2 + b^2")] },
        { id: "b", label: [m("c = a + b")] },
        { id: "c", label: [m("c^2 = a^2 - b^2")] },
        { id: "d", label: [m("c^2 = a \\times b")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "4k-m3",
      type: "numeric",
      prompt: [t("A right triangle has legs 7 m and 24 m. Find the hypotenuse, in m.")],
      explanation: [
        m(String.raw`c^2 = 7^2 + 24^2 = 49 + 576 = 625`),
        m(String.raw`c = 25`),
      ],
      xp: 15,
      accepted: ["25"],
      unit: "m",
    },
    {
      id: "4k-m4",
      type: "mcq",
      prompt: [t("Which set of numbers is NOT a Pythagorean triple?")],
      explanation: [
        t("3-4-5: 3²+4²=9+16=25=5² ✓. 6-8-10: 36+64=100=10² ✓. 5-12-13: 25+144=169=13² ✓. 2-3-4: 4+9=13, but 4²=16 ≠ 13."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("3, 4, 5")] },
        { id: "b", label: [t("6, 8, 10")] },
        { id: "c", label: [t("5, 12, 13")] },
        { id: "d", label: [t("2, 3, 4")] },
      ],
      correctOptionId: "d",
    },
  ],
};

/** 4L - Using Pythagoras' theorem. */
const usingPythagoras: Lesson = {
  id: "pyt-4l-using",
  order: 2,
  title: "4L Using Pythagoras' theorem",
  sourceRef: "4L",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4l-key",
      heading: "Key idea: applying Pythagoras",
      body: [
        t("Pythagoras' theorem is used to find unknown side lengths in right-angled triangles and to solve real-world problems."),
        t("To find the hypotenuse: add the squares of the legs, then take the square root."),
        t("To find a leg: subtract the square of the known leg from the square of the hypotenuse, then take the square root:"),
        m("a^2 = c^2 - b^2"),
      ],
    },
    {
      id: "4l-worked",
      heading: "Worked example: real-world application",
      body: [
        t("A ladder 5 m long leans against a wall. The foot of the ladder is 3 m from the wall. How high up the wall does it reach?"),
        t("The ladder is the hypotenuse (c = 5), the ground distance is one leg (a = 3)."),
        m(String.raw`b^2 = 5^2 - 3^2 = 25 - 9 = 16`),
        m(String.raw`b = 4`),
        t("The ladder reaches 4 m up the wall."),
      ],
    },
  ],
  practice: [
    {
      id: "4l-p1",
      type: "numeric",
      prompt: [t("A right triangle has hypotenuse 10 cm and one leg 6 cm. Find the other leg, in cm.")],
      explanation: [
        m(String.raw`a^2 = 10^2 - 6^2 = 100 - 36 = 64`),
        m(String.raw`a = 8`),
      ],
      xp: 10,
      accepted: ["8"],
      unit: "cm",
    },
    {
      id: "4l-p2",
      type: "numeric",
      prompt: [t("A 13 m ladder leans against a wall with its foot 5 m from the wall. How high up the wall does it reach, in m?")],
      explanation: [
        m(String.raw`b^2 = 13^2 - 5^2 = 169 - 25 = 144`),
        m(String.raw`b = 12`),
      ],
      xp: 10,
      accepted: ["12"],
      unit: "m",
    },
    {
      id: "4l-p3",
      type: "numeric",
      prompt: [t("A rectangular field is 30 m by 40 m. How long is the diagonal path across it, in m?")],
      explanation: [
        m(String.raw`d^2 = 30^2 + 40^2 = 900 + 1600 = 2500`),
        m(String.raw`d = 50`),
      ],
      xp: 10,
      accepted: ["50"],
      unit: "m",
    },
    {
      id: "4l-p4",
      type: "mcq",
      prompt: [t("To find how far east a plane flew, given its total distance (hypotenuse) and how far north it went, you would:")],
      explanation: [
        t("You know the hypotenuse and one leg. To find the other leg:"),
        m("a^2 = c^2 - b^2"),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Subtract the squares")] },
        { id: "b", label: [t("Add the squares")] },
        { id: "c", label: [t("Multiply the squares")] },
        { id: "d", label: [t("Divide the squares")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "4l-m1",
      type: "numeric",
      prompt: [t("A right triangle has hypotenuse 17 cm and leg 15 cm. Find the other leg, in cm.")],
      explanation: [
        m(String.raw`a^2 = 17^2 - 15^2 = 289 - 225 = 64`),
        m(String.raw`a = 8`),
      ],
      xp: 15,
      accepted: ["8"],
      unit: "cm",
    },
    {
      id: "4l-m2",
      type: "numeric",
      prompt: [t("A TV screen is 80 cm wide and has a 100 cm diagonal. How tall is the screen, in cm?")],
      explanation: [
        m(String.raw`h^2 = 100^2 - 80^2 = 10000 - 6400 = 3600`),
        m(String.raw`h = 60`),
      ],
      xp: 15,
      accepted: ["60"],
      unit: "cm",
    },
    {
      id: "4l-m3",
      type: "numeric",
      prompt: [t("A ship sails 24 km east and then 10 km north. How far is it from its starting point, in km (as the crow flies)?")],
      explanation: [
        m(String.raw`d^2 = 24^2 + 10^2 = 576 + 100 = 676`),
        m(String.raw`d = 26`),
      ],
      xp: 15,
      accepted: ["26"],
      unit: "km",
    },
    {
      id: "4l-m4",
      type: "numeric",
      prompt: [t("An isosceles triangle has a base of 12 cm and equal sides of 10 cm. Find its height, in cm.")],
      explanation: [
        t("The height splits the base into two 6 cm halves. Using Pythagoras:"),
        m(String.raw`h^2 = 10^2 - 6^2 = 100 - 36 = 64`),
        m(String.raw`h = 8`),
      ],
      xp: 15,
      accepted: ["8"],
      unit: "cm",
    },
  ],
};

/** 4M - Calculating the length of a shorter side. */
const shorterSide: Lesson = {
  id: "pyt-4m-shorter-side",
  order: 3,
  title: "4M Calculating the length of a shorter side",
  sourceRef: "4M",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "4m-key",
      heading: "Key idea: finding a shorter side",
      body: [
        t("To find a shorter side (leg) when you know the hypotenuse and the other leg:"),
        m("a^2 = c^2 - b^2"),
        t("Step 1: Square the hypotenuse."),
        t("Step 2: Subtract the square of the known leg."),
        t("Step 3: Take the square root of the result."),
        t("Always check: the shorter side must be less than the hypotenuse."),
      ],
    },
    {
      id: "4m-worked",
      heading: "Worked example",
      body: [
        t("A right triangle has hypotenuse 15 cm and one leg 9 cm. Find the other leg."),
        m(String.raw`a^2 = 15^2 - 9^2 = 225 - 81 = 144`),
        m(String.raw`a = \sqrt{144} = 12`),
        t("The unknown leg is 12 cm. Check: 12 < 15 ✓."),
      ],
    },
  ],
  practice: [
    {
      id: "4m-p1",
      type: "numeric",
      prompt: [t("Find the unknown leg: hypotenuse = 10, one leg = 8.")],
      explanation: [
        m(String.raw`a^2 = 10^2 - 8^2 = 100 - 64 = 36`),
        m(String.raw`a = 6`),
      ],
      xp: 10,
      accepted: ["6"],
    },
    {
      id: "4m-p2",
      type: "numeric",
      prompt: [t("A right triangle has hypotenuse 25 cm and one leg 20 cm. Find the other leg, in cm.")],
      explanation: [
        m(String.raw`a^2 = 25^2 - 20^2 = 625 - 400 = 225`),
        m(String.raw`a = 15`),
      ],
      xp: 10,
      accepted: ["15"],
      unit: "cm",
    },
    {
      id: "4m-p3",
      type: "numeric",
      prompt: [t("In a right triangle, c = 13 and b = 12. Find a.")],
      explanation: [
        m(String.raw`a^2 = 13^2 - 12^2 = 169 - 144 = 25`),
        m(String.raw`a = 5`),
      ],
      xp: 10,
      accepted: ["5"],
    },
    {
      id: "4m-p4",
      type: "mcq",
      prompt: [t("When finding a shorter side, you should:")],
      explanation: [
        t("The formula is"),
        m("a^2 = c^2 - b^2"),
        t(". You subtract, not add."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Subtract the square of the known leg from the square of the hypotenuse")] },
        { id: "b", label: [t("Add the squares of both known sides")] },
        { id: "c", label: [t("Multiply the hypotenuse by the leg")] },
        { id: "d", label: [t("Divide the hypotenuse by the leg")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "4m-m1",
      type: "numeric",
      prompt: [t("Find the missing side: hypotenuse = 29, one leg = 21.")],
      explanation: [
        m(String.raw`a^2 = 29^2 - 21^2 = 841 - 441 = 400`),
        m(String.raw`a = 20`),
      ],
      xp: 15,
      accepted: ["20"],
    },
    {
      id: "4m-m2",
      type: "numeric",
      prompt: [t("A pole is supported by a wire 5 m long attached 3 m from the base. How high up the pole is the wire attached, in m?")],
      explanation: [
        t("The wire is the hypotenuse (5 m), the ground is one leg (3 m)."),
        m(String.raw`h^2 = 5^2 - 3^2 = 25 - 9 = 16`),
        m(String.raw`h = 4`),
      ],
      xp: 15,
      accepted: ["4"],
      unit: "m",
    },
    {
      id: "4m-m3",
      type: "numeric",
      prompt: [t("In a right triangle, the hypotenuse is 20 cm and one leg is 16 cm. Find the other leg, in cm.")],
      explanation: [
        m(String.raw`a^2 = 20^2 - 16^2 = 400 - 256 = 144`),
        m(String.raw`a = 12`),
      ],
      xp: 15,
      accepted: ["12"],
      unit: "cm",
    },
    {
      id: "4m-m4",
      type: "mcq",
      prompt: [t("A right triangle has hypotenuse 10 and one leg 6. The other leg is:")],
      explanation: [
        m(String.raw`a^2 = 10^2 - 6^2 = 100 - 36 = 64`),
        m(String.raw`a = 8`),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("8")] },
        { id: "b", label: [t("4")] },
        { id: "c", label: [t("16")] },
        { id: "d", label: [t("11.66")] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** Boss challenge for the Pythagoras track. */
const pythagorasChallengeQuestions: Question[] = [
  {
    id: "pyt-boss-q1",
    type: "numeric",
    prompt: [t("A right triangle has legs 16 cm and 30 cm. Find the hypotenuse, in cm.")],
    explanation: [
      m(String.raw`c^2 = 16^2 + 30^2 = 256 + 900 = 1156`),
      m(String.raw`c = 34`),
    ],
    xp: 20,
    accepted: ["34"],
    unit: "cm",
  },
  {
    id: "pyt-boss-q2",
    type: "numeric",
    prompt: [t("A rectangular park is 80 m by 60 m. Visitors walk diagonally across it. How many metres do they save compared to walking around two sides?")],
    explanation: [
      t("Two sides: 80 + 60 = 140 m. Diagonal:"),
      m(String.raw`d = \sqrt{80^2 + 60^2} = \sqrt{6400 + 3600} = \sqrt{10000} = 100`),
      t("Savings: 140 - 100 = 40 m."),
    ],
    xp: 25,
    accepted: ["40"],
    unit: "m",
  },
  {
    id: "pyt-boss-q3",
    type: "numeric",
    prompt: [t("A rhombus has diagonals of 10 cm and 24 cm. Find the length of each side, in cm.")],
    explanation: [
      t("The diagonals bisect perpendicularly, giving right triangles with legs 5 and 12:"),
      m(String.raw`s^2 = 5^2 + 12^2 = 25 + 144 = 169`),
      m(String.raw`s = 13`),
    ],
    xp: 25,
    accepted: ["13"],
    unit: "cm",
  },
  {
    id: "pyt-boss-q4",
    type: "numeric",
    prompt: [t("A cone has slant height 13 cm and base radius 5 cm. Find its vertical height, in cm.")],
    explanation: [
      t("The height, radius and slant height form a right triangle:"),
      m(String.raw`h^2 = 13^2 - 5^2 = 169 - 25 = 144`),
      m(String.raw`h = 12`),
    ],
    xp: 20,
    accepted: ["12"],
    unit: "cm",
  },
  {
    id: "pyt-boss-q5",
    type: "numeric",
    prompt: [t("A point is at coordinates (9, 12) from the origin. How far is it from the origin?")],
    explanation: [
      t("The distance from origin is the hypotenuse:"),
      m(String.raw`d = \sqrt{9^2 + 12^2} = \sqrt{81 + 144} = \sqrt{225} = 15`),
    ],
    xp: 25,
    accepted: ["15"],
  },
];

/** The Pythagoras track. */
export const pythagorasTrack: Track = {
  id: "pythagoras",
  subjectId: "maths",
  title: "Pythagoras (Year 8)",
  description:
    "Pythagoras' theorem: finding the hypotenuse, using the theorem in real-world problems, and calculating shorter sides.",
  lessons: [introPythagoras, usingPythagoras, shorterSide],
  challenge: {
    id: "pythagoras-boss",
    title: "Boss challenge: Pythagoras' theorem",
    sourceRef: "2026 T1 Yr 8 Maths Planner — Term 1, Week 6",
    questions: pythagorasChallengeQuestions,
    bonusXp: 120,
    passBadgeId: "boss-pythagoras",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
