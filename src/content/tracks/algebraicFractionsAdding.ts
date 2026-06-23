/**
 * Algebraic Fractions: Adding and Subtracting track content (Year 8, 5E).
 *
 * Covers adding and subtracting algebraic fractions with monomial denominators
 * — based on the 2026 Year 8 Maths Class Notebook curriculum plan
 * (Term 2, Week 2 — Extension).
 *
 * @author John Grimes
 * @module content/tracks/algebraicFractionsAdding
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
export const algebraicFractionsAddingFigures: Figure[] = [];

// ---------------------------------------------------------------------------
// Lesson 1: 5E Adding and subtracting algebraic fractions
// ---------------------------------------------------------------------------

const addingSubtractingAlgebraicFractions: Lesson = {
  id: "afa-5e-adding-subtracting",
  order: 1,
  title: "5E Adding and subtracting algebraic fractions",
  sourceRef: "5E",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "5e-key",
      heading: "Key idea: common denominators",
      body: [
        t(
          "Adding and subtracting algebraic fractions follows the same rules as numeric fractions. When the denominators are the same, simply add or subtract the numerators and keep the denominator unchanged.",
        ),
        m(String.raw`\frac{a}{d} + \frac{b}{d} = \frac{a + b}{d}`),
        m(String.raw`\frac{a}{d} - \frac{b}{d} = \frac{a - b}{d}`),
        t(
          "When the denominators are different, you must first find a common denominator. The lowest common denominator (LCD) is the lowest common multiple (LCM) of the denominators.",
        ),
        t("Example: Add"),
        m(String.raw`\frac{2}{x} + \frac{3}{2x}`),
        t("."),
        t(
          "The LCM of x and 2x is 2x. Convert the first fraction: multiply numerator and denominator by 2 to get",
        ),
        m(String.raw`\frac{4}{2x}`),
        t(". Now add:"),
        m(String.raw`\frac{4}{2x} + \frac{3}{2x} = \frac{7}{2x}`),
      ],
    },
    {
      id: "5e-worked",
      heading: "Worked examples",
      body: [
        t("Example 1: Add"),
        m(String.raw`\frac{x}{3} + \frac{4x}{3}`),
        t("."),
        t(
          "The denominators are the same (3). Add the numerators: x + 4x = 5x. Keep the denominator: answer is",
        ),
        m(String.raw`\frac{5x}{3}`),
        t("."),
        t("Example 2: Subtract"),
        m(String.raw`\frac{5}{2a} - \frac{3}{4a}`),
        t("."),
        t(
          "The LCM of 2a and 4a is 4a. Convert the first fraction by multiplying top and bottom by 2:",
        ),
        m(String.raw`\frac{5}{2a} = \frac{10}{4a}`),
        t(". Now subtract:"),
        m(
          String.raw`\frac{10}{4a} - \frac{3}{4a} = \frac{10 - 3}{4a} = \frac{7}{4a}`,
        ),
      ],
    },
    {
      id: "5e-mistake",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Adding denominators. When adding fractions, you add the numerators, NOT the denominators. For example,",
        ),
        m(String.raw`\frac{1}{x} + \frac{2}{x} = \frac{3}{x}`),
        t(", not"),
        m(String.raw`\frac{3}{2x}`),
        t("."),
        t(
          "Mistake 2: Using the product instead of the LCM for the common denominator. While the product always works as a common denominator, it leads to larger numbers and more simplification work. For",
        ),
        m(String.raw`\frac{1}{2x} + \frac{1}{4x}`),
        t(", the LCM is 4x (not 8x²). Using 4x is simpler."),
        t(
          "Mistake 3: Forgetting to multiply both numerator and denominator when converting. If you multiply the denominator by 3, you must also multiply the numerator by 3 to keep the fraction equivalent.",
        ),
      ],
    },
    {
      id: "5e-extension",
      heading: "Extension: finding the LCM of algebraic terms",
      body: [
        t(
          "To find the LCM of algebraic terms, take the LCM of the coefficients and the highest power of each variable.",
        ),
        t("Example: Find the LCM of 3x² and 6xy."),
        t("Step 1: LCM of coefficients — LCM of 3 and 6 is 6."),
        t(
          "Step 2: For each variable, take the highest power. x appears as x² and x — take x². y appears as y (and y⁰ in the first term) — take y.",
        ),
        t("The LCM is 6x²y."),
        t("Now add"),
        m(String.raw`\frac{2}{3x^2} + \frac{5}{6xy}`),
        t(":"),
        t("Convert both to denominator 6x²y:"),
        m(
          String.raw`\frac{2}{3x^2} \times \frac{2y}{2y} = \frac{4y}{6x^2y}, \quad \frac{5}{6xy} \times \frac{x}{x} = \frac{5x}{6x^2y}`,
        ),
        t("Add:"),
        m(
          String.raw`\frac{4y}{6x^2y} + \frac{5x}{6x^2y} = \frac{4y + 5x}{6x^2y}`,
        ),
      ],
    },
  ],
  practice: [
    {
      id: "5e-p1",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{3}{x} + \frac{5}{x}`)],
      explanation: [
        t(
          "The denominators are the same (x). Add the numerators: 3 + 5 = 8. The answer is",
        ),
        m(String.raw`\frac{8}{x}`),
        t("."),
      ],
      xp: 10,
      target: "8 / x",
      variables: ["x"],
    },
    {
      id: "5e-p2",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{7a}{4} - \frac{3a}{4}`)],
      explanation: [
        t(
          "The denominators are the same (4). Subtract the numerators: 7a - 3a = 4a. The answer is",
        ),
        m(String.raw`\frac{4a}{4} = a`),
        t(". Cancel the common factor 4."),
      ],
      xp: 10,
      target: "a",
      variables: ["a"],
    },
    {
      id: "5e-p3",
      type: "numeric",
      prompt: [
        t("What is the LCM of x and 3x?"),
        t("(Enter the coefficient of x only.)"),
      ],
      explanation: [
        t(
          "The LCM of x and 3x is 3x. The coefficient is 3, and x is the highest power of the variable x present. So the LCM is 3x.",
        ),
      ],
      xp: 10,
      accepted: ["3"],
    },
    {
      id: "5e-p4",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{1}{2x} + \frac{3}{4x}`)],
      explanation: [
        t("The LCM of 2x and 4x is 4x. Convert the first fraction:"),
        m(String.raw`\frac{1}{2x} \times \frac{2}{2} = \frac{2}{4x}`),
        t(". Now add:"),
        m(String.raw`\frac{2}{4x} + \frac{3}{4x} = \frac{5}{4x}`),
        t("."),
      ],
      xp: 10,
      target: "5 / (4 * x)",
      variables: ["x"],
    },
    {
      id: "5e-p5",
      type: "mcq",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{5}{y} - \frac{2}{y}`),
        t(". Which is correct?"),
      ],
      explanation: [
        t(
          "The denominators are the same (y). Subtract the numerators: 5 - 2 = 3. The answer is",
        ),
        m(String.raw`\frac{3}{y}`),
        t("."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m(String.raw`\frac{3}{y}`)] },
        { id: "b", label: [m(String.raw`\frac{3}{2y}`)] },
        { id: "c", label: [m(String.raw`\frac{7}{y}`)] },
        { id: "d", label: [m(String.raw`3`)] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5e-p6",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{2}{x} + \frac{1}{3x}`)],
      explanation: [
        t(
          "The LCM of x and 3x is 3x. Convert the first fraction: multiply top and bottom by 3:",
        ),
        m(String.raw`\frac{2}{x} \times \frac{3}{3} = \frac{6}{3x}`),
        t(". Now add:"),
        m(String.raw`\frac{6}{3x} + \frac{1}{3x} = \frac{7}{3x}`),
        t("."),
      ],
      xp: 15,
      target: "7 / (3 * x)",
      variables: ["x"],
    },
    {
      id: "5e-p7",
      type: "expression",
      prompt: [
        t("Simplify:"),
        m(String.raw`\frac{3x}{5} + \frac{2x}{5} - \frac{x}{5}`),
      ],
      explanation: [
        t(
          "The denominators are all 5. Combine the numerators: 3x + 2x - x = 4x. The answer is",
        ),
        m(String.raw`\frac{4x}{5}`),
        t("."),
      ],
      xp: 15,
      target: "4 * x / 5",
      variables: ["x"],
    },
    {
      id: "5e-p8",
      type: "fillInTheBlank",
      prompt: [t("Complete the following rule.")],
      template: [
        t(
          "When adding fractions with the same denominator, add the ___ and keep the denominator the same.",
        ),
      ],
      explanation: [
        t("You add the numerators, not the denominators. For example,"),
        m(String.raw`\frac{2}{x} + \frac{3}{x} = \frac{5}{x}`),
        t(", not"),
        m(String.raw`\frac{5}{2x}`),
        t("."),
      ],
      xp: 15,
      accepted: ["numerators", "tops"],
    },
    {
      id: "5e-p9",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{5}{6y} - \frac{1}{3y}`)],
      explanation: [
        t(
          "The LCM of 6y and 3y is 6y. Convert the second fraction: multiply top and bottom by 2:",
        ),
        m(String.raw`\frac{1}{3y} \times \frac{2}{2} = \frac{2}{6y}`),
        t(". Now subtract:"),
        m(
          String.raw`\frac{5}{6y} - \frac{2}{6y} = \frac{3}{6y} = \frac{1}{2y}`,
        ),
        t(". Simplify by cancelling the common factor 3."),
      ],
      xp: 20,
      target: "1 / (2 * y)",
      variables: ["y"],
    },
    {
      id: "5e-p10",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{x}{2} + \frac{3x}{4}`)],
      explanation: [
        t("The LCM of 2 and 4 is 4. Convert the first fraction:"),
        m(String.raw`\frac{x}{2} \times \frac{2}{2} = \frac{2x}{4}`),
        t(". Now add:"),
        m(String.raw`\frac{2x}{4} + \frac{3x}{4} = \frac{5x}{4}`),
        t("."),
      ],
      xp: 20,
      target: "5 * x / 4",
      variables: ["x"],
    },
  ],
  mastery: [
    {
      id: "5e-m1",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{7}{3a} + \frac{2}{a}`)],
      explanation: [
        t("The LCM of 3a and a is 3a. Convert the second fraction:"),
        m(String.raw`\frac{2}{a} \times \frac{3}{3} = \frac{6}{3a}`),
        t(". Now add:"),
        m(String.raw`\frac{7}{3a} + \frac{6}{3a} = \frac{13}{3a}`),
        t("."),
      ],
      xp: 15,
      target: "13 / (3 * a)",
      variables: ["a"],
    },
    {
      id: "5e-m2",
      type: "expression",
      prompt: [
        t("Simplify:"),
        m(String.raw`\frac{2}{3x} + \frac{5}{6x} - \frac{1}{2x}`),
      ],
      explanation: [
        t("The LCM of 3x, 6x and 2x is 6x. Convert each fraction:"),
        m(
          String.raw`\frac{2}{3x} \times \frac{2}{2} = \frac{4}{6x}, \quad \frac{1}{2x} \times \frac{3}{3} = \frac{3}{6x}`,
        ),
        t(". Now combine:"),
        m(
          String.raw`\frac{4}{6x} + \frac{5}{6x} - \frac{3}{6x} = \frac{4 + 5 - 3}{6x} = \frac{6}{6x} = \frac{1}{x}`,
        ),
        t(". Cancel the common factor 6."),
      ],
      xp: 15,
      target: "1 / x",
      variables: ["x"],
    },
    {
      id: "5e-m3",
      type: "mcq",
      prompt: [
        t("A student adds"),
        m(String.raw`\frac{2}{x} + \frac{1}{x}`),
        t("and gets"),
        m(String.raw`\frac{3}{2x}`),
        t(". What mistake did they make?"),
      ],
      explanation: [
        t(
          "The student added the denominators (x + x = 2x) as well as the numerators. When adding fractions with the same denominator, only add the numerators. The correct answer is",
        ),
        m(String.raw`\frac{3}{x}`),
        t("."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("They forgot to simplify the answer.")] },
        {
          id: "b",
          label: [
            t(
              "They added the denominators instead of keeping the denominator the same.",
            ),
          ],
        },
        { id: "c", label: [t("They added the numerators incorrectly.")] },
        { id: "d", label: [t("The answer is correct.")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5e-m4",
      type: "expression",
      prompt: [t("Simplify:"), m(String.raw`\frac{a}{2b} + \frac{a}{3b}`)],
      explanation: [
        t("The LCM of 2b and 3b is 6b. Convert each fraction:"),
        m(
          String.raw`\frac{a}{2b} \times \frac{3}{3} = \frac{3a}{6b}, \quad \frac{a}{3b} \times \frac{2}{2} = \frac{2a}{6b}`,
        ),
        t(". Now add:"),
        m(String.raw`\frac{3a}{6b} + \frac{2a}{6b} = \frac{5a}{6b}`),
        t("."),
      ],
      xp: 20,
      target: "5 * a / (6 * b)",
      variables: ["a", "b"],
    },
  ],
};

// ---------------------------------------------------------------------------
// BossChallenge
// ---------------------------------------------------------------------------

const challengeQuestions: Question[] = [
  // Medium difficulty (20 XP each) — 2 questions.
  {
    id: "afa-ch-p1",
    type: "expression",
    prompt: [
      t("Simplify:"),
      m(String.raw`\frac{2}{x} + \frac{5}{3x} - \frac{1}{x}`),
    ],
    explanation: [
      t("The LCM is 3x. Note that"),
      m(String.raw`\frac{2}{x} - \frac{1}{x} = \frac{1}{x}`),
      t(", so combine these first to get"),
      m(String.raw`\frac{1}{x} + \frac{5}{3x}`),
      t(". Now convert:"),
      m(String.raw`\frac{1}{x} \times \frac{3}{3} = \frac{3}{3x}`),
      t(". Add:"),
      m(String.raw`\frac{3}{3x} + \frac{5}{3x} = \frac{8}{3x}`),
      t("."),
    ],
    xp: 20,
    target: "8 / (3 * x)",
    variables: ["x"],
  },
  {
    id: "afa-ch-p2",
    type: "expression",
    prompt: [
      t("Simplify:"),
      m(String.raw`\frac{4}{5y} - \frac{1}{10y} + \frac{3}{2y}`),
    ],
    explanation: [
      t("The LCM of 5y, 10y and 2y is 10y. Convert each:"),
      m(
        String.raw`\frac{4}{5y} = \frac{8}{10y}, \quad \frac{3}{2y} = \frac{15}{10y}`,
      ),
      t(". Now combine:"),
      m(
        String.raw`\frac{8}{10y} - \frac{1}{10y} + \frac{15}{10y} = \frac{8 - 1 + 15}{10y} = \frac{22}{10y} = \frac{11}{5y}`,
      ),
      t(". Simplify by cancelling the common factor 2."),
    ],
    xp: 20,
    target: "11 / (5 * y)",
    variables: ["y"],
  },
  // High difficulty (25 XP each) — 2 questions.
  {
    id: "afa-ch-p3",
    type: "expression",
    prompt: [
      t("Simplify:"),
      m(String.raw`\frac{3}{2x} + \frac{1}{x} - \frac{5}{6x}`),
    ],
    explanation: [
      t("The LCM of 2x, x and 6x is 6x. Convert each:"),
      m(
        String.raw`\frac{3}{2x} = \frac{9}{6x}, \quad \frac{1}{x} = \frac{6}{6x}`,
      ),
      t(". Now combine:"),
      m(
        String.raw`\frac{9}{6x} + \frac{6}{6x} - \frac{5}{6x} = \frac{9 + 6 - 5}{6x} = \frac{10}{6x} = \frac{5}{3x}`,
      ),
      t(". Simplify by cancelling the common factor 2."),
    ],
    xp: 25,
    target: "5 / (3 * x)",
    variables: ["x"],
  },
  {
    id: "afa-ch-p4",
    type: "expression",
    prompt: [t("Simplify:"), m(String.raw`\frac{2a}{3b} + \frac{a}{6b}`)],
    explanation: [
      t("The LCM of 3b and 6b is 6b. Convert the first fraction:"),
      m(String.raw`\frac{2a}{3b} \times \frac{2}{2} = \frac{4a}{6b}`),
      t(". Now add:"),
      m(String.raw`\frac{4a}{6b} + \frac{a}{6b} = \frac{5a}{6b}`),
      t("."),
    ],
    xp: 25,
    target: "5 * a / (6 * b)",
    variables: ["a", "b"],
  },
  // Conceptual (20 XP) — 1 question.
  {
    id: "afa-ch-p5",
    type: "mcq",
    prompt: [
      t("To add"),
      m(String.raw`\frac{2}{x} + \frac{3}{2x}`),
      t(", why must we convert"),
      m(String.raw`\frac{2}{x}`),
      t("to"),
      m(String.raw`\frac{4}{2x}`),
      t("before adding?"),
    ],
    explanation: [
      t(
        "Fractions can only be added or subtracted directly when they have the same denominator. Since x and 2x are different denominators, we find the LCM (2x) and convert both fractions to this common denominator. Multiplying the numerator and denominator of 2/x by 2 gives 4/(2x), which is an equivalent fraction that can now be combined with 3/(2x).",
      ),
    ],
    xp: 20,
    options: [
      {
        id: "a",
        label: [t("Because 2/x and 3/(2x) are not equivalent fractions.")],
      },
      {
        id: "b",
        label: [
          t(
            "Because fractions can only be added when they have the same denominator.",
          ),
        ],
      },
      {
        id: "c",
        label: [t("Because multiplying makes the numbers bigger.")],
      },
      {
        id: "d",
        label: [t("You do not need to convert; they already match.")],
      },
    ],
    correctOptionId: "b",
  },
];

/** The Algebraic Fractions: Adding and Subtracting track. */
export const algebraicFractionsAddingTrack: Track = {
  id: "algebraic-fractions-adding",
  subjectId: "maths",
  title: "Algebraic Fractions: Adding and Subtracting (Year 8)",
  description:
    "Learn to add and subtract algebraic fractions with monomial denominators by finding common denominators.",
  lessons: [addingSubtractingAlgebraicFractions],
  challenge: {
    id: "algebraic-fractions-adding-boss",
    title: "Boss challenge: Algebraic Fractions — Adding and Subtracting",
    sourceRef: "2026 T2 Yr 8 Maths Planner — Term 2, Week 2 (Extension)",
    questions: challengeQuestions,
    bonusXp: 120,
    passBadgeId: "boss-algebraic-fractions-adding",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
