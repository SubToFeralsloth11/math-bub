/**
 * Authored Geometry track content (Year 8, chapter 10).
 *
 * Re-authored from the `source/` worksheets: congruent figures and triangles,
 * similar figures, and (extension) similar triangles. Figures reference image
 * assets in `public/figures/`; each carries a text fallback so questions remain
 * answerable when an asset is absent.
 *
 * @author John Grimes
 * @module content/tracks/geometry
 */

import { m, t } from "../blocks";
import { geometryChallengeQuestions } from "../challenges/geometry";

import type { Figure, Lesson, Track } from "../../domain/content/types";

const congruentPair: Figure = {
  id: "congruent-figures-pair",
  alt: "Two identical L-shaped figures, one rotated, with equal matching sides marked.",
  textFallback:
    "Two L-shaped figures of identical size and shape; one is a rotation of the other, so matching sides and angles are equal.",
};

const congruentTrianglesSss: Figure = {
  id: "congruent-triangles-sss",
  alt: "Triangles ABC and DEF with all three pairs of sides marked equal by tick-marks.",
  textFallback:
    "Triangle ABC and triangle DEF: AB = DE, BC = EF and CA = FD (matching sides marked with tick-marks).",
};

const similarRectangles: Figure = {
  id: "similar-rectangles",
  alt: "A small rectangle 3 by 2 and a larger rectangle 9 by 6.",
  textFallback:
    "A small rectangle measuring 3 by 2 and a larger rectangle measuring 9 by 6 - the same shape at three times the size.",
};

const similarTrianglesAa: Figure = {
  id: "similar-triangles-aa",
  alt: "Two triangles sharing two pairs of equal angles, marked with matching arcs.",
  textFallback:
    "Two triangles with two pairs of equal angles marked by matching arcs, so the triangles are similar (AA).",
};

