/**
 * Algebra boss-challenge questions, drawn from the Year 8 practice paper.
 *
 * No learn cards: this is an assessment that spans the whole track (expanding,
 * factorising, collecting terms, and index laws).
 *
 * @author John Grimes
 * @module content/challenges/algebra
 */

import { m, t } from "../blocks";

import type { Question } from "../../domain/content/types";

/** The Algebra boss-challenge question set. */
export const algebraChallengeQuestions: Question[] = [
  {
    id: "alg-boss-q1",
    type: "mcq",
    prompt: [t("Expand"), m("5(x + 2)"), t(".")],
    explanation: [m(String.raw`5 \times x + 5 \times 2 = 5x + 10`)],
    xp: 10,
    options: [
      { id: "a", label: [m("5x + 10")] },
      { id: "b", label: [m("5x + 2")] },
      { id: "c", label: [m("5x + 7")] },
      { id: "d", label: [m("10x + 2")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "alg-boss-q2",
    type: "mcq",
    prompt: [t("Factorise fully"), m("6x + 9"), t(".")],
    explanation: [t("Take out the common factor 3:"), m("6x + 9 = 3(2x + 3)")],
    xp: 10,
    options: [
      { id: "a", label: [m("3(2x + 3)")] },
      { id: "b", label: [m("3(2x + 9)")] },
      { id: "c", label: [m("6(x + 9)")] },
      { id: "d", label: [m("x(6 + 9)")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "alg-boss-q3",
    type: "expression",
    prompt: [t("Simplify"), m("3a + 5a"), t(".")],
    explanation: [m("3a + 5a = 8a")],
    xp: 10,
    target: "8a",
    variables: ["a"],
  },
  {
    id: "alg-boss-q4",
    type: "mcq",
    prompt: [t("Simplify"), m(String.raw`x^3 \times x^4`), t(".")],
    explanation: [
      t("Add the indices when multiplying powers of the same base:"),
      m("x^{3+4} = x^7"),
    ],
    xp: 10,
    options: [
      { id: "a", label: [m("x^7")] },
      { id: "b", label: [m("x^{12}")] },
      { id: "c", label: [m("x^1")] },
      { id: "d", label: [m("2x^7")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "alg-boss-q5",
    type: "expression",
    prompt: [t("Expand"), m("3(2x + 4)"), t(".")],
    explanation: [m(String.raw`3 \times 2x + 3 \times 4 = 6x + 12`)],
    xp: 10,
    target: "6x + 12",
    variables: ["x"],
  },
  {
    id: "alg-boss-q6",
    type: "numeric",
    prompt: [t("Evaluate"), m("2^3"), t(".")],
    explanation: [m(String.raw`2^3 = 2 \times 2 \times 2 = 8`)],
    xp: 10,
    accepted: ["8"],
  },
  {
    id: "alg-boss-q7",
    type: "mcq",
    prompt: [t("Simplify"), m(String.raw`\dfrac{x^5}{x^2}`), t(".")],
    explanation: [
      t("Subtract the indices when dividing powers of the same base:"),
      m("x^{5-2} = x^3"),
    ],
    xp: 10,
    options: [
      { id: "a", label: [m("x^3")] },
      { id: "b", label: [m("x^7")] },
      { id: "c", label: [m("x^{2.5}")] },
      { id: "d", label: [m("x^{10}")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "alg-boss-q8",
    type: "mcq",
    prompt: [t("Factorise fully"), m("4x + 8"), t(".")],
    explanation: [t("Take out the common factor 4:"), m("4x + 8 = 4(x + 2)")],
    xp: 10,
    options: [
      { id: "a", label: [m("4(x + 2)")] },
      { id: "b", label: [m("4(x + 8)")] },
      { id: "c", label: [m("2(x + 4)")] },
      { id: "d", label: [m("8(x + 1)")] },
    ],
    correctOptionId: "a",
  },
];
