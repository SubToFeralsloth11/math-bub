/**
 * Geometry boss-challenge questions, drawn from the Year 10 practice paper.
 *
 * @author John Grimes
 * @module content/challenges/geometry
 */

import { t } from "../blocks";

import type { Question } from "../../domain/content/types";

/** The Geometry boss-challenge question set. */
export const geometryChallengeQuestions: Question[] = [
  {
    id: "geo-boss-q1",
    type: "mcq",
    prompt: [
      t(
        "Three pairs of equal sides prove two triangles congruent by which test?",
      ),
    ],
    explanation: [t("Three equal sides is the SSS test.")],
    xp: 10,
    options: [
      { id: "a", label: [t("SSS")] },
      { id: "b", label: [t("AAA")] },
      { id: "c", label: [t("SAS")] },
      { id: "d", label: [t("RHS")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "geo-boss-q2",
    type: "mcq",
    prompt: [t("Which proves triangles similar but not congruent?")],
    explanation: [
      t("AA gives equal angles (same shape) but any size, so similarity."),
    ],
    xp: 10,
    options: [
      { id: "a", label: [t("AA")] },
      { id: "b", label: [t("SSS congruence")] },
      { id: "c", label: [t("RHS")] },
      { id: "d", label: [t("SAS congruence")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "geo-boss-q3",
    type: "numeric",
    prompt: [t("A 5 cm side is enlarged to 20 cm. What is the scale factor?")],
    explanation: [t("20 ÷ 5 = 4.")],
    xp: 10,
    accepted: ["4"],
  },
  {
    id: "geo-boss-q4",
    type: "numeric",
    prompt: [
      t(
        "Two similar triangles have scale factor 3. A 7 cm side matches what length, in cm?",
      ),
    ],
    explanation: [t("7 × 3 = 21 cm.")],
    xp: 10,
    accepted: ["21"],
    unit: "cm",
  },
  {
    id: "geo-boss-q5",
    type: "mcq",
    prompt: [t("In congruent figures, matching angles are...")],
    explanation: [
      t("Congruent figures are identical, so matching angles are equal."),
    ],
    xp: 10,
    options: [
      { id: "a", label: [t("equal")] },
      { id: "b", label: [t("supplementary")] },
      { id: "c", label: [t("doubled")] },
      { id: "d", label: [t("halved")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "geo-boss-q6",
    type: "numeric",
    prompt: [
      t(
        "A rectangle 4 by 6 is enlarged by scale factor 2. What is the new longer side, in cm?",
      ),
    ],
    explanation: [t("The longer side 6 becomes 6 × 2 = 12 cm.")],
    xp: 10,
    accepted: ["12"],
    unit: "cm",
  },
];
