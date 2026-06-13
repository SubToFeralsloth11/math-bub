/**
 * Decimals track content (Year 8, chapter 3).
 *
 * Covers terminating decimals, recurring decimals and rounding - based on
 * the 2026 Year 8 Maths Class Notebook curriculum plan (Term 1, Week 9).
 *
 * @author John Grimes
 * @module content/tracks/decimals
 */

import { m, t } from "../blocks";

import type { Lesson, Track, Question } from "../../domain/content/types";

/** 3F - Terminating decimals, recurring decimals and rounding. */
const terminatingRecurringRounding: Lesson = {
  id: "dec-3f-decimals",
  order: 1,
  title: "3F Terminating decimals, recurring decimals and rounding",
  sourceRef: "3F",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "3f-key",
      heading: "Key idea: decimal types",
      body: [
        t("A terminating decimal ends after a finite number of digits, e.g. 0.25, 0.75."),
        t("A recurring (repeating) decimal has a pattern that repeats forever. We use a bar or dots above the repeating digits, e.g."),
        m(String.raw`0.\bar{3} = 0.3333\ldots`),
        m(String.raw`0.\overline{142857}`),
        t("Converting fractions to decimals: divide the numerator by the denominator."),
      ],
    },
    {
      id: "3f-rounding",
      heading: "Key idea: rounding",
      body: [
        t("To round to a given number of decimal places:"),
        t("1. Look at the digit one place beyond the required decimal places."),
        t("2. If it is 5 or more, round up the last kept digit."),
        t("3. If it is 4 or less, leave the last kept digit unchanged."),
        t("Example: 3.146 rounded to 2 dp → 3.15 (the third digit is 6, so round up)."),
      ],
    },
    {
      id: "3f-fractions",
      heading: "Key idea: fraction to decimal",
      body: [
        t("A fraction converts to a terminating decimal if, when simplified, its denominator's only prime factors are 2 and/or 5."),
        t("Otherwise, it is a recurring decimal."),
        t("Examples: 1/4 = 0.25 (terminating, denominator is 2²). 1/3 = 0.333... (recurring, denominator has factor 3)."),
      ],
    },
  ],
  practice: [
    {
      id: "3f-p1",
      type: "numeric",
      prompt: [t("Write 3/4 as a decimal.")],
      explanation: [t("3 ÷ 4 = 0.75. This is a terminating decimal.")],
      xp: 10,
      accepted: ["0.75", ".75"],
    },
    {
      id: "3f-p2",
      type: "numeric",
      prompt: [t("Round 7.836 to 2 decimal places.")],
      explanation: [
        t("The third decimal digit is 6, which is ≥ 5, so round up: 7.84."),
      ],
      xp: 10,
      accepted: ["7.84"],
    },
    {
      id: "3f-p3",
      type: "mcq",
      prompt: [t("Which of these fractions gives a recurring decimal?")],
      explanation: [
        t("1/5 = 0.2 (terminating, denominator 5). 3/8 = 0.375 (terminating, denominator 2³). 2/3 = 0.666... (recurring, denominator has factor 3). 7/10 = 0.7 (terminating)."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m(String.raw`\frac{1}{5}`)] },
        { id: "b", label: [m(String.raw`\frac{3}{8}`)] },
        { id: "c", label: [m(String.raw`\frac{2}{3}`)] },
        { id: "d", label: [m(String.raw`\frac{7}{10}`)] },
      ],
      correctOptionId: "c",
    },
    {
      id: "3f-p4",
      type: "numeric",
      prompt: [t("Round 12.0549 to 2 decimal places.")],
      explanation: [
        t("The third decimal digit is 4, which is < 5, so keep: 12.05."),
      ],
      xp: 10,
      accepted: ["12.05"],
    },
  ],
  mastery: [
    {
      id: "3f-m1",
      type: "numeric",
      prompt: [t("Write 5/8 as a decimal.")],
      explanation: [t("5 ÷ 8 = 0.625. This is a terminating decimal.")],
      xp: 15,
      accepted: ["0.625", ".625"],
    },
    {
      id: "3f-m2",
      type: "numeric",
      prompt: [t("Round 19.9876 to 2 decimal places.")],
      explanation: [
        t("The third digit is 7 (≥ 5), so round 19.98 up to 19.99."),
      ],
      xp: 15,
      accepted: ["19.99"],
    },
    {
      id: "3f-m3",
      type: "numeric",
      prompt: [t("Write 1/6 as a decimal, rounded to 3 decimal places.")],
      explanation: [
        t("1 ÷ 6 = 0.16666... Rounding to 3 dp: the 4th digit is 6, so round up: 0.167."),
      ],
      xp: 15,
      accepted: ["0.167", ".167"],
    },
    {
      id: "3f-m4",
      type: "mcq",
      prompt: [t("Which statement is correct about the decimal form of 1/7?")],
      explanation: [
        t("1/7 = 0.142857142857... The six-digit block 142857 repeats forever, so it is recurring with a period of 6."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("It terminates after 6 digits")] },
        { id: "b", label: [t("It is a recurring decimal")] },
        { id: "c", label: [t("It equals exactly 0.14")] },
        { id: "d", label: [t("It is a whole number")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "3f-m5",
      type: "numeric",
      prompt: [t("Round 0.00456 to 3 decimal places.")],
      explanation: [
        t("The 4th decimal is 5, so round 0.004 up to 0.005."),
      ],
      xp: 15,
      accepted: ["0.005", ".005"],
    },
  ],
};

/** Boss challenge for the Decimals track. */
const decimalsChallengeQuestions: Question[] = [
  {
    id: "dec-boss-q1",
    type: "numeric",
    prompt: [t("Express 7/12 as a decimal rounded to 3 decimal places.")],
    explanation: [
      t("7 ÷ 12 = 0.58333... The 4th decimal is 3 (< 5), so keep: 0.583."),
    ],
    xp: 20,
    accepted: ["0.583", ".583"],
  },
  {
    id: "dec-boss-q2",
    type: "mcq",
    prompt: [t("What is the recurring decimal"), m(String.raw`0.\overline{45}`), t("as a simplified fraction?")],
    explanation: [
      t("Let x = 0.454545... Multiply by 100: 100x = 45.4545... Subtract: 99x = 45, so x = 45/99 = 5/11."),
    ],
    xp: 25,
    options: [
      { id: "a", label: [m(String.raw`\frac{5}{11}`)] },
      { id: "b", label: [m(String.raw`\frac{45}{100}`)] },
      { id: "c", label: [m(String.raw`\frac{9}{20}`)] },
      { id: "d", label: [m(String.raw`\frac{45}{99}`)] },
    ],
    correctOptionId: "a",
  },
  {
    id: "dec-boss-q3",
    type: "numeric",
    prompt: [t("Without a calculator, determine if 3/16 produces a terminating decimal. Enter 1 for terminating or 0 for recurring.")],
    explanation: [
      t("16 = 2⁴. The only prime factor is 2, so 3/16 terminates (3/16 = 0.1875)."),
    ],
    xp: 20,
    accepted: ["1"],
  },
  {
    id: "dec-boss-q4",
    type: "numeric",
    prompt: [t("Round 99.995 to 2 decimal places.")],
    explanation: [
      t("The third digit is 5 (≥ 5), so round 99.99 up to 100.00."),
    ],
    xp: 20,
    accepted: ["100", "100.00", "100.0"],
  },
  {
    id: "dec-boss-q5",
    type: "numeric",
    prompt: [t("Convert 0.375 to a fraction in simplest form (write as a/b, e.g. 3/8).")],
    explanation: [
      t("0.375 = 375/1000 = 3/8 (divide numerator and denominator by 125)."),
    ],
    xp: 25,
    accepted: ["3/8", "0.375"],
  },
];

/** The Decimals track. */
export const decimalsTrack: Track = {
  id: "decimals",
  subjectId: "maths",
  title: "Decimals (Year 8)",
  description:
    "Terminating and recurring decimals, converting fractions to decimals, and rounding.",
  lessons: [terminatingRecurringRounding],
  challenge: {
    id: "decimals-boss",
    title: "Boss challenge: Decimals",
    sourceRef: "2026 T1 Yr 8 Maths Planner — Term 1, Week 9",
    questions: decimalsChallengeQuestions,
    bonusXp: 100,
    passBadgeId: "boss-decimals",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
