/**
 * Integer Operations track content (Year 8, chapter 1).
 *
 * Covers adding, subtracting, multiplying and dividing negative integers,
 * order of operations, and substitution - based on the 2026 Year 8 Maths
 * Class Notebook curriculum plan (Term 1, Week 2).
 *
 * @author John Grimes
 * @module content/tracks/integerOperations
 */

import { m, t } from "../blocks";

import type { Lesson, Track, Question } from "../../domain/content/types";

/** 1E/1F - Adding and subtracting negative integers. */
const addingSubtractingNegatives: Lesson = {
  id: "int-1e-adding-subtracting",
  order: 1,
  title: "1E/1F Adding and subtracting negative integers",
  sourceRef: "1E/1F",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "1e-key",
      heading: "Key idea: adding and subtracting negatives",
      body: [
        t("Adding a negative is the same as subtracting the positive:"),
        m("5 + (-3) = 5 - 3 = 2"),
        t("Subtracting a negative is the same as adding the positive:"),
        m("5 - (-3) = 5 + 3 = 8"),
        t(
          "Think of the number line: adding moves right (positive direction), subtracting moves left. Adding a negative moves left, and subtracting a negative moves right.",
        ),
      ],
    },
    {
      id: "1e-worked",
      heading: "Worked examples",
      body: [
        t("Example 1: Calculate 4 + (-7)."),
        m("4 + (-7) = 4 - 7 = -3"),
        t("Example 2: Calculate (-2) - (-5)."),
        m("(-2) - (-5) = -2 + 5 = 3"),
      ],
    },
  ],
  practice: [
    {
      id: "1e-p1",
      type: "numeric",
      prompt: [t("Calculate"), m("3 + (-8)"), t(".")],
      explanation: [t("Adding a negative is subtracting:"), m("3 - 8 = -5")],
      xp: 10,
      accepted: ["-5"],
    },
    {
      id: "1e-p2",
      type: "numeric",
      prompt: [t("Calculate"), m("(-4) - (-6)"), t(".")],
      explanation: [
        t("Subtracting a negative is adding:"),
        m("(-4) + 6 = 2"),
      ],
      xp: 10,
      accepted: ["2"],
    },
    {
      id: "1e-p3",
      type: "numeric",
      prompt: [t("Calculate"), m("(-10) + 4"), t(".")],
      explanation: [
        t("Start at -10, add 4 by moving right on the number line:"),
        m("-10 + 4 = -6"),
      ],
      xp: 10,
      accepted: ["-6"],
    },
    {
      id: "1e-p4",
      type: "mcq",
      prompt: [t("Which expression gives the same result as"), m("7 + (-3)"), t("?")],
      explanation: [m("7 + (-3) = 7 - 3 = 4"), t(", so it equals"), m("7 - 3")],
      xp: 10,
      options: [
        { id: "a", label: [m("7 - 3")] },
        { id: "b", label: [m("7 + 3")] },
        { id: "c", label: [m("-7 + 3")] },
        { id: "d", label: [m("7 - (-3)")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "1e-m1",
      type: "numeric",
      prompt: [t("Calculate"), m("(-5) + (-7)"), t(".")],
      explanation: [
        t("Adding a negative:"),
        m("-5 + (-7) = -5 - 7 = -12"),
      ],
      xp: 15,
      accepted: ["-12"],
    },
    {
      id: "1e-m2",
      type: "numeric",
      prompt: [t("Calculate"), m("6 - (-4)"), t(".")],
      explanation: [
        t("Subtracting a negative is adding:"),
        m("6 - (-4) = 6 + 4 = 10"),
      ],
      xp: 15,
      accepted: ["10"],
    },
    {
      id: "1e-m3",
      type: "numeric",
      prompt: [t("The temperature was -3°C and fell by 5°C. What is the new temperature?")],
      explanation: [m("-3 - 5 = -8"), t(". The new temperature is -8°C.")],
      xp: 15,
      accepted: ["-8"],
    },
    {
      id: "1e-m4",
      type: "mcq",
      prompt: [t("Which expression equals"), m("(-2) + (-3)"), t("?")],
      explanation: [m("-2 + (-3) = -2 - 3 = -5")],
      xp: 15,
      options: [
        { id: "a", label: [m("-5")] },
        { id: "b", label: [m("1")] },
        { id: "c", label: [m("-1")] },
        { id: "d", label: [m("5")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "1e-m5",
      type: "numeric",
      prompt: [t("Calculate"), m("(-8) - (-3)"), t(".")],
      explanation: [m("-8 - (-3) = -8 + 3 = -5")],
      xp: 15,
      accepted: ["-5"],
    },
  ],
};

/** 1G - Multiplying and dividing negative numbers. */
const multiplyingDividingNegatives: Lesson = {
  id: "int-1g-multiplying-dividing",
  order: 2,
  title: "1G Multiplying and dividing negative numbers",
  sourceRef: "1G",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "1g-key",
      heading: "Key idea: sign rules",
      body: [
        t("When multiplying or dividing two numbers:"),
        t("• Same signs → positive answer."),
        m(String.raw`(-3) \times (-4) = 12`),
        m(String.raw`(-12) \div (-3) = 4`),
        t("• Different signs → negative answer."),
        m(String.raw`(-3) \times 4 = -12`),
        m(String.raw`12 \div (-3) = -4`),
      ],
    },
    {
      id: "1g-worked",
      heading: "Worked examples",
      body: [
        t("Example 1: Calculate (-6) × 5."),
        m("(-6) \\times 5 = -30"),
        t("Example 2: Calculate (-20) ÷ (-4)."),
        m("(-20) \\div (-4) = 5"),
      ],
    },
  ],
  practice: [
    {
      id: "1g-p1",
      type: "numeric",
      prompt: [t("Calculate"), m("(-4) \\times 6"), t(".")],
      explanation: [t("Different signs → negative:"), m("-4 \\times 6 = -24")],
      xp: 10,
      accepted: ["-24"],
    },
    {
      id: "1g-p2",
      type: "numeric",
      prompt: [t("Calculate"), m("(-7) \\times (-3)"), t(".")],
      explanation: [t("Same signs → positive:"), m("-7 \\times -3 = 21")],
      xp: 10,
      accepted: ["21"],
    },
    {
      id: "1g-p3",
      type: "numeric",
      prompt: [t("Calculate"), m("(-18) \\div 6"), t(".")],
      explanation: [t("Different signs → negative:"), m("-18 \\div 6 = -3")],
      xp: 10,
      accepted: ["-3"],
    },
    {
      id: "1g-p4",
      type: "mcq",
      prompt: [t("Which of these gives a positive answer?")],
      explanation: [
        t("Same signs give positive:"),
        m("(-3) \\times (-3) = 9"),
        t(". The others mix signs and give negative results."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("(-3) \\times 4")] },
        { id: "b", label: [m("5 \\times (-2)")] },
        { id: "c", label: [m("(-3) \\times (-3)")] },
        { id: "d", label: [m("(-8) \\div 2")] },
      ],
      correctOptionId: "c",
    },
  ],
  mastery: [
    {
      id: "1g-m1",
      type: "numeric",
      prompt: [t("Calculate"), m("(-5) \\times (-8)"), t(".")],
      explanation: [t("Same signs → positive:"), m("(-5) \\times (-8) = 40")],
      xp: 15,
      accepted: ["40"],
    },
    {
      id: "1g-m2",
      type: "numeric",
      prompt: [t("Calculate"), m("(-24) \\div (-4)"), t(".")],
      explanation: [t("Same signs → positive:"), m("(-24) \\div (-4) = 6")],
      xp: 15,
      accepted: ["6"],
    },
    {
      id: "1g-m3",
      type: "numeric",
      prompt: [t("Calculate"), m("(-3) \\times 4 \\times (-2)"), t(".")],
      explanation: [
        t("Multiply left to right: (-3) × 4 = -12, then -12 × (-2) = 24."),
      ],
      xp: 15,
      accepted: ["24"],
    },
    {
      id: "1g-m4",
      type: "numeric",
      prompt: [t("A submarine descends 8 metres per minute. After 5 minutes, what is its change in depth? (Use a negative number for descent).")],
      explanation: [m("-8 \\times 5 = -40"), t("metres.")],
      xp: 15,
      accepted: ["-40"],
    },
    {
      id: "1g-m5",
      type: "mcq",
      prompt: [t("Which expression equals -20?")],
      explanation: [m("(-4) \\times 5 = -20"), t(". All others give different values.")],
      xp: 15,
      options: [
        { id: "a", label: [m("(-4) \\times 5")] },
        { id: "b", label: [m("(-4) \\times (-5)")] },
        { id: "c", label: [m("20 \\div (-2)")] },
        { id: "d", label: [m("(-10) \\div (-0.5)")] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** 1H - Order of operations and substitution. */
const orderOfOperations: Lesson = {
  id: "int-1h-order-of-operations",
  order: 3,
  title: "1H Order of operations and substitution",
  sourceRef: "1H",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "1h-key",
      heading: "Key idea: BODMAS",
      body: [
        t("The order of operations is: Brackets, Orders (powers), Division and Multiplication (left to right), Addition and Subtraction (left to right)."),
        t("Remember BODMAS or PEMDAS."),
        t("Example: Evaluate 3 + 4 × 2."),
        m("3 + 4 \\times 2 = 3 + 8 = 11"),
        t("(Multiplication before addition.)"),
      ],
    },
    {
      id: "1h-sub",
      heading: "Key idea: substitution",
      body: [
        t("To substitute, replace the variable with the given value, then evaluate using BODMAS."),
        t("Example: Evaluate 2x + 3 when x = 5."),
        m("2 \\times 5 + 3 = 10 + 3 = 13"),
      ],
    },
  ],
  practice: [
    {
      id: "1h-p1",
      type: "numeric",
      prompt: [t("Evaluate"), m("5 + 3 \\times 4"), t(".")],
      explanation: [t("Multiplication first:"), m("5 + 12 = 17")],
      xp: 10,
      accepted: ["17"],
    },
    {
      id: "1h-p2",
      type: "numeric",
      prompt: [t("Evaluate"), m("(8 - 3) \\times 2"), t(".")],
      explanation: [t("Brackets first:"), m("5 \\times 2 = 10")],
      xp: 10,
      accepted: ["10"],
    },
    {
      id: "1h-p3",
      type: "numeric",
      prompt: [t("Evaluate"), m("12 \\div 4 + 2 \\times 3"), t(".")],
      explanation: [
        t("Division and multiplication first (left to right):"),
        m("3 + 6 = 9"),
      ],
      xp: 10,
      accepted: ["9"],
    },
    {
      id: "1h-p4",
      type: "numeric",
      prompt: [t("Evaluate"), m("2x + 5"), t("when"), m("x = 3"), t(".")],
      explanation: [m("2 \\times 3 + 5 = 6 + 5 = 11")],
      xp: 10,
      accepted: ["11"],
    },
  ],
  mastery: [
    {
      id: "1h-m1",
      type: "numeric",
      prompt: [t("Evaluate"), m("20 - 3 \\times 4"), t(".")],
      explanation: [t("Multiplication first:"), m("20 - 12 = 8")],
      xp: 15,
      accepted: ["8"],
    },
    {
      id: "1h-m2",
      type: "numeric",
      prompt: [t("Evaluate"), m("(2 + 3)^2 - 5"), t(".")],
      explanation: [t("Brackets → Power → Subtract:"), m("5^2 - 5 = 25 - 5 = 20")],
      xp: 15,
      accepted: ["20"],
    },
    {
      id: "1h-m3",
      type: "numeric",
      prompt: [t("Evaluate"), m("3a - 2b"), t("when"), m("a = 4"), t("and"), m("b = 3"), t(".")],
      explanation: [m("3 \\times 4 - 2 \\times 3 = 12 - 6 = 6")],
      xp: 15,
      accepted: ["6"],
    },
    {
      id: "1h-m4",
      type: "numeric",
      prompt: [t("Evaluate"), m("(10 - 2 \\times 3) + 8 \\div 2"), t(".")],
      explanation: [
        t("Brackets first, multiplication inside:"),
        m("(10 - 6) + 4 = 4 + 4 = 8"),
      ],
      xp: 15,
      accepted: ["8"],
    },
    {
      id: "1h-m5",
      type: "mcq",
      prompt: [t("Which is the correct first step for evaluating"), m("4 + 3 \\times (5 - 2)"), t("?")],
      explanation: [t("Brackets come first, so evaluate"), m("5 - 2 = 3"), t("first.")],
      xp: 15,
      options: [
        { id: "a", label: [t("Evaluate 5 - 2")] },
        { id: "b", label: [t("Evaluate 4 + 3")] },
        { id: "c", label: [t("Evaluate 3 × 5")] },
        { id: "d", label: [t("Evaluate 4 × 5")] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** Boss challenge for the Integer Operations track. */
const integerOpsChallengeQuestions: Question[] = [
  {
    id: "int-boss-q1",
    type: "numeric",
    prompt: [t("Calculate"), m("(-3) \\times 4 + (-6) \\div (-2)"), t(".")],
    explanation: [
      t("Multiply and divide first:"),
      m("-12 + 3 = -9"),
    ],
    xp: 20,
    accepted: ["-9"],
  },
  {
    id: "int-boss-q2",
    type: "numeric",
    prompt: [t("Evaluate"), m("2x^2 - 3x + 1"), t("when"), m("x = -2"), t(".")],
    explanation: [
      m(String.raw`2 \times (-2)^2 - 3 \times (-2) + 1 = 2 \times 4 + 6 + 1 = 8 + 6 + 1 = 15`),
    ],
    xp: 20,
    accepted: ["15"],
  },
  {
    id: "int-boss-q3",
    type: "numeric",
    prompt: [t("Calculate"), m("(-5) - (-8) + (-3)"), t(".")],
    explanation: [
      m("-5 - (-8) + (-3) = -5 + 8 - 3 = 0"),
    ],
    xp: 20,
    accepted: ["0"],
  },
  {
    id: "int-boss-q4",
    type: "mcq",
    prompt: [t("Which expression equals -6?")],
    explanation: [
      m("(-3) \\times (-2) \\times (-1)"),
      t(": three negatives multiplied give a negative (odd count), and 3 × 2 × 1 = 6, so -6."),
    ],
    xp: 20,
    options: [
      { id: "a", label: [m("(-3) \\times (-2)")] },
      { id: "b", label: [m("(-3) \\times 2")] },
      { id: "c", label: [m("(-3) \\times (-2) \\times (-1)")] },
      { id: "d", label: [m("3 \\times (-1) \\times (-2)")] },
    ],
    correctOptionId: "c",
  },
  {
    id: "int-boss-q5",
    type: "numeric",
    prompt: [t("Calculate"), m("(3 - 7) \\times (4 - (-2)) \\div (-3)"), t(".")],
    explanation: [
      t("Brackets first: (-4) × 6 ÷ (-3) = -24 ÷ (-3) = 8."),
    ],
    xp: 25,
    accepted: ["8"],
  },
];

/** The Integer Operations track. */
export const integerOperationsTrack: Track = {
  id: "integer-operations",
  subjectId: "maths",
  title: "Integer Operations (Year 8)",
  description:
    "Adding, subtracting, multiplying and dividing with negative numbers, order of operations, and substitution.",
  lessons: [addingSubtractingNegatives, multiplyingDividingNegatives, orderOfOperations],
  challenge: {
    id: "integer-operations-boss",
    title: "Boss challenge: Integer operations",
    sourceRef: "2026 T1 Yr 8 Maths Planner — Term 1, Week 2",
    questions: integerOpsChallengeQuestions,
    bonusXp: 100,
    passBadgeId: "boss-integer-operations",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
