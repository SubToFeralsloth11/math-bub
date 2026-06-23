/**
 * Algebraic Fractions: Multiplying and Dividing track content (Year 8, 5F).
 *
 * Covers multiplying and dividing algebraic fractions with monomial terms
 * — based on the 2026 Year 8 Maths Class Notebook curriculum plan
 * (Term 2, Week 4 — Extension).
 *
 * @author John Grimes
 * @module content/tracks/algebraicFractionsMultiplying
 */

import { m, t } from "../blocks";

import type {
  Figure,
  Lesson,
  Track,
  Question,
} from "../../domain/content/types";

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

/** Figures used by this track (none — purely algebraic manipulation). */
export const algebraicFractionsMultiplyingFigures: Figure[] = [];

// ---------------------------------------------------------------------------
// Lesson 1: 5F Multiplying and dividing algebraic fractions
// ---------------------------------------------------------------------------

const multiplyingDividingAlgebraicFractions: Lesson = {
  id: "afm-5f-multiplying-dividing",
  order: 1,
  title: "5F Multiplying and dividing algebraic fractions",
  sourceRef: "5F",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "5f-key",
      heading: "Key idea: multiplying algebraic fractions",
      body: [
        t(
          "To multiply algebraic fractions, multiply the numerators together and the denominators together, then simplify by cancelling common factors.",
        ),
        m(
          String.raw`\frac{a}{b} \times \frac{c}{d} = \frac{a \times c}{b \times d}`,
        ),
        t("To divide algebraic fractions, multiply by the reciprocal:"),
        m(
          String.raw`\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} = \frac{a \times d}{b \times c}`,
        ),
        t(
          "You can simplify before multiplying by cross-cancelling common factors between any numerator and any denominator. This makes the multiplication easier and the answer automatically simplified.",
        ),
        t("Example: Multiply"),
        m(String.raw`\frac{2x}{3} \times \frac{9}{4x}`),
        t("."),
        t(
          "Cross-cancel: 2x and 4x share a factor of 2x (so 2x/4x = 1/2). 9 and 3 share a factor of 3 (so 9/3 = 3). After cancelling:",
        ),
        m(String.raw`\frac{1}{1} \times \frac{3}{2} = \frac{3}{2}`),
      ],
    },
    {
      id: "5f-worked",
      heading: "Worked examples",
      body: [
        t("Example 1: Multiply"),
        m(String.raw`\frac{x}{2} \times \frac{4}{y}`),
        t("."),
        t(
          "Multiply numerators: x × 4 = 4x. Multiply denominators: 2 × y = 2y. The result is",
        ),
        m(String.raw`\frac{4x}{2y} = \frac{2x}{y}`),
        t(". Simplify by cancelling the common factor 2."),
        t("Example 2: Divide"),
        m(String.raw`\frac{3a}{4} \div \frac{a}{8}`),
        t("."),
        t("Multiply by the reciprocal:"),
        m(
          String.raw`\frac{3a}{4} \times \frac{8}{a} = \frac{3a \times 8}{4 \times a}`,
        ),
        t("Cancel a: numerator 3a ÷ a = 3. Cancel 4 and 8: 8 ÷ 4 = 2."),
        m(String.raw`\frac{3 \times 2}{1} = 6`),
        t("."),
        t("Example 3: Cross-cancel before multiplying"),
        m(String.raw`\frac{6x^2}{5y} \times \frac{10y}{3x}`),
        t("."),
        t(
          "Cancel: 6x² and 3x — divide by 3x, leaving 2x/1. Cancel: 10y and 5y — divide by 5y, leaving 2/1.",
        ),
        m(String.raw`\frac{2x}{1} \times \frac{2}{1} = 4x`),
      ],
    },
    {
      id: "5f-mistake",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Forgetting to use the reciprocal when dividing. Remember: dividing by a fraction is the same as multiplying by its reciprocal. So",
        ),
        m(
          String.raw`\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c}`,
        ),
        t(", not"),
        m(String.raw`\frac{a}{b} \times \frac{c}{d}`),
        t("."),
        t(
          "Mistake 2: Trying to cross-cancel before converting division to multiplication. Always change division to multiplication by the reciprocal FIRST, then cancel.",
        ),
        t(
          "Mistake 3: Cancelling terms that are added, not multiplied. You can only cancel factors (things multiplied together). You cannot cancel terms in a sum like a + b. For example, in",
        ),
        m(String.raw`\frac{a + 1}{a}`),
        t(
          ", you cannot cancel the a because it is a term in the sum a + 1, not a factor.",
        ),
      ],
    },
    {
      id: "5f-extension",
      heading: "Extension: factorising before cancelling",
      body: [
        t(
          "When the numerator or denominator contains a factorised expression, factorise first to reveal common factors you can cancel.",
        ),
        t("Example: Simplify"),
        m(String.raw`\frac{x^2 - 4}{x + 2} \times \frac{1}{x - 2}`),
        t("."),
        t("Factorise the difference of two squares: x² - 4 = (x + 2)(x - 2)."),
        m(String.raw`\frac{(x + 2)(x - 2)}{x + 2} \times \frac{1}{x - 2}`),
        t(
          "Cancel (x + 2) from numerator and denominator. Cancel (x - 2) the same way.",
        ),
        m(String.raw`\frac{1}{1} \times \frac{1}{1} = 1`),
        t(". The entire expression simplifies to 1 (for x ≠ -2, 2)."),
      ],
    },
  ],
  practice: [
    {
      id: "5f-p1",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{x}{2} \times \frac{3}{y}`)],
      explanation: [
        t(
          "Multiply numerators: x × 3 = 3x. Multiply denominators: 2 × y = 2y. The answer is",
        ),
        m(String.raw`\frac{3x}{2y}`),
        t(". No further simplification is possible."),
      ],
      xp: 10,
      target: "3 * x / (2 * y)",
      variables: ["x", "y"],
    },
    {
      id: "5f-p2",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{4}{x} \times \frac{3x}{2}`)],
      explanation: [
        t(
          "Multiply numerators: 4 × 3x = 12x. Multiply denominators: x × 2 = 2x. Simplify:",
        ),
        m(String.raw`\frac{12x}{2x} = 6`),
        t(". Cancel x (x/x = 1) and divide 12 by 2."),
      ],
      xp: 10,
      target: "6",
      variables: ["x"],
    },
    {
      id: "5f-p3",
      type: "mcq",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{2}{a} \div \frac{4}{b}`),
        t(". Which is correct?"),
      ],
      explanation: [
        t("Divide by multiplying by the reciprocal:"),
        m(
          String.raw`\frac{2}{a} \times \frac{b}{4} = \frac{2b}{4a} = \frac{b}{2a}`,
        ),
        t(". Cancel the common factor 2."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m(String.raw`\frac{b}{2a}`)] },
        { id: "b", label: [m(String.raw`\frac{8}{ab}`)] },
        { id: "c", label: [m(String.raw`\frac{2b}{a}`)] },
        { id: "d", label: [m(String.raw`\frac{a}{2b}`)] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5f-p4",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{5a}{6} \div \frac{10}{3a}`)],
      explanation: [
        t("Multiply by the reciprocal:"),
        m(
          String.raw`\frac{5a}{6} \times \frac{3a}{10} = \frac{5a \times 3a}{6 \times 10}`,
        ),
        t(
          ". Simplify: 5 and 10 share a factor of 5 (5/10 = 1/2). 3a and 6 share a factor of 3 (3/6 = 1/2).",
        ),
        m(String.raw`\frac{a \times a}{2 \times 2} = \frac{a^2}{4}`),
        t("."),
      ],
      xp: 10,
      target: "a^2 / 4",
      variables: ["a"],
    },
    {
      id: "5f-p5",
      type: "fillInTheBlank",
      prompt: [t("Complete the rule for dividing fractions.")],
      template: [t("To divide by a fraction, multiply by its ___.")],
      explanation: [
        t(
          "To divide by a fraction, multiply by its reciprocal (flip the fraction). For example,",
        ),
        m(
          String.raw`\frac{3}{x} \div \frac{2}{y} = \frac{3}{x} \times \frac{y}{2}`,
        ),
        t("."),
      ],
      xp: 10,
      accepted: ["reciprocal", "inverse", "flip"],
    },
    {
      id: "5f-p6",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{3x}{4} \times \frac{8}{x}`)],
      explanation: [
        t(
          "Cancel x from numerator and denominator. Cancel 4 and 8 (divide both by 4): 8/4 = 2. Now we have:",
        ),
        m(String.raw`\frac{3}{1} \times \frac{2}{1} = 6`),
        t("."),
      ],
      xp: 15,
      target: "6",
      variables: ["x"],
    },
    {
      id: "5f-p7",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{2x}{y} \times \frac{3y}{x}`)],
      explanation: [
        t(
          "Cancel x from numerator and denominator. Cancel y from numerator and denominator. Everything cancels:",
        ),
        m(String.raw`2 \times 3 = 6`),
        t("."),
      ],
      xp: 15,
      target: "6",
      variables: ["x", "y"],
    },
    {
      id: "5f-p8",
      type: "mcq",
      prompt: [
        t("A student calculates"),
        m(String.raw`\frac{3}{x} \div \frac{6}{x}`),
        t("as"),
        m(String.raw`\frac{3}{x} \times \frac{6}{x} = \frac{18}{x^2}`),
        t(". What mistake did they make?"),
      ],
      explanation: [
        t(
          "The student forgot to use the reciprocal when dividing. To divide, you must multiply by the reciprocal of the second fraction. The correct calculation is",
        ),
        m(
          String.raw`\frac{3}{x} \times \frac{x}{6} = \frac{3x}{6x} = \frac{1}{2}`,
        ),
        t("."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("They cancelled incorrectly.")] },
        {
          id: "b",
          label: [
            t("They forgot to flip the second fraction (use the reciprocal)."),
          ],
        },
        { id: "c", label: [t("They should have subtracted the fractions.")] },
        { id: "d", label: [t("The answer is correct.")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5f-p9",
      type: "expression",
      prompt: [
        t("Simplify:"),
        m(String.raw`\frac{6x^2}{5y} \times \frac{10y}{3x}`),
      ],
      explanation: [
        t(
          "Cross-cancel: 6x² and 3x — divide both by 3x, giving 2x/1. 10y and 5y — divide both by 5y, giving 2/1. Result:",
        ),
        m(String.raw`\frac{2x}{1} \times \frac{2}{1} = 4x`),
        t("."),
      ],
      xp: 20,
      target: "4 * x",
      variables: ["x", "y"],
    },
    {
      id: "5f-p10",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{ab}{c} \div \frac{a}{bc}`)],
      explanation: [
        t("Multiply by the reciprocal:"),
        m(
          String.raw`\frac{ab}{c} \times \frac{bc}{a} = \frac{ab \times bc}{c \times a}`,
        ),
        t(". Cancel a. Cancel c. The result is:"),
        m(String.raw`\frac{b \times b}{1} = b^2`),
        t("."),
      ],
      xp: 20,
      target: "b^2",
      variables: ["a", "b", "c"],
    },
  ],
  mastery: [
    {
      id: "5f-m1",
      type: "expression",
      prompt: [
        t("Simplify:"),
        m(String.raw`\frac{8a}{3b} \times \frac{9b^2}{4a}`),
      ],
      explanation: [
        t(
          "Cross-cancel: 8a and 4a — divide both by 4a, giving 2/1. 9b² and 3b — divide both by 3b, giving 3b/1. Result:",
        ),
        m(String.raw`\frac{2}{1} \times \frac{3b}{1} = 6b`),
        t("."),
      ],
      xp: 15,
      target: "6 * b",
      variables: ["a", "b"],
    },
    {
      id: "5f-m2",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{m}{2n} \div \frac{m^2}{6}`)],
      explanation: [
        t("Multiply by the reciprocal:"),
        m(String.raw`\frac{m}{2n} \times \frac{6}{m^2}`),
        t(
          ". Cancel m and m² — divide both by m, giving 1 and m. Cancel 6 and 2 — divide both by 2, giving 3 and 1.",
        ),
        m(String.raw`\frac{1 \times 3}{n \times m} = \frac{3}{mn}`),
        t("."),
      ],
      xp: 15,
      target: "3 / (m * n)",
      variables: ["m", "n"],
    },
    {
      id: "5f-m3",
      type: "mcq",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{x^2}{3} \times \frac{6}{x} \div \frac{2x}{1}`),
        t(". Which is correct?"),
      ],
      explanation: [
        t("Work left to right. First multiply:"),
        m(String.raw`\frac{x^2}{3} \times \frac{6}{x} = \frac{6x^2}{3x} = 2x`),
        t(". Then divide by"),
        m(String.raw`\frac{2x}{1}`),
        t(":"),
        m(String.raw`2x \times \frac{1}{2x} = 1`),
        t("."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("1")] },
        { id: "b", label: [m("x")] },
        { id: "c", label: [m("2x")] },
        { id: "d", label: [m("x^2")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5f-m4",
      type: "expression",
      prompt: [
        t("Simplify:"),
        m(String.raw`\frac{pq}{r} \times \frac{r^2}{p} \div \frac{q}{r}`),
      ],
      explanation: [
        t("First multiply:"),
        m(
          String.raw`\frac{pq}{r} \times \frac{r^2}{p} = \frac{pq \times r^2}{r \times p}`,
        ),
        t(". Cancel p. Cancel r (r²/r = r). Result: q × r = qr."),
        t("Then divide by q/r:"),
        m(String.raw`qr \times \frac{r}{q} = r \times r = r^2`),
        t(". Cancel q."),
      ],
      xp: 20,
      target: "r^2",
      variables: ["p", "q", "r"],
    },
  ],
};

// ---------------------------------------------------------------------------
// BossChallenge
// ---------------------------------------------------------------------------

const challengeQuestions: Question[] = [
  // Medium difficulty (20 XP each) — 2 questions.
  {
    id: "afm-ch-p1",
    type: "expression",
    prompt: [t("Simplify:"), m(String.raw`\frac{4x}{5} \times \frac{15}{2x}`)],
    explanation: [
      t(
        "Cross-cancel: 4x and 2x — divide both by 2x, giving 2/1. 15 and 5 — divide both by 5, giving 3/1. Result:",
      ),
      m(String.raw`\frac{2}{1} \times \frac{3}{1} = 6`),
      t("."),
    ],
    xp: 20,
    target: "6",
    variables: ["x"],
  },
  {
    id: "afm-ch-p2",
    type: "expression",
    prompt: [t("Simplify:"), m(String.raw`\frac{3a}{b} \div \frac{9a^2}{2b}`)],
    explanation: [
      t("Multiply by the reciprocal:"),
      m(
        String.raw`\frac{3a}{b} \times \frac{2b}{9a^2} = \frac{3a \times 2b}{b \times 9a^2}`,
      ),
      t(
        ". Cancel b. Cancel 3a and 9a² — divide both by 3a, giving 1 and 3a. Result:",
      ),
      m(String.raw`\frac{2}{3a}`),
      t("."),
    ],
    xp: 20,
    target: "2 / (3 * a)",
    variables: ["a", "b"],
  },
  // High difficulty (25 XP each) — 2 questions.
  {
    id: "afm-ch-p3",
    type: "expression",
    prompt: [
      t("Simplify:"),
      m(String.raw`\frac{2x^2}{3y} \times \frac{6y^2}{x} \div \frac{4xy}{1}`),
    ],
    explanation: [
      t("Handle the multiplication first:"),
      m(
        String.raw`\frac{2x^2}{3y} \times \frac{6y^2}{x} = \frac{2x^2 \times 6y^2}{3y \times x}`,
      ),
      t(
        ". Cancel x² and x — leaving x. Cancel 6y² and 3y — divide by 3y, giving 2y/1. Result: 2x × 2y = 4xy.",
      ),
      t("Then divide by 4xy:"),
      m(String.raw`4xy \times \frac{1}{4xy} = 1`),
      t("."),
    ],
    xp: 25,
    target: "1",
    variables: ["x", "y"],
  },
  {
    id: "afm-ch-p4",
    type: "expression",
    prompt: [
      t("Simplify:"),
      m(String.raw`\frac{m^2}{n} \div \frac{m}{n^2} \times \frac{2}{m}`),
    ],
    explanation: [
      t("Handle the division first (left to right):"),
      m(
        String.raw`\frac{m^2}{n} \times \frac{n^2}{m} = \frac{m^2 \times n^2}{n \times m} = mn`,
      ),
      t(". Cancel m²/m = m, n²/n = n."),
      t("Then multiply by 2/m:"),
      m(String.raw`mn \times \frac{2}{m} = n \times 2 = 2n`),
      t(". Cancel m."),
    ],
    xp: 25,
    target: "2 * n",
    variables: ["m", "n"],
  },
  // Conceptual (20 XP) — 1 question.
  {
    id: "afm-ch-p5",
    type: "mcq",
    prompt: [
      t("When simplifying"),
      m(String.raw`\frac{x^2}{2} \div \frac{x}{4}`),
      t(", why do we write it as"),
      m(String.raw`\frac{x^2}{2} \times \frac{4}{x}`),
      t("?"),
    ],
    explanation: [
      t(
        "Dividing by a fraction is equivalent to multiplying by its reciprocal (flipping it). So dividing by x/4 means multiplying by its reciprocal, 4/x. This converts the division problem into a multiplication problem, which can then be simplified by cancelling common factors: x²/2 × 4/x = 2x (after cancelling x and 4/2).",
      ),
    ],
    xp: 20,
    options: [
      {
        id: "a",
        label: [t("Because multiplication is always easier than division.")],
      },
      {
        id: "b",
        label: [
          t(
            "Because dividing by a fraction is the same as multiplying by its reciprocal.",
          ),
        ],
      },
      {
        id: "c",
        label: [t("Because x²/2 and x/4 share a common denominator.")],
      },
      { id: "d", label: [t("You should not flip it; keep it as division.")] },
    ],
    correctOptionId: "b",
  },
];

/** The Algebraic Fractions: Multiplying and Dividing track. */
export const algebraicFractionsMultiplyingTrack: Track = {
  id: "algebraic-fractions-multiplying",
  subjectId: "maths",
  title: "Algebraic Fractions: Multiplying and Dividing (Year 8)",
  description:
    "Learn to multiply and divide algebraic fractions by cross-cancelling common factors and using reciprocals.",
  lessons: [multiplyingDividingAlgebraicFractions],
  challenge: {
    id: "algebraic-fractions-multiplying-boss",
    title: "Boss challenge: Algebraic Fractions — Multiplying and Dividing",
    sourceRef: "2026 T2 Yr 8 Maths Planner — Term 2, Week 4 (Extension)",
    questions: challengeQuestions,
    bonusXp: 120,
    passBadgeId: "boss-algebraic-fractions-multiplying",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
