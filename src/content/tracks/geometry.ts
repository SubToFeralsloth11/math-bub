/**
 * Geometry: Congruence and Similarity track content (Year 8).
 *
 * Covers identifying congruent and similar figures, using congruence tests
 * for triangles (SSS, SAS, AAS, RHS), and applying similarity to find
 * unknown sides — based on the 2026 Year 8 Maths Class Notebook (Term 2,
 * chapters 10D, 10E, 10H, 10I).
 *
 * @author John Grimes
 * @module content/tracks/geometry
 */

import { m, t } from "../blocks";

import type {
  Lesson,
  BossChallenge,
  Figure,
  Track,
} from "../../domain/content/types";

// ---------------------------------------------------------------------------
// 10D - Congruent figures
// ---------------------------------------------------------------------------

const lesson10D: Lesson = {
  id: "geo-10d-congruent-figures",
  order: 1,
  title: "10D Congruent figures",
  sourceRef: "10D",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "10d-key",
      heading: "Key idea: congruent figures",
      body: [
        t(
          "Two figures are congruent if they have exactly the same shape and the same size.",
        ),
        t(
          "When figures are congruent, all corresponding sides are equal in length and all corresponding angles are equal in measure.",
        ),
        t("The symbol for congruence is"),
        m(String.raw`\cong`),
        t(
          ". For example, △ABC ≅ △DEF means triangle ABC is congruent to triangle DEF.",
        ),
        t(
          "Rigid transformations — rotations, reflections, and translations — always produce congruent figures because they preserve lengths and angles.",
        ),
        t(
          "The order of vertices in the congruence statement tells you which parts correspond. In △ABC ≅ △XYZ, A matches X, B matches Y, and C matches Z.",
        ),
      ],
    },
    {
      id: "10d-worked",
      heading: "Worked example: checking congruence",
      body: [
        t(
          "Question: Rectangle P is 5 cm by 8 cm. Which of these is congruent to P?",
        ),
        t("A) Rectangle 8 cm by 5 cm (rotated 90°)"),
        t("B) Rectangle 10 cm by 4 cm"),
        t("C) Rectangle 5 cm by 5 cm"),
        t(
          "Answer: Option A. Rotating a rectangle does not change its dimensions — it is still 5 cm by 8 cm. Option B has a different area (40 cm² vs 40 cm²), but different side pairs — the corresponding sides do not match. Option C is a square, so neither the shape nor the side lengths match.",
        ),
        t(
          "Key point: rotation, reflection, and translation never change size or shape. Always check that all corresponding measurements match.",
        ),
      ],
    },
    {
      id: "10d-mistake",
      heading: "Common mistake: confusing congruence with similarity",
      body: [
        t("Congruent: same shape AND same size."),
        t(
          "Similar: same shape but can be a different size (enlarged or reduced).",
        ),
        t("A photograph and its enlargement are similar, NOT congruent."),
        t("Two circles with different radii are similar, NOT congruent."),
        t(
          "Two squares with different side lengths are similar, NOT congruent.",
        ),
        t(
          "Remember: congruent is a special case of similarity where the scale factor equals 1.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "10d-p1",
      type: "mcq",
      prompt: [t("What does it mean for two figures to be congruent?")],
      explanation: [
        t(
          "Congruent figures are identical in both shape and size. All corresponding sides and angles are equal. Rotations, reflections and translations do not affect congruence.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("They have the same shape and the same size")] },
        {
          id: "b",
          label: [t("They have the same shape but may be different sizes")],
        },
        {
          id: "c",
          label: [t("They have the same size but may be different shapes")],
        },
        { id: "d", label: [t("They have the same area")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10d-p2",
      type: "mcq",
      prompt: [
        t("Which statement is true for all pairs of congruent figures?"),
      ],
      explanation: [
        t(
          "By definition, congruent figures have all corresponding sides equal and all corresponding angles equal. Same area or same perimeter alone is not sufficient; for example, a 3×4 rectangle and a 2×6 rectangle both have area 12 and perimeter 14 but are not congruent.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("All corresponding sides and angles are equal")] },
        {
          id: "b",
          label: [t("Corresponding angles are equal but sides may differ")],
        },
        { id: "c", label: [t("They have the same area and perimeter")] },
        { id: "d", label: [t("They look roughly the same")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10d-p3",
      type: "numeric",
      prompt: [
        t("If △ABC ≅ △PQR and AB = 7 cm, what is the length of PQ, in cm?"),
      ],
      explanation: [
        t(
          "In congruent triangles, corresponding sides are equal. From the order of vertices, A corresponds to P and B corresponds to Q. Therefore AB corresponds to PQ, so PQ = AB = 7 cm.",
        ),
      ],
      xp: 10,
      accepted: ["7"],
      unit: "cm",
    },
    {
      id: "10d-p4",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about the congruence symbol.")],
      explanation: [
        t(
          "The symbol ≅ is used in geometry to state that two figures are congruent.",
        ),
      ],
      xp: 10,
      template: [t("The symbol ≅ means 'is ___ to'.")],
      accepted: ["congruent"],
    },
    {
      id: "10d-p5",
      type: "mcq",
      prompt: [
        t(
          "Rectangle R is 6 cm by 4 cm. Which of the following rectangles is congruent to R?",
        ),
      ],
      explanation: [
        t(
          "A 6 cm × 4 cm rectangle rotated 90° is still 6 cm × 4 cm. Rotation preserves all dimensions. The other options have different side length combinations and are not congruent.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("6 cm by 4 cm (rotated 90°)")] },
        { id: "b", label: [t("12 cm by 2 cm")] },
        { id: "c", label: [t("8 cm by 3 cm")] },
        { id: "d", label: [t("5 cm by 5 cm")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10d-p6",
      type: "numeric",
      prompt: [
        t(
          "Two congruent regular pentagons each have a perimeter of 35 cm. What is the length of one side, in cm?",
        ),
      ],
      explanation: [
        t(
          "A regular pentagon has 5 equal sides. Perimeter = 5 × side length, so side length = 35 ÷ 5 = 7 cm. Since the pentagons are congruent, all corresponding sides — which is every side — must equal 7 cm.",
        ),
      ],
      xp: 15,
      accepted: ["7"],
      unit: "cm",
    },
    {
      id: "10d-p7",
      type: "shortText",
      prompt: [
        t(
          "Are a photograph and its enlarged photocopy congruent? Explain your answer.",
        ),
      ],
      explanation: [
        t(
          "No, they are not congruent. An enlargement changes the size of the image. While the shape is preserved (the figures are similar), the sizes are different, so they are not congruent. Congruent figures must be exactly the same size.",
        ),
      ],
      xp: 15,
      accepted: [
        "no",
        "no because they are different sizes",
        "no, they are similar not congruent",
        "no, one is larger than the other",
        "no, the enlargement changes the size",
      ],
    },
    {
      id: "10d-p8",
      type: "mcq",
      prompt: [
        t(
          "A triangle is reflected across a line. The original triangle and its reflected image are:",
        ),
      ],
      explanation: [
        t(
          "Reflections, rotations, and translations are rigid transformations (isometries). They preserve all side lengths and angles. Regardless of the triangle's shape, its reflected image is always congruent to the original.",
        ),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("Always congruent")] },
        {
          id: "b",
          label: [t("Sometimes congruent, depending on the triangle")],
        },
        { id: "c", label: [t("Never congruent")] },
        {
          id: "d",
          label: [t("Only congruent if the triangle is equilateral")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "10d-p9",
      type: "shortText",
      prompt: [
        t("Are all squares congruent to each other? Explain why or why not."),
      ],
      explanation: [
        t(
          "No. While all squares have the same shape (four right angles, four equal sides), they can have different side lengths. A square with side 2 cm and a square with side 5 cm are not congruent because their sizes differ. They are similar, not congruent.",
        ),
      ],
      xp: 20,
      accepted: [
        "no",
        "no because squares can have different side lengths",
        "no, a square with side 2 is not congruent to a square with side 5",
        "no, they can be different sizes",
        "no, they are similar but not necessarily congruent",
      ],
    },
    {
      id: "10d-p10",
      type: "matching",
      prompt: [
        t(
          "Match each pair of figures to the correct statement about congruence.",
        ),
      ],
      explanation: [
        t(
          "Circles with the same radius are identical in size and shape. Rectangles with the same area can have matching or non-matching side pairs, so they are only sometimes congruent. Reflections (isometries) always preserve size and shape. Enlargements change size, so the figures are similar but never congruent.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [t("Two circles with the same radius")],
          right: [t("Always congruent")],
        },
        {
          id: "b",
          left: [t("Two rectangles with the same area")],
          right: [t("Sometimes congruent")],
        },
        {
          id: "c",
          left: [t("A shape and its reflection")],
          right: [t("Congruent by isometry")],
        },
        {
          id: "d",
          left: [t("A shape and its enlargement (k > 1)")],
          right: [t("Never congruent")],
        },
      ],
    },
  ],
  mastery: [
    {
      id: "10d-m1",
      type: "mcq",
      prompt: [t("Two figures are congruent if and only if:")],
      explanation: [
        t(
          "The definition of congruence is that all corresponding sides and angles are equal. Same area or perimeter is not enough: a 3 cm × 4 cm rectangle and a 2 cm × 6 cm rectangle both have area 12 cm² and perimeter 14 cm, yet they are not congruent.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("All corresponding sides and angles are equal")] },
        { id: "b", label: [t("They have the same area")] },
        { id: "c", label: [t("One is an enlargement of the other")] },
        { id: "d", label: [t("They have the same perimeter")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10d-m2",
      type: "numeric",
      prompt: [
        t(
          "Quadrilateral ABCD is congruent to quadrilateral WXYZ. AB = 5 cm, BC = 8 cm, CD = 6 cm, DA = 7 cm. Find the length of YZ, in cm.",
        ),
      ],
      explanation: [
        t(
          "The vertex order tells us the correspondence: A↔W, B↔X, C↔Y, D↔Z. Therefore side CD (between vertices C and D) corresponds to side YZ (between Y and Z). Since the quadrilaterals are congruent, YZ = CD = 6 cm.",
        ),
      ],
      xp: 15,
      accepted: ["6"],
      unit: "cm",
    },
    {
      id: "10d-m3",
      type: "shortText",
      prompt: [
        t(
          "Can two rectangles with different perimeters be congruent? Explain.",
        ),
      ],
      explanation: [
        t(
          "No. Congruent figures have all corresponding sides equal. If every corresponding side is equal, the perimeters must be equal too (perimeter is the sum of all side lengths). Different perimeters mean at least one pair of corresponding sides differs in length, so the rectangles cannot be congruent.",
        ),
      ],
      xp: 15,
      accepted: [
        "no",
        "no because all corresponding sides must be equal",
        "no, congruent figures must have equal perimeters",
        "no, different perimeters means some sides are different lengths",
      ],
    },
    {
      id: "10d-m4",
      type: "numeric",
      prompt: [
        t(
          "△ABC ≅ △DEF. In △ABC: ∠A = 45°, ∠B = 60°, ∠C = 75°. Find the measure of ∠E, in degrees.",
        ),
      ],
      explanation: [
        t(
          "From the vertex order: A↔D, B↔E, C↔F. So ∠E corresponds to ∠B. Since the triangles are congruent, corresponding angles are equal: ∠E = ∠B = 60°. Check: the three angles sum to 45° + 60° + 75° = 180° ✓.",
        ),
      ],
      xp: 20,
      accepted: ["60"],
    },
  ],
};

// ---------------------------------------------------------------------------
// 10E - Congruent triangles
// ---------------------------------------------------------------------------

const lesson10E: Lesson = {
  id: "geo-10e-congruent-triangles",
  order: 2,
  title: "10E Congruent triangles",
  sourceRef: "10E",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "10e-key",
      heading: "Key idea: the four congruence tests",
      body: [
        t(
          "There are four tests that prove two triangles are congruent. You only need to match one of these sets of conditions:",
        ),
        t(
          "SSS (Side-Side-Side): All three sides of one triangle equal the corresponding three sides of the other.",
        ),
        t(
          "SAS (Side-Angle-Side): Two sides and the included angle (the angle between them) are equal.",
        ),
        t(
          "AAS (Angle-Angle-Side): Two angles and a non-included side are equal.",
        ),
        t(
          "RHS (Right angle-Hypotenuse-Side): For right-angled triangles only — the hypotenuse and one other side are equal.",
        ),
        t(
          "Important: SSA (Side-Side-Angle) is NOT a valid test. Two sides and a non-included angle do not guarantee congruence — this is known as the ambiguous case.",
        ),
      ],
    },
    {
      id: "10e-worked",
      heading: "Worked example: choosing the right test",
      body: [
        t(
          "In △ABC and △PQR: AB = PQ = 5 cm, BC = QR = 7 cm, and ∠B = ∠Q = 50°.",
        ),
        t(
          "Step 1: Identify what is equal. Two sides (AB = PQ, BC = QR) and one angle (∠B = ∠Q).",
        ),
        t(
          "Step 2: Check the angle's position. ∠B is between sides AB and BC. ∠Q is between sides PQ and QR.",
        ),
        t(
          "Step 3: Since the angle is the included angle (between the two known sides), the test is SAS.",
        ),
        t("Decision: The triangles are congruent by SAS."),
      ],
    },
    {
      id: "10e-mistake",
      heading: "Common mistake: SSA and AAA",
      body: [
        t(
          "SSA (two sides and a non-included angle) is NOT a valid congruence test. With SSA, two different triangles can satisfy the same conditions — the side opposite the given angle can be placed in two positions. This is called the ambiguous case.",
        ),
        t(
          "AAA (all three angles equal) is also NOT a congruence test. Equal angles only guarantee the same shape (the triangles are similar), not the same size. Think of a small triangle and its enlarged copy — they have identical angles but different side lengths.",
        ),
        t(
          "When checking a congruence proof, always verify that you are using one of the four valid tests: SSS, SAS, AAS, or RHS.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "10e-p1",
      type: "mcq",
      prompt: [
        t(
          "Which of the following is NOT a valid test for triangle congruence?",
        ),
      ],
      explanation: [
        t(
          "SSA (Side-Side-Angle) is the ambiguous case and does not guarantee congruence. Two different triangles can share two sides and a non-included angle. The valid tests are SSS, SAS, AAS, and RHS.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("SSS")] },
        { id: "b", label: [t("SAS")] },
        { id: "c", label: [t("SSA")] },
        { id: "d", label: [t("RHS")] },
      ],
      correctOptionId: "c",
    },
    {
      id: "10e-p2",
      type: "mcq",
      prompt: [
        t(
          "If you know two sides of one triangle equal two sides of another, AND the angle between those sides is also equal, which test proves congruence?",
        ),
      ],
      explanation: [
        t(
          "SAS stands for Side-Angle-Side. The angle must be the included angle — the one between the two known sides. This is a valid congruence test.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("SSS")] },
        { id: "b", label: [t("SAS")] },
        { id: "c", label: [t("AAS")] },
        { id: "d", label: [t("SSA")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "10e-p3",
      type: "mcq",
      prompt: [
        t(
          "In △ABC and △DEF: AB = DE, ∠B = ∠E, and BC = EF. Which test proves △ABC ≅ △DEF?",
        ),
      ],
      explanation: [
        t(
          "We have two pairs of equal sides (AB = DE, BC = EF) and one pair of equal angles (∠B = ∠E). The angle ∠B is between sides AB and BC, and ∠E is between DE and EF. Since the angle is the included angle, the test is SAS.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("SSS")] },
        { id: "b", label: [t("SAS")] },
        { id: "c", label: [t("AAS")] },
        { id: "d", label: [t("RHS")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "10e-p4",
      type: "fillInTheBlank",
      prompt: [t("Complete the name of the RHS congruence test.")],
      explanation: [
        t(
          "RHS stands for Right angle, Hypotenuse, Side. It is used only for right-angled triangles. If the hypotenuse and one leg of a right triangle equal those of another right triangle, the triangles are congruent.",
        ),
      ],
      xp: 10,
      template: [t("RHS stands for Right angle, ___, Side.")],
      accepted: ["Hypotenuse", "hypotenuse"],
    },
    {
      id: "10e-p5",
      type: "numeric",
      prompt: [
        t(
          "Using the SSS test: △ABC has sides AB = 5 cm, BC = 12 cm, AC = 13 cm. △PQR has PQ = 5 cm, QR = 12 cm. What must PR equal, in cm, for the triangles to be congruent by SSS?",
        ),
      ],
      explanation: [
        t(
          "For SSS, all three pairs of corresponding sides must match. We already have AB = PQ = 5 and BC = QR = 12. For the third pair, AC must equal PR. Therefore PR = 13 cm. Note that 5-12-13 is a Pythagorean triple, so both triangles are right-angled.",
        ),
      ],
      xp: 10,
      accepted: ["13"],
      unit: "cm",
    },
    {
      id: "10e-p6",
      type: "mcq",
      prompt: [
        t(
          "In △ABC and △DEF: ∠A = ∠D = 55°, ∠B = ∠E = 70°, and BC = EF = 8 cm. Which test proves △ABC ≅ △DEF?",
        ),
      ],
      explanation: [
        t(
          "We have two equal angles (A=D and B=E) and one equal side (BC=EF). The side BC is between ∠B and ∠C in △ABC, but ∠C is not one of the given angles — we are not told ∠C = ∠F directly. However, since two angles match and triangles sum to 180°, the third angles are automatically equal: ∠C = 180° - 55° - 70° = 55° = ∠F. The known side BC is opposite ∠A (55°), making the equal side non-included. This is AAS.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("AAS")] },
        { id: "b", label: [t("SAS")] },
        { id: "c", label: [t("SSS")] },
        { id: "d", label: [t("SSA")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10e-p7",
      type: "mcq",
      prompt: [t("Why is SSA (side-side-angle) NOT a valid congruence test?")],
      explanation: [
        t(
          "With SSA, you know two sides and an angle that is NOT between them. The ambiguous case arises because the third side can be positioned in two different ways, creating two distinct triangles that satisfy the same SSA conditions. This is why SSA is excluded from the valid congruence tests.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t("Two different triangles can satisfy the same SSA conditions"),
          ],
        },
        { id: "b", label: [t("It is too difficult to use")] },
        { id: "c", label: [t("It only works for right-angled triangles")] },
        { id: "d", label: [t("It requires knowing all three angles")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10e-p8",
      type: "numeric",
      prompt: [
        t(
          "Two right-angled triangles △ABC (right-angled at B) and △DEF (right-angled at E) have hypotenuses AC = DF = 15 cm and legs AB = DE = 9 cm. By RHS they are congruent. Find the length of BC, in cm.",
        ),
      ],
      explanation: [
        t(
          "Both triangles satisfy the RHS test: right angle (at B and E), hypotenuse equal (15), and one leg equal (9). Using Pythagoras' theorem on △ABC: BC² = AC² - AB² = 15² - 9² = 225 - 81 = 144. Therefore BC = √144 = 12 cm. Since the triangles are congruent, EF = 12 cm as well.",
        ),
      ],
      xp: 15,
      accepted: ["12"],
      unit: "cm",
    },
    {
      id: "10e-p9",
      type: "mcq",
      prompt: [
        t(
          "△ABC and △DEF have all three angles equal: ∠A = ∠D, ∠B = ∠E, ∠C = ∠F. Which statement is true?",
        ),
      ],
      explanation: [
        t(
          "AAA (all three angles equal) guarantees the triangles have the same shape — they are similar. However, it does NOT guarantee congruence because the triangles could be different sizes. Think of a tiny triangle and a giant one with the same angles: they are similar but not congruent.",
        ),
      ],
      xp: 20,
      options: [
        {
          id: "a",
          label: [t("The triangles are similar but not necessarily congruent")],
        },
        { id: "b", label: [t("The triangles are definitely congruent")] },
        { id: "c", label: [t("AAA is a valid congruence test")] },
        { id: "d", label: [t("The triangles must be right-angled")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10e-p10",
      type: "shortText",
      prompt: [
        t(
          "Explain why RHS is actually a special case of another congruence test. Which test, and why?",
        ),
      ],
      explanation: [
        t(
          "RHS is a special case of SSS. If two right triangles have the same hypotenuse and one leg, the remaining leg can be calculated using Pythagoras' theorem: leg² = hyp² - knownLeg². Since the calculation gives the same result for both triangles, all three sides match, which is the SSS test. RHS is just a shortcut that avoids this extra calculation.",
        ),
      ],
      xp: 20,
      accepted: [
        "sss",
        "SSS",
        "it is a special case of SSS",
        "SSS because the third side can be found using Pythagoras",
        "SSS because Pythagoras gives the third side which must be equal",
      ],
    },
    {
      id: "10e-p11",
      type: "matching",
      prompt: [
        t(
          "Match each description of given information to the correct congruence test.",
        ),
      ],
      explanation: [
        t(
          "SSS compares all three sides directly. SAS requires the angle to be between the two known sides. AAS works with two angles and any side — you don't need the included side because the third angle is automatically determined. RHS is the right-triangle-specific test.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [t("Three sides of one triangle equal three sides of another")],
          right: [t("SSS")],
        },
        {
          id: "b",
          left: [t("Two sides and the included angle are equal")],
          right: [t("SAS")],
        },
        {
          id: "c",
          left: [t("Two angles and any side are equal")],
          right: [t("AAS")],
        },
        {
          id: "d",
          left: [
            t("Hypotenuse and one leg of a right triangle match another's"),
          ],
          right: [t("RHS")],
        },
      ],
    },
  ],
  mastery: [
    {
      id: "10e-m1",
      type: "mcq",
      prompt: [
        t(
          "In △ABC and △PQR: AB = PQ, AC = PR, and ∠A = ∠P. Which test proves the triangles are congruent?",
        ),
      ],
      explanation: [
        t(
          "We know two sides (AB = PQ and AC = PR) and the included angle (∠A = ∠P). In △ABC, ∠A is between AB and AC. In △PQR, ∠P is between PQ and PR. Since the angle is the included angle, the test is SAS.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("SAS")] },
        { id: "b", label: [t("SSS")] },
        { id: "c", label: [t("AAS")] },
        { id: "d", label: [t("RHS")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10e-m2",
      type: "mcq",
      prompt: [
        t(
          "△ABC has sides 6 cm, 8 cm, and 10 cm. △DEF also has sides 6 cm, 8 cm, and 10 cm. Which test proves they are congruent?",
        ),
      ],
      explanation: [
        t(
          "All three sides are given as equal: 6 = 6, 8 = 8, 10 = 10. This directly matches the SSS test. No angle information is needed.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("SSS")] },
        { id: "b", label: [t("SAS")] },
        { id: "c", label: [t("Any of SSS, SAS, or AAS")] },
        { id: "d", label: [t("They might not be congruent")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10e-m3",
      type: "numeric",
      prompt: [
        t(
          "△ABC and △DEF are right-angled at B and E. The hypotenuses are AC = DF = 13 cm, and legs AB = DE = 5 cm. By RHS they are congruent. Find the length of BC, in cm.",
        ),
      ],
      explanation: [
        t(
          "Using Pythagoras' theorem on △ABC: BC² = AC² - AB² = 13² - 5² = 169 - 25 = 144. BC = √144 = 12 cm. The RHS test confirms congruence (right angle, hypotenuse 13, leg 5 match).",
        ),
      ],
      xp: 15,
      accepted: ["12"],
      unit: "cm",
    },
    {
      id: "10e-m4",
      type: "shortText",
      prompt: [
        t(
          "Is it possible for two triangles to have two sides and a non-included angle equal but NOT be congruent? Explain.",
        ),
      ],
      explanation: [
        t(
          "Yes. This is the SSA case, which is not a valid congruence test. Given two sides and an angle opposite one of them, it is sometimes possible to draw two different triangles that satisfy the same conditions. This is why SSA is called the ambiguous case and is excluded from the valid congruence tests.",
        ),
      ],
      xp: 20,
      accepted: [
        "yes",
        "yes, this is the SSA ambiguous case",
        "yes, SSA is not a valid test",
        "yes because two sides and a non-included angle does not guarantee a unique triangle",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 10H - Similar figures
// ---------------------------------------------------------------------------

const lesson10H: Lesson = {
  id: "geo-10h-similar-figures",
  order: 3,
  title: "10H Similar figures",
  sourceRef: "10H",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "10h-key",
      heading: "Key idea: similar figures",
      body: [
        t(
          "Two figures are similar if they have exactly the same shape but may be different sizes.",
        ),
        t("For similar figures:"),
        t("• Corresponding angles are equal."),
        t(
          "• Corresponding sides are in proportion. The constant ratio between corresponding sides is called the scale factor, usually denoted by k.",
        ),
        t("The symbol for similarity is"),
        m(String.raw`\sim`),
        t(
          ". For example, △ABC ~ △DEF means triangle ABC is similar to triangle DEF.",
        ),
        t(
          "If k > 1, the image is an enlargement. If 0 < k < 1, the image is a reduction. If k = 1, the figures are congruent — making congruence a special case of similarity.",
        ),
      ],
    },
    {
      id: "10h-worked",
      heading: "Worked example: finding the scale factor",
      body: [
        t(
          "Question: Rectangle A is 3 cm by 5 cm. Rectangle B is similar to A and has width 9 cm. Find the scale factor and the length of B.",
        ),
        t(
          "Step 1: Matching corresponding sides. The width of A (3 cm) corresponds to the width of B (9 cm).",
        ),
        t("Step 2: Scale factor k = length in B / length in A = 9 / 3 = 3."),
        t(
          "Step 3: Apply k to the other dimension. Length of B = k × length of A = 3 × 5 = 15 cm.",
        ),
        t("Answer: k = 3, and B is 9 cm by 15 cm."),
      ],
    },
    {
      id: "10h-mistake",
      heading: "Common mistake: misapplying the scale factor",
      body: [
        t(
          "Mistake 1: Using the wrong direction. The scale factor from A to B is length in B / length in A. If you divide the wrong way, you get the reciprocal.",
        ),
        t(
          "Mistake 2: Forgetting to check angles. Two figures need BOTH equal angles AND proportional sides to be similar. A rectangle 4×6 and a rectangle 8×10 do NOT have the same proportions (6/4 = 1.5 but 10/8 = 1.25), so they are not similar even though both are rectangles.",
        ),
        t(
          "Mistake 3: Confusing congruence and similarity. Congruent figures are similar (k = 1), but similar figures are only congruent when k = 1.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "10h-p1",
      type: "mcq",
      prompt: [t("Two figures are similar if:")],
      explanation: [
        t(
          "Similar figures have the same shape (corresponding angles equal, sides proportional) but may be different sizes. Congruent figures are a special case of similar figures where the scale factor is 1.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [t("They have the same shape but may be different sizes")],
        },
        { id: "b", label: [t("They have the same shape and the same size")] },
        { id: "c", label: [t("They have the same area")] },
        { id: "d", label: [t("They have the same perimeter")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10h-p2",
      type: "mcq",
      prompt: [
        t("For two similar figures, which of the following is always true?"),
      ],
      explanation: [
        t(
          "In similar figures, corresponding angles are always equal. Corresponding sides are proportional (not necessarily equal — that would be congruence). Both conditions must hold: equal angles AND proportional sides.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Corresponding angles are equal")] },
        { id: "b", label: [t("Corresponding sides are equal")] },
        { id: "c", label: [t("The figures have the same area")] },
        { id: "d", label: [t("The figures have the same perimeter")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10h-p3",
      type: "numeric",
      prompt: [
        t(
          "A triangle is enlarged by a scale factor of k = 3. If one side of the original triangle is 4 cm, what is the corresponding side in the enlarged triangle, in cm?",
        ),
      ],
      explanation: [
        t(
          "New length = k × original length = 3 × 4 = 12 cm. When k > 1, the image is an enlargement — every length is multiplied by k.",
        ),
      ],
      xp: 10,
      accepted: ["12"],
      unit: "cm",
    },
    {
      id: "10h-p4",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about the similarity symbol.")],
      explanation: [
        t(
          "The tilde symbol (~) is used in geometry to state that two figures are similar.",
        ),
      ],
      xp: 10,
      template: [t("The mathematical symbol ~ means 'is ___ to'.")],
      accepted: ["similar"],
    },
    {
      id: "10h-p5",
      type: "numeric",
      prompt: [
        t(
          "Rectangle A is 4 cm wide and 6 cm long. Rectangle B is similar to A with scale factor k = 2.5. What is the length of rectangle B, in cm?",
        ),
      ],
      explanation: [
        t(
          "Each dimension of A is multiplied by k = 2.5. New length = 2.5 × 6 = 15 cm. The width would be 2.5 × 4 = 10 cm.",
        ),
      ],
      xp: 15,
      accepted: ["15"],
      unit: "cm",
    },
    {
      id: "10h-p6",
      type: "numeric",
      prompt: [
        t(
          "Triangle T has sides 3 cm, 4 cm, and 5 cm. Triangle U is similar to T and its shortest side is 9 cm. Find the scale factor from T to U.",
        ),
      ],
      explanation: [
        t(
          "The shortest side of T is 3 cm. The shortest side of U is 9 cm. Scale factor k = length in U / length in T = 9 / 3 = 3. The other sides of U are 4 × 3 = 12 cm and 5 × 3 = 15 cm. This is a 9-12-15 triangle (the 3-4-5 triple scaled by 3).",
        ),
      ],
      xp: 15,
      accepted: ["3"],
    },
    {
      id: "10h-p7",
      type: "mcq",
      prompt: [
        t(
          "Rectangle P is 4 cm by 6 cm. Rectangle Q is 8 cm by 10 cm. Are they similar?",
        ),
      ],
      explanation: [
        t(
          "For similarity, corresponding sides must be in the same ratio. Check: 8/4 = 2, but 10/6 ≈ 1.67. The scale factors for width and length are different (2 vs 1.67), so the rectangles are NOT similar. The ratio of length to width differs: P has ratio 6/4 = 1.5, Q has ratio 10/8 = 1.25.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("Yes, because both are rectangles")] },
        { id: "b", label: [t("Yes, with scale factor 2")] },
        {
          id: "c",
          label: [t("No, because the ratios of corresponding sides differ")],
        },
        { id: "d", label: [t("No, because they have different areas")] },
      ],
      correctOptionId: "c",
    },
    {
      id: "10h-p8",
      type: "numeric",
      prompt: [
        t(
          "A photograph is 10 cm wide and 15 cm tall. It is enlarged so the width becomes 25 cm, maintaining similarity. What is the new height, in cm?",
        ),
      ],
      explanation: [
        t(
          "Scale factor k = new width / original width = 25 / 10 = 2.5. The new height is k × original height = 2.5 × 15 = 37.5 cm. Check: the aspect ratio stays at 25/37.5 = 10/15 = 2/3 ✓.",
        ),
      ],
      xp: 20,
      accepted: ["37.5"],
      unit: "cm",
    },
    {
      id: "10h-p9",
      type: "shortText",
      prompt: [
        t(
          "What is the key difference between congruent figures and similar figures?",
        ),
      ],
      explanation: [
        t(
          "Congruent figures have the same shape AND the same size (scale factor k = 1). Similar figures have the same shape but may be different sizes. Congruence is a special case of similarity where k = 1. All congruent figures are similar, but similar figures with k ≠ 1 are not congruent.",
        ),
      ],
      xp: 20,
      accepted: [
        "congruent figures have the same size but similar figures may be different sizes",
        "congruent: same shape and size, similar: same shape only",
        "congruent is a special case of similar with scale factor 1",
        "similar figures can be different sizes but congruent figures must be the same size",
      ],
    },
    {
      id: "10h-p10",
      type: "mcq",
      prompt: [
        t(
          "A map uses a scale where 1 cm represents 5 km. What is the scale factor from the map to the real world?",
        ),
      ],
      explanation: [
        t(
          "Convert 5 km to cm: 5 km = 5,000 m = 500,000 cm. So 1 cm on the map represents 500,000 cm in the real world. The scale factor is 500,000. This means real-world distances are 500,000 times larger than the map distances.",
        ),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("5")] },
        { id: "b", label: [t("500")] },
        { id: "c", label: [t("5,000")] },
        { id: "d", label: [t("500,000")] },
      ],
      correctOptionId: "d",
    },
  ],
  mastery: [
    {
      id: "10h-m1",
      type: "numeric",
      prompt: [
        t(
          "Square S has side length 5 cm. Square T has side length 15 cm. Find the scale factor from S to T.",
        ),
      ],
      explanation: [
        t(
          "Scale factor k = length in T / length in S = 15 / 5 = 3. All sides of S are multiplied by 3 to get T. This is consistent: for any square, all sides scale by the same factor, preserving the shape.",
        ),
      ],
      xp: 15,
      accepted: ["3"],
    },
    {
      id: "10h-m2",
      type: "mcq",
      prompt: [
        t(
          "Which pair of figures is ALWAYS similar, regardless of their dimensions?",
        ),
      ],
      explanation: [
        t(
          "All squares have the same shape: four right angles and four equal sides. The ratio of corresponding sides between any two squares is constant (just the ratio of their side lengths). Rectangles are NOT always similar because the length-to-width ratio can vary. Two arbitrary triangles may have completely different angle sets.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("Any two squares")] },
        { id: "b", label: [t("Any two rectangles")] },
        { id: "c", label: [t("Any two triangles")] },
        { id: "d", label: [t("Any two pentagons")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10h-m3",
      type: "numeric",
      prompt: [
        t(
          "Rectangle R is 8 cm by 12 cm. It is enlarged by scale factor k = 1.5. Find the new width, in cm.",
        ),
      ],
      explanation: [
        t(
          "New width = k × original width = 1.5 × 8 = 12 cm. The new length would be 1.5 × 12 = 18 cm. The new rectangle is 12 cm by 18 cm.",
        ),
      ],
      xp: 15,
      accepted: ["12"],
      unit: "cm",
    },
    {
      id: "10h-m4",
      type: "shortText",
      prompt: [
        t("Are all circles similar to each other? Explain your answer."),
      ],
      explanation: [
        t(
          "Yes, all circles are similar. A circle is defined entirely by its radius. Any circle can be scaled uniformly from any other circle. All circles have the same shape: the ratio of circumference to diameter is always π. There is no variation in shape — the only difference between circles is size, which is exactly what similarity allows.",
        ),
      ],
      xp: 20,
      accepted: [
        "yes",
        "yes, all circles have the same shape",
        "yes, any circle can be scaled to match any other circle",
        "yes because the ratio of circumference to diameter is always pi",
        "yes, circles only differ by size, not shape",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// 10I - EXTENSION: Similar triangles
// ---------------------------------------------------------------------------

const lesson10I: Lesson = {
  id: "geo-10i-similar-triangles",
  order: 4,
  title: "EXTENSION 10I Similar triangles",
  sourceRef: "10I",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "10i-key",
      heading: "Key idea: the AA similarity test",
      body: [
        t(
          "For triangles, there is a simple way to prove similarity: the AA (Angle-Angle) test.",
        ),
        t(
          "If two angles of one triangle equal two angles of another triangle, then the triangles are similar.",
        ),
        t(
          "Why does this work? The sum of angles in any triangle is 180°. If two angles match, the third angles must also match (180° minus the sum of the first two). So all three angles are equal, guaranteeing the same shape.",
        ),
        t(
          "Once similarity is established, you can use proportional reasoning to find unknown side lengths:",
        ),
        m(String.raw`\frac{AB}{DE} = \frac{BC}{EF} = \frac{AC}{DF} = k`),
        t(
          "There are also SSS similarity (all three sides in proportion) and SAS similarity (two sides in proportion, included angle equal), but AA is the most commonly used test in Year 8.",
        ),
      ],
    },
    {
      id: "10i-worked",
      heading: "Worked example: finding an unknown side",
      body: [
        t("Question: △ABC ~ △DEF. AB = 8 cm, BC = 12 cm, DE = 6 cm. Find EF."),
        t(
          "Step 1: Identify corresponding sides. AB corresponds to DE, BC corresponds to EF.",
        ),
        t(
          "Step 2: Find the scale factor. k = length in △DEF / length in △ABC = DE / AB = 6 / 8 = 3/4.",
        ),
        t("Step 3: Apply k to find EF. EF = k × BC = (3/4) × 12 = 9 cm."),
        t(
          "Check: the ratio of corresponding sides should be constant. AB:DE = 8:6 = 4:3, BC:EF = 12:9 = 4:3 ✓.",
        ),
      ],
    },
    {
      id: "10i-extension",
      heading: "Extension: proving triangles are similar",
      body: [
        t(
          "To prove two triangles are similar using AA, you need to identify two pairs of equal angles. Common situations include:",
        ),
        t(
          "• Parallel lines: When a line is drawn parallel to one side of a triangle, it creates a smaller similar triangle (corresponding angles are equal).",
        ),
        t(
          "• Vertically opposite angles: When two lines cross, vertically opposite angles are equal.",
        ),
        t(
          "• Alternate and corresponding angles: When parallel lines are cut by a transversal, alternate angles are equal and corresponding angles are equal.",
        ),
        t(
          "• Shared angle: If two triangles share an angle, that counts as one pair.",
        ),
        t(
          "Once you have two equal angle pairs, AA gives similarity, and you can set up proportions to find unknown sides.",
        ),
      ],
    },
    {
      id: "10i-mistake",
      heading: "Common mistake: setting up proportions incorrectly",
      body: [
        t(
          "When setting up proportions using similar triangles, the correspondence matters. Always match corresponding vertices.",
        ),
        t(
          "If △ABC ~ △DEF, the correspondences are: A↔D, B↔E, C↔F. Always write proportions in the same order:",
        ),
        m(String.raw`\frac{AB}{DE} = \frac{BC}{EF} = \frac{AC}{DF}`),
        t(
          "A common error is to mix up the correspondence, e.g. writing AB/EF instead of AB/DE. This will give a wrong answer.",
        ),
        t(
          "Tip: write the larger triangle's side on top (or bottom) consistently. If you swap directions mid-problem, your proportions will be wrong.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "10i-p1",
      type: "mcq",
      prompt: [
        t("Which condition is sufficient to prove two triangles are similar?"),
      ],
      explanation: [
        t(
          "The AA (Angle-Angle) test is sufficient: if two angles of one triangle equal two angles of another, the triangles are similar. The third angles are automatically equal (sum to 180°). Side lengths do not need to be checked — they will be in proportion automatically.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [
            t("Two angles of one triangle equal two angles of the other"),
          ],
        },
        {
          id: "b",
          label: [t("One side of one triangle equals one side of the other")],
        },
        { id: "c", label: [t("The triangles have the same perimeter")] },
        {
          id: "d",
          label: [t("One angle of one triangle equals one angle of the other")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "10i-p2",
      type: "mcq",
      prompt: [t("If △ABC ~ △DEF, which statement is correct?")],
      explanation: [
        t(
          "For similar triangles, corresponding sides are in proportion. The correct proportion is AB/DE = BC/EF = AC/DF = k, where k is the scale factor. Option b would mean the triangles are congruent (k = 1), which is not necessarily true for similar triangles.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [m(String.raw`\frac{AB}{DE} = \frac{BC}{EF} = \frac{AC}{DF}`)],
        },
        { id: "b", label: [t("AB = DE, BC = EF, AC = DF")] },
        { id: "c", label: [t("∠A + ∠D = 180°")] },
        { id: "d", label: [t("The triangles have equal perimeters")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10i-p3",
      type: "numeric",
      prompt: [
        t(
          "△ABC ~ △DEF with AB = 6 cm and DE = 9 cm. Find the scale factor from △ABC to △DEF.",
        ),
      ],
      explanation: [
        t(
          "Scale factor k = length in △DEF / length in △ABC = DE / AB = 9 / 6 = 1.5. Each side of △DEF is 1.5 times the corresponding side of △ABC.",
        ),
      ],
      xp: 10,
      accepted: ["1.5"],
    },
    {
      id: "10i-p4",
      type: "numeric",
      prompt: [
        t(
          "△PQR ~ △XYZ with PQ = 4 cm, XY = 12 cm. If QR = 5 cm, find YZ, in cm.",
        ),
      ],
      explanation: [
        t(
          "Scale factor k = XY / PQ = 12 / 4 = 3. YZ corresponds to QR, so YZ = k × QR = 3 × 5 = 15 cm. Check: PQ:XY = 4:12 = 1:3, QR:YZ = 5:15 = 1:3 ✓.",
        ),
      ],
      xp: 10,
      accepted: ["15"],
      unit: "cm",
    },
    {
      id: "10i-p5",
      type: "numeric",
      prompt: [
        t("△ABC ~ △DEF. AB = 8 cm, BC = 12 cm, DE = 6 cm. Find EF, in cm."),
      ],
      explanation: [
        t(
          "Scale factor k = DE / AB = 6 / 8 = 3/4 = 0.75. AB corresponds to DE, BC corresponds to EF. So EF = k × BC = 0.75 × 12 = 9 cm. Check the ratio: AB:DE = 8:6 = 4:3, BC:EF = 12:9 = 4:3 ✓.",
        ),
      ],
      xp: 15,
      accepted: ["9"],
      unit: "cm",
    },
    {
      id: "10i-p6",
      type: "numeric",
      prompt: [
        t(
          "In △ABC and △DEF, ∠A = ∠D = 40° and ∠B = ∠E = 85°. By AA, the triangles are similar. If AB = 10 cm, DE = 15 cm, and BC = 8 cm, find EF, in cm.",
        ),
      ],
      explanation: [
        t(
          "Scale factor k = DE / AB = 15 / 10 = 1.5. EF = k × BC = 1.5 × 8 = 12 cm. The third angles are both 180° - 40° - 85° = 55°, confirming similarity.",
        ),
      ],
      xp: 15,
      accepted: ["12"],
      unit: "cm",
    },
    {
      id: "10i-p7",
      type: "mcq",
      prompt: [
        t(
          "△ABC ~ △DEF. AB = 3 cm, BC = 4 cm, AC = 5 cm. DE = 6 cm. Which of the following gives the correct side lengths of △DEF?",
        ),
      ],
      explanation: [
        t(
          "Scale factor k = DE / AB = 6 / 3 = 2. EF = k × BC = 2 × 4 = 8 cm. DF = k × AC = 2 × 5 = 10 cm. △DEF is a 6-8-10 triangle — the 3-4-5 Pythagorean triple scaled by 2.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("EF = 8 cm, DF = 10 cm")] },
        { id: "b", label: [t("EF = 7 cm, DF = 9 cm")] },
        { id: "c", label: [t("EF = 8 cm, DF = 12 cm")] },
        { id: "d", label: [t("EF = 10 cm, DF = 8 cm")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10i-p8",
      type: "numeric",
      prompt: [
        t(
          "A 2 m tall person casts a shadow 3 m long. At the same time, a tree casts a shadow 15 m long. Assuming the sun's rays are parallel, how tall is the tree, in m?",
        ),
      ],
      explanation: [
        t(
          "The person and the tree form similar right triangles with their shadows (the angle of the sun is the same for both). Scale factor k = tree shadow / person shadow = 15 / 3 = 5. Tree height = k × person height = 5 × 2 = 10 m. This is a practical application of AA similarity (right angle plus shared sun angle).",
        ),
      ],
      xp: 20,
      accepted: ["10"],
      unit: "m",
    },
    {
      id: "10i-p9",
      type: "mcq",
      prompt: [
        t(
          "Two right isosceles triangles (each with angles 45°, 45°, 90°) are:",
        ),
      ],
      explanation: [
        t(
          "All right isosceles triangles have the same angle set: 45°, 45°, 90°. Any two such triangles satisfy the AA test (two 45° angles match, or one 45° and the 90°). Therefore they are always similar, regardless of their side lengths. The scale factor depends on the actual sizes.",
        ),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("Always similar")] },
        {
          id: "b",
          label: [t("Only similar if they have the same hypotenuse")],
        },
        { id: "c", label: [t("Only similar if they have the same area")] },
        { id: "d", label: [t("Never similar")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10i-p10",
      type: "matching",
      prompt: [
        t(
          "△ABC ~ △DEF. Match each set of known sides to the unknown side that must be found.",
        ),
      ],
      explanation: [
        t(
          "For each case, find k = DE/AB, then multiply the corresponding side by k. 1: k = 6/4 = 1.5, EF = 1.5 × 6 = 9. 2: k = 2/5 = 0.4, EF = 0.4 × 10 = 4. 3: k = 9/3 = 3, DF = 3 × 4 = 12. 4: k = 3/12 = 0.25, DF = 0.25 × 8 = 2.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [t("AB = 4, DE = 6, BC = 6. Find EF.")],
          right: [t("9")],
        },
        {
          id: "b",
          left: [t("AB = 5, DE = 2, BC = 10. Find EF.")],
          right: [t("4")],
        },
        {
          id: "c",
          left: [t("AB = 3, DE = 9, AC = 4. Find DF.")],
          right: [t("12")],
        },
        {
          id: "d",
          left: [t("AB = 12, DE = 3, AC = 8. Find DF.")],
          right: [t("2")],
        },
      ],
    },
    {
      id: "10i-p11",
      type: "shortText",
      prompt: [
        t(
          "Explain why AAA (all three angles equal) is NOT a congruence test for triangles, but AA (two angles equal) IS a similarity test.",
        ),
      ],
      explanation: [
        t(
          "AAA only guarantees the same shape — it says nothing about size. Three equal angles mean the triangles are definitely similar, but they could be any scale relative to each other. For congruence, you also need to fix the size, which requires at least one side to match. AA is sufficient for similarity because two equal angles force the third to be equal (sum to 180°), establishing the shape completely. The size is then determined by a single scale factor k.",
        ),
      ],
      xp: 20,
      accepted: [
        "AAA does not fix the size, only the shape",
        "congruence requires same size but similarity does not",
        "AA determines the shape but the scale factor can be anything",
        "for congruence you need at least one side, but similarity only needs angles",
      ],
    },
  ],
  mastery: [
    {
      id: "10i-m1",
      type: "numeric",
      prompt: [
        t(
          "△ABC ~ △PQR. AB = 10 cm, BC = 15 cm, CA = 20 cm. The shortest side of △PQR is 5 cm. Find the scale factor from △ABC to △PQR.",
        ),
      ],
      explanation: [
        t(
          "AB = 10 cm is the shortest side of △ABC, corresponding to the shortest side of △PQR which is PQ = 5 cm. Scale factor k = PQ / AB = 5 / 10 = 0.5 (or 1/2). This is a reduction — △PQR has sides half as long as △ABC.",
        ),
      ],
      xp: 15,
      accepted: ["0.5", "1/2"],
    },
    {
      id: "10i-m2",
      type: "mcq",
      prompt: [t("Which of the following is sufficient to prove △ABC ~ △DEF?")],
      explanation: [
        t(
          "AA is the standard similarity test: two equal angle pairs guarantee similarity. One equal angle pair is not enough (you don't know if the triangles share a second angle). Two proportional sides (option d) is not enough without the included angle (that would be SAS similarity, which requires both the proportion and the angle).",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("∠A = ∠D and ∠B = ∠E")] },
        { id: "b", label: [t("AB = DE")] },
        { id: "c", label: [t("∠A = ∠D")] },
        { id: "d", label: [t("AB/DE = BC/EF")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "10i-m3",
      type: "numeric",
      prompt: [
        t(
          "△ABC ~ △DEF. ∠A = 35°, ∠B = 75°, ∠C = 70°. AB = 12 cm, BC = 18 cm. DE = 8 cm. Find EF, in cm.",
        ),
      ],
      explanation: [
        t(
          "Scale factor k = DE / AB = 8 / 12 = 2/3. EF corresponds to BC, so EF = k × BC = (2/3) × 18 = 12 cm. The angles confirm similarity: ∠D = 35°, ∠E = 75°, ∠F = 70°.",
        ),
      ],
      xp: 20,
      accepted: ["12"],
      unit: "cm",
    },
    {
      id: "10i-m4",
      type: "shortText",
      prompt: [
        t(
          "For similar triangles, all three side ratios are equal. Why is it enough to find just one scale factor to determine all unknown sides?",
        ),
      ],
      explanation: [
        t(
          "In similar triangles, there is a single constant scale factor k that relates every pair of corresponding sides. Once you determine k from one known pair of corresponding sides, you can multiply (or divide) any other side by k to find its corresponding partner. This works because the proportionality is uniform across all sides — that is the definition of similarity.",
        ),
      ],
      xp: 20,
      accepted: [
        "because the same scale factor applies to all corresponding sides",
        "all sides are multiplied by the same factor",
        "the scale factor is constant for all pairs of corresponding sides",
        "corresponding sides are proportional with a single constant ratio",
        "because k is the same for every pair of sides",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Boss challenge: Congruence and similarity
// ---------------------------------------------------------------------------

const bossChallenge: BossChallenge = {
  id: "geometry-boss",
  title: "Boss challenge: Congruence and similarity",
  sourceRef: "2026 T2 Yr 8 Maths Planner — Term 2, Week 1",
  questions: [
    // Medium 1 (20 XP) — congruence test identification (MCQ)
    {
      id: "geo-boss-q1",
      type: "mcq",
      prompt: [
        t(
          "In △ABC and △DEF: AB = DE, BC = EF, and AC = DF. Which test proves the triangles are congruent?",
        ),
      ],
      explanation: [
        t(
          "All three pairs of corresponding sides are given as equal: AB = DE, BC = EF, AC = DF. This directly matches the SSS (Side-Side-Side) test. No angle information is needed when all three sides match.",
        ),
      ],
      xp: 20,
      options: [
        { id: "a", label: [t("SSS")] },
        { id: "b", label: [t("SAS")] },
        { id: "c", label: [t("AAS")] },
        { id: "d", label: [t("RHS")] },
      ],
      correctOptionId: "a",
    },
    // Medium 2 (20 XP) — find scale factor (numeric)
    {
      id: "geo-boss-q2",
      type: "numeric",
      prompt: [
        t(
          "△PQR ~ △XYZ with PQ = 8 cm and XY = 20 cm. Find the scale factor from △PQR to △XYZ.",
        ),
      ],
      explanation: [
        t(
          "Scale factor k = length in △XYZ / length in △PQR = XY / PQ = 20 / 8 = 2.5. Each side of △XYZ is 2.5 times the corresponding side of △PQR.",
        ),
      ],
      xp: 20,
      accepted: ["2.5"],
    },
    // Hard 1 (25 XP) — similarity in real-world context (numeric)
    {
      id: "geo-boss-q3",
      type: "numeric",
      prompt: [
        t(
          "A flagpole casts a shadow 12 m long. At the same time, a 1.5 m stick held vertically casts a shadow 2 m long. The sun's rays can be assumed parallel. How tall is the flagpole, in m?",
        ),
      ],
      explanation: [
        t(
          "The flagpole and the stick form similar right triangles with their shadows. The sun's angle is the same for both (parallel rays), giving AA similarity (right angle plus sun angle). Scale factor k = flagpole shadow / stick shadow = 12 / 2 = 6. Flagpole height = k × stick height = 6 × 1.5 = 9 m. Check: 9/12 = 1.5/2 = 0.75, so the triangles are similar with consistent proportions.",
        ),
      ],
      xp: 25,
      accepted: ["9"],
      unit: "m",
    },
    // Hard 2 (25 XP) — combined congruence and similarity (numeric)
    {
      id: "geo-boss-q4",
      type: "numeric",
      prompt: [
        t(
          "△ABC has sides AB = 6 cm, BC = 8 cm, AC = 10 cm. △DEF is congruent to △ABC. △GHI is similar to △DEF with scale factor k = 1.5 from △DEF to △GHI. Find the length of the longest side of △GHI, in cm.",
        ),
      ],
      explanation: [
        t(
          "Step 1: Identify △ABC. The sides 6, 8, 10 form a Pythagorean triple (6² + 8² = 36 + 64 = 100 = 10²), so it is a right triangle with hypotenuse AC = 10 cm — this is the longest side.",
        ),
        t(
          "Step 2: Since △DEF ≅ △ABC, △DEF has the same side lengths, including hypotenuse DF = 10 cm.",
        ),
        t(
          "Step 3: △GHI ~ △DEF with k = 1.5. The longest side of △GHI = k × DF = 1.5 × 10 = 15 cm. △GHI is a 9-12-15 triangle (the 6-8-10 triple scaled by 1.5).",
        ),
      ],
      xp: 25,
      accepted: ["15"],
      unit: "cm",
    },
    // Conceptual / MCQ (20 XP) — relationship between congruence and similarity
    {
      id: "geo-boss-q5",
      type: "mcq",
      prompt: [
        t(
          "Which statement best describes the relationship between congruence and similarity?",
        ),
      ],
      explanation: [
        t(
          "Congruent figures have the same shape AND the same size, which means the scale factor k = 1. Since similar figures are defined by the same shape and proportional sides, congruence is exactly the case of similarity where k = 1. All congruent figures are similar, but similar figures with k ≠ 1 are not congruent.",
        ),
      ],
      xp: 20,
      options: [
        {
          id: "a",
          label: [
            t(
              "Congruence is a special case of similarity where the scale factor is 1",
            ),
          ],
        },
        { id: "b", label: [t("Similarity is a special case of congruence")] },
        {
          id: "c",
          label: [t("Congruence and similarity are unrelated concepts")],
        },
        {
          id: "d",
          label: [t("If two figures are similar, they must also be congruent")],
        },
      ],
      correctOptionId: "a",
    },
  ],
  bonusXp: 100,
  passBadgeId: "boss-geometry",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
};

// ---------------------------------------------------------------------------
// Track
// ---------------------------------------------------------------------------

/** Figures referenced by the geometry track (none currently). */
export const geometryFigures: Figure[] = [];

/** The complete Congruence and Similarity track for Year 8. */
export const geometryTrack: Track = {
  id: "geometry",
  subjectId: "maths",
  title: "Congruence and Similarity (Year 8)",
  description:
    "Identifying congruent and similar figures, using congruence tests for triangles, and applying similarity to find unknown sides.",
  lessons: [lesson10D, lesson10E, lesson10H, lesson10I],
  challenge: bossChallenge,
};
