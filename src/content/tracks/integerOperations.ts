/**
 * Integer Operations track content (Year 8, chapter 1).
 *
 * Covers adding, subtracting, multiplying and dividing negative integers,
 * order of operations, substitution, and extension into negative fractions
 * (chapter 3). Based on the 2026 Year 8 Maths Class Notebook curriculum
 * plan (Term 1, Week 2).
 *
 * @author John Grimes
 * @module content/tracks/integerOperations
 */

import { m, t } from "../blocks";

import type { Lesson, Track, Question } from "../../domain/content/types";

// ---------------------------------------------------------------------------
// Lesson 1 – 1E/1F Adding and subtracting negative integers
// ---------------------------------------------------------------------------

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
        t("Example 3: Calculate (-8) + (-3)."),
        m("(-8) + (-3) = -8 - 3 = -11"),
        t("Example 4: Calculate 10 - (-6)."),
        m("10 - (-6) = 10 + 6 = 16"),
      ],
    },
    {
      id: "1e-mistake",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Thinking that subtracting a negative makes the number more negative. It actually adds the positive, moving right on the number line.",
        ),
        t(
          "Mistake 2: Confusing the sign of the operation with the sign of the number. In 5 - (-3), the first minus is the operation (subtract) and the second minus belongs to the number -3.",
        ),
        t(
          "Tip: Circle the operation sign and underline the number's sign to keep them separate. Then rewrite as a single operation: 5 - (-3) becomes 5 + 3 = 8.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "1e-p1",
      type: "numeric",
      prompt: [t("Calculate"), m("3 + (-8)"), t(".")],
      explanation: [
        t("Adding a negative is subtracting:"),
        m("3 - 8 = -5"),
        t(". Start at 3 on the number line and move 8 units left."),
      ],
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
        t(". Start at -4 and move 6 units right."),
      ],
      xp: 10,
      accepted: ["2"],
    },
    {
      id: "1e-p3",
      type: "mcq",
      prompt: [
        t("Which expression gives the same result as"),
        m("7 + (-3)"),
        t("?"),
      ],
      explanation: [
        m("7 + (-3) = 7 - 3 = 4"),
        t(", so it is equivalent to"),
        m("7 - 3"),
        t(". The other options give different results:"),
        m("7 + 3 = 10"),
        t(","),
        m("-7 + 3 = -4"),
        t(","),
        m("7 - (-3) = 10"),
        t("."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("7 - 3")] },
        { id: "b", label: [m("7 + 3")] },
        { id: "c", label: [m("-7 + 3")] },
        { id: "d", label: [m("7 - (-3)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "1e-p4",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about adding negative numbers.")],
      template: [
        t(
          "Adding a negative number is the same as ___ the positive number.",
        ),
      ],
      explanation: [
        t("Adding a negative moves left on the number line, which is the same effect as subtraction. For example,"),
        m("5 + (-3) = 5 - 3 = 2"),
        t("."),
      ],
      xp: 10,
      accepted: ["subtracting", "subtract"],
    },
    {
      id: "1e-p5",
      type: "numeric",
      prompt: [t("Calculate"), m("(-10) + 4"), t(".")],
      explanation: [
        t("Start at -10, add 4 by moving right on the number line:"),
        m("-10 + 4 = -6"),
        t(". The negative number has greater magnitude, so the result is negative."),
      ],
      xp: 10,
      accepted: ["-6"],
    },
    {
      id: "1e-p6",
      type: "numeric",
      prompt: [
        t("The temperature was -3°C and fell by 5°C. What is the new temperature?"),
      ],
      explanation: [
        t("A fall of 5°C means subtracting 5:"),
        m("-3 - 5 = -8"),
        t(". The new temperature is -8°C. When you start below zero and go further into the negative, the temperature becomes more negative."),
      ],
      xp: 15,
      accepted: ["-8"],
    },
    {
      id: "1e-p7",
      type: "mcq",
      prompt: [
        t("Is it true that"),
        m("-3 - (-7)"),
        t("equals"),
        m("-3 + 7"),
        t("?"),
      ],
      explanation: [
        t("Yes, both equal 4. Subtracting a negative is always the same as adding the positive equivalent. Here,"),
        m("-3 - (-7) = -3 + 7 = 4"),
        t(", and"),
        m("-3 + 7 = 4"),
        t("."),
      ],
      xp: 15,
      options: [
        { id: "true", label: [t("True, both equal 4.")] },
        { id: "false1", label: [t("False, the first equals -10.")] },
        { id: "false2", label: [t("False, the first equals -4.")] },
      ],
      correctOptionId: "true",
    },
    {
      id: "1e-p8",
      type: "numeric",
      prompt: [
        t("A lift starts at floor -2, goes up 5 floors, then down 8 floors. What floor is it on?"),
      ],
      explanation: [
        t("Going up is addition, going down is subtraction:"),
        m("-2 + 5 - 8"),
        t(". Calculate left to right:"),
        m("-2 + 5 = 3"),
        t(", then"),
        m("3 - 8 = -5"),
        t(". The lift ends on floor -5 (5 floors below ground)."),
      ],
      xp: 20,
      accepted: ["-5"],
    },
    {
      id: "1e-p9",
      type: "matching",
      prompt: [t("Match each expression to its result.")],
      explanation: [
        m("(-2) + (-3) = -2 - 3 = -5"),
        t(". Same signs added, keep the sign."),
        m("(-2) - (-3) = -2 + 3 = 1"),
        t(". Subtracting a negative becomes addition."),
        m("2 + (-3) = 2 - 3 = -1"),
        t(". Adding a negative is subtraction."),
        m("2 - (-3) = 2 + 3 = 5"),
        t(". Subtracting a negative is addition."),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [m("(-2) + (-3)")],
          right: [m("-5")],
        },
        {
          id: "b",
          left: [m("(-2) - (-3)")],
          right: [m("1")],
        },
        {
          id: "c",
          left: [m("2 + (-3)")],
          right: [m("-1")],
        },
        {
          id: "d",
          left: [m("2 - (-3)")],
          right: [m("5")],
        },
      ],
    },
    {
      id: "1e-p10",
      type: "numeric",
      prompt: [t("Calculate"), m("(-15) - (-20) + (-10)"), t(".")],
      explanation: [
        t("Rewrite, removing double signs:"),
        m("-15 + 20 - 10"),
        t(". Work left to right:"),
        m("-15 + 20 = 5"),
        t(", then"),
        m("5 - 10 = -5"),
        t("."),
      ],
      xp: 15,
      accepted: ["-5"],
    },
  ],
  mastery: [
    {
      id: "1e-m1",
      type: "numeric",
      prompt: [t("Calculate"), m("(-5) + (-7)"), t(".")],
      explanation: [
        t("Adding two negatives: both signs are negative, so add the magnitudes and keep the negative sign:"),
        m("-5 + (-7) = -5 - 7 = -12"),
        t("."),
      ],
      xp: 15,
      accepted: ["-12"],
    },
    {
      id: "1e-m2",
      type: "numeric",
      prompt: [t("Calculate"), m("6 - (-4)"), t(".")],
      explanation: [
        t("Subtracting a negative is adding. Rewrite then add:"),
        m("6 - (-4) = 6 + 4 = 10"),
        t("."),
      ],
      xp: 15,
      accepted: ["10"],
    },
    {
      id: "1e-m3",
      type: "mcq",
      prompt: [
        t("Which expression is equal to"),
        m("(-2) + (-3)"),
        t("?"),
      ],
      explanation: [
        m("(-2) + (-3) = -2 - 3 = -5"),
        t(". Only the first option gives -5. The other options evaluate to 1, -1, and 5 respectively."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("-2 - 3")] },
        { id: "b", label: [m("-2 + 3")] },
        { id: "c", label: [m("2 - 3")] },
        { id: "d", label: [m("2 + 3")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "1e-m4",
      type: "numeric",
      prompt: [t("Calculate"), m("(-8) - (-3)"), t(".")],
      explanation: [
        t("Subtracting a negative is adding:"),
        m("-8 + 3 = -5"),
        t(". Start at -8 on the number line and move 3 units right. The result is still negative because 8 > 3 in magnitude."),
      ],
      xp: 15,
      accepted: ["-5"],
    },
    {
      id: "1e-m5",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about subtracting negative numbers.")],
      template: [
        t("To subtract -7 from 3, we ___ 7 to 3, giving 10."),
      ],
      explanation: [
        t("Subtracting a negative number means adding its positive:"),
        m("3 - (-7) = 3 + 7 = 10"),
        t("."),
      ],
      xp: 15,
      accepted: ["add", "adding"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 2 – 1G Multiplying and dividing negative numbers
// ---------------------------------------------------------------------------

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
      heading: "Key idea: sign rules for multiplication and division",
      body: [
        t("When multiplying or dividing two numbers, the sign of the answer follows two simple rules:"),
        t("• Same signs (both positive or both negative) → positive answer."),
        m(String.raw`(-3) \times (-4) = 12`),
        m(String.raw`(-12) \div (-3) = 4`),
        t("• Different signs (one positive, one negative) → negative answer."),
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
        t("(different signs → negative)."),
        t("Example 2: Calculate (-20) ÷ (-4)."),
        m("(-20) \\div (-4) = 5"),
        t("(same signs → positive)."),
        t("Example 3: Calculate 3 × (-7)."),
        m("3 \\times (-7) = -21"),
        t("(different signs → negative)."),
        t("Example 4: Calculate (-48) ÷ 6."),
        m("(-48) \\div 6 = -8"),
        t("(different signs → negative)."),
      ],
    },
    {
      id: "1g-extension",
      heading: "Extension: multiplying several negatives",
      body: [
        t("When you multiply more than two numbers, count how many are negative:"),
        t("• An even number of negatives → positive result."),
        t("• An odd number of negatives → negative result."),
        t("Example:"),
        m("(-2) \\times 3 \\times (-4)"),
        t("has two negatives (even), so the answer is positive:"),
        m("-2 \\times 3 = -6"),
        t(", then"),
        m("-6 \\times (-4) = 24"),
        t("."),
        t("Example with an odd count:"),
        m("(-2) \\times (-3) \\times (-1)"),
        t("has three negatives (odd), so the answer is negative: 6 × (-1) = -6."),
      ],
    },
  ],
  practice: [
    {
      id: "1g-p1",
      type: "numeric",
      prompt: [t("Calculate"), m("(-4) \\times 6"), t(".")],
      explanation: [
        t("Different signs → negative answer:"),
        m("-4 \\times 6 = -24"),
        t(". The magnitude is 4 × 6 = 24, and the sign is negative."),
      ],
      xp: 10,
      accepted: ["-24"],
    },
    {
      id: "1g-p2",
      type: "numeric",
      prompt: [t("Calculate"), m("(-7) \\times (-3)"), t(".")],
      explanation: [
        t("Same signs (both negative) → positive answer:"),
        m("-7 \\times -3 = 21"),
        t(". Multiply the magnitudes: 7 × 3 = 21."),
      ],
      xp: 10,
      accepted: ["21"],
    },
    {
      id: "1g-p3",
      type: "numeric",
      prompt: [t("Calculate"), m("(-18) \\div 6"), t(".")],
      explanation: [
        t("Different signs → negative answer:"),
        m("-18 \\div 6 = -3"),
        t(". The magnitude is 18 ÷ 6 = 3, and the sign is negative."),
      ],
      xp: 10,
      accepted: ["-3"],
    },
    {
      id: "1g-p4",
      type: "mcq",
      prompt: [t("Which of these gives a positive answer?")],
      explanation: [
        t("Same signs give a positive result. Only"),
        m("(-3) \\times (-3) = 9"),
        t("has matching signs (both negative). The others mix signs and give negative results:"),
        m("(-3) \\times 4 = -12"),
        t(","),
        m("5 \\times (-2) = -10"),
        t(","),
        m("(-8) \\div 2 = -4"),
        t("."),
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
    {
      id: "1g-p5",
      type: "numeric",
      prompt: [t("Calculate"), m("(-5) \\times 4 \\times (-2)"), t(".")],
      explanation: [
        t("Multiply left to right. First:"),
        m("-5 \\times 4 = -20"),
        t(". Then:"),
        m("-20 \\times (-2) = 40"),
        t(". There are two negative signs (even), so the final answer is positive."),
      ],
      xp: 15,
      accepted: ["40"],
    },
    {
      id: "1g-p6",
      type: "matching",
      prompt: [t("Match each division to its result.")],
      explanation: [
        m("(-18) \\div 6 = -3"),
        t("(different signs → negative)."),
        m("36 \\div (-9) = -4"),
        t("(different signs → negative)."),
        m("(-30) \\div (-5) = 6"),
        t("(same signs → positive)."),
        m("(-12) \\div (-3) = 4"),
        t("(same signs → positive)."),
      ],
      xp: 15,
      pairs: [
        { id: "a", left: [m("(-18) \\div 6")], right: [m("-3")] },
        { id: "b", left: [m("36 \\div (-9)")], right: [m("-4")] },
        { id: "c", left: [m("(-30) \\div (-5)")], right: [m("6")] },
        { id: "d", left: [m("(-12) \\div (-3)")], right: [m("4")] },
      ],
    },
    {
      id: "1g-p7",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about signs.")],
      template: [
        t(
          "When multiplying two negative numbers, the answer is always ___ .",
        ),
      ],
      explanation: [
        t("Same signs produce a positive result. For example,"),
        m("-3 \\times -5 = 15"),
        t(". Two negatives multiplied always yield a positive."),
      ],
      xp: 10,
      accepted: ["positive"],
    },
    {
      id: "1g-p8",
      type: "mcq",
      prompt: [t("Which expression has a value of -12?")],
      explanation: [
        m("(-3) \\times 4 = -12"),
        t(". The other options evaluate to: (-3)×(-4)=12, (-24)÷(-2)=12, and 6×(-3)×(-1)=18."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("(-3) \\times (-4)")] },
        { id: "b", label: [m("(-3) \\times 4")] },
        { id: "c", label: [m("(-24) \\div (-2)")] },
        { id: "d", label: [m("6 \\times (-3) \\times (-1)")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "1g-p9",
      type: "numeric",
      prompt: [t("Calculate"), m("(-2)^3 \\div (-2)"), t(".")],
      explanation: [
        t("First, evaluate the power:"),
        m("(-2)^3 = -2 \\times -2 \\times -2 = -8"),
        t("(odd number of negatives). Then divide:"),
        m("-8 \\div (-2) = 4"),
        t("(same signs → positive)."),
      ],
      xp: 20,
      accepted: ["4"],
    },
    {
      id: "1g-p10",
      type: "shortText",
      prompt: [
        t("A submarine descends 8 metres per minute. Write the multiplication expression that represents its change in depth after 5 minutes, and state the answer."),
      ],
      explanation: [
        t("Descent is negative, so the rate is -8 m/min. After 5 minutes:"),
        m("-8 \\times 5 = -40"),
        t(". The submarine is 40 metres deeper (change in depth = -40 m)."),
      ],
      xp: 15,
      accepted: ["-40", "-40 m", "-40m", "-40 metres"],
    },
  ],
  mastery: [
    {
      id: "1g-m1",
      type: "numeric",
      prompt: [t("Calculate"), m("(-6) \\times (-7)"), t(".")],
      explanation: [
        t("Same signs (both negative) → positive:"),
        m("6 \\times 7 = 42"),
        t(". The negative signs cancel each other out."),
      ],
      xp: 15,
      accepted: ["42"],
    },
    {
      id: "1g-m2",
      type: "numeric",
      prompt: [t("Calculate"), m("(-36) \\div (-9)"), t(".")],
      explanation: [
        t("Same signs (both negative) → positive:"),
        m("36 \\div 9 = 4"),
        t(". The negative signs cancel."),
      ],
      xp: 15,
      accepted: ["4"],
    },
    {
      id: "1g-m3",
      type: "numeric",
      prompt: [t("Calculate"), m("(-2) \\times 3 \\times (-4) \\times (-1)"), t(".")],
      explanation: [
        t("Count the negative signs: -2, -4, and -1 make three negatives (odd). Work left to right:"),
        m("-2 \\times 3 = -6"),
        t(","),
        m("-6 \\times (-4) = 24"),
        t(","),
        m("24 \\times (-1) = -24"),
        t(". The odd count of negatives gives a negative answer."),
      ],
      xp: 15,
      accepted: ["-24"],
    },
    {
      id: "1g-m4",
      type: "mcq",
      prompt: [
        t("A submarine descends 8 metres per minute. After 5 minutes, what is its change in depth? (Use a negative number for descent.)"),
      ],
      explanation: [
        m("-8 \\times 5 = -40"),
        t(". The submarine changes depth by -40 metres (40 metres deeper). The negative rate and positive time give a negative result because the signs are different."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("40")] },
        { id: "b", label: [m("-40")] },
        { id: "c", label: [m("-3")] },
        { id: "d", label: [m("-13")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "1g-m5",
      type: "numeric",
      prompt: [t("Calculate"), m("(-3)^2 \\times (-2)"), t(".")],
      explanation: [
        t("First, evaluate the power:"),
        m("(-3)^2 = (-3) \\times (-3) = 9"),
        t("(two negatives → positive). Then multiply:"),
        m("9 \\times (-2) = -18"),
        t("(different signs → negative)."),
      ],
      xp: 20,
      accepted: ["-18"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 3 – 1H Order of operations and substitution
// ---------------------------------------------------------------------------

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
        t("The order of operations ensures everyone evaluates expressions the same way:"),
        t("B – Brackets (work inside grouping symbols first)."),
        t("O – Orders (powers, indices, square roots)."),
        t("DM – Division and Multiplication, working left to right."),
        t("AS – Addition and Subtraction, working left to right."),
        t("Example: Evaluate 3 + 4 × 2."),
        m("3 + 4 \\times 2 = 3 + 8 = 11"),
        t("(Multiplication before addition.)"),
      ],
    },
    {
      id: "1h-sub",
      heading: "Key idea: substitution",
      body: [
        t("To substitute, replace each variable with its given value, then evaluate using BODMAS."),
        t("Example: Evaluate 2x + 3 when x = 5."),
        m("2 \\times 5 + 3 = 10 + 3 = 13"),
        t("Example: Evaluate 3a - 2b when a = 4 and b = 3."),
        m("3 \\times 4 - 2 \\times 3 = 12 - 6 = 6"),
        t("(Multiplication before subtraction.)"),
      ],
    },
    {
      id: "1h-mistake",
      heading: "Common mistakes",
      body: [
        t("Mistake 1: Working strictly left to right without considering BODMAS. For 5 + 3 × 4, doing 5 + 3 = 8 then 8 × 4 = 32 is wrong. Multiplication must come before addition."),
        t("Mistake 2: Forgetting that division and multiplication have equal priority and are worked left to right. 12 ÷ 3 × 2 = 4 × 2 = 8, not 12 ÷ 6 = 2."),
        t("Mistake 3: Not inserting implied multiplication signs when substituting. If x = -2, then 2x means 2 × (-2), not 2 - 2."),
      ],
    },
  ],
  practice: [
    {
      id: "1h-p1",
      type: "numeric",
      prompt: [t("Evaluate"), m("5 + 3 \\times 4"), t(".")],
      explanation: [
        t("Multiplication before addition:"),
        m("5 + 3 \\times 4 = 5 + 12 = 17"),
        t(". Do not work left to right — multiply first."),
      ],
      xp: 10,
      accepted: ["17"],
    },
    {
      id: "1h-p2",
      type: "numeric",
      prompt: [t("Evaluate"), m("(8 - 3) \\times 2"), t(".")],
      explanation: [
        t("Brackets first:"),
        m("(8 - 3) = 5"),
        t(", then"),
        m("5 \\times 2 = 10"),
        t(". The brackets override the usual order."),
      ],
      xp: 10,
      accepted: ["10"],
    },
    {
      id: "1h-p3",
      type: "mcq",
      prompt: [t("What is the value of"), m("12 \\div 4 + 2 \\times 3"), t("?")],
      explanation: [
        t("Division and multiplication have equal priority — work left to right:"),
        m("12 \\div 4 = 3"),
        t("and"),
        m("2 \\times 3 = 6"),
        t(", so"),
        m("3 + 6 = 9"),
        t(". The common mistake is adding first (12 ÷ 4 + 2 = 5, then 5 × 3 = 15) or doing all division first then all multiplication (3 + 6 = 9, which happens to be correct here)."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("9")] },
        { id: "b", label: [m("15")] },
        { id: "c", label: [m("12")] },
        { id: "d", label: [m("5")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "1h-p4",
      type: "numeric",
      prompt: [
        t("Evaluate"),
        m("2x + 5"),
        t("when"),
        m("x = 3"),
        t("."),
      ],
      explanation: [
        t("Substitute x = 3:"),
        m("2 \\times 3 + 5 = 6 + 5 = 11"),
        t(". Multiplication before addition."),
      ],
      xp: 10,
      accepted: ["11"],
    },
    {
      id: "1h-p5",
      type: "mcq",
      prompt: [
        t("What is the correct first step when evaluating"),
        m("4 + 3 \\times (5 - 2)"),
        t("?"),
      ],
      explanation: [
        t("According to BODMAS, brackets are evaluated first. So evaluate"),
        m("5 - 2 = 3"),
        t("before anything else. Then you have"),
        m("4 + 3 \\times 3"),
        t(", where multiplication comes next."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Evaluate 5 - 2")] },
        { id: "b", label: [t("Evaluate 4 + 3")] },
        { id: "c", label: [t("Evaluate 3 × 5")] },
        { id: "d", label: [t("Evaluate 4 × 5")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "1h-p6",
      type: "numeric",
      prompt: [t("Evaluate"), m("(2 + 3)^2 - 5"), t(".")],
      explanation: [
        t("Brackets first:"),
        m("(2 + 3) = 5"),
        t(". Then the power:"),
        m("5^2 = 25"),
        t(". Then subtract:"),
        m("25 - 5 = 20"),
        t("."),
      ],
      xp: 15,
      accepted: ["20"],
    },
    {
      id: "1h-p7",
      type: "shortText",
      prompt: [t("Explain why"), m("20 - 3 \\times 4"), t("does not equal 68.")],
      explanation: [
        t("A common error is working left to right: 20 - 3 = 17, then 17 × 4 = 68. This is wrong because BODMAS requires multiplication before subtraction. The correct evaluation is:"),
        m("3 \\times 4 = 12"),
        t(", then"),
        m("20 - 12 = 8"),
        t(". Multiplication has higher priority than subtraction."),
      ],
      xp: 15,
      accepted: ["multiplication before subtraction", "BODMAS", "order of operations", "multiply first"],
    },
    {
      id: "1h-p8",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about BODMAS.")],
      template: [
        t(
          "In BODMAS, the letter B stands for ___, which means we evaluate inside grouping symbols first.",
        ),
      ],
      explanation: [
        t("B stands for Brackets (or parentheses). Always evaluate expressions inside brackets before applying operations outside them."),
      ],
      xp: 10,
      accepted: ["brackets"],
    },
    {
      id: "1h-p9",
      type: "numeric",
      prompt: [
        t("Evaluate"),
        m("3a - 2b"),
        t("when"),
        m("a = 4"),
        t("and"),
        m("b = 3"),
        t("."),
      ],
      explanation: [
        t("Substitute both values, then multiply before subtracting:"),
        m("3 \\times 4 - 2 \\times 3 = 12 - 6 = 6"),
        t(". Both multiplications are performed before the subtraction."),
      ],
      xp: 15,
      accepted: ["6"],
    },
    {
      id: "1h-p10",
      type: "mcq",
      prompt: [t("Which expression has the greatest value?")],
      explanation: [
        m("2 + 3 \\times 4 = 2 + 12 = 14"),
        t(","),
        m("(2 + 3) \\times 4 = 5 \\times 4 = 20"),
        t(","),
        m("2 \\times 3 + 4 = 6 + 4 = 10"),
        t(","),
        m("2 \\times (3 + 4) = 2 \\times 7 = 14"),
        t(". So (2 + 3) × 4 = 20 is the greatest."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("2 + 3 \\times 4")] },
        { id: "b", label: [m("(2 + 3) \\times 4")] },
        { id: "c", label: [m("2 \\times 3 + 4")] },
        { id: "d", label: [m("2 \\times (3 + 4)")] },
      ],
      correctOptionId: "b",
    },
  ],
  mastery: [
    {
      id: "1h-m1",
      type: "numeric",
      prompt: [t("Evaluate"), m("(10 - 2 \\times 3) + 8 \\div 2"), t(".")],
      explanation: [
        t("Inside the brackets, multiplication first:"),
        m("2 \\times 3 = 6"),
        t(", so (10 - 6) = 4. Then division:"),
        m("8 \\div 2 = 4"),
        t(". Finally addition:"),
        m("4 + 4 = 8"),
        t("."),
      ],
      xp: 15,
      accepted: ["8"],
    },
    {
      id: "1h-m2",
      type: "mcq",
      prompt: [t("What is the value of"), m("(-3)^2 + 4 \\times (-2)"), t("?")],
      explanation: [
        t("Power first:"),
        m("(-3)^2 = 9"),
        t("(same signs → positive). Then multiplication:"),
        m("4 \\times (-2) = -8"),
        t("(different signs → negative). Then addition:"),
        m("9 + (-8) = 1"),
        t(". Common mistakes include: thinking (-3)² = -9 (forgetting that squaring a negative gives positive), or adding before multiplying."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("1")] },
        { id: "b", label: [m("-17")] },
        { id: "c", label: [m("-1")] },
        { id: "d", label: [m("17")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "1h-m3",
      type: "numeric",
      prompt: [
        t("Evaluate"),
        m("-2 \\times (5 - 3) + (-4)^2"),
        t("."),
      ],
      explanation: [
        t("Brackets first: 5 - 3 = 2. Then multiplication:"),
        m("-2 \\times 2 = -4"),
        t(". Then power:"),
        m("(-4)^2 = 16"),
        t(". Then addition:"),
        m("-4 + 16 = 12"),
        t("."),
      ],
      xp: 15,
      accepted: ["12"],
    },
    {
      id: "1h-m4",
      type: "mcq",
      prompt: [
        t("What is the value of"),
        m("3 + 4 \\times 2^2 - 6"),
        t("?"),
      ],
      explanation: [
        t("Power first:"),
        m("2^2 = 4"),
        t(". Then multiplication:"),
        m("4 \\times 4 = 16"),
        t(". Then addition and subtraction left to right:"),
        m("3 + 16 - 6 = 13"),
        t("."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("13")] },
        { id: "b", label: [m("22")] },
        { id: "c", label: [m("28")] },
        { id: "d", label: [m("5")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "1h-m5",
      type: "numeric",
      prompt: [
        t("Evaluate"),
        m("5x - 2y"),
        t("when"),
        m("x = -1"),
        t("and"),
        m("y = -3"),
        t("."),
      ],
      explanation: [
        t("Substitute the values:"),
        m("5 \\times (-1) - 2 \\times (-3)"),
        t(". Multiply first:"),
        m("-5 - (-6) = -5 + 6 = 1"),
        t(". Subtracting a negative (from 2 × -3) becomes addition."),
      ],
      xp: 20,
      accepted: ["1"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 4 – 3C Operations with negative fractions (EXTENSION)
// ---------------------------------------------------------------------------

const negativeFractions: Lesson = {
  id: "int-3c-negative-fractions",
  order: 4,
  title: "EXTENSION 3C Operations with negative fractions",
  sourceRef: "3C",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "3c-key",
      heading: "Key idea: sign rules apply to fractions",
      body: [
        t("The same sign rules for integers apply when working with fractions:"),
        t("Adding/subtracting: find a common denominator, then apply the integer sign rules to the numerators."),
        t("Multiplying: multiply numerators together, multiply denominators together, then apply the sign rule (same signs → positive, different signs → negative)."),
        t("Dividing: multiply by the reciprocal, then apply the sign rules."),
        t("Example: (-1/2) + 3/4 = -2/4 + 3/4 = 1/4."),
      ],
    },
    {
      id: "3c-worked",
      heading: "Worked examples",
      body: [
        t("Example 1: Calculate (-3/4) × 2/3."),
        m("\\frac{-3}{4} \\times \\frac{2}{3} = \\frac{-6}{12} = -\\frac{1}{2}"),
        t("(different signs → negative)."),
        t("Example 2: Calculate (-1/2) ÷ (-1/4)."),
        m("\\frac{-1}{2} \\div \\frac{-1}{4} = \\frac{-1}{2} \\times \\frac{-4}{1} = \\frac{4}{2} = 2"),
        t("(same signs → positive)."),
        t("Example 3: Calculate -2/3 - (-1/3)."),
        m("-\\frac{2}{3} - \\left(-\\frac{1}{3}\\right) = -\\frac{2}{3} + \\frac{1}{3} = -\\frac{1}{3}"),
        t("(subtracting a negative is adding)."),
      ],
    },
    {
      id: "3c-mistake",
      heading: "Common mistakes and tips",
      body: [
        t("Mistake 1: Forgetting to find a common denominator before adding or subtracting. -1/2 + 1/3 ≠ -2/5. The correct approach: -3/6 + 2/6 = -1/6."),
        t("Mistake 2: Misapplying the 'keep-change-flip' rule for division. When dividing by a negative fraction, the sign moves with the fraction: a ÷ (-b/c) = a × (-c/b)."),
        t("Tip: Write the negative sign on the numerator when multiplying or dividing fractions. This makes it easier to see which sign rules apply."),
      ],
    },
  ],
  practice: [
    {
      id: "3c-p1",
      type: "numeric",
      prompt: [t("Calculate"), m("-\\frac{1}{2} + \\frac{3}{4}"), t(".")],
      explanation: [
        t("Rewrite with a common denominator of 4:"),
        m("-\\frac{2}{4} + \\frac{3}{4} = \\frac{1}{4}"),
        t(". The sum of -2 and 3 is 1 (different signs, positive result since the positive has greater magnitude)."),
      ],
      xp: 10,
      accepted: ["1/4", "0.25"],
    },
    {
      id: "3c-p2",
      type: "numeric",
      prompt: [t("Calculate"), m("-\\frac{2}{3} - \\left(-\\frac{1}{3}\\right)"), t(".")],
      explanation: [
        t("Subtracting a negative is adding:"),
        m("-\\frac{2}{3} + \\frac{1}{3} = -\\frac{1}{3}"),
        t(". The numerators -2 + 1 = -1, over the common denominator 3."),
      ],
      xp: 10,
      accepted: ["-1/3"],
    },
    {
      id: "3c-p3",
      type: "numeric",
      prompt: [t("Calculate"), m("\\left(-\\frac{3}{4}\\right) \\times \\frac{2}{3}"), t(".")],
      explanation: [
        t("Multiply numerators and denominators:"),
        m("\\frac{-3 \\times 2}{4 \\times 3} = \\frac{-6}{12}"),
        t(". Simplify by dividing numerator and denominator by 6:"),
        m("-\\frac{1}{2}"),
        t(". Different signs → negative result."),
      ],
      xp: 10,
      accepted: ["-1/2", "-0.5"],
    },
    {
      id: "3c-p4",
      type: "mcq",
      prompt: [t("Which is equal to"), m("-\\frac{3}{4} + \\frac{1}{2}"), t("?")],
      explanation: [
        t("Rewrite 1/2 as 2/4:"),
        m("-\\frac{3}{4} + \\frac{2}{4} = -\\frac{1}{4}"),
        t(". The numerator -3 + 2 = -1."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("-\\frac{1}{4}")] },
        { id: "b", label: [m("\\frac{1}{4}")] },
        { id: "c", label: [m("-\\frac{2}{4}")] },
        { id: "d", label: [m("-\\frac{5}{4}")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "3c-p5",
      type: "numeric",
      prompt: [t("Calculate"), m("-\\frac{2}{5} \\times \\left(-\\frac{3}{4}\\right)"), t(".")],
      explanation: [
        t("Multiply numerators and denominators:"),
        m("\\frac{-2 \\times -3}{5 \\times 4} = \\frac{6}{20}"),
        t(". Simplify by dividing by 2:"),
        m("\\frac{3}{10}"),
        t(". Same signs (both negative) → positive result."),
      ],
      xp: 15,
      accepted: ["3/10", "0.3"],
    },
    {
      id: "3c-p6",
      type: "numeric",
      prompt: [t("Calculate"), m("\\left(-\\frac{1}{2}\\right) \\div \\left(-\\frac{1}{4}\\right)"), t(".")],
      explanation: [
        t("Multiply by the reciprocal:"),
        m("\\frac{-1}{2} \\times \\frac{-4}{1} = \\frac{4}{2} = 2"),
        t(". Same signs (both negative) → positive."),
      ],
      xp: 15,
      accepted: ["2"],
    },
    {
      id: "3c-p7",
      type: "fillInTheBlank",
      prompt: [t("Complete the simplification.")],
      template: [
        m("\\left(-\\frac{3}{4}\\right) \\div \\frac{2}{3}"),
        t("="),
        m("-\\frac{3}{4} \\times \\frac{3}{2} = -\\frac{9}{8} ="),
        t("___"),
      ],
      explanation: [
        t("Different signs (negative ÷ positive) → negative. Multiply by the reciprocal:"),
        m("-3/4 × 3/2 = -9/8"),
        t(", which is also"),
        m("-1\\frac{1}{8}"),
        t("or -1.125."),
      ],
      xp: 10,
      accepted: ["-9/8", "-1.125", "-1 1/8"],
    },
    {
      id: "3c-p8",
      type: "mcq",
      prompt: [t("Which of these equals"), m("\\left(-\\frac{1}{2}\\right) \\times \\left(-\\frac{1}{2}\\right)"), t("?")],
      explanation: [
        t("Both fractions are negative, so same signs → positive:"),
        m("\\frac{1 \\times 1}{2 \\times 2} = \\frac{1}{4}"),
        t("."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("-\\frac{1}{4}")] },
        { id: "b", label: [m("\\frac{1}{4}")] },
        { id: "c", label: [m("-1")] },
        { id: "d", label: [m("-\\frac{1}{2}")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "3c-p9",
      type: "numeric",
      prompt: [t("Calculate"), m("\\left(-\\frac{2}{3}\\right)^2 - \\left(-\\frac{1}{2}\\right)"), t(".")],
      explanation: [
        t("First, evaluate the power:"),
        m("\\left(-\\frac{2}{3}\\right)^2 = \\frac{4}{9}"),
        t("(two negatives → positive). Then subtracting a negative becomes adding:"),
        m("\\frac{4}{9} + \\frac{1}{2} = \\frac{8}{18} + \\frac{9}{18} = \\frac{17}{18}"),
        t("."),
      ],
      xp: 20,
      accepted: ["17/18"],
    },
    {
      id: "3c-p10",
      type: "matching",
      prompt: [t("Match each expression to its simplified result.")],
      explanation: [
        t("(-1/2) + (-1/2) = -1 (adding two negatives)."),
        t("(-1/2) - (-1/2) = 0 (subtracting a negative → adding the same amount)."),
        t("(-1/2) × (-1/2) = 1/4 (two negatives → positive, 1/2 × 1/2 = 1/4)."),
        t("(-1/2) ÷ (-1/2) = 1 (any non-zero number divided by itself equals 1)."),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [m("(-\\frac{1}{2}) + (-\\frac{1}{2})")],
          right: [m("-1")],
        },
        {
          id: "b",
          left: [m("(-\\frac{1}{2}) - (-\\frac{1}{2})")],
          right: [m("0")],
        },
        {
          id: "c",
          left: [m("(-\\frac{1}{2}) \\times (-\\frac{1}{2})")],
          right: [m("\\frac{1}{4}")],
        },
        {
          id: "d",
          left: [m("(-\\frac{1}{2}) \\div (-\\frac{1}{2})")],
          right: [m("1")],
        },
      ],
    },
  ],
  mastery: [
    {
      id: "3c-m1",
      type: "mcq",
      prompt: [t("What is"), m("-\\frac{5}{6} + \\frac{1}{3}"), t("simplified?")],
      explanation: [
        t("Rewrite 1/3 as 2/6:"),
        m("-\\frac{5}{6} + \\frac{2}{6} = -\\frac{3}{6} = -\\frac{1}{2}"),
        t(". Common errors: forgetting to find a common denominator (getting -4/3), or adding numerators without adjusting signs (-5/6 + 1/3 ≠ -4/9)."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("-\\frac{1}{2}")] },
        { id: "b", label: [m("-\\frac{4}{3}")] },
        { id: "c", label: [m("-\\frac{2}{3}")] },
        { id: "d", label: [m("-\\frac{4}{9}")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "3c-m2",
      type: "numeric",
      prompt: [t("Calculate"), m("\\left(-\\frac{3}{5}\\right) \\times \\frac{5}{9}"), t(".")],
      explanation: [
        t("Multiply numerators and denominators:"),
        m("\\frac{-3 \\times 5}{5 \\times 9} = \\frac{-15}{45}"),
        t(". The 5s cancel, leaving -3/9 = -1/3. Different signs → negative."),
      ],
      xp: 15,
      accepted: ["-1/3"],
    },
    {
      id: "3c-m3",
      type: "numeric",
      prompt: [t("Calculate"), m("\\left(-\\frac{1}{4}\\right) \\div \\left(-\\frac{2}{3}\\right)"), t(".")],
      explanation: [
        t("Multiply by the reciprocal:"),
        m("\\frac{-1}{4} \\times \\frac{-3}{2} = \\frac{3}{8}"),
        t(". Same signs (both negative) → positive."),
      ],
      xp: 15,
      accepted: ["3/8", "0.375"],
    },
    {
      id: "3c-m4",
      type: "mcq",
      prompt: [t("Which expression simplifies to -1?")],
      explanation: [
        t("(-1/2) + (-1/2) = -1 (adding two negatives). The others give: (-1/2) - (-1/2) = 0, (-1/2) × (-2) = 1, (-1) ÷ (-1/2) = 2."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("\\left(-\\frac{1}{2}\\right) + \\left(-\\frac{1}{2}\\right)")] },
        { id: "b", label: [m("\\left(-\\frac{1}{2}\\right) - \\left(-\\frac{1}{2}\\right)")] },
        { id: "c", label: [m("\\left(-\\frac{1}{2}\\right) \\times (-2)")] },
        { id: "d", label: [m("(-1) \\div \\left(-\\frac{1}{2}\\right)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "3c-m5",
      type: "numeric",
      prompt: [
        t("Calculate"),
        m("-\\frac{3}{4} \\times \\left(-\\frac{2}{3}\\right) - \\left(-\\frac{1}{2}\\right)"),
        t("."),
      ],
      explanation: [
        t("First, multiply:"),
        m("-\\frac{3}{4} \\times -\\frac{2}{3} = \\frac{6}{12} = \\frac{1}{2}"),
        t("(same signs → positive). Then subtract a negative, which is addition:"),
        m("\\frac{1}{2} + \\frac{1}{2} = 1"),
        t("."),
      ],
      xp: 20,
      accepted: ["1"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Boss challenge – Integer Operations
// ---------------------------------------------------------------------------

const integerOpsChallengeQuestions: Question[] = [
  {
    id: "int-boss-q1",
    type: "numeric",
    prompt: [t("Calculate"), m("(-6) \\times 3 + (-15) \\div (-5)"), t(".")],
    explanation: [
      t("Multiplication and division first, left to right:"),
      m("-6 \\times 3 = -18"),
      t(","),
      m("-15 \\div (-5) = 3"),
      t(". Then addition:"),
      m("-18 + 3 = -15"),
      t("."),
    ],
    xp: 20,
    accepted: ["-15"],
  },
  {
    id: "int-boss-q2",
    type: "numeric",
    prompt: [
      t("Evaluate"),
      m("3y^2 - 2y + 4"),
      t("when"),
      m("y = -3"),
      t("."),
    ],
    explanation: [
      t("Substitute y = -3:"),
      m(String.raw`3 \times (-3)^2 - 2 \times (-3) + 4`),
      t(". Power first:"),
      m("3 \\times 9 + 6 + 4"),
      t(". Multiply:"),
      m("27 + 6 + 4 = 37"),
      t("."),
    ],
    xp: 20,
    accepted: ["37"],
  },
  {
    id: "int-boss-q3",
    type: "numeric",
    prompt: [
      t("Calculate"),
      m("(-4)^2 - (-3)^3 + (-2) \\times 5"),
      t("."),
    ],
    explanation: [
      t("Powers first:"),
      m("-4^2 = 16"),
      t("(even exponent → positive),"),
      m("-3^3 = -27"),
      t("(odd exponent → negative). Then multiplication:"),
      m("-2 \\times 5 = -10"),
      t(". Then left to right:"),
      m("16 - (-27) + (-10) = 16 + 27 - 10 = 33"),
      t("."),
    ],
    xp: 25,
    accepted: ["33"],
  },
  {
    id: "int-boss-q4",
    type: "numeric",
    prompt: [
      t("Calculate"),
      m("-2 \\times [3 - (-4)] + (-6) \\div (-2)"),
      t("."),
    ],
    explanation: [
      t("Innermost brackets first: 3 - (-4) = 3 + 4 = 7. Then multiplication:"),
      m("-2 \\times 7 = -14"),
      t(". Then division:"),
      m("-6 \\div (-2) = 3"),
      t(". Then addition:"),
      m("-14 + 3 = -11"),
      t("."),
    ],
    xp: 25,
    accepted: ["-11"],
  },
  {
    id: "int-boss-q5",
    type: "mcq",
    prompt: [
      t("Which statement about operations with negative numbers is always true?"),
    ],
    explanation: [
      t("The sum of two negative integers is always negative. For example, -3 + (-5) = -8."),
      t("The other options are incorrect: the product of two negatives is positive (e.g. -2 × -3 = 6), subtracting a negative makes the number larger (e.g. 5 - (-3) = 8), and dividing a negative by a negative gives a positive (e.g. -6 ÷ (-2) = 3)."),
    ],
    xp: 20,
    options: [
      {
        id: "a",
        label: [t("The sum of two negative integers is always negative.")],
      },
      {
        id: "b",
        label: [t("The product of two negative integers is always negative.")],
      },
      {
        id: "c",
        label: [t("Subtracting a negative integer always makes the number smaller.")],
      },
      {
        id: "d",
        label: [t("Dividing a negative integer by a negative integer always gives a negative.")],
      },
    ],
    correctOptionId: "a",
  },
];

// ---------------------------------------------------------------------------
// Track
// ---------------------------------------------------------------------------

/** The Integer Operations track. */
export const integerOperationsTrack: Track = {
  id: "integer-operations",
  subjectId: "maths",
  title: "Integer Operations (Year 8)",
  description:
    "Adding, subtracting, multiplying and dividing with negative numbers, order of operations, and substitution.",
  lessons: [
    addingSubtractingNegatives,
    multiplyingDividingNegatives,
    orderOfOperations,
    negativeFractions,
  ],
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
