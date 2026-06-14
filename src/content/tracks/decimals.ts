/**
 * Decimals track content (Year 8, chapter 3F).
 *
 * Covers terminating and recurring decimals, rounding to decimal places and
 * significant figures, ordering decimals, and converting between fractions and
 * decimals — including the algebraic method for recurring decimals. Based on
 * the 2026 Year 8 Maths Class Notebook curriculum plan (Term 1, Week 9).
 *
 * @author John Grimes
 * @module content/tracks/decimals
 */

import { m, t } from "../blocks";

import type { Lesson, Track, Question } from "../../domain/content/types";

// ---------------------------------------------------------------------------
// Lesson 1 – 3F Terminating decimals, recurring decimals and rounding
// ---------------------------------------------------------------------------

const terminatingRecurringRounding: Lesson = {
  id: "dec-3f-terminating-recurring",
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
      id: "3f-decimal-types",
      heading: "Key idea: terminating and recurring decimals",
      body: [
        t(
          "A terminating decimal ends after a finite number of decimal places. For example, 0.25 and 0.875 are terminating decimals.",
        ),
        t(
          "A recurring (repeating) decimal has a pattern of digits that repeats forever. We use a bar (vinculum) or dots above the repeating digits to show this compactly.",
        ),
        m(String.raw`0.\bar{3} = 0.3333\ldots`),
        m(String.raw`0.\overline{27} = 0.272727\ldots`),
        m(String.raw`0.1\bar{6} = 0.16666\ldots`),
        t(
          "The bar is placed over the digit or block of digits that repeats. When converting a fraction to a decimal by division, you will eventually either hit a remainder of zero (terminating) or see a remainder repeat (recurring).",
        ),
      ],
    },
    {
      id: "3f-terminating-rule",
      heading: "Key idea: when does a fraction terminate?",
      body: [
        t(
          "A fraction (in simplest form) produces a terminating decimal if — and only if — the denominator has no prime factors other than 2 and/or 5.",
        ),
        t("Examples of terminating:"),
        m(String.raw`\frac{1}{4} = 0.25 \quad (4 = 2^2)`),
        m(String.raw`\frac{3}{8} = 0.375 \quad (8 = 2^3)`),
        m(String.raw`\frac{7}{20} = 0.35 \quad (20 = 2^2 \times 5)`),
        m(String.raw`\frac{3}{40} = 0.075 \quad (40 = 2^3 \times 5)`),
        t("Examples of recurring:"),
        m(String.raw`\frac{1}{3} = 0.\bar{3} \quad (3 \text{ is not 2 or 5})`),
        m(
          String.raw`\frac{2}{7} = 0.\overline{285714} \quad (7 \text{ is not 2 or 5})`,
        ),
        m(
          String.raw`\frac{1}{6} = 0.1\bar{6} \quad (6 = 2 \times 3,\text{ factor 3 causes recurrence})`,
        ),
        t(
          "Important: always simplify the fraction first before checking the denominator. For example, 3/6 simplifies to 1/2, and 1/2 terminates.",
        ),
      ],
    },
    {
      id: "3f-rounding-intro",
      heading: "Key idea: rounding to decimal places",
      body: [
        t("To round a number to a given number of decimal places (d.p.):"),
        t("1. Identify the digit in the decimal place you are rounding to."),
        t("2. Look at the digit immediately to its right (one place further)."),
        t(
          "3. If that next digit is 5 or more (5, 6, 7, 8, 9), round the identified digit up by 1. If it is 4 or less (0, 1, 2, 3, 4), leave the identified digit unchanged.",
        ),
        t("4. Remove all digits beyond the rounding place."),
        t("Example: Round 3.146 to 2 d.p."),
        t(
          "The digit in the 2nd decimal place is 4. The next digit is 6 (≥ 5), so we round the 4 up to 5. Result: 3.15.",
        ),
        t("Example: Round 12.0549 to 2 d.p."),
        t(
          "The digit in the 2nd decimal place is 5. The next digit is 4 (< 5), so the 5 stays. Result: 12.05.",
        ),
        t(
          "Special case — rounding 9 up: when the digit to round up is 9, it becomes 10, carrying 1 to the next column. For example, 2.398 rounded to 2 d.p. → 2.40.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "3f-p1",
      type: "numeric",
      prompt: [t("Write"), m(String.raw`\frac{3}{4}`), t("as a decimal.")],
      explanation: [
        t("Divide the numerator by the denominator:"),
        m(String.raw`3 \div 4 = 0.75`),
        t(
          ". The division terminates because 4 = 2² has only the prime factor 2. The result is a terminating decimal with two decimal places.",
        ),
      ],
      xp: 10,
      accepted: ["0.75", ".75"],
    },
    {
      id: "3f-p2",
      type: "numeric",
      prompt: [t("Write"), m(String.raw`\frac{7}{8}`), t("as a decimal.")],
      explanation: [
        t("Divide 7 by 8:"),
        m(String.raw`7 \div 8 = 0.875`),
        t(
          ". The denominator 8 = 2³ contains only the prime factor 2, so the decimal terminates. The result is 0.875 (eight hundred and seventy-five thousandths).",
        ),
      ],
      xp: 10,
      accepted: ["0.875", ".875"],
    },
    {
      id: "3f-p3",
      type: "mcq",
      prompt: [t("Which of these fractions gives a recurring decimal?")],
      explanation: [
        m(String.raw`\frac{3}{4}`),
        t("→ 0.75 (terminating — denominator 4 = 2²)."),
        m(String.raw`\frac{1}{5}`),
        t("→ 0.2 (terminating — denominator 5)."),
        m(String.raw`\frac{2}{3}`),
        t("→ 0.666... (recurring — denominator 3 is not 2 or 5)."),
        m(String.raw`\frac{7}{10}`),
        t("→ 0.7 (terminating — denominator 10 = 2 × 5)."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m(String.raw`\frac{3}{4}`)] },
        { id: "b", label: [m(String.raw`\frac{1}{5}`)] },
        { id: "c", label: [m(String.raw`\frac{2}{3}`)] },
        { id: "d", label: [m(String.raw`\frac{7}{10}`)] },
      ],
      correctOptionId: "c",
    },
    {
      id: "3f-p4",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about decimal types.")],
      template: [
        t(
          "A decimal that ends after a finite number of digits is called a ___ decimal.",
        ),
      ],
      explanation: [
        t(
          "A terminating decimal has a finite number of digits after the decimal point. Examples include 0.5, 0.75, and 0.125. They come from fractions whose simplified denominators only have prime factors of 2 and/or 5.",
        ),
      ],
      xp: 10,
      accepted: ["terminating"],
    },
    {
      id: "3f-p5",
      type: "numeric",
      prompt: [t("Round 7.836 to 2 decimal places.")],
      explanation: [
        t(
          "Identify the 2nd decimal place digit: 3. Look at the next digit (the 3rd decimal place): 6. Since 6 ≥ 5, round the 3 up to 4. Drop all remaining digits. Result: 7.84.",
        ),
      ],
      xp: 10,
      accepted: ["7.84"],
    },
    {
      id: "3f-p6",
      type: "numeric",
      prompt: [t("Round 0.0549 to 2 decimal places.")],
      explanation: [
        t(
          "The 2nd decimal place digit is 5. The next digit (the 3rd decimal place) is 4, which is less than 5, so the 5 stays unchanged. Drop the remaining digits. Result: 0.05.",
        ),
      ],
      xp: 10,
      accepted: ["0.05", ".05"],
    },
    {
      id: "3f-p7",
      type: "matching",
      prompt: [
        t(
          "Match each fraction to its decimal type. (All fractions are already in simplest form.)",
        ),
      ],
      explanation: [
        t("1/4 → terminating (4 = 2², only factor 2)."),
        t("1/3 → recurring (3 is not 2 or 5)."),
        t("3/5 → terminating (5 is a factor, and only 2 and 5 are allowed)."),
        t("2/7 → recurring (7 is not 2 or 5)."),
        t("5/8 → terminating (8 = 2³)."),
        t(
          "The rule: a simplified fraction terminates exactly when its denominator contains only the prime factors 2 and/or 5.",
        ),
      ],
      xp: 15,
      pairs: [
        {
          id: "a",
          left: [m(String.raw`\frac{1}{4}`)],
          right: [t("Terminating")],
        },
        {
          id: "b",
          left: [m(String.raw`\frac{1}{3}`)],
          right: [t("Recurring")],
        },
        {
          id: "c",
          left: [m(String.raw`\frac{3}{5}`)],
          right: [t("Terminating")],
        },
        {
          id: "d",
          left: [m(String.raw`\frac{2}{7}`)],
          right: [t("Recurring")],
        },
        {
          id: "e",
          left: [m(String.raw`\frac{5}{8}`)],
          right: [t("Terminating")],
        },
      ],
    },
    {
      id: "3f-p8",
      type: "mcq",
      prompt: [
        t("Which statement about"),
        m(String.raw`\frac{7}{12}`),
        t("is correct?"),
      ],
      explanation: [
        t(
          "First, check: 7/12 is already in simplest form. The denominator 12 = 2² × 3 includes the prime factor 3, which is not 2 or 5. Therefore 7/12 produces a recurring decimal.",
        ),
        m(String.raw`7 \div 12 = 0.58333\ldots = 0.58\bar{3}`),
        t(
          ". The denominator's prime factors are 2 and 3 — the 3 causes the recurrence.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [t("It is a terminating decimal because 12 = 2² × 3.")],
        },
        {
          id: "b",
          label: [
            t("It is a recurring decimal because 12 has the prime factor 3."),
          ],
        },
        {
          id: "c",
          label: [t("It is a terminating decimal because 7 < 12.")],
        },
        {
          id: "d",
          label: [t("It is recurring because the numerator 7 is prime.")],
        },
      ],
      correctOptionId: "b",
    },
    {
      id: "3f-p9",
      type: "numeric",
      prompt: [
        t("Write"),
        m(String.raw`\frac{1}{6}`),
        t("as a decimal, rounded to 3 decimal places."),
      ],
      explanation: [
        t("First, divide 1 by 6:"),
        m(String.raw`1 \div 6 = 0.16666\ldots`),
        t(
          ". Now round to 3 d.p.: the 3rd decimal digit is 6, and the 4th decimal digit is also 6. Since the 4th digit is ≥ 5, we round the 6 up to 7:",
        ),
        m("0.167"),
        t(". Note that the exact decimal is"),
        m(String.raw`0.1\bar{6}`),
        t("— only the 6 repeats forever."),
      ],
      xp: 20,
      accepted: ["0.167", ".167"],
    },
    {
      id: "3f-p10",
      type: "shortText",
      prompt: [
        t("Explain why"),
        m(String.raw`\frac{1}{4}`),
        t("gives a terminating decimal (0.25) but"),
        m(String.raw`\frac{1}{7}`),
        t("gives a recurring decimal (0.142857...)."),
      ],
      explanation: [
        t("Both fractions are in simplest form."),
        m(String.raw`\frac{1}{4}`),
        t(
          "has denominator 4 = 2². Since 4's only prime factor is 2, the decimal terminates.",
        ),
        m(String.raw`\frac{1}{7}`),
        t(
          "has denominator 7, which is a prime number that is neither 2 nor 5. Any denominator containing a prime factor other than 2 or 5 will cause the decimal to recur. In this case, the six-digit block 142857 repeats forever.",
        ),
      ],
      xp: 20,
      accepted: [
        "denominator 4 has prime factor 2",
        "denominator 7 is not 2 or 5",
        "prime factors are 2 and 5",
        "4 has only factor 2",
        "7 is not a factor of 2 or 5",
        "the denominator's prime factors",
        "4 = 2^2",
        "7 is prime",
      ],
    },
  ],
  mastery: [
    {
      id: "3f-m1",
      type: "numeric",
      prompt: [t("Write"), m(String.raw`\frac{5}{8}`), t("as a decimal.")],
      explanation: [
        t("Divide 5 by 8:"),
        m(String.raw`5 \div 8 = 0.625`),
        t(
          ". Since 8 = 2³ has only the prime factor 2, the decimal terminates cleanly after three decimal places.",
        ),
      ],
      xp: 15,
      accepted: ["0.625", ".625"],
    },
    {
      id: "3f-m2",
      type: "mcq",
      prompt: [t("Which fraction gives a terminating decimal?")],
      explanation: [
        m(String.raw`\frac{1}{3}`),
        t("→ recurring (denominator 3 is not 2 or 5)."),
        m(String.raw`\frac{1}{6}`),
        t("→ recurring (6 = 2 × 3, factor 3 causes recurrence)."),
        m(String.raw`\frac{3}{8}`),
        t("→ terminating (8 = 2³, only factor 2)."),
        m(String.raw`\frac{2}{9}`),
        t("→ recurring (9 = 3², factor 3 causes recurrence)."),
        t(
          "The key is to check the prime factors of the simplified denominator: only 2 and 5 produce terminating decimals.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m(String.raw`\frac{1}{3}`)] },
        { id: "b", label: [m(String.raw`\frac{1}{6}`)] },
        { id: "c", label: [m(String.raw`\frac{3}{8}`)] },
        { id: "d", label: [m(String.raw`\frac{2}{9}`)] },
      ],
      correctOptionId: "c",
    },
    {
      id: "3f-m3",
      type: "numeric",
      prompt: [t("Round 19.9876 to 2 decimal places.")],
      explanation: [
        t(
          "The 2nd decimal place digit is 8. The 3rd decimal place digit is 7. Since 7 ≥ 5, we round the 8 up to 9. The result is 19.99. Note: even though 19.99 is less than the original 19.9876, this is the correct rounding because the 3rd digit 7 tells us that 19.9876 is closer to 19.99 than to 19.98.",
        ),
      ],
      xp: 15,
      accepted: ["19.99"],
    },
    {
      id: "3f-m4",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about when decimals terminate.")],
      template: [
        t(
          "A fraction in simplest form produces a terminating decimal if the denominator's only prime factors are ___ and ___.",
        ),
      ],
      explanation: [
        t(
          "The two primes are 2 and 5. These are the prime factors of 10, the base of our number system. When dividing by a number whose prime factors are only 2 and 5, the division process will eventually reach a remainder of zero. Any other prime factor (3, 7, 11, 13, etc.) creates a recurring pattern.",
        ),
      ],
      xp: 15,
      accepted: ["2 and 5", "2, 5", "2&5", "2 5", "2,5", "2 and 5 only"],
    },
    {
      id: "3f-m5",
      type: "numeric",
      prompt: [
        t("Write"),
        m(String.raw`\frac{3}{11}`),
        t("as a decimal, rounded to 3 decimal places."),
      ],
      explanation: [
        t("First, divide 3 by 11:"),
        m(String.raw`3 \div 11 = 0.272727\ldots`),
        t(
          ". The block 27 repeats forever. Now round to 3 d.p.: the 3rd decimal digit is 2, and the 4th decimal digit is 7. Since 7 ≥ 5, round the 2 up to 3. Result:",
        ),
        m("0.273"),
        t(". Note that the exact recurring form is"),
        m(String.raw`0.\overline{27}`),
        t("."),
      ],
      xp: 20,
      accepted: ["0.273", ".273"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 2 – Rounding decimals (extension)
// ---------------------------------------------------------------------------

const roundingDecimals: Lesson = {
  id: "dec-rounding",
  order: 2,
  title: "Rounding decimals",
  sourceRef: "3F Extension",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "round-dp",
      heading: "Key idea: rounding to decimal places",
      body: [
        t(
          "Rounding to a given number of decimal places (d.p.) follows a consistent method:",
        ),
        t("1. Count from the decimal point to find the rounding position."),
        t(
          "2. Look at the digit one place to the right of the rounding position — this is the 'decider' digit.",
        ),
        t("3. If the decider is 5 or more, round the target digit up by 1."),
        t("4. If the decider is 4 or less, leave the target digit unchanged."),
        t("5. Remove all digits beyond the rounding position."),
        t("Worked examples:"),
        t(
          "• 5.783 to 1 d.p. → look at hundredths (8). 8 ≥ 5 → round tenths 7 → 8. Result: 5.8.",
        ),
        t(
          "• 2.3456 to 3 d.p. → look at ten-thousandths (6). 6 ≥ 5 → round thousandths 5 → 6. Result: 2.346.",
        ),
        t(
          "• 7.845 to 2 d.p. → look at thousandths (5). 5 ≥ 5 → round hundredths 4 → 5. Result: 7.85.",
        ),
        t(
          "Carry rule: if rounding 9 up, it becomes 10, carrying 1 into the next column. Example: 3.298 to 2 d.p. → the 8 tells us to round 9 up, which resolves to 3.30.",
        ),
      ],
    },
    {
      id: "round-sf",
      heading: "Key idea: significant figures",
      body: [
        t(
          "Significant figures (s.f.) are the meaningful digits in a number. The first significant figure is the first non-zero digit when reading left to right.",
        ),
        t("Rules for identifying significant figures:"),
        t(
          "• Leading zeros (zeros before the first non-zero digit) are NOT significant. Example: 0.00456 has 3 s.f. (4, 5, 6).",
        ),
        t(
          "• Zeros between non-zero digits ARE significant. Example: 3.05 has 3 s.f. (3, 0, 5).",
        ),
        t(
          "• Trailing zeros after a decimal point ARE significant. Example: 2.40 has 3 s.f. (2, 4, 0).",
        ),
        t("To round to n significant figures:"),
        t("1. Identify the nth significant digit."),
        t("2. Look at the next significant digit (the decider)."),
        t("3. Apply the usual rounding rule (5 or above rounds up)."),
        t(
          "4. Replace all digits after the nth significant figure with zeros or remove them, depending on position.",
        ),
        t("Example: 0.00785 to 2 s.f."),
        t(
          "The 1st s.f. is 7, the 2nd is 8. The decider is 5 (the 3rd s.f.). 5 ≥ 5, so round 8 up to 9. Result: 0.0079.",
        ),
        t("Example: 0.009643 to 2 s.f."),
        t(
          "The 1st s.f. is 9, the 2nd is 6. The decider is 4 (the 3rd s.f.). 4 < 5, so keep 6. Result: 0.0096.",
        ),
      ],
    },
    {
      id: "round-ordering",
      heading: "Key idea: ordering decimals",
      body: [
        t(
          "To order a set of decimals from smallest to largest (or vice versa):",
        ),
        t(
          "1. Align the decimal points of all numbers (write them in a column).",
        ),
        t(
          "2. Pad each number with trailing zeros so they all have the same number of decimal places.",
        ),
        t(
          "3. Compare the numbers from left to right, digit by digit, just as you would with whole numbers.",
        ),
        t(
          "4. Remember: 0.6 is larger than 0.45 because 0.60 > 0.45 — the more decimal places, the finer the value, but you must compare at matching positions.",
        ),
        t("Example: Order 0.6, 0.45, 0.601, 0.099 from smallest to largest."),
        t("Align and pad: 0.600, 0.450, 0.601, 0.099."),
        t("Compare: 0.099 < 0.450 < 0.600 < 0.601."),
        t("Sorted: 0.099, 0.45, 0.6, 0.601."),
        t(
          "A common mistake is thinking 0.45 is larger than 0.6 because 45 > 6. Always align by the decimal point to compare correctly.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "round-p1",
      type: "numeric",
      prompt: [t("Round 5.783 to 1 decimal place.")],
      explanation: [
        t(
          "The 1st decimal place (tenths) digit is 7. The next digit (hundredths) is 8, which is ≥ 5, so round the 7 up to 8. Result: 5.8.",
        ),
      ],
      xp: 10,
      accepted: ["5.8"],
    },
    {
      id: "round-p2",
      type: "numeric",
      prompt: [t("Round 2.3456 to 3 decimal places.")],
      explanation: [
        t(
          "The 3rd decimal place (thousandths) digit is 5. The next digit (ten-thousandths) is 6, which is ≥ 5, so round the 5 up to 6. Result: 2.346.",
        ),
      ],
      xp: 10,
      accepted: ["2.346"],
    },
    {
      id: "round-p3",
      type: "mcq",
      prompt: [t("What is 7.845 rounded to 2 decimal places?")],
      explanation: [
        t(
          "The 2nd d.p. digit is 4. The 3rd d.p. digit is 5. Since 5 ≥ 5, round the 4 up to 5. Result: 7.85.",
        ),
        t(
          "Distractors: 7.84 ignores the rounding rule; 7.8 rounds to 1 d.p. only; 7.9 incorrectly rounds the whole-number part.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("7.84")] },
        { id: "b", label: [m("7.85")] },
        { id: "c", label: [m("7.8")] },
        { id: "d", label: [m("7.9")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "round-p4",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about rounding.")],
      template: [
        t(
          "When rounding 4.356 to 2 decimal places, we look at the ___ decimal digit to decide whether to round up.",
        ),
      ],
      explanation: [
        t(
          "When rounding to 2 decimal places, you look at the 3rd decimal digit (the one immediately after the rounding position). In 4.356, the 2nd d.p. is 5, the 3rd d.p. is 6. Since 6 ≥ 5, round up: 4.36.",
        ),
      ],
      xp: 10,
      accepted: ["third", "3rd", "3"],
    },
    {
      id: "round-p5",
      type: "numeric",
      prompt: [t("Round 0.0895 to 2 decimal places.")],
      explanation: [
        t(
          "The 2nd decimal place digit is 8. The 3rd decimal place digit is 9, which is ≥ 5. Round the 8 up to 9. Result: 0.09. Note how trailing zeros after rounding should be written (0.09, not 0.9) to show the precision level.",
        ),
      ],
      xp: 10,
      accepted: ["0.09", ".09"],
    },
    {
      id: "round-p6",
      type: "matching",
      prompt: [
        t(
          "Match each number to its correctly rounded value (2 decimal places).",
        ),
      ],
      explanation: [
        t("3.146: 3rd digit is 6 ≥ 5 → round 4 up to 5 → 3.15."),
        t("2.334: 3rd digit is 4 < 5 → keep 3 → 2.33."),
        t(
          "5.998: 3rd digit is 8 ≥ 5 → round 9 up (carrying into the whole-number part) → 6.00.",
        ),
        t("0.054: 3rd digit is 4 < 5 → keep 5 → 0.05."),
        t(
          "Each number is rounded correctly by checking the digit one place beyond the required precision.",
        ),
      ],
      xp: 15,
      pairs: [
        {
          id: "a",
          left: [m("3.146")],
          right: [m("3.15")],
        },
        {
          id: "b",
          left: [m("2.334")],
          right: [m("2.33")],
        },
        {
          id: "c",
          left: [m("5.998")],
          right: [m("6.00")],
        },
        {
          id: "d",
          left: [m("0.054")],
          right: [m("0.05")],
        },
      ],
    },
    {
      id: "round-p7",
      type: "shortText",
      prompt: [
        t(
          "Briefly explain why 3.146 rounded to 2 decimal places is 3.15 and not 3.14.",
        ),
      ],
      explanation: [
        t(
          "To round 3.146 to 2 d.p., we look at the 3rd decimal digit, which is 6. Because 6 is 5 or greater, we must round the 2nd decimal digit (4) up by 1, giving 5. The result is 3.15. If the 3rd digit had been 4 or less (e.g., 3.144), we would keep the 2nd digit unchanged and get 3.14.",
        ),
      ],
      xp: 15,
      accepted: [
        "third digit is 6",
        "6 is 5 or above",
        "6 rounds up",
        "look at third decimal place",
        "digit 6 is 5 or more",
        "6 >= 5",
      ],
    },
    {
      id: "round-p8",
      type: "mcq",
      prompt: [
        t(
          "Arrange these decimals from smallest to largest: 0.45, 0.099, 0.6, 0.599.",
        ),
      ],
      explanation: [
        t(
          "Align by the decimal point and pad with zeros: 0.450, 0.099, 0.600, 0.599. Comparing from left to right:",
        ),
        t("0.099 has 0 in the tenths place — it is the smallest."),
        t(
          "Next, 0.450 has 4 in tenths, compared to 0.599 and 0.600 which have 5 and 6 respectively.",
        ),
        t(
          "Then, 0.599 (< 0.600 because 5 < 6 in the tenths place, or because 599 < 600 in the hundredths/thousandths).",
        ),
        t("The correct order is: 0.099, 0.45, 0.599, 0.6."),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [t("0.099, 0.45, 0.599, 0.6")],
        },
        {
          id: "b",
          label: [t("0.099, 0.599, 0.45, 0.6")],
        },
        {
          id: "c",
          label: [t("0.45, 0.6, 0.099, 0.599")],
        },
        {
          id: "d",
          label: [t("0.6, 0.599, 0.45, 0.099")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "round-p9",
      type: "numeric",
      prompt: [t("Round 14.976 to 1 decimal place.")],
      explanation: [
        t(
          "The 1st decimal place digit is 9. The next digit (the 2nd d.p.) is 7, which is ≥ 5. Rounding 9 up gives 10, so the 9 becomes 0 and we carry 1 into the units column: 14 + 1 = 15. The result, to 1 d.p., is 15.0. Always write the trailing zero to show the level of precision.",
        ),
      ],
      xp: 20,
      accepted: ["15.0", "15"],
    },
    {
      id: "round-p10",
      type: "numeric",
      prompt: [t("Write 0.00785 to 2 significant figures.")],
      explanation: [
        t(
          "The first non-zero digit is 7 (1st s.f.). The 2nd s.f. is 8. The next digit (3rd s.f.) is 5. Since 5 ≥ 5, round the 8 up to 9. Leading zeros are not significant and stay in place. Result: 0.0079.",
        ),
      ],
      xp: 20,
      accepted: ["0.0079", ".0079"],
    },
  ],
  mastery: [
    {
      id: "round-m1",
      type: "numeric",
      prompt: [t("Round 12.995 to 2 decimal places.")],
      explanation: [
        t(
          "The 2nd decimal place digit is 9. The 3rd decimal digit is 5. Since 5 ≥ 5, round the 9 up. Rounding 9 up gives 10, so the 9 becomes 0 and we carry 1 to the first decimal place (9 + 1 = 10, carrying again to the units: 12 + 1 = 13). The result is 13.00. Writing the trailing zeros is important to show the precision.",
        ),
      ],
      xp: 15,
      accepted: ["13.00", "13"],
    },
    {
      id: "round-m2",
      type: "mcq",
      prompt: [t("What is 0.009643 rounded to 2 significant figures?")],
      explanation: [
        t(
          "Identify the significant figures: the leading zeros are not significant. The 1st s.f. is 9, the 2nd is 6. The 3rd s.f. (the decider) is 4. Since 4 < 5, we keep the 6 unchanged. Result: 0.0096.",
        ),
        t(
          "Distractors: 0.010 rounds to 1 s.f.; 0.0097 rounds incorrectly; 0.00964 keeps too many s.f.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("0.0096")] },
        { id: "b", label: [m("0.010")] },
        { id: "c", label: [m("0.0097")] },
        { id: "d", label: [m("0.00964")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "round-m3",
      type: "numeric",
      prompt: [t("Round 8.555 to 2 decimal places.")],
      explanation: [
        t(
          "The 2nd decimal place digit is 5. The 3rd decimal digit is also 5. Since 5 ≥ 5, round the 2nd digit (5) up to 6. Result: 8.56. Note that even though the original number has three 5s, we only look at the digit immediately after the rounding position.",
        ),
      ],
      xp: 15,
      accepted: ["8.56"],
    },
    {
      id: "round-m4",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about significant figures.")],
      template: [
        t("In the number 0.0305, the first significant figure is ___."),
      ],
      explanation: [
        t(
          "Leading zeros are never significant. The first non-zero digit in 0.0305 is 3, so 3 is the first significant figure. The zero between 3 and 5 is significant (it is a captive zero between non-zero digits), making 0.0305 have 3 significant figures: 3, 0, and 5.",
        ),
      ],
      xp: 15,
      accepted: ["3", "three"],
    },
    {
      id: "round-m5",
      type: "numeric",
      prompt: [t("Round 0.008459 to 2 significant figures.")],
      explanation: [
        t(
          "Strip the leading zeros — they are not significant. The 1st s.f. is 8, the 2nd s.f. is 4. The 3rd s.f. (the decider) is 5. Since 5 ≥ 5, round the 4 up to 5. Result: 0.0085. The leading zeros are preserved because they fix the magnitude of the number.",
        ),
      ],
      xp: 20,
      accepted: ["0.0085", ".0085"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 3 – Converting between fractions and decimals (extension)
// ---------------------------------------------------------------------------

const fractionConversion: Lesson = {
  id: "dec-fraction-conversion",
  order: 3,
  title: "Converting between fractions and decimals",
  sourceRef: "3F Extension",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "conv-frac-to-dec",
      heading: "Key idea: fraction to decimal by division",
      body: [
        t(
          "To convert any fraction to a decimal, divide the numerator by the denominator. The result will be either terminating or recurring.",
        ),
        t("Examples:"),
        m(
          String.raw`\frac{3}{8} = 3 \div 8 = 0.375 \quad (\text{terminating})`,
        ),
        m(
          String.raw`\frac{5}{6} = 5 \div 6 = 0.8333\ldots = 0.8\bar{3} \quad (\text{recurring})`,
        ),
        m(
          String.raw`\frac{7}{12} = 7 \div 12 = 0.58333\ldots = 0.58\bar{3} \quad (\text{recurring})`,
        ),
        t(
          "When dividing, if you encounter a remainder you have seen before, you have found the repeating block. Everything from that remainder onward will repeat.",
        ),
        t(
          "Tip: you can predict whether the result will be terminating or recurring by checking the denominator's prime factors after simplifying the fraction. If only 2 and/or 5, it terminates. Otherwise, it recurs.",
        ),
      ],
    },
    {
      id: "conv-dec-to-frac-term",
      heading: "Key idea: terminating decimal to fraction",
      body: [
        t(
          "A terminating decimal can be converted to a fraction by writing it as a fraction with a power of 10 as the denominator, then simplifying.",
        ),
        t("Method:"),
        t(
          "1. Count the number of decimal places (n). Write the decimal digits as the numerator. Write 10ⁿ as the denominator.",
        ),
        t(
          "2. Simplify the fraction by dividing numerator and denominator by their highest common factor.",
        ),
        t("Examples:"),
        m(String.raw`0.6 = \frac{6}{10} = \frac{3}{5}`),
        m(String.raw`0.75 = \frac{75}{100} = \frac{3}{4}`),
        m(String.raw`0.125 = \frac{125}{1000} = \frac{1}{8}`),
        m(String.raw`0.375 = \frac{375}{1000} = \frac{3}{8}`),
        t(
          "For decimals with a leading zero (e.g., 0.075), there are 3 decimal places: 75/1000 = 3/40.",
        ),
      ],
    },
    {
      id: "conv-recurring-to-frac",
      heading: "Key idea: recurring decimal to fraction (algebraic method)",
      body: [
        t(
          "To convert a recurring decimal to a fraction, use an algebraic trick of multiplying by a power of 10 and subtracting.",
        ),
        t("Method:"),
        t("1. Let x equal the recurring decimal."),
        t(
          "2. Multiply both sides by a power of 10 that shifts the decimal point so that the repeating block aligns. If one digit repeats, multiply by 10. If two digits repeat, multiply by 100.",
        ),
        t(
          "3. Subtract the original equation from the multiplied one. The repeating parts cancel out.",
        ),
        t("4. Solve for x to get the fraction, then simplify."),
        t("Example: Convert 0.333... (one digit repeats)."),
        m(String.raw`x = 0.333\ldots`),
        m(String.raw`10x = 3.333\ldots`),
        m(String.raw`10x - x = 3.333\ldots - 0.333\ldots`),
        m(String.raw`9x = 3`),
        m(String.raw`x = \frac{3}{9} = \frac{1}{3}`),
        t("Example: Convert 0.272727... (two digits repeat)."),
        m(String.raw`x = 0.272727\ldots`),
        m(String.raw`100x = 27.2727\ldots`),
        m(String.raw`100x - x = 27.2727\ldots - 0.2727\ldots`),
        m(String.raw`99x = 27`),
        m(String.raw`x = \frac{27}{99} = \frac{3}{11}`),
        t(
          "The key insight: multiplying by 10ⁿ (where n is the length of the repeating block) shifts the decimal so the repeating parts line up, and subtraction eliminates them.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "conv-p1",
      type: "numeric",
      prompt: [t("Write"), m(String.raw`\frac{3}{8}`), t("as a decimal.")],
      explanation: [
        t("Divide 3 by 8:"),
        m(String.raw`3 \div 8 = 0.375`),
        t(
          ". Since 8 = 2³, the decimal terminates after three places. This is a clean conversion with no repeating block.",
        ),
      ],
      xp: 10,
      accepted: ["0.375", ".375"],
    },
    {
      id: "conv-p2",
      type: "numeric",
      prompt: [
        t(
          "Convert 0.6 to a fraction in simplest form. Write your answer as a/b (e.g., 3/5).",
        ),
      ],
      explanation: [
        t("0.6 has one decimal place, so write it with denominator 10:"),
        m(String.raw`\frac{6}{10}`),
        t(
          ". Simplify by dividing both numerator and denominator by their highest common factor, 2:",
        ),
        m(String.raw`\frac{6}{10} = \frac{3}{5}`),
        t("."),
      ],
      xp: 10,
      accepted: ["3/5"],
    },
    {
      id: "conv-p3",
      type: "mcq",
      prompt: [t("What is"), m(String.raw`\frac{7}{20}`), t("as a decimal?")],
      explanation: [
        t("Divide 7 by 20:"),
        m(String.raw`7 \div 20 = 0.35`),
        t(
          ". Since 20 = 2² × 5, the decimal terminates. The other options could come from common mistakes: 0.7 would be 14/20, 0.28 would be 5.6/20, and 3.5 would be 70/20.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("0.35")] },
        { id: "b", label: [m("0.7")] },
        { id: "c", label: [m("0.28")] },
        { id: "d", label: [m("3.5")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "conv-p4",
      type: "fillInTheBlank",
      prompt: [
        t("Complete the sentence about fraction-to-decimal conversion."),
      ],
      template: [
        t(
          "To convert a fraction to a decimal, you ___ the numerator by the denominator.",
        ),
      ],
      explanation: [
        t(
          "Division is the operation that converts a fraction to a decimal. The fraction bar itself represents division: a/b means a ÷ b. For example, 3/4 = 3 ÷ 4 = 0.75.",
        ),
      ],
      xp: 10,
      accepted: ["divide"],
    },
    {
      id: "conv-p5",
      type: "numeric",
      prompt: [
        t(
          "Convert 0.125 to a fraction in simplest form. Write your answer as a/b.",
        ),
      ],
      explanation: [
        t("0.125 has three decimal places, so write it with denominator 1000:"),
        m(String.raw`\frac{125}{1000}`),
        t(
          ". Find the highest common factor of 125 and 1000, which is 125. Divide both by 125:",
        ),
        m(String.raw`\frac{125 \div 125}{1000 \div 125} = \frac{1}{8}`),
        t(". So 0.125 = 1/8."),
      ],
      xp: 10,
      accepted: ["1/8"],
    },
    {
      id: "conv-p6",
      type: "numeric",
      prompt: [
        t("Write"),
        m(String.raw`\frac{5}{6}`),
        t("as a decimal, rounded to 3 decimal places."),
      ],
      explanation: [
        t("Divide 5 by 6:"),
        m(String.raw`5 \div 6 = 0.83333\ldots`),
        t(". The exact value is"),
        m(String.raw`0.8\bar{3}`),
        t(
          ". To round to 3 d.p., look at the 4th decimal digit (3). Since 3 < 5, keep the 3rd digit unchanged. Result: 0.833.",
        ),
      ],
      xp: 15,
      accepted: ["0.833", ".833"],
    },
    {
      id: "conv-p7",
      type: "matching",
      prompt: [t("Match each fraction to its decimal equivalent.")],
      explanation: [
        t("1/2 = 0.5 (divide 1 by 2)."),
        t("1/4 = 0.25 (divide 1 by 4; denominator 4 = 2², so terminates)."),
        t("3/10 = 0.3 (divide 3 by 10; denominator 10 = 2 × 5)."),
        t("9/20 = 0.45 (divide 9 by 20; denominator 20 = 2² × 5)."),
        t(
          "All of these denominators contain only the prime factors 2 and/or 5, so all produce terminating decimals.",
        ),
      ],
      xp: 15,
      pairs: [
        {
          id: "a",
          left: [m(String.raw`\frac{1}{2}`)],
          right: [m("0.5")],
        },
        {
          id: "b",
          left: [m(String.raw`\frac{1}{4}`)],
          right: [m("0.25")],
        },
        {
          id: "c",
          left: [m(String.raw`\frac{3}{10}`)],
          right: [m("0.3")],
        },
        {
          id: "d",
          left: [m(String.raw`\frac{9}{20}`)],
          right: [m("0.45")],
        },
      ],
    },
    {
      id: "conv-p8",
      type: "shortText",
      prompt: [
        t(
          "Describe the algebraic method for converting a recurring decimal like 0.363636... to a fraction. What is the key step? Write 1-2 sentences.",
        ),
      ],
      explanation: [
        t(
          "The algebraic method works by setting x equal to the recurring decimal, then multiplying by a power of 10 (10 for a one-digit repeat, 100 for a two-digit repeat) so the recurring parts align. Subtracting the original equation from the multiplied one eliminates the repeating block, leaving a simple equation that can be solved for x as a fraction. The fraction can then be simplified.",
        ),
      ],
      xp: 15,
      accepted: [
        "multiply by a power of 10",
        "multiply by 10 or 100",
        "subtract to eliminate",
        "subtract the equations",
        "let x equal and subtract",
        "multiply and subtract",
        "algebraic method",
        "set up equation",
      ],
    },
    {
      id: "conv-p9",
      type: "mcq",
      prompt: [
        t("What is"),
        m(String.raw`0.\bar{4}`),
        t("(that is, 0.444...) as a simplified fraction?"),
      ],
      explanation: [
        t("Let"),
        m(String.raw`x = 0.444\ldots`),
        t(". Multiply by 10:"),
        m(String.raw`10x = 4.444\ldots`),
        t(". Subtract:"),
        m(String.raw`10x - x = 4.444\ldots - 0.444\ldots`),
        t("→"),
        m("9x = 4"),
        t(", so"),
        m(String.raw`x = \frac{4}{9}`),
        t(
          ". The fraction is already simplified because 4 and 9 share no common factors.",
        ),
        t(
          "Distractors: 4/10 = 0.4 (terminating), 44/100 = 0.44 (terminating), 1/4 = 0.25 (different value entirely).",
        ),
      ],
      xp: 20,
      options: [
        { id: "a", label: [m(String.raw`\frac{4}{9}`)] },
        { id: "b", label: [m(String.raw`\frac{4}{10}`)] },
        { id: "c", label: [m(String.raw`\frac{44}{100}`)] },
        { id: "d", label: [m(String.raw`\frac{1}{4}`)] },
      ],
      correctOptionId: "a",
    },
    {
      id: "conv-p10",
      type: "numeric",
      prompt: [
        t("Write"),
        m(String.raw`\frac{7}{12}`),
        t("as a decimal, rounded to 3 decimal places."),
      ],
      explanation: [
        t("Divide 7 by 12:"),
        m(String.raw`7 \div 12 = 0.58333\ldots`),
        t(
          ". To round to 3 d.p., look at the 4th decimal digit (3). Since 3 < 5, the 3rd digit (3) stays. Result: 0.583. The exact form is",
        ),
        m(String.raw`0.58\bar{3}`),
        t("— only the 3 repeats."),
      ],
      xp: 20,
      accepted: ["0.583", ".583"],
    },
  ],
  mastery: [
    {
      id: "conv-m1",
      type: "numeric",
      prompt: [t("Write"), m(String.raw`\frac{11}{20}`), t("as a decimal.")],
      explanation: [
        t("Divide 11 by 20:"),
        m(String.raw`11 \div 20 = 0.55`),
        t(
          ". Since 20 = 2² × 5, the decimal terminates exactly. The result is fifty-five hundredths, or 0.55.",
        ),
      ],
      xp: 15,
      accepted: ["0.55", ".55"],
    },
    {
      id: "conv-m2",
      type: "mcq",
      prompt: [
        t("What is"),
        m(String.raw`0.\overline{63}`),
        t("(that is, 0.636363...) as a simplified fraction?"),
      ],
      explanation: [
        t("Let"),
        m(String.raw`x = 0.636363\ldots`),
        t(". Two digits repeat, so multiply by 100:"),
        m(String.raw`100x = 63.6363\ldots`),
        t(". Subtract:"),
        m(String.raw`100x - x = 63.6363\ldots - 0.6363\ldots`),
        t("→"),
        m("99x = 63"),
        t(", so"),
        m(String.raw`x = \frac{63}{99}`),
        t(". Simplify by dividing numerator and denominator by 9:"),
        m(String.raw`\frac{63 \div 9}{99 \div 9} = \frac{7}{11}`),
        t("."),
        t(
          "The other options: 63/100 = 0.63 (terminating), 6/11 = 0.545454..., 21/33 = 0.636363... but is not simplified.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m(String.raw`\frac{7}{11}`)] },
        { id: "b", label: [m(String.raw`\frac{63}{100}`)] },
        { id: "c", label: [m(String.raw`\frac{6}{11}`)] },
        { id: "d", label: [m(String.raw`\frac{21}{33}`)] },
      ],
      correctOptionId: "a",
    },
    {
      id: "conv-m3",
      type: "numeric",
      prompt: [
        t(
          "Convert 0.875 to a fraction in simplest form. Write your answer as a/b.",
        ),
      ],
      explanation: [
        t("0.875 has three decimal places, so write it as"),
        m(String.raw`\frac{875}{1000}`),
        t(
          ". The highest common factor of 875 and 1000 is 125. Divide both by 125:",
        ),
        m(String.raw`\frac{875 \div 125}{1000 \div 125} = \frac{7}{8}`),
        t(". So 0.875 = 7/8. You can verify: 7 ÷ 8 = 0.875."),
      ],
      xp: 15,
      accepted: ["7/8"],
    },
    {
      id: "conv-m4",
      type: "numeric",
      prompt: [
        t("Does"),
        m(String.raw`\frac{11}{30}`),
        t(
          "produce a terminating decimal? Enter 1 for terminating or 0 for recurring.",
        ),
      ],
      explanation: [
        t(
          "First, note that 11/30 is already in simplest form (11 and 30 share no common factors). The denominator 30 = 2 × 3 × 5. Since the prime factor 3 appears (and 3 is not 2 or 5), the decimal will recur. Indeed:",
        ),
        m(String.raw`11 \div 30 = 0.36666\ldots = 0.3\bar{6}`),
        t(". So the answer is 0 (recurring)."),
      ],
      xp: 15,
      accepted: ["0", "recurring"],
    },
    {
      id: "conv-m5",
      type: "matching",
      prompt: [
        t("Match each recurring decimal to its simplified fraction form."),
      ],
      explanation: [
        t("0.333... → let x = 0.333..., 10x = 3.333..., 9x = 3, x = 1/3."),
        t(
          "0.666... → let x = 0.666..., 10x = 6.666..., 9x = 6, x = 6/9 = 2/3.",
        ),
        t(
          "0.1666... → let x = 0.1666..., 10x = 1.666..., 100x = 16.666..., 90x = 15, x = 15/90 = 1/6.",
        ),
        t(
          "0.8333... → let x = 0.8333..., 10x = 8.333..., 100x = 83.333..., 90x = 75, x = 75/90 = 5/6.",
        ),
        t(
          "For decimals where only some digits repeat (like 0.1666... and 0.8333...), multiply by 10 first to shift the non-repeating digit left of the decimal, then apply the algebraic method to the repeating part.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "a",
          left: [m(String.raw`0.\bar{3}`)],
          right: [m(String.raw`\frac{1}{3}`)],
        },
        {
          id: "b",
          left: [m(String.raw`0.\bar{6}`)],
          right: [m(String.raw`\frac{2}{3}`)],
        },
        {
          id: "c",
          left: [m(String.raw`0.1\bar{6}`)],
          right: [m(String.raw`\frac{1}{6}`)],
        },
        {
          id: "d",
          left: [m(String.raw`0.8\bar{3}`)],
          right: [m(String.raw`\frac{5}{6}`)],
        },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Boss challenge – Decimals
// ---------------------------------------------------------------------------

const decimalsBossQuestions: Question[] = [
  {
    id: "dec-boss-q1",
    type: "numeric",
    prompt: [
      t(
        "Convert 0.075 to a fraction in simplest form. Write your answer as a/b.",
      ),
    ],
    explanation: [
      t(
        "0.075 has three decimal places, so write it as a fraction with denominator 1000:",
      ),
      m(String.raw`\frac{75}{1000}`),
      t(". The highest common factor of 75 and 1000 is 25. Divide both by 25:"),
      m(String.raw`\frac{75 \div 25}{1000 \div 25} = \frac{3}{40}`),
      t(". So 0.075 = 3/40. You can verify: 3 ÷ 40 = 0.075."),
    ],
    xp: 20,
    accepted: ["3/40"],
  },
  {
    id: "dec-boss-q2",
    type: "shortText",
    prompt: [
      t("Does"),
      m(String.raw`\frac{7}{15}`),
      t(
        "produce a terminating or recurring decimal? Enter either 'terminating' or 'recurring'.",
      ),
    ],
    explanation: [
      t(
        "The fraction 7/15 is already in simplest form. The denominator 15 = 3 × 5. Since 3 is a prime factor other than 2 or 5, the decimal must recur. Indeed:",
      ),
      m(String.raw`7 \div 15 = 0.46666\ldots = 0.4\bar{6}`),
      t(". The answer is 'recurring'."),
    ],
    xp: 20,
    accepted: ["recurring"],
  },
  {
    id: "dec-boss-q3",
    type: "numeric",
    prompt: [
      t("Convert"),
      m(String.raw`0.\overline{27}`),
      t("to a simplified fraction. Write your answer as a/b."),
    ],
    explanation: [
      t("Let"),
      m(String.raw`x = 0.272727\ldots`),
      t(". Two digits repeat, so multiply by 100:"),
      m(String.raw`100x = 27.2727\ldots`),
      t(". Subtract the original equation:"),
      m(String.raw`100x - x = 27.2727\ldots - 0.2727\ldots`),
      t("→"),
      m("99x = 27"),
      t(", so"),
      m(String.raw`x = \frac{27}{99}`),
      t(". Simplify by dividing numerator and denominator by 9:"),
      m(String.raw`\frac{27 \div 9}{99 \div 9} = \frac{3}{11}`),
      t(
        ". The fraction 3/11 is in simplest form. You can verify: 3 ÷ 11 = 0.272727...",
      ),
    ],
    xp: 25,
    accepted: ["3/11"],
  },
  {
    id: "dec-boss-q4",
    type: "numeric",
    prompt: [t("Round 0.00456789 to 3 significant figures.")],
    explanation: [
      t(
        "Leading zeros are not significant. The first non-zero digit is 4 (1st s.f.), then 5 (2nd s.f.), then 6 (3rd s.f.). The 4th s.f. is 7. Since 7 ≥ 5, round the 6 up to 7. Result: 0.00457.",
      ),
      t(
        "It is important to distinguish between rounding to significant figures and rounding to decimal places. To 3 d.p., this number would round to 0.005. To 3 s.f., it rounds to 0.00457 — a very different value, because significant figures preserve the precision of the measurement rather than the number of decimal digits.",
      ),
    ],
    xp: 25,
    accepted: ["0.00457", ".00457"],
  },
  {
    id: "dec-boss-q5",
    type: "mcq",
    prompt: [
      t(
        "Which of these statements about decimals and fractions is always true?",
      ),
    ],
    explanation: [
      t(
        "Option (a) is correct: 20 = 2² × 5, so its only prime factors are 2 and 5. Any fraction in simplest form with denominator 20 must produce a terminating decimal. For example, 1/20 = 0.05, 3/20 = 0.15, 7/20 = 0.35, 11/20 = 0.55, 13/20 = 0.65, 17/20 = 0.85, 19/20 = 0.95.",
      ),
      t(
        "Option (b) is false: 6 = 2 × 3 includes the prime factor 3, so some fractions with denominator 6 recur (e.g., 1/6 = 0.1666...).",
      ),
      t(
        "Option (c) is false: 0.999... is exactly equal to 1. This can be proven algebraically: let x = 0.999..., 10x = 9.999..., 9x = 9, x = 1.",
      ),
      t(
        "Option (d) is false: 0.1666... is recurring (only the 6 repeats), though it is often written as 0.16̅.",
      ),
    ],
    xp: 20,
    options: [
      {
        id: "a",
        label: [
          t("Every fraction with denominator 20 gives a terminating decimal."),
        ],
      },
      {
        id: "b",
        label: [
          t("Every fraction with denominator 6 gives a terminating decimal."),
        ],
      },
      {
        id: "c",
        label: [t("0.999... is slightly less than 1.")],
      },
      {
        id: "d",
        label: [t("0.16666... is a terminating decimal.")],
      },
    ],
    correctOptionId: "a",
  },
];

// ---------------------------------------------------------------------------
// Track
// ---------------------------------------------------------------------------

/** The Decimals track. */
export const decimalsTrack: Track = {
  id: "decimals",
  subjectId: "maths",
  title: "Decimals (Year 8)",
  description:
    "Converting between fractions and decimals, identifying terminating and recurring decimals, and rounding to specified decimal places.",
  lessons: [terminatingRecurringRounding, roundingDecimals, fractionConversion],
  challenge: {
    id: "decimals-boss",
    title: "Boss challenge: Decimals",
    sourceRef: "2026 T1 Yr 8 Maths Planner — Term 1, Week 9",
    questions: decimalsBossQuestions,
    bonusXp: 100,
    passBadgeId: "boss-decimals",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
