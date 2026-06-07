/**
 * Authored Algebra track content (Year 8, chapter 5).
 *
 * Re-authored from the `source/` worksheets into clean, structured data,
 * covering the chapter-5 set: the language of algebra, adding/subtracting and
 * multiplying/dividing terms, expanding, factorising, the index laws, the zero
 * index and power of a power, and (extension) algebraic fractions.
 *
 * @author John Grimes
 * @module content/tracks/algebra
 */

import { m, t } from "../blocks";
import { algebraChallengeQuestions } from "../challenges/algebra";

import type { Lesson, Track } from "../../domain/content/types";

/** 5G - Expanding a single bracket using the distributive law. */
const expandingBrackets: Lesson = {
  id: "alg-5g-expanding-brackets",
  order: 4,
  title: "5G Expanding brackets",
  sourceRef: "5G",
  learnCards: [
    {
      id: "5g-key-idea",
      heading: "Key idea: the distributive law",
      body: [
        t(
          "To expand a bracket, multiply the term outside by each term inside:",
        ),
        m("a(b + c) = ab + ac"),
        t(
          "Every term inside the bracket gets multiplied. The result has no brackets left.",
        ),
      ],
    },
    {
      id: "5g-worked-example",
      heading: "Worked example",
      body: [
        t("Expand 3(x + 4)."),
        t("Multiply the 3 by each term inside the bracket:"),
        m(String.raw`3 \times x + 3 \times 4`),
        t("which gives"),
        m("3x + 12"),
      ],
    },
  ],
  practice: [
    {
      id: "5g-p1",
      type: "mcq",
      prompt: [t("Which is the correct expansion of"), m("3(x + 4)"), t("?")],
      explanation: [
        t("Multiply the outside term by each term inside:"),
        m(String.raw`3 \times x + 3 \times 4 = 3x + 12`),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("3x + 4")] },
        { id: "b", label: [m("3x + 12")] },
        { id: "c", label: [m("3x + 7")] },
        { id: "d", label: [m("x + 12")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5g-p2",
      type: "numeric",
      prompt: [
        t("Expand"),
        m("2(x + 5)"),
        t(". What is the constant term (the number with no x)?"),
      ],
      explanation: [
        t("The constant term comes from"),
        m(String.raw`2 \times 5 = 10`),
        t("."),
      ],
      xp: 10,
      accepted: ["10"],
    },
    {
      id: "5g-p3",
      type: "mcq",
      prompt: [t("Expand"), m("4(2x + 1)"), t(".")],
      explanation: [
        t("Multiply both inside terms by 4:"),
        m(String.raw`4 \times 2x + 4 \times 1 = 8x + 4`),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("8x + 4")] },
        { id: "b", label: [m("8x + 1")] },
        { id: "c", label: [m("6x + 4")] },
        { id: "d", label: [m("8x + 5")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5g-p4",
      type: "expression",
      prompt: [
        t("Type the expanded form of"),
        m("2(a + b)"),
        t(". Any equivalent form is accepted."),
      ],
      explanation: [
        t("Multiply 2 by each term:"),
        m(String.raw`2 \times a + 2 \times b = 2a + 2b`),
      ],
      xp: 15,
      target: "2a + 2b",
      variables: ["a", "b"],
    },
  ],
  mastery: [
    {
      id: "5g-m1",
      type: "mcq",
      prompt: [t("Expand"), m("2(x + 7)"), t(".")],
      explanation: [m(String.raw`2 \times x + 2 \times 7 = 2x + 14`)],
      xp: 15,
      options: [
        { id: "a", label: [m("2x + 14")] },
        { id: "b", label: [m("2x + 7")] },
        { id: "c", label: [m("2x + 9")] },
        { id: "d", label: [m("x + 14")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5g-m2",
      type: "numeric",
      prompt: [t("Expand"), m("5(x + 3)"), t(". What is the constant term?")],
      explanation: [m(String.raw`5 \times 3 = 15`)],
      xp: 15,
      accepted: ["15"],
    },
    {
      id: "5g-m3",
      type: "mcq",
      prompt: [t("Expand"), m("3(2x + 5)"), t(".")],
      explanation: [m(String.raw`3 \times 2x + 3 \times 5 = 6x + 15`)],
      xp: 15,
      options: [
        { id: "a", label: [m("6x + 15")] },
        { id: "b", label: [m("6x + 5")] },
        { id: "c", label: [m("5x + 15")] },
        { id: "d", label: [m("6x + 8")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5g-m4",
      type: "mcq",
      prompt: [t("Expand"), m("6(x + 2)"), t(".")],
      explanation: [m(String.raw`6 \times x + 6 \times 2 = 6x + 12`)],
      xp: 15,
      options: [
        { id: "a", label: [m("6x + 12")] },
        { id: "b", label: [m("6x + 2")] },
        { id: "c", label: [m("7x + 12")] },
        { id: "d", label: [m("6x + 8")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5g-m5",
      type: "numeric",
      prompt: [t("Expand"), m("4(x + 9)"), t(". What is the constant term?")],
      explanation: [m(String.raw`4 \times 9 = 36`)],
      xp: 15,
      accepted: ["36"],
    },
    {
      id: "5g-m6",
      type: "expression",
      prompt: [t("Type the expanded form of"), m("3(x + 2)"), t(".")],
      explanation: [m(String.raw`3 \times x + 3 \times 2 = 3x + 6`)],
      xp: 15,
      target: "3x + 6",
      variables: ["x"],
    },
  ],
};

/** 5A - The language of algebra: terms, coefficients, variables, constants. */
const languageOfAlgebra: Lesson = {
  id: "alg-5a-language",
  order: 1,
  title: "5A The language of algebra",
  sourceRef: "5A",
  learnCards: [
    {
      id: "5a-key",
      heading: "Key idea: terms and coefficients",
      body: [
        t("An expression is built from terms separated by + and − signs. In"),
        m("3x + 5"),
        t(
          ", the terms are 3x and 5. The number multiplying a variable is its coefficient (here 3), and a term with no variable is a constant (here 5).",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "5a-p1",
      type: "numeric",
      prompt: [t("What is the coefficient of x in"), m("7x"), t("?")],
      explanation: [
        t("The coefficient is the number multiplying the variable: 7."),
      ],
      xp: 10,
      accepted: ["7"],
    },
    {
      id: "5a-p2",
      type: "numeric",
      prompt: [t("How many terms are in"), m("4a + 2b - 5"), t("?")],
      explanation: [t("The terms are 4a, 2b and 5, so there are 3 terms.")],
      xp: 10,
      accepted: ["3"],
    },
  ],
  mastery: [
    {
      id: "5a-m1",
      type: "numeric",
      prompt: [t("What is the constant term in"), m("6x + 9"), t("?")],
      explanation: [t("The constant term has no variable: 9.")],
      xp: 15,
      accepted: ["9"],
    },
    {
      id: "5a-m2",
      type: "numeric",
      prompt: [t("What is the coefficient of y in"), m("8y"), t("?")],
      explanation: [t("The coefficient of y is 8.")],
      xp: 15,
      accepted: ["8"],
    },
    {
      id: "5a-m3",
      type: "mcq",
      prompt: [t("Which of these is a variable?")],
      explanation: [
        t("A variable is a letter standing for an unknown value, such as n."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("n")] },
        { id: "b", label: [m("7")] },
        { id: "c", label: [t("=")] },
        { id: "d", label: [t("+")] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** 5C - Adding and subtracting like terms. */
const addingTerms: Lesson = {
  id: "alg-5c-adding-terms",
  order: 2,
  title: "5C Adding and subtracting terms",
  sourceRef: "5C",
  learnCards: [
    {
      id: "5c-key",
      heading: "Key idea: like terms",
      body: [
        t(
          "Only like terms - terms with exactly the same variable part - can be combined. Add or subtract their coefficients:",
        ),
        m("3x + 5x = 8x"),
        t("Unlike terms such as 3x and 2y cannot be combined."),
      ],
    },
  ],
  practice: [
    {
      id: "5c-p1",
      type: "expression",
      prompt: [t("Simplify"), m("3x + 5x"), t(".")],
      explanation: [m("3x + 5x = 8x")],
      xp: 10,
      target: "8x",
      variables: ["x"],
    },
    {
      id: "5c-p2",
      type: "mcq",
      prompt: [t("Simplify"), m("7a - 2a"), t(".")],
      explanation: [m("7a - 2a = 5a")],
      xp: 10,
      options: [
        { id: "a", label: [m("5a")] },
        { id: "b", label: [m("9a")] },
        { id: "c", label: [m("5")] },
        { id: "d", label: [m("14a")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "5c-m1",
      type: "expression",
      prompt: [t("Simplify"), m("4x + 2x + 3"), t(".")],
      explanation: [m("4x + 2x + 3 = 6x + 3")],
      xp: 15,
      target: "6x + 3",
      variables: ["x"],
    },
    {
      id: "5c-m2",
      type: "expression",
      prompt: [t("Simplify"), m("9y - 4y"), t(".")],
      explanation: [m("9y - 4y = 5y")],
      xp: 15,
      target: "5y",
      variables: ["y"],
    },
    {
      id: "5c-m3",
      type: "mcq",
      prompt: [t("Which pair are like terms?")],
      explanation: [
        t("Like terms have the same variable part; 3x and 5x both have x."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m(String.raw`3x \text{ and } 5x`)] },
        { id: "b", label: [m(String.raw`3x \text{ and } 3y`)] },
        { id: "c", label: [m(String.raw`x \text{ and } x^2`)] },
        { id: "d", label: [m(String.raw`2a \text{ and } 2b`)] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** 5D - Multiplying and dividing terms. */
const multiplyingTerms: Lesson = {
  id: "alg-5d-multiplying-terms",
  order: 3,
  title: "5D Multiplying and dividing terms",
  sourceRef: "5D",
  learnCards: [
    {
      id: "5d-key",
      heading: "Key idea: multiply coefficients and variables",
      body: [
        t("To multiply terms, multiply the numbers and collect the variables:"),
        m(String.raw`2a \times 3b = 6ab`),
        t("To divide, cancel common factors, for example"),
        m(String.raw`6x \div 2 = 3x`),
      ],
    },
  ],
  practice: [
    {
      id: "5d-p1",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`3 \times 2x`), t(".")],
      explanation: [m(String.raw`3 \times 2x = 6x`)],
      xp: 10,
      target: "6x",
      variables: ["x"],
    },
    {
      id: "5d-p2",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`2a \times 3b`), t(".")],
      explanation: [m(String.raw`2a \times 3b = 6ab`)],
      xp: 10,
      target: "6*a*b",
      variables: ["a", "b"],
    },
  ],
  mastery: [
    {
      id: "5d-m1",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`4x \times 2`), t(".")],
      explanation: [m(String.raw`4x \times 2 = 8x`)],
      xp: 15,
      target: "8x",
      variables: ["x"],
    },
    {
      id: "5d-m2",
      type: "mcq",
      prompt: [t("Simplify"), m(String.raw`6xy \div 2x`), t(".")],
      explanation: [m(String.raw`6xy \div 2x = 3y`)],
      xp: 15,
      options: [
        { id: "a", label: [m("3y")] },
        { id: "b", label: [m("3xy")] },
        { id: "c", label: [m("4y")] },
        { id: "d", label: [m("3x")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5d-m3",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`5 \times 2y`), t(".")],
      explanation: [m(String.raw`5 \times 2y = 10y`)],
      xp: 15,
      target: "10y",
      variables: ["y"],
    },
  ],
};

/** 5H - Factorising by taking out the common factor (multiple choice). */
const factorisation: Lesson = {
  id: "alg-5h-factorisation",
  order: 5,
  title: "5H Factorisation",
  sourceRef: "5H",
  learnCards: [
    {
      id: "5h-key",
      heading: "Key idea: factorising reverses expanding",
      body: [
        t("To factorise, take out the highest common factor of every term:"),
        m("6x + 9 = 3(2x + 3)"),
        t("Check by expanding - you should get back what you started with."),
      ],
    },
  ],
  practice: [
    {
      id: "5h-p1",
      type: "mcq",
      prompt: [t("Factorise fully"), m("6x + 9"), t(".")],
      explanation: [t("The common factor is 3:"), m("6x + 9 = 3(2x + 3)")],
      xp: 10,
      options: [
        { id: "a", label: [m("3(2x + 3)")] },
        { id: "b", label: [m("3(2x + 9)")] },
        { id: "c", label: [m("6(x + 9)")] },
        { id: "d", label: [m("9(x + 1)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5h-p2",
      type: "mcq",
      prompt: [t("Factorise fully"), m("10x + 15"), t(".")],
      explanation: [t("The common factor is 5:"), m("10x + 15 = 5(2x + 3)")],
      xp: 10,
      options: [
        { id: "a", label: [m("5(2x + 3)")] },
        { id: "b", label: [m("5(2x + 15)")] },
        { id: "c", label: [m("10(x + 5)")] },
        { id: "d", label: [m("5(x + 3)")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "5h-m1",
      type: "mcq",
      prompt: [t("Factorise fully"), m("4x + 8"), t(".")],
      explanation: [m("4x + 8 = 4(x + 2)")],
      xp: 15,
      options: [
        { id: "a", label: [m("4(x + 2)")] },
        { id: "b", label: [m("4(x + 8)")] },
        { id: "c", label: [m("2(x + 4)")] },
        { id: "d", label: [m("8(x + 1)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5h-m2",
      type: "mcq",
      prompt: [t("Factorise fully"), m("12x + 18"), t(".")],
      explanation: [m("12x + 18 = 6(2x + 3)")],
      xp: 15,
      options: [
        { id: "a", label: [m("6(2x + 3)")] },
        { id: "b", label: [m("3(4x + 6)")] },
        { id: "c", label: [m("6(2x + 18)")] },
        { id: "d", label: [m("2(6x + 9)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5h-m3",
      type: "mcq",
      prompt: [t("Factorise fully"), m("9x + 6"), t(".")],
      explanation: [m("9x + 6 = 3(3x + 2)")],
      xp: 15,
      options: [
        { id: "a", label: [m("3(3x + 2)")] },
        { id: "b", label: [m("3(3x + 6)")] },
        { id: "c", label: [m("9(x + 6)")] },
        { id: "d", label: [m("6(x + 1)")] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** 5J - Index laws for multiplication and division. */
const indexLaws: Lesson = {
  id: "alg-5j-index-laws",
  order: 6,
  title: "5J Index laws",
  sourceRef: "5J",
  learnCards: [
    {
      id: "5j-key",
      heading: "Key idea: add and subtract indices",
      body: [
        t(
          "When multiplying powers of the same base, add the indices; when dividing, subtract them:",
        ),
        m(String.raw`a^m \times a^n = a^{m+n}`),
        m(String.raw`a^m \div a^n = a^{m-n}`),
      ],
    },
  ],
  practice: [
    {
      id: "5j-p1",
      type: "mcq",
      prompt: [t("Simplify"), m(String.raw`x^2 \times x^3`), t(".")],
      explanation: [m("x^{2+3} = x^5")],
      xp: 10,
      options: [
        { id: "a", label: [m("x^5")] },
        { id: "b", label: [m("x^6")] },
        { id: "c", label: [m("x^1")] },
        { id: "d", label: [m("2x^5")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5j-p2",
      type: "mcq",
      prompt: [t("Simplify"), m(String.raw`x^6 \div x^2`), t(".")],
      explanation: [m("x^{6-2} = x^4")],
      xp: 10,
      options: [
        { id: "a", label: [m("x^4")] },
        { id: "b", label: [m("x^3")] },
        { id: "c", label: [m("x^8")] },
        { id: "d", label: [m("x^{12}")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "5j-m1",
      type: "mcq",
      prompt: [t("Simplify"), m(String.raw`a^4 \times a`), t(".")],
      explanation: [t("A lone a is"), m("a^1"), t(", so"), m("a^{4+1} = a^5")],
      xp: 15,
      options: [
        { id: "a", label: [m("a^5")] },
        { id: "b", label: [m("a^4")] },
        { id: "c", label: [m("a^3")] },
        { id: "d", label: [m("2a^4")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5j-m2",
      type: "numeric",
      prompt: [
        t("Written as a power of 2,"),
        m(String.raw`2^2 \times 2^3`),
        t("equals 2 to what index?"),
      ],
      explanation: [m("2^{2+3} = 2^5"), t(", so the index is 5.")],
      xp: 15,
      accepted: ["5"],
    },
    {
      id: "5j-m3",
      type: "mcq",
      prompt: [t("Simplify"), m(String.raw`y^8 \div y^3`), t(".")],
      explanation: [m("y^{8-3} = y^5")],
      xp: 15,
      options: [
        { id: "a", label: [m("y^5")] },
        { id: "b", label: [m("y^{11}")] },
        { id: "c", label: [m("y^{24}")] },
        { id: "d", label: [m("y^2")] },
      ],
      correctOptionId: "a",
    },
  ],
};

/** 5K - The zero index and power of a power. */
const zeroIndex: Lesson = {
  id: "alg-5k-zero-index",
  order: 7,
  title: "5K Zero index and power of a power",
  sourceRef: "5K",
  learnCards: [
    {
      id: "5k-key",
      heading: "Key idea: zero index and power of a power",
      body: [
        t(
          "Any non-zero value to the power of zero is 1, and a power raised to a power multiplies the indices:",
        ),
        m("a^0 = 1"),
        m("(a^m)^n = a^{mn}"),
      ],
    },
  ],
  practice: [
    {
      id: "5k-p1",
      type: "numeric",
      prompt: [t("Evaluate"), m("5^0"), t(".")],
      explanation: [t("Any non-zero number to the power 0 is 1.")],
      xp: 10,
      accepted: ["1"],
    },
    {
      id: "5k-p2",
      type: "mcq",
      prompt: [t("Simplify"), m("(x^2)^3"), t(".")],
      explanation: [m(String.raw`(x^2)^3 = x^{2 \times 3} = x^6`)],
      xp: 10,
      options: [
        { id: "a", label: [m("x^6")] },
        { id: "b", label: [m("x^5")] },
        { id: "c", label: [m("x^8")] },
        { id: "d", label: [m("x^{23}")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "5k-m1",
      type: "numeric",
      prompt: [t("Evaluate"), m("100^0"), t(".")],
      explanation: [t("Any non-zero number to the power 0 is 1.")],
      xp: 15,
      accepted: ["1"],
    },
    {
      id: "5k-m2",
      type: "mcq",
      prompt: [t("Simplify"), m("(a^3)^2"), t(".")],
      explanation: [m(String.raw`(a^3)^2 = a^{3 \times 2} = a^6`)],
      xp: 15,
      options: [
        { id: "a", label: [m("a^6")] },
        { id: "b", label: [m("a^5")] },
        { id: "c", label: [m("a^9")] },
        { id: "d", label: [m("a^1")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5k-m3",
      type: "numeric",
      prompt: [
        t("Written as a power of 2,"),
        m("(2^2)^2"),
        t("equals 2 to what index?"),
      ],
      explanation: [
        m(String.raw`(2^2)^2 = 2^{2 \times 2} = 2^4`),
        t(", so the index is 4."),
      ],
      xp: 15,
      accepted: ["4"],
    },
  ],
};

/** 5E - Adding and subtracting algebraic fractions (extension). */
const addingFractions: Lesson = {
  id: "alg-5e-add-fractions",
  order: 8,
  title: "5E Adding and subtracting algebraic fractions",
  sourceRef: "EXTENSION 5E",
  learnCards: [
    {
      id: "5e-key",
      heading: "Key idea: a common denominator",
      body: [
        t(
          "To add or subtract algebraic fractions, rewrite them over a common denominator, then combine the numerators:",
        ),
        m(
          String.raw`\frac{x}{2} + \frac{x}{3} = \frac{3x}{6} + \frac{2x}{6} = \frac{5x}{6}`,
        ),
      ],
    },
  ],
  practice: [
    {
      id: "5e-p1",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`\frac{x}{2} + \frac{x}{2}`), t(".")],
      explanation: [m(String.raw`\frac{x}{2} + \frac{x}{2} = x`)],
      xp: 15,
      target: "x",
      variables: ["x"],
    },
    {
      id: "5e-p2",
      type: "expression",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{2x}{3} + \frac{x}{3}`),
        t("."),
      ],
      explanation: [m(String.raw`\frac{2x + x}{3} = \frac{3x}{3} = x`)],
      xp: 15,
      target: "x",
      variables: ["x"],
    },
  ],
  mastery: [
    {
      id: "5e-m1",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`\frac{x}{4} + \frac{x}{4}`), t(".")],
      explanation: [
        m(String.raw`\frac{x}{4} + \frac{x}{4} = \frac{2x}{4} = \frac{x}{2}`),
      ],
      xp: 15,
      target: "x/2",
      variables: ["x"],
    },
    {
      id: "5e-m2",
      type: "expression",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{3x}{5} - \frac{x}{5}`),
        t("."),
      ],
      explanation: [m(String.raw`\frac{3x - x}{5} = \frac{2x}{5}`)],
      xp: 15,
      target: "(2x)/5",
      variables: ["x"],
    },
    {
      id: "5e-m3",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`\frac{x}{2} + \frac{x}{3}`), t(".")],
      explanation: [m(String.raw`\frac{3x + 2x}{6} = \frac{5x}{6}`)],
      xp: 15,
      target: "(5x)/6",
      variables: ["x"],
    },
  ],
};

/** 5F - Multiplying and dividing algebraic fractions (extension). */
const multiplyingFractions: Lesson = {
  id: "alg-5f-multiply-fractions",
  order: 9,
  title: "5F Multiplying and dividing algebraic fractions",
  sourceRef: "EXTENSION 5F",
  learnCards: [
    {
      id: "5f-key",
      heading: "Key idea: multiply across, divide by the reciprocal",
      body: [
        t(
          "To multiply fractions, multiply the numerators and the denominators and cancel. To divide, multiply by the reciprocal:",
        ),
        m(String.raw`\frac{x}{2} \times \frac{4}{x} = \frac{4x}{2x} = 2`),
      ],
    },
  ],
  practice: [
    {
      id: "5f-p1",
      type: "expression",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{x}{2} \times \frac{4}{x}`),
        t("."),
      ],
      explanation: [m(String.raw`\frac{4x}{2x} = 2`)],
      xp: 15,
      target: "2",
      variables: ["x"],
    },
    {
      id: "5f-p2",
      type: "expression",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{a}{3} \times \frac{3}{a}`),
        t("."),
      ],
      explanation: [m(String.raw`\frac{3a}{3a} = 1`)],
      xp: 15,
      target: "1",
      variables: ["a"],
    },
  ],
  mastery: [
    {
      id: "5f-m1",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`\frac{x}{2} \times 6`), t(".")],
      explanation: [m(String.raw`\frac{6x}{2} = 3x`)],
      xp: 15,
      target: "3x",
      variables: ["x"],
    },
    {
      id: "5f-m2",
      type: "expression",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{2}{x} \times \frac{x}{4}`),
        t("."),
      ],
      explanation: [m(String.raw`\frac{2x}{4x} = \frac{1}{2}`)],
      xp: 15,
      target: "1/2",
      variables: ["x"],
    },
    {
      id: "5f-m3",
      type: "expression",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{x}{3} \div \frac{1}{3}`),
        t("."),
      ],
      explanation: [m(String.raw`\frac{x}{3} \times 3 = x`)],
      xp: 15,
      target: "x",
      variables: ["x"],
    },
  ],
};

/** The Algebra track. */
export const algebraTrack: Track = {
  id: "algebra",
  title: "Algebra (Year 8)",
  description: "Expand, factorise and work with terms and index laws.",
  lessons: [
    languageOfAlgebra,
    addingTerms,
    multiplyingTerms,
    expandingBrackets,
    factorisation,
    indexLaws,
    zeroIndex,
    addingFractions,
    multiplyingFractions,
  ],
  challenge: {
    id: "algebra-boss",
    title: "Boss challenge: Year 8 paper",
    sourceRef: "Year 8 Practice Paper 1",
    questions: algebraChallengeQuestions,
    bonusXp: 120,
    passBadgeId: "boss-algebra",
  },
};