const congruentFigures: Lesson = {
  id: "geo-10d-congruent-figures",
  order: 1,
  title: "10D Congruent figures",
  sourceRef: "10D",
  learnCards: [
    {
      id: "10d-key",
      heading: "Key idea: congruence",
      body: [
        t(
          "Two figures are congruent if they have exactly the same shape and size. One can be turned, flipped or slid onto the other so they match exactly.",
        ),
        t(
          "Matching (corresponding) sides are equal and matching angles are equal. We write congruence with the symbol shown:",
        ),
        m(String.raw`\triangle ABC \cong \triangle DEF`),
      ],
      figure: congruentPair,
    },
  ],
  practice: [
    {
      id: "10d-p1",
      type: "mcq",
      prompt: [t("Which transformation always produces a congruent figure?")],
      explanation: [
        t(
          "Rotations, reflections and translations all preserve size and shape, so the image is congruent. Enlargement changes the size.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Enlargement by scale factor 2")] },
        { id: "b", label: [t("Rotation about a point")] },
        { id: "c", label: [t("Stretching one side")] },
        { id: "d", label: [t("Shrinking by half")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "10d-p2",
      type: "numeric",
      prompt: [
        t(
          "Two figures are congruent. A side in the first is 7 cm. What is the length of the matching side in the second, in cm?",
        ),
      ],
      explanation: [
        t("Matching sides of congruent figures are equal, so it is also 7 cm."),
      ],
      xp: 10,
      accepted: ["7"],
      unit: "cm",
    },
  ],
  mastery: [
    {
      id: "10d-m1",
      type: "mcq",
      prompt: [t("Congruent figures always have the same...")],
      explanation: [
        t(
          "Congruent means identical shape and size, so both shape and size match.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("shape only")] },
        { id: "b", label: [t("size only")] },
        { id: "c", label: [t("shape and size")] },
        { id: "d", label: [t("colour")] },
      ],
      correctOptionId: "c",
    },
    {
      id: "10d-m2",
      type: "numeric",
      prompt: [
        t(
          "In congruent figures, a matching angle to a 65° angle measures how many degrees?",
        ),
      ],
      explanation: [
        t("Matching angles in congruent figures are equal, so 65°."),
      ],
      xp: 15,
      accepted: ["65"],
    },
    {
      id: "10d-m3",
      type: "mcq",
      prompt: [t("Which symbol means 'is congruent to'?")],
      explanation: [
        m(String.raw`\cong`),
        t("is the congruence symbol; the similarity symbol is ~."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m(String.raw`\cong`)] },
        { id: "b", label: [m(String.raw`\sim`)] },
        { id: "c", label: [m("=")] },
        { id: "d", label: [m(String.raw`\approx`)] },
      ],
      correctOptionId: "a",
    },
  ],
};

const congruentTriangles: Lesson = {
  id: "geo-10e-congruent-triangles",
  order: 2,
  title: "10E Congruent triangles",
  sourceRef: "10E",
  learnCards: [
    {
      id: "10e-key",
      heading: "Key idea: the four tests",
      body: [
        t(
          "Two triangles are congruent if any one of these hold: SSS (three sides equal), SAS (two sides and the included angle), ASA (two angles and a side), or RHS (right angle, hypotenuse and one side).",
        ),
        t("Once congruent, every matching side and angle is equal."),
      ],
      figure: congruentTrianglesSss,
    },
  ],
  practice: [
    {
      id: "10e-p1",
      type: "mcq",
      prompt: [
        t(
          "Two triangles have all three pairs of sides equal. Which test proves them congruent?",
        ),
      ],
      explanation: [t("Three pairs of equal sides is the SSS test.")],
      xp: 10,
      options: [
        { id: "a", label: [t("SSS")] },
        { id: "b", label: [t("SAS")] },
        { id: "c", label: [t("ASA")] },
        { id: "d", label: [t("RHS")] },
      ],
      correctOptionId: "a",
      figure: congruentTrianglesSss,
    },
    {
      id: "10e-p2",
      type: "mcq",
      prompt: [
        t(
          "Right-angled triangles with equal hypotenuses and one equal side are congruent by which test?",
        ),
      ],
      explanation: [t("Right angle, Hypotenuse and a Side is the RHS test.")],
      xp: 10,
      options: [
        { id: "a", label: [t("SSS")] },
        { id: "b", label: [t("ASA")] },
        { id: "c", label: [t("RHS")] },
        { id: "d", label: [t("AAA")] },
      ],
      correctOptionId: "c",
    },
  ],
  mastery: [
    {
      id: "10e-m1",
      type: "mcq",
      prompt: [
        t("Two angles and the included side are equal. Which test applies?"),
      ],
      explanation: [t("Two angles and a side is the ASA test.")],
      xp: 15,
      options: [
        { id: "a", label: [t("ASA")] },
        { id: "b", label: [t("SSS")] },
        { id: "c", label: [t("SAS")] },
        { id: "d", label: [t("RHS")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10e-m2",
      type: "mcq",
      prompt: [t("Which is NOT a valid congruence test for triangles?")],
      explanation: [
        t(
          "AAA fixes the shape but not the size, so it proves similarity, not congruence.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("SAS")] },
        { id: "b", label: [t("AAA")] },
        { id: "c", label: [t("SSS")] },
        { id: "d", label: [t("RHS")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "10e-m3",
      type: "numeric",
      prompt: [
        t(
          "Triangle ABC ≅ triangle DEF. If side AB = 8 cm, how long is side DE, in cm?",
        ),
      ],
      explanation: [
        t(
          "AB matches DE, and matching sides of congruent triangles are equal, so DE = 8 cm.",
        ),
      ],
      xp: 15,
      accepted: ["8"],
      unit: "cm",
    },
  ],
};

const similarFigures: Lesson = {
  id: "geo-10h-similar-figures",
  order: 3,
  title: "10H Similar figures",
  sourceRef: "10H",
  learnCards: [
    {
      id: "10h-key",
      heading: "Key idea: similarity and scale factor",
      body: [
        t(
          "Similar figures have the same shape but not necessarily the same size. Matching angles are equal and matching sides are in the same ratio - the scale factor.",
        ),
        t(
          "If the small rectangle is 3 by 2 and the large one is 9 by 6, the scale factor is:",
        ),
        m(String.raw`\frac{9}{3} = 3`),
      ],
      figure: similarRectangles,
    },
  ],
  practice: [
    {
      id: "10h-p1",
      type: "numeric",
      prompt: [
        t(
          "A shape is enlarged so a 4 cm side becomes 12 cm. What is the scale factor?",
        ),
      ],
      explanation: [m(String.raw`\frac{12}{4} = 3`)],
      xp: 10,
      accepted: ["3"],
    },
    {
      id: "10h-p2",
      type: "numeric",
      prompt: [
        t(
          "Two similar rectangles have scale factor 2. The small one has a 5 cm side. How long is the matching side of the large one, in cm?",
        ),
      ],
      explanation: [m(String.raw`5 \times 2 = 10`)],
      xp: 10,
      accepted: ["10"],
      unit: "cm",
    },
  ],
  mastery: [
    {
      id: "10h-m1",
      type: "mcq",
      prompt: [t("In similar figures, matching angles are...")],
      explanation: [
        t("Similar figures keep the same shape, so matching angles are equal."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("equal")] },
        { id: "b", label: [t("doubled")] },
        { id: "c", label: [t("halved")] },
        { id: "d", label: [t("unrelated")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10h-m2",
      type: "numeric",
      prompt: [
        t(
          "A 6 cm side maps to a 2 cm side. What is the scale factor (as a decimal)?",
        ),
      ],
      explanation: [m(String.raw`\frac{2}{6} = \tfrac{1}{3} \approx 0.33`)],
      xp: 15,
      accepted: ["1/3", "0.33", "0.333"],
    },
    {
      id: "10h-m3",
      type: "numeric",
      prompt: [
        t(
          "Two similar triangles have scale factor 4. A side of the small triangle is 3 cm. Find the matching side of the large triangle, in cm.",
        ),
      ],
      explanation: [m(String.raw`3 \times 4 = 12`)],
      xp: 15,
      accepted: ["12"],
      unit: "cm",
    },
  ],
};

const similarTriangles: Lesson = {
  id: "geo-10i-similar-triangles",
  order: 4,
  title: "10I Similar triangles (extension)",
  sourceRef: "EXTENSION 10I",
  learnCards: [
    {
      id: "10i-key",
      heading: "Key idea: similar-triangle tests",
      body: [
        t(
          "Triangles are similar if: AA (two pairs of equal angles), SAS (two pairs of sides in ratio with equal included angle), or SSS (all three pairs of sides in the same ratio).",
        ),
        t("Matching sides of similar triangles are in proportion."),
      ],
      figure: similarTrianglesAa,
    },
  ],
  practice: [
    {
      id: "10i-p1",
      type: "mcq",
      prompt: [
        t(
          "Two triangles share two pairs of equal angles. Which similarity test applies?",
        ),
      ],
      explanation: [t("Two pairs of equal angles is the AA test.")],
      xp: 10,
      options: [
        { id: "a", label: [t("AA")] },
        { id: "b", label: [t("RHS")] },
        { id: "c", label: [t("SAS congruence")] },
        { id: "d", label: [t("none")] },
      ],
      correctOptionId: "a",
      figure: similarTrianglesAa,
    },
    {
      id: "10i-p2",
      type: "numeric",
      prompt: [
        t(
          "In similar triangles the sides are in ratio 1 : 3. A side of 5 cm in the small triangle matches what length, in cm?",
        ),
      ],
      explanation: [m(String.raw`5 \times 3 = 15`)],
      xp: 10,
      accepted: ["15"],
      unit: "cm",
    },
  ],
  mastery: [
    {
      id: "10i-m1",
      type: "mcq",
      prompt: [
        t("Which proves triangles similar but NOT necessarily congruent?"),
      ],
      explanation: [
        t(
          "AA fixes the shape (equal angles) but allows any size, so it gives similarity, not congruence.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("AA")] },
        { id: "b", label: [t("SSS congruence")] },
        { id: "c", label: [t("RHS")] },
        { id: "d", label: [t("SAS congruence")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10i-m2",
      type: "numeric",
      prompt: [
        t(
          "Similar triangles have scale factor 2.5. A 4 cm side matches what length, in cm?",
        ),
      ],
      explanation: [m(String.raw`4 \times 2.5 = 10`)],
      xp: 15,
      accepted: ["10"],
      unit: "cm",
    },
    {
      id: "10i-m3",
      type: "numeric",
      prompt: [
        t(
          "Two similar triangles: a 6 cm side matches a 9 cm side. A second side of the small triangle is 4 cm. Find its match, in cm.",
        ),
      ],
      explanation: [
        t("The scale factor is 9/6 = 1.5, so the matching side is"),
        m(String.raw`4 \times 1.5 = 6`),
      ],
      xp: 15,
      accepted: ["6"],
      unit: "cm",
    },
  ],
};

/** The Geometry track. */
export const geometryTrack: Track = {
  id: "geometry",
  subjectId: "maths",
  title: "Geometry (Year 8)",
  description:
    "Congruence, similarity, and the triangle tests that prove them.",
  lessons: [
    congruentFigures,
    congruentTriangles,
    similarFigures,
    similarTriangles,
  ],
  challenge: {
    id: "geometry-boss",
    title: "Boss challenge: Year 10 paper",
    sourceRef: "EXTENSION Year 10 Practice Papers",
    questions: geometryChallengeQuestions,
    bonusXp: 150,
    passBadgeId: "boss-geometry",
  },
};

/** All figures referenced by the Geometry track, for the prompt manifest. */
export const geometryFigures: Figure[] = [
  congruentPair,
  congruentTrianglesSss,
  similarRectangles,
  similarTrianglesAa,
];
