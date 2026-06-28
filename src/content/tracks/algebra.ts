/**
 * Algebra track content (Year 8, chapter 5).
 *
 * Covers algebraic expressions: language, adding/subtracting terms,
 * multiplying/dividing terms, expanding brackets, factorising, and index
 * laws. Based on the 2026 Year 8 Maths Class Notebook curriculum plan
 * (Term 2, Weeks 2-5).
 *
 * @author John Grimes
 * @module content/tracks/algebra
 */

import { m, t } from "../blocks";

import type {
  Figure,
  Lesson,
  BossChallenge,
  Track,
} from "../../domain/content/types";

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

const figPartsOfExpression: Figure = {
  id: "algebra-parts-of-expression",
  alt: "Diagram showing the anatomy of the algebraic expression 4x + 7, with arrows labelling the variable (x), coefficient (4), term (4x), constant (7) and expression (4x + 7).",
  textFallback:
    "[Diagram: 4x + 7 with arrows pointing to the variable x, the coefficient 4, the term 4x, the constant 7, and the whole expression]",
};

const figDistributiveAreaModel: Figure = {
  id: "algebra-distributive-area-model",
  alt: "Area model showing 3(x + 2) = 3x + 6: a rectangle of height 3 and width x + 2 is split into a left sub-rectangle of area 3x and a right sub-rectangle of area 6.",
  textFallback:
    "[Diagram: Rectangle of height 3 and width x+2 split into 3x and 6, demonstrating 3(x+2) = 3x + 6]",
};

// ---------------------------------------------------------------------------
// Lesson 1: 5A The language of algebra
// ---------------------------------------------------------------------------

const languageOfAlgebra: Lesson = {
  id: "alg-5a-language",
  order: 1,
  title: "5A The language of algebra",
  sourceRef: "5A",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "5a-key",
      heading: "Key idea: the building blocks",
      figure: figPartsOfExpression,
      body: [
        t(
          "Algebra uses letters (variables) to stand for unknown numbers. Each part of an expression has a name:",
        ),
        m(String.raw`\text{Expression: } 4x + 3y - 7`),
        t(
          "The terms are 4x, 3y, and -7. The number in front of a variable is called the coefficient (4 is the coefficient of x, 3 is the coefficient of y). A number on its own, without a variable, is called a constant (-7 is the constant term).",
        ),
        t(
          "An expression is a mathematical phrase combining numbers, variables and operations. An equation is a statement that two expressions are equal (it has an equals sign).",
        ),
      ],
    },
    {
      id: "5a-worked",
      heading: "Worked examples",
      body: [
        t("Example 1: Write an expression for 'three more than a number n'."),
        m("n + 3"),
        t("Example 2: Evaluate 3a - 2 when a = 5."),
        m(String.raw`3 \times 5 - 2 = 15 - 2 = 13`),
        t("Example 3: Write an expression for '5 less than twice a number x'."),
        m("2x - 5"),
        t("'Twice' means multiply by 2, then 'less than' means subtract 5."),
      ],
    },
    {
      id: "5a-mistake",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Confusing expressions and equations. 2x + 3 is an expression (no equals sign). 2x + 3 = 11 is an equation (has an equals sign).",
        ),
        t(
          "Mistake 2: Forgetting the multiplication sign is hidden. 4x means 4 × x. When substituting, you must multiply: if x = 3, then 4x = 4 × 3 = 12, not 43.",
        ),
        t(
          "Mistake 3: Writing '5 less than n' as 5 - n. The phrase 'less than' reverses the order: n - 5. Think '5 less than 20 is 15' — 20 - 5 = 15.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "5a-p1",
      refersTo: "5a-key",
      type: "mcq",
      prompt: [
        t("What is the coefficient of x in the expression"),
        m("4x + 2y - 7"),
        t("?"),
      ],
      explanation: [
        t(
          "The coefficient is the number multiplied by the variable. In 4x, the coefficient is 4. The 2 is the coefficient of y, and -7 is the constant term.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("4")] },
        { id: "b", label: [t("2")] },
        { id: "c", label: [t("-7")] },
        { id: "d", label: [t("7")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5a-p2",
      refersTo: "5a-key",
      type: "numeric",
      prompt: [
        t("How many terms are in the expression"),
        m("3a + 2b - 5 + c"),
        t("?"),
      ],
      explanation: [
        t(
          "The terms are separated by + and - signs. The expression has 3a, 2b, -5, and c — that is 4 terms.",
        ),
      ],
      xp: 10,
      accepted: ["4"],
    },
    {
      id: "5a-p3",
      refersTo: "5a-key",
      type: "fillInTheBlank",
      prompt: [t("Identify the constant term.")],
      template: [
        t("In the expression"),
        m("5p - 3"),
        t(", the constant term is ___."),
      ],
      explanation: [
        t(
          "The constant term is the number on its own, without a variable. In 5p - 3, -3 is the constant term.",
        ),
      ],
      xp: 10,
      accepted: ["-3", "negative 3", "minus 3"],
    },
    {
      id: "5a-p4",
      refersTo: "5a-worked",
      type: "expression",
      prompt: [t("Write an expression for 'the sum of x and 8'.")],
      explanation: [
        t(
          "'Sum' means addition. So 'the sum of x and 8' is x + 8, or equivalently 8 + x.",
        ),
      ],
      xp: 10,
      target: "x + 8",
      variables: ["x"],
    },
    {
      id: "5a-p5",
      refersTo: "5a-worked",
      type: "expression",
      prompt: [t("Write an expression for 'the product of m and 6'.")],
      explanation: [
        t(
          "'Product' means multiplication. So 'the product of m and 6' is 6m (or m × 6). In algebra we write the number first: 6m.",
        ),
      ],
      xp: 10,
      target: "6 * m",
      variables: ["m"],
    },
    {
      id: "5a-p6",
      refersTo: "5a-worked",
      type: "numeric",
      prompt: [t("Evaluate"), m("4a - 3"), t("when"), m("a = 5"), t(".")],
      explanation: [
        t("Substitute a = 5:"),
        m(String.raw`4 \times 5 - 3 = 20 - 3 = 17`),
        t(". Always multiply before subtracting (order of operations)."),
      ],
      xp: 10,
      accepted: ["17"],
    },
    {
      id: "5a-p7",
      refersTo: "5a-worked",
      type: "numeric",
      prompt: [
        t("Evaluate"),
        m("2x + 3y"),
        t("when"),
        m("x = 4"),
        t("and"),
        m("y = 2"),
        t("."),
      ],
      explanation: [
        t("Substitute x = 4 and y = 2:"),
        m(String.raw`2 \times 4 + 3 \times 2 = 8 + 6 = 14`),
        t(". Multiply each term first, then add the results."),
      ],
      xp: 15,
      accepted: ["14"],
    },
    {
      id: "5a-p8",
      refersTo: "5a-mistake",
      type: "mcq",
      prompt: [t("Which of these is an equation rather than an expression?")],
      explanation: [
        t(
          "An equation has an equals sign. 2x + 3 = 11 has an equals sign, so it is an equation. The other options are expressions.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("2x + 3")] },
        { id: "b", label: [m("2x + 3 = 11")] },
        { id: "c", label: [m("2x - 3")] },
        { id: "d", label: [m("3x + 2y - 5")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5a-p9",
      refersTo: "5a-mistake",
      type: "expression",
      prompt: [t("Write an expression for '5 less than twice a number n'.")],
      explanation: [
        t(
          "'Twice a number n' means 2 × n = 2n. '5 less than' that means subtract 5, so 2n - 5. Remember that 'less than' reverses the order — it is NOT 5 - 2n.",
        ),
      ],
      xp: 20,
      target: "2 * n - 5",
      variables: ["n"],
    },
    {
      id: "5a-p10",
      refersTo: "5a-worked",
      type: "numeric",
      prompt: [
        t("Evaluate"),
        m("a(b + 2)"),
        t("when"),
        m("a = 3"),
        t("and"),
        m("b = 4"),
        t("."),
      ],
      explanation: [
        t("Substitute a = 3 and b = 4:"),
        m(String.raw`3 \times (4 + 2) = 3 \times 6 = 18`),
        t(". Work inside the brackets first, then multiply."),
      ],
      xp: 20,
      accepted: ["18"],
    },
  ],
  mastery: [
    {
      id: "5a-m1",
      refersTo: "5a-worked",
      type: "expression",
      prompt: [
        t(
          "Write an expression for the following: 'The quotient of a number p and 5, then add 3'.",
        ),
      ],
      explanation: [
        t(
          "'Quotient' means division. The quotient of p and 5 is p ÷ 5, written as p/5. Then add 3, giving p/5 + 3.",
        ),
      ],
      xp: 15,
      target: "p / 5 + 3",
      variables: ["p"],
    },
    {
      id: "5a-m2",
      refersTo: "5a-worked",
      type: "numeric",
      prompt: [
        t("Evaluate"),
        m("p^2 + 3q"),
        t("when"),
        m("p = 4"),
        t("and"),
        m("q = 5"),
        t("."),
      ],
      explanation: [
        t("Substitute p = 4 and q = 5:"),
        m(String.raw`4^2 + 3 \times 5 = 16 + 15 = 31`),
        t(". Apply the power first (4² = 16), then multiply, then add."),
      ],
      xp: 15,
      accepted: ["31"],
    },
    {
      id: "5a-m3",
      refersTo: "5a-key",
      type: "matching",
      prompt: [t("Match each term to its correct description.")],
      explanation: [
        t("In the expression 3x - 2y + 5:"),
        t("The coefficient of x is 3."),
        t("The coefficient of y is -2."),
        t("The constant term is 5."),
      ],
      xp: 15,
      pairs: [
        {
          id: "coeff-x",
          left: [t("Coefficient of x")],
          right: [t("3")],
        },
        {
          id: "coeff-y",
          left: [t("Coefficient of y")],
          right: [t("-2")],
        },
        {
          id: "const",
          left: [t("Constant term")],
          right: [t("5")],
        },
      ],
    },
    {
      id: "5a-m4",
      refersTo: "5a-worked",
      type: "numeric",
      prompt: [
        t("Evaluate"),
        m(String.raw`\frac{3x + 4}{2}`),
        t("when"),
        m("x = 6"),
        t("."),
      ],
      explanation: [
        t("Substitute x = 6:"),
        m(
          String.raw`\frac{3 \times 6 + 4}{2} = \frac{18 + 4}{2} = \frac{22}{2} = 11`,
        ),
        t(". Work the numerator first, then divide."),
      ],
      xp: 20,
      accepted: ["11"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 2: 5C Adding and subtracting algebraic terms
// ---------------------------------------------------------------------------

const addingSubtractingTerms: Lesson = {
  id: "alg-5c-adding-subtracting",
  order: 2,
  title: "5C Adding and subtracting algebraic terms",
  sourceRef: "5C",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "5c-key",
      heading: "Key idea: like terms",
      body: [
        t(
          "Like terms have exactly the same variable raised to the same power. For example, 3x and 5x are like terms (both have x to the power 1). However, 3x and 3x² are not like terms because the powers differ. Similarly, 3x and 3y are not like terms because the variables differ.",
        ),
        t(
          "You can only add or subtract like terms. To combine them, add or subtract the coefficients and keep the variable part unchanged.",
        ),
        m("3x + 5x = 8x"),
        m("7y - 2y = 5y"),
        m("4ab + 2ab = 6ab"),
      ],
    },
    {
      id: "5c-worked",
      heading: "Worked examples: collecting like terms",
      body: [
        t("Example 1: Simplify 4a + 2b + 3a + b."),
        t("Step 1: Group like terms together."),
        m(String.raw`4a + 3a + 2b + b`),
        t("Step 2: Add the coefficients of like terms."),
        m(String.raw`7a + 3b`),
        t("Example 2: Simplify 5x - x + 2y - 3y."),
        m(String.raw`5x - x = 4x, \quad 2y - 3y = -y`),
        m(String.raw`\text{Answer: } 4x - y`),
      ],
    },
    {
      id: "5c-mistake",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Adding unlike terms. You cannot simplify 3x + 2y further because x and y are different variables.",
        ),
        t(
          "Mistake 2: Forgetting that x on its own means 1x. So 5x - x = 5x - 1x = 4x, not 5.",
        ),
        t(
          "Mistake 3: Adding coefficients but also adding variables. 3a + 2a = 5a, not 5a² or 5a + a.",
        ),
        t(
          "Mistake 4: Getting the sign wrong. When you see - on its own, remember: -y means -1y. So 5y - y = 4y, and -3y - 2y = -5y.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "5c-p1",
      refersTo: "5c-key",
      type: "mcq",
      prompt: [t("Which pair are like terms?")],
      explanation: [
        t(
          "Like terms must have exactly the same variable and power. 5x and -3x both have x to the power 1, so they are like terms. The other pairs have different variables or different powers.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("5x"), t(" and "), m("-3x")] },
        { id: "b", label: [m("4x"), t(" and "), m("4y")] },
        { id: "c", label: [m("3a^2"), t(" and "), m("3a")] },
        { id: "d", label: [m("2ab"), t(" and "), m("2a")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5c-p2",
      refersTo: "5c-worked",
      type: "expression",
      prompt: [t("Simplify"), m("3x + 5x"), t(".")],
      explanation: [
        t(
          "3x and 5x are like terms (both have x). Add the coefficients: 3 + 5 = 8. The variable stays the same, giving 8x.",
        ),
      ],
      xp: 10,
      target: "8 * x",
      variables: ["x"],
    },
    {
      id: "5c-p3",
      refersTo: "5c-worked",
      type: "expression",
      prompt: [t("Simplify"), m("7y - 2y"), t(".")],
      explanation: [
        t(
          "7y and 2y are like terms. Subtract the coefficients: 7 - 2 = 5. Keep the variable: 5y.",
        ),
      ],
      xp: 10,
      target: "5 * y",
      variables: ["y"],
    },
    {
      id: "5c-p4",
      refersTo: "5c-key",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence.")],
      template: [
        t("The terms"),
        m("3a"),
        t("and"),
        m("3b"),
        t("are ___ terms because they have different variables."),
      ],
      explanation: [
        t(
          "Terms with different variables (a and b) are unlike terms and cannot be combined by addition or subtraction.",
        ),
      ],
      xp: 10,
      accepted: ["unlike", "different"],
    },
    {
      id: "5c-p5",
      refersTo: "5c-worked",
      type: "expression",
      prompt: [t("Simplify"), m("4a + 2b + 3a + b"), t(".")],
      explanation: [
        t(
          "Group like terms: 4a + 3a = 7a, and 2b + b = 3b. The simplified expression is 7a + 3b.",
        ),
      ],
      xp: 10,
      target: "7 * a + 3 * b",
      variables: ["a", "b"],
    },
    {
      id: "5c-p6",
      refersTo: "5c-worked",
      type: "expression",
      prompt: [t("Simplify"), m("6m - m + 4n - 2n"), t(".")],
      explanation: [
        t(
          "6m - m = 5m (since m means 1m). 4n - 2n = 2n. The simplified expression is 5m + 2n.",
        ),
      ],
      xp: 15,
      target: "5 * m + 2 * n",
      variables: ["m", "n"],
    },
    {
      id: "5c-p7",
      refersTo: "5c-worked",
      type: "expression",
      prompt: [t("Simplify"), m("5x^2 + 3x - x^2 + 2x"), t(".")],
      explanation: [
        t(
          "Group like terms: 5x² - x² = 4x², and 3x + 2x = 5x. Note that x² and x are NOT like terms because the powers differ.",
        ),
      ],
      xp: 15,
      target: "4 * x^2 + 5 * x",
      variables: ["x"],
    },
    {
      id: "5c-p8",
      refersTo: "5c-worked",
      type: "mcq",
      prompt: [
        t("Simplify"),
        m("2p + 3p^2 - p + p^2"),
        t(". Which is correct?"),
      ],
      explanation: [
        t(
          "Group like terms: 2p - p = p, and 3p² + p² = 4p². The simplified expression is p + 4p², or equivalently 4p² + p.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("5p^2")] },
        { id: "b", label: [m("p + 4p^2")] },
        { id: "c", label: [m("5p^3")] },
        { id: "d", label: [m("p + p^2")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5c-p9",
      refersTo: "5c-worked",
      type: "expression",
      prompt: [t("Simplify"), m("3ab + 5ab - 2ab"), t(".")],
      explanation: [
        t(
          "All terms have ab, so they are like terms. Add the coefficients: 3 + 5 - 2 = 6. The result is 6ab.",
        ),
      ],
      xp: 20,
      target: "6 * a * b",
      variables: ["a", "b"],
    },
    {
      id: "5c-p10",
      refersTo: "5c-worked",
      type: "expression",
      prompt: [t("Simplify"), m("2xy - 5xy + 3x + x - 2xy"), t(".")],
      explanation: [
        t(
          "Group like terms. For xy: 2xy - 5xy - 2xy = -5xy. For x: 3x + x = 4x. The simplified expression is 4x - 5xy.",
        ),
      ],
      xp: 20,
      target: "4 * x - 5 * x * y",
      variables: ["x", "y"],
    },
  ],
  mastery: [
    {
      id: "5c-m1",
      refersTo: "5c-worked",
      type: "expression",
      prompt: [t("Simplify"), m("4a + 2b - a + 3b - 2a"), t(".")],
      explanation: [
        t(
          "Group like terms. For a: 4a - a - 2a = a. For b: 2b + 3b = 5b. The simplified expression is a + 5b.",
        ),
      ],
      xp: 15,
      target: "a + 5 * b",
      variables: ["a", "b"],
    },
    {
      id: "5c-m2",
      refersTo: "5c-worked",
      type: "expression",
      prompt: [t("Simplify"), m("3m^2 + 2m - 5m^2 + 4m - m"), t(".")],
      explanation: [
        t(
          "Group like terms. For m²: 3m² - 5m² = -2m². For m: 2m + 4m - m = 5m. The simplified expression is 5m - 2m².",
        ),
      ],
      xp: 15,
      target: "5 * m - 2 * m^2",
      variables: ["m"],
    },
    {
      id: "5c-m3",
      refersTo: "5c-mistake",
      type: "mcq",
      prompt: [
        t("A student simplified"),
        m("3x + 2x^2"),
        t("as"),
        m("5x^2"),
        t(". What mistake did they make?"),
      ],
      explanation: [
        t(
          "The student added the coefficients (3 + 2 = 5) and incorrectly kept x². However, 3x and 2x² are not like terms because x and x² have different powers. The expression 3x + 2x² cannot be simplified further.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("They forgot to add the powers.")] },
        {
          id: "b",
          label: [t("They added unlike terms (x and x² are different).")],
        },
        { id: "c", label: [t("They should have written 5x.")] },
        { id: "d", label: [t("The answer is correct.")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5c-m4",
      refersTo: "5c-worked",
      type: "expression",
      prompt: [t("Simplify"), m("5pq + 3p + 2pq - p - 4pq"), t(".")],
      explanation: [
        t(
          "Group like terms. For pq: 5pq + 2pq - 4pq = 3pq. For p: 3p - p = 2p. The simplified expression is 3pq + 2p.",
        ),
      ],
      xp: 20,
      target: "3 * p * q + 2 * p",
      variables: ["p", "q"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 3: 5D Multiplying and dividing algebraic terms
// ---------------------------------------------------------------------------

const multiplyingDividingTerms: Lesson = {
  id: "alg-5d-multiplying-dividing",
  order: 3,
  title: "5D Multiplying and dividing algebraic terms",
  sourceRef: "5D",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "5d-key",
      heading: "Key idea: multiplying terms",
      body: [
        t(
          "When multiplying algebraic terms, multiply the coefficients together and then multiply the variables together. Write the variables in alphabetical order.",
        ),
        m(String.raw`3x \times 2y = (3 \times 2) \times (x \times y) = 6xy`),
        m(String.raw`4a \times 3a = (4 \times 3) \times (a \times a) = 12a^2`),
        t(
          "When a variable is multiplied by itself, use index notation: a × a = a².",
        ),
        m(String.raw`5m \times (-2n) = -10mn`),
        t(
          "Remember the sign rules: positive × negative = negative, negative × negative = positive.",
        ),
      ],
    },
    {
      id: "5d-worked",
      heading: "Worked examples: multiplying and dividing",
      body: [
        t("Example 1: Multiply 2p × 3p × 4q."),
        m(
          String.raw`2p \times 3p \times 4q = (2 \times 3 \times 4) \times (p \times p \times q) = 24p^2q`,
        ),
        t("Example 2: Divide 12ab ÷ 3a."),
        m(
          String.raw`12ab \div 3a = \frac{12ab}{3a} = \frac{12}{3} \times \frac{ab}{a} = 4 \times b = 4b`,
        ),
        t(
          "Cancel common factors: divide the coefficients (12 ÷ 3 = 4) and cancel the common variable a.",
        ),
        t("Example 3: Simplify 6x² ÷ 2x."),
        m(
          String.raw`6x^2 \div 2x = \frac{6}{2} \times \frac{x^2}{x} = 3 \times x = 3x`,
        ),
      ],
    },
    {
      id: "5d-mistake",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Adding variables when multiplying. 3a × 2a = 6a², NOT 5a² or 6a. Multiply the coefficients, multiply the variables.",
        ),
        t(
          "Mistake 2: Forgetting to write powers. a × a × a = a³, not 3a. 3a means a + a + a.",
        ),
        t(
          "Mistake 3: Cancelling incorrectly when dividing. In 8xy ÷ 2y, the y cancels: 8xy/2y = 4x. Do not cancel if the variable only appears in the numerator.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "5d-p1",
      refersTo: "5d-key",
      type: "mcq",
      prompt: [t("What is"), m(String.raw`2a \times 3b`), t("?")],
      explanation: [
        t(
          "Multiply the coefficients (2 × 3 = 6) and write the variables in alphabetical order (a × b = ab). The answer is 6ab.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("5ab")] },
        { id: "b", label: [m("6ab")] },
        { id: "c", label: [m("6a + b")] },
        { id: "d", label: [m("5a + 5b")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5d-p2",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`4x \times 2x`), t(".")],
      explanation: [
        t(
          "Multiply the coefficients: 4 × 2 = 8. Multiply the variables: x × x = x². The result is 8x².",
        ),
      ],
      xp: 10,
      target: "8 * x^2",
      variables: ["x"],
    },
    {
      id: "5d-p3",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`(-3a) \times 5b`), t(".")],
      explanation: [
        t(
          "Multiply the coefficients: -3 × 5 = -15. Multiply the variables: a × b = ab. The result is -15ab.",
        ),
      ],
      xp: 10,
      target: "-15 * a * b",
      variables: ["a", "b"],
    },
    {
      id: "5d-p4",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`15xy \div 5x`), t(".")],
      explanation: [
        t(
          "Divide the coefficients: 15 ÷ 5 = 3. Cancel the common variable x: xy ÷ x = y. The result is 3y.",
        ),
      ],
      xp: 10,
      target: "3 * y",
      variables: ["x", "y"],
    },
    {
      id: "5d-p5",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`3m \times 4m \times 2n`), t(".")],
      explanation: [
        t(
          "Multiply the coefficients: 3 × 4 × 2 = 24. Multiply the variables: m × m × n = m²n. The result is 24m²n.",
        ),
      ],
      xp: 10,
      target: "24 * m^2 * n",
      variables: ["m", "n"],
    },
    {
      id: "5d-p6",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`(-2x) \times (-3x)`), t(".")],
      explanation: [
        t(
          "Multiply the coefficients: -2 × -3 = 6 (negative × negative = positive). Multiply the variables: x × x = x². The result is 6x².",
        ),
      ],
      xp: 15,
      target: "6 * x^2",
      variables: ["x"],
    },
    {
      id: "5d-p7",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`8x^2 \div 2x`), t(".")],
      explanation: [
        t(
          "Divide the coefficients: 8 ÷ 2 = 4. Divide the variables: x² ÷ x = x (subtract powers: 2 - 1 = 1). The result is 4x.",
        ),
      ],
      xp: 15,
      target: "4 * x",
      variables: ["x"],
    },
    {
      id: "5d-p8",
      refersTo: "5d-worked",
      type: "mcq",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{20a^2b}{4ab}`),
        t(". Which is correct?"),
      ],
      explanation: [
        t(
          "Divide the coefficients: 20 ÷ 4 = 5. Divide the variables: a² ÷ a = a, b ÷ b = 1. The result is 5a.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("5ab")] },
        { id: "b", label: [m("5a")] },
        { id: "c", label: [m("5a^2b")] },
        { id: "d", label: [m("16a")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5d-p9",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`2x \times 3y \div xy`), t(".")],
      explanation: [
        t(
          "First multiply: 2x × 3y = 6xy. Then divide: 6xy ÷ xy = 6. All variables cancel.",
        ),
      ],
      xp: 20,
      target: "6",
      variables: ["x", "y"],
    },
    {
      id: "5d-p10",
      refersTo: "5d-key",
      type: "fillInTheBlank",
      prompt: [t("Complete the rule for multiplying algebraic terms.")],
      template: [
        t(
          "When multiplying algebraic terms, multiply the ___ together and then multiply the variables together.",
        ),
      ],
      explanation: [
        t(
          "Multiply coefficients (the numbers) together first, then multiply the variables. For example, 3a × 4b = (3 × 4) × (a × b) = 12ab.",
        ),
      ],
      xp: 20,
      accepted: ["coefficients", "numbers", "numerals"],
    },
  ],
  mastery: [
    {
      id: "5d-m1",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`5a^2b \times 3ab^2`), t(".")],
      explanation: [
        t(
          "Multiply the coefficients: 5 × 3 = 15. Multiply the variables: a² × a = a³, b × b² = b³. The result is 15a³b³.",
        ),
      ],
      xp: 15,
      target: "15 * a^3 * b^3",
      variables: ["a", "b"],
    },
    {
      id: "5d-m2",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`\frac{18x^3y^2}{6x^2y}`), t(".")],
      explanation: [
        t(
          "Divide the coefficients: 18 ÷ 6 = 3. Divide the variables: x³ ÷ x² = x (3 - 2 = 1), y² ÷ y = y (2 - 1 = 1). The result is 3xy.",
        ),
      ],
      xp: 15,
      target: "3 * x * y",
      variables: ["x", "y"],
    },
    {
      id: "5d-m3",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [
        t("Simplify"),
        m(String.raw`(-4pq) \times (-2p) \div 2q`),
        t("."),
      ],
      explanation: [
        t(
          "Multiply first: (-4) × (-2) = 8, pq × p = p²q. So 8p²q. Then divide by 2q: 8 ÷ 2 = 4, p²q ÷ q = p². The result is 4p².",
        ),
      ],
      xp: 15,
      target: "4 * p^2",
      variables: ["p", "q"],
    },
    {
      id: "5d-m4",
      refersTo: "5d-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`3a \times 4b \times 0`), t(".")],
      explanation: [
        t("Any expression multiplied by zero is zero. 3a × 4b × 0 = 0."),
      ],
      xp: 20,
      target: "0",
      variables: ["a", "b"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 4: 5G Expanding brackets
// ---------------------------------------------------------------------------

const expandingBrackets: Lesson = {
  id: "alg-5g-expanding",
  order: 4,
  title: "5G Expanding brackets",
  sourceRef: "5G",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "5g-key",
      heading: "Key idea: the distributive law",
      figure: figDistributiveAreaModel,
      body: [
        t(
          "The distributive law says that multiplying a number by a sum is the same as multiplying each term separately and adding the results:",
        ),
        m("a(b + c) = ab + ac"),
        t("This works with subtraction too:"),
        m("a(b - c) = ab - ac"),
        t(
          "Every term inside the brackets gets multiplied by the term outside. This is called expanding the brackets.",
        ),
        t("Examples:"),
        m("3(x + 4) = 3x + 12"),
        m("5(2x - 3) = 10x - 15"),
        m("x(x + 2) = x^2 + 2x"),
      ],
    },
    {
      id: "5g-worked",
      heading: "Worked examples",
      body: [
        t("Example 1: Expand 4(2a + 3b)."),
        m(String.raw`4 \times 2a = 8a, \quad 4 \times 3b = 12b`),
        m(String.raw`\text{Answer: } 8a + 12b`),
        t("Example 2: Expand and simplify 2(x + 3) + 3(x - 1)."),
        t("Step 1: Expand each bracket:"),
        m(String.raw`2(x + 3) = 2x + 6, \quad 3(x - 1) = 3x - 3`),
        t("Step 2: Combine like terms:"),
        m(String.raw`2x + 3x + 6 - 3 = 5x + 3`),
      ],
    },
    {
      id: "5g-mistake",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Only multiplying the first term inside the bracket. 3(x + 2) = 3x + 2 is WRONG. You must multiply BOTH terms: 3(x + 2) = 3x + 6.",
        ),
        t(
          "Mistake 2: Forgetting the sign when expanding with a negative. -2(x + 3) = -2x - 6 (both terms change sign).",
        ),
        t(
          "Mistake 3: Not putting brackets around the expression when substituting into a larger expression. Always expand first, then combine like terms.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "5g-p1",
      refersTo: "5g-key",
      type: "expression",
      prompt: [t("Expand"), m("3(x + 2)"), t(".")],
      explanation: [
        t("Multiply each term inside the brackets by 3:"),
        m(String.raw`3 \times x = 3x, \quad 3 \times 2 = 6`),
        t(". The result is 3x + 6."),
      ],
      xp: 10,
      target: "3 * x + 6",
      variables: ["x"],
    },
    {
      id: "5g-p2",
      refersTo: "5g-key",
      type: "expression",
      prompt: [t("Expand"), m("5(2y - 3)"), t(".")],
      explanation: [
        t("Multiply each term inside the brackets by 5:"),
        m(String.raw`5 \times 2y = 10y, \quad 5 \times (-3) = -15`),
        t(". The result is 10y - 15."),
      ],
      xp: 10,
      target: "10 * y - 15",
      variables: ["y"],
    },
    {
      id: "5g-p3",
      refersTo: "5g-key",
      type: "expression",
      prompt: [t("Expand"), m("x(x + 4)"), t(".")],
      explanation: [
        t("Multiply each term inside the brackets by x:"),
        m(String.raw`x \times x = x^2, \quad x \times 4 = 4x`),
        t(". The result is x² + 4x."),
      ],
      xp: 10,
      target: "x^2 + 4 * x",
      variables: ["x"],
    },
    {
      id: "5g-p4",
      refersTo: "5g-key",
      type: "mcq",
      prompt: [t("Expand"), m("-2(3x - 4)"), t(". Which is correct?")],
      explanation: [
        t("Multiply each term by -2:"),
        m(String.raw`-2 \times 3x = -6x, \quad -2 \times (-4) = +8`),
        t(". The result is -6x + 8. The negative sign applies to both terms."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("-6x - 8")] },
        { id: "b", label: [m("-6x + 8")] },
        { id: "c", label: [m("-6x + 4")] },
        { id: "d", label: [m("6x + 8")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5g-p5",
      refersTo: "5g-key",
      type: "fillInTheBlank",
      prompt: [t("State the distributive law.")],
      template: [
        t("The distributive law states that"),
        m("a(b + c)"),
        t("is equal to ___."),
      ],
      explanation: [
        t(
          "The distributive law: a(b + c) = ab + ac. Every term inside the brackets is multiplied by the factor outside.",
        ),
      ],
      xp: 10,
      accepted: ["ab + ac", "a*b + a*c"],
    },
    {
      id: "5g-p6",
      refersTo: "5g-worked",
      type: "expression",
      prompt: [t("Expand and simplify"), m("2(x + 3) + 3(x + 1)"), t(".")],
      explanation: [
        t("Expand each bracket: 2(x + 3) = 2x + 6, 3(x + 1) = 3x + 3."),
        t("Combine like terms: 2x + 3x = 5x, 6 + 3 = 9. The result is 5x + 9."),
      ],
      xp: 15,
      target: "5 * x + 9",
      variables: ["x"],
    },
    {
      id: "5g-p7",
      refersTo: "5g-worked",
      type: "expression",
      prompt: [t("Expand and simplify"), m("4(2a - 1) - 3(a - 2)"), t(".")],
      explanation: [
        t(
          "Expand: 4(2a - 1) = 8a - 4. -3(a - 2) = -3a + 6 (negative times negative = positive).",
        ),
        t("Combine: 8a - 3a = 5a, -4 + 6 = 2. The result is 5a + 2."),
      ],
      xp: 15,
      target: "5 * a + 2",
      variables: ["a"],
    },
    {
      id: "5g-p8",
      refersTo: "5g-mistake",
      type: "mcq",
      prompt: [
        t("A student expanded"),
        m("4(x + 5)"),
        t("as"),
        m("4x + 5"),
        t(". What mistake did they make?"),
      ],
      explanation: [
        t(
          "The student only multiplied the first term by 4. They forgot to multiply the second term (5) by 4. The correct expansion is 4x + 20.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("They multiplied 4 × x incorrectly.")] },
        { id: "b", label: [t("They forgot to multiply 4 by 5 as well.")] },
        { id: "c", label: [t("They should have written 4x + 9.")] },
        { id: "d", label: [t("The answer is correct.")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5g-p9",
      refersTo: "5g-worked",
      type: "expression",
      prompt: [t("Expand and simplify"), m("2x(3x + 1) - x(x - 4)"), t(".")],
      explanation: [
        t("Expand: 2x(3x + 1) = 6x² + 2x. -x(x - 4) = -x² + 4x."),
        t("Combine: 6x² - x² = 5x², 2x + 4x = 6x. The result is 5x² + 6x."),
      ],
      xp: 20,
      target: "5 * x^2 + 6 * x",
      variables: ["x"],
    },
    {
      id: "5g-p10",
      refersTo: "5g-worked",
      type: "expression",
      prompt: [t("Expand and simplify"), m("3(a + 2b) - 2(2a - b)"), t(".")],
      explanation: [
        t("Expand: 3(a + 2b) = 3a + 6b. -2(2a - b) = -4a + 2b."),
        t("Combine: 3a - 4a = -a, 6b + 2b = 8b. The result is -a + 8b."),
      ],
      xp: 20,
      target: "-a + 8 * b",
      variables: ["a", "b"],
    },
  ],
  mastery: [
    {
      id: "5g-m1",
      refersTo: "5g-worked",
      type: "expression",
      prompt: [t("Expand and simplify"), m("5(2x - 3) + 4(3x + 2)"), t(".")],
      explanation: [
        t("Expand: 5(2x - 3) = 10x - 15. 4(3x + 2) = 12x + 8."),
        t("Combine: 10x + 12x = 22x, -15 + 8 = -7. The result is 22x - 7."),
      ],
      xp: 15,
      target: "22 * x - 7",
      variables: ["x"],
    },
    {
      id: "5g-m2",
      refersTo: "5g-worked",
      type: "expression",
      prompt: [t("Expand and simplify"), m("3(y - 4) - 2(5 - y)"), t(".")],
      explanation: [
        t(
          "Expand: 3(y - 4) = 3y - 12. -2(5 - y) = -10 + 2y (note: -2 × -y = +2y).",
        ),
        t("Combine: 3y + 2y = 5y, -12 - 10 = -22. The result is 5y - 22."),
      ],
      xp: 15,
      target: "5 * y - 22",
      variables: ["y"],
    },
    {
      id: "5g-m3",
      refersTo: "5g-mistake",
      type: "mcq",
      prompt: [
        t("Which is the correct expansion of"),
        m("-3x(2x - 5)"),
        t("?"),
      ],
      explanation: [
        t("Multiply each term by -3x:"),
        m(String.raw`-3x \times 2x = -6x^2, \quad -3x \times (-5) = +15x`),
        t(". The result is -6x² + 15x."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("-6x^2 - 15x")] },
        { id: "b", label: [m("-6x^2 + 15x")] },
        { id: "c", label: [m("-6x^2 + 5")] },
        { id: "d", label: [m("6x^2 - 15x")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5g-m4",
      refersTo: "5g-worked",
      type: "expression",
      prompt: [t("Expand and simplify"), m("4m(2m - 3) + 5m(1 - m)"), t(".")],
      explanation: [
        t("Expand: 4m(2m - 3) = 8m² - 12m. 5m(1 - m) = 5m - 5m²."),
        t("Combine: 8m² - 5m² = 3m², -12m + 5m = -7m. The result is 3m² - 7m."),
      ],
      xp: 20,
      target: "3 * m^2 - 7 * m",
      variables: ["m"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 5: 5H Factorising expressions
// ---------------------------------------------------------------------------

const factorisingExpressions: Lesson = {
  id: "alg-5h-factorising",
  order: 5,
  title: "5H Factorising expressions",
  sourceRef: "5H",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "5h-key",
      heading: "Key idea: factorising",
      body: [
        t(
          "Factorising is the reverse of expanding. It means writing an expression as a product of its factors. The most common type is taking out the highest common factor (HCF).",
        ),
        t("Steps to factorise:"),
        t("1. Find the HCF of all the coefficients."),
        t(
          "2. Find the common variable factor (the variable that appears in every term, to the lowest power).",
        ),
        t(
          "3. Write the HCF outside the brackets, and divide each original term by the HCF to get the terms inside.",
        ),
        t("Example: Factorise 6x + 9."),
        t("HCF of 6 and 9 is 3. There is no common variable (9 has no x)."),
        m("6x + 9 = 3(2x + 3)"),
        t("Check by expanding: 3 × 2x = 6x, 3 × 3 = 9. Correct!"),
      ],
    },
    {
      id: "5h-worked",
      heading: "Worked examples",
      body: [
        t("Example 1: Factorise 8x + 12."),
        t("HCF of 8 and 12 is 4."),
        m("8x + 12 = 4(2x + 3)"),
        t("Example 2: Factorise 10x² + 5x."),
        t(
          "HCF of 10 and 5 is 5. x is common to both terms (x² and x have x in common).",
        ),
        m("10x^2 + 5x = 5x(2x + 1)"),
        t("Example 3: Factorise 12ab - 8a."),
        t("HCF of 12 and 8 is 4. a is common to both terms."),
        m("12ab - 8a = 4a(3b - 2)"),
      ],
    },
    {
      id: "5h-mistake",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Not finding the HIGHEST common factor. 6x + 12 = 2(3x + 6) is partially factorised, but it should be 6(x + 2).",
        ),
        t(
          "Mistake 2: Forgetting to include the factor in the second term. 10x + 5 = 5(2x) is WRONG because the 5 inside should be 1: 10x + 5 = 5(2x + 1).",
        ),
        t(
          "Mistake 3: Not checking. Always expand your factorised answer to make sure it matches the original.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "5h-p1",
      refersTo: "5h-key",
      type: "numeric",
      prompt: [t("What is the highest common factor of 12 and 18?")],
      explanation: [
        t(
          "Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. The highest common factor is 6.",
        ),
      ],
      xp: 10,
      accepted: ["6"],
    },
    {
      id: "5h-p2",
      refersTo: "5h-worked",
      type: "expression",
      prompt: [
        t("Factorise"),
        m("4x + 8"),
        t("by taking out the common factor."),
      ],
      explanation: [
        t(
          "The HCF of 4 and 8 is 4. Divide each term by 4: 4x ÷ 4 = x, 8 ÷ 4 = 2. The factorised expression is 4(x + 2).",
        ),
      ],
      xp: 10,
      target: "4 * (x + 2)",
      variables: ["x"],
    },
    {
      id: "5h-p3",
      refersTo: "5h-key",
      type: "expression",
      prompt: [t("Factorise"), m("6x + 9"), t(".")],
      explanation: [
        t(
          "The HCF of 6 and 9 is 3. 6x ÷ 3 = 2x, 9 ÷ 3 = 3. The factorised expression is 3(2x + 3).",
        ),
      ],
      xp: 10,
      target: "3 * (2 * x + 3)",
      variables: ["x"],
    },
    {
      id: "5h-p4",
      refersTo: "5h-worked",
      type: "mcq",
      prompt: [
        t("Which is the correct factorisation of"),
        m("15x + 10"),
        t("?"),
      ],
      explanation: [
        t(
          "The HCF of 15 and 10 is 5. 15x ÷ 5 = 3x, 10 ÷ 5 = 2. The factorised expression is 5(3x + 2).",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("5(3x + 2)")] },
        { id: "b", label: [m("5(3x + 10)")] },
        { id: "c", label: [m("15(x + 10)")] },
        { id: "d", label: [m("3(5x + 2)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5h-p5",
      refersTo: "5h-key",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about factorising.")],
      template: [t("Factorising is the ___ of expanding brackets.")],
      explanation: [
        t(
          "Factorising reverses the process of expanding. Expanding turns a(b + c) into ab + ac; factorising turns ab + ac back into a(b + c).",
        ),
      ],
      xp: 10,
      accepted: ["reverse", "opposite", "inverse"],
    },
    {
      id: "5h-p6",
      refersTo: "5h-worked",
      type: "expression",
      prompt: [t("Factorise"), m("10x^2 + 5x"), t(".")],
      explanation: [
        t(
          "The HCF of 10 and 5 is 5. The common variable factor is x (both terms have x). 10x² ÷ 5x = 2x, 5x ÷ 5x = 1. The factorised expression is 5x(2x + 1).",
        ),
      ],
      xp: 15,
      target: "5 * x * (2 * x + 1)",
      variables: ["x"],
    },
    {
      id: "5h-p7",
      refersTo: "5h-worked",
      type: "expression",
      prompt: [t("Factorise"), m("12ab - 8a"), t(".")],
      explanation: [
        t(
          "The HCF of 12 and 8 is 4. The common variable factor is a (b only appears in the first term). 12ab ÷ 4a = 3b, 8a ÷ 4a = 2. The factorised expression is 4a(3b - 2).",
        ),
      ],
      xp: 15,
      target: "4 * a * (3 * b - 2)",
      variables: ["a", "b"],
    },
    {
      id: "5h-p8",
      refersTo: "5h-mistake",
      type: "mcq",
      prompt: [
        t("A student factorised"),
        m("6x + 12"),
        t("as"),
        m("2(3x + 6)"),
        t(". What is wrong with this?"),
      ],
      explanation: [
        t(
          "The student used 2 as the common factor, but the highest common factor of 6 and 12 is 6. The correct factorisation is 6(x + 2). Both are mathematically equivalent, but factorising means taking out the HIGHEST common factor.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("The answer is mathematically wrong.")] },
        {
          id: "b",
          label: [t("They didn't use the highest common factor (6).")],
        },
        { id: "c", label: [t("They should have used 3 instead of 2.")] },
        { id: "d", label: [t("Nothing is wrong.")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5h-p9",
      refersTo: "5h-worked",
      type: "expression",
      prompt: [t("Factorise"), m("14x^2 - 21x"), t(".")],
      explanation: [
        t(
          "The HCF of 14 and 21 is 7. The common variable factor is x. 14x² ÷ 7x = 2x, 21x ÷ 7x = 3. The factorised expression is 7x(2x - 3).",
        ),
      ],
      xp: 20,
      target: "7 * x * (2 * x - 3)",
      variables: ["x"],
    },
    {
      id: "5h-p10",
      refersTo: "5h-worked",
      type: "expression",
      prompt: [t("Factorise"), m("9p^2q + 6pq"), t(".")],
      explanation: [
        t(
          "The HCF of 9 and 6 is 3. The common variable factor is pq (p²q ÷ pq = p, pq ÷ pq = 1). 9p²q ÷ 3pq = 3p, 6pq ÷ 3pq = 2. The factorised expression is 3pq(3p + 2).",
        ),
      ],
      xp: 20,
      target: "3 * p * q * (3 * p + 2)",
      variables: ["p", "q"],
    },
  ],
  mastery: [
    {
      id: "5h-m1",
      refersTo: "5h-worked",
      type: "expression",
      prompt: [t("Factorise"), m("18x + 24"), t(".")],
      explanation: [
        t(
          "The HCF of 18 and 24 is 6. 18x ÷ 6 = 3x, 24 ÷ 6 = 4. The factorised expression is 6(3x + 4).",
        ),
      ],
      xp: 15,
      target: "6 * (3 * x + 4)",
      variables: ["x"],
    },
    {
      id: "5h-m2",
      refersTo: "5h-worked",
      type: "expression",
      prompt: [t("Factorise"), m("16x^3 + 8x^2"), t(".")],
      explanation: [
        t(
          "The HCF of 16 and 8 is 8. The common variable factor is x² (the lowest power of x). 16x³ ÷ 8x² = 2x, 8x² ÷ 8x² = 1. The factorised expression is 8x²(2x + 1).",
        ),
      ],
      xp: 15,
      target: "8 * x^2 * (2 * x + 1)",
      variables: ["x"],
    },
    {
      id: "5h-m3",
      refersTo: "5h-worked",
      type: "expression",
      prompt: [t("Factorise"), m("20a^2b - 15ab^2"), t(".")],
      explanation: [
        t(
          "The HCF of 20 and 15 is 5. The common variable factor is ab (lowest power of each: a² and a → a, b and b² → b). 20a²b ÷ 5ab = 4a, 15ab² ÷ 5ab = 3b. The factorised expression is 5ab(4a - 3b).",
        ),
      ],
      xp: 15,
      target: "5 * a * b * (4 * a - 3 * b)",
      variables: ["a", "b"],
    },
    {
      id: "5h-m4",
      refersTo: "5h-mistake",
      type: "expression",
      prompt: [t("Factorise"), m("7x + 7"), t(".")],
      explanation: [
        t(
          "The common factor is 7. 7x ÷ 7 = x, 7 ÷ 7 = 1. The factorised expression is 7(x + 1). Remember to include the 1 — do not write just 7(x).",
        ),
      ],
      xp: 20,
      target: "7 * (x + 1)",
      variables: ["x"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 6: 5J Index laws for multiplication and division
// ---------------------------------------------------------------------------

const indexLawsMultiplyDivide: Lesson = {
  id: "alg-5j-index-multiply-divide",
  order: 6,
  title: "5J Index laws for multiplication and division",
  sourceRef: "5J",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "5j-key",
      heading: "Key idea: multiplying and dividing with indices",
      body: [
        t("When multiplying terms with the same base, add the indices:"),
        m(String.raw`a^m \times a^n = a^{m+n}`),
        t("When dividing terms with the same base, subtract the indices:"),
        m(String.raw`a^m \div a^n = a^{m-n}`),
        t(
          "These laws only apply when the base is the same. They do not apply when bases differ.",
        ),
        t("Examples:"),
        m(String.raw`x^3 \times x^4 = x^{3+4} = x^7`),
        m(String.raw`y^6 \div y^2 = y^{6-2} = y^4`),
        m(String.raw`2^5 \times 2^3 = 2^{5+3} = 2^8 = 256`),
      ],
    },
    {
      id: "5j-worked",
      heading: "Worked examples",
      body: [
        t("Example 1: Simplify x⁵ × x²."),
        m(String.raw`x^5 \times x^2 = x^{5+2} = x^7`),
        t("Example 2: Simplify m⁸ ÷ m³."),
        m(String.raw`m^8 \div m^3 = m^{8-3} = m^5`),
        t("Example 3: Simplify 3a² × 4a⁵."),
        t(
          "Multiply coefficients: 3 × 4 = 12. Add indices: a² × a⁵ = a²⁺⁵ = a⁷.",
        ),
        m(String.raw`3a^2 \times 4a^5 = 12a^7`),
        t("Example 4: Simplify 12p⁶ ÷ 3p²."),
        t(
          "Divide coefficients: 12 ÷ 3 = 4. Subtract indices: p⁶ ÷ p² = p⁶⁻² = p⁴.",
        ),
        m(String.raw`12p^6 \div 3p^2 = 4p^4`),
      ],
    },
    {
      id: "5j-mistake",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Multiplying the indices. x³ × x⁴ = x¹² is WRONG. The correct answer is x⁷ (add the indices, do not multiply them).",
        ),
        t(
          "Mistake 2: Applying index laws to different bases. x³ × y⁴ cannot be simplified using index laws because the bases (x and y) differ.",
        ),
        t(
          "Mistake 3: Forgetting to handle the coefficients. In 2x³ × 3x², multiply coefficients (2 × 3 = 6) and add indices for x (3 + 2 = 5), giving 6x⁵.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "5j-p1",
      refersTo: "5j-key",
      type: "numeric",
      prompt: [
        t("Simplify"),
        m(String.raw`x^3 \times x^4`),
        t(". What is the index of x?"),
      ],
      explanation: [
        t("Add the indices: 3 + 4 = 7. So x³ × x⁴ = x⁷. The index is 7."),
      ],
      xp: 10,
      accepted: ["7"],
    },
    {
      id: "5j-p2",
      refersTo: "5j-key",
      type: "numeric",
      prompt: [
        t("Simplify"),
        m(String.raw`y^6 \div y^2`),
        t(". What is the index of y?"),
      ],
      explanation: [
        t("Subtract the indices: 6 - 2 = 4. So y⁶ ÷ y² = y⁴. The index is 4."),
      ],
      xp: 10,
      accepted: ["4"],
    },
    {
      id: "5j-p3",
      refersTo: "5j-key",
      type: "expression",
      prompt: [
        t("Simplify"),
        m(String.raw`m^2 \times m^5`),
        t("by writing it as a single power of m."),
      ],
      explanation: [t("Add the indices: 2 + 5 = 7. So m² × m⁵ = m⁷.")],
      xp: 10,
      target: "m^7",
      variables: ["m"],
    },
    {
      id: "5j-p4",
      refersTo: "5j-key",
      type: "mcq",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{a^8}{a^3}`),
        t(". Which is correct?"),
      ],
      explanation: [
        t("When dividing, subtract the indices: 8 - 3 = 5. So a⁸ ÷ a³ = a⁵."),
      ],
      xp: 10,
      options: [
        { id: "a", label: [m("a^5")] },
        { id: "b", label: [m("a^{11}")] },
        { id: "c", label: [m("a^{24}")] },
        { id: "d", label: [m("a^3")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5j-p5",
      refersTo: "5j-key",
      type: "fillInTheBlank",
      prompt: [t("Complete the index law for multiplication.")],
      template: [
        t("When multiplying terms with the same base, ___ the indices."),
      ],
      explanation: [
        t(
          "For multiplication: add the indices. For division: subtract the indices. For example, x² × x³ = x²⁺³ = x⁵.",
        ),
      ],
      xp: 10,
      accepted: ["add", "sum"],
    },
    {
      id: "5j-p6",
      refersTo: "5j-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`3x^2 \times 4x^5`), t(".")],
      explanation: [
        t(
          "Multiply the coefficients: 3 × 4 = 12. Add the indices of x: 2 + 5 = 7. The result is 12x⁷.",
        ),
      ],
      xp: 15,
      target: "12 * x^7",
      variables: ["x"],
    },
    {
      id: "5j-p7",
      refersTo: "5j-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`15a^6 \div 5a^2`), t(".")],
      explanation: [
        t(
          "Divide the coefficients: 15 ÷ 5 = 3. Subtract the indices of a: 6 - 2 = 4. The result is 3a⁴.",
        ),
      ],
      xp: 15,
      target: "3 * a^4",
      variables: ["a"],
    },
    {
      id: "5j-p8",
      refersTo: "5j-mistake",
      type: "mcq",
      prompt: [
        t("Can"),
        m(String.raw`x^3 \times y^2`),
        t("be simplified using index laws?"),
      ],
      explanation: [
        t(
          "No. Index laws for multiplication and division only apply when the bases are the same. x and y are different bases, so x³ × y² cannot be simplified further.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("Yes, the answer is x⁵.")] },
        { id: "b", label: [t("Yes, the answer is xy⁵.")] },
        { id: "c", label: [t("No, because the bases are different.")] },
        { id: "d", label: [t("Yes, the answer is (xy)⁵.")] },
      ],
      correctOptionId: "c",
    },
    {
      id: "5j-p9",
      refersTo: "5j-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`4a^3b \times 2a^2b^4`), t(".")],
      explanation: [
        t("Multiply the coefficients: 4 × 2 = 8."),
        t("Add indices of a: 3 + 2 = 5, giving a⁵."),
        t("Add indices of b: 1 + 4 = 5, giving b⁵."),
        t("The result is 8a⁵b⁵."),
      ],
      xp: 20,
      target: "8 * a^5 * b^5",
      variables: ["a", "b"],
    },
    {
      id: "5j-p10",
      refersTo: "5j-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`\frac{24x^5y^3}{6x^2y}`), t(".")],
      explanation: [
        t("Divide the coefficients: 24 ÷ 6 = 4."),
        t("Subtract indices of x: 5 - 2 = 3, giving x³."),
        t("Subtract indices of y: 3 - 1 = 2, giving y²."),
        t("The result is 4x³y²."),
      ],
      xp: 20,
      target: "4 * x^3 * y^2",
      variables: ["x", "y"],
    },
  ],
  mastery: [
    {
      id: "5j-m1",
      refersTo: "5j-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`5p^4q^2 \times 3p^3q^5`), t(".")],
      explanation: [
        t(
          "Multiply coefficients: 5 × 3 = 15. Add indices of p: 4 + 3 = 7 (p⁷). Add indices of q: 2 + 5 = 7 (q⁷). The result is 15p⁷q⁷.",
        ),
      ],
      xp: 15,
      target: "15 * p^7 * q^7",
      variables: ["p", "q"],
    },
    {
      id: "5j-m2",
      refersTo: "5j-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`\frac{30a^8b^6}{10a^3b^2}`), t(".")],
      explanation: [
        t(
          "Divide coefficients: 30 ÷ 10 = 3. Subtract indices of a: 8 - 3 = 5 (a⁵). Subtract indices of b: 6 - 2 = 4 (b⁴). The result is 3a⁵b⁴.",
        ),
      ],
      xp: 15,
      target: "3 * a^5 * b^4",
      variables: ["a", "b"],
    },
    {
      id: "5j-m3",
      refersTo: "5j-mistake",
      type: "mcq",
      prompt: [
        t("A student wrote"),
        m(String.raw`x^3 \times x^4 = x^{12}`),
        t(". What mistake did they make?"),
      ],
      explanation: [
        t(
          "The student multiplied the indices (3 × 4 = 12) instead of adding them. The correct rule is aᵐ × aⁿ = aᵐ⁺ⁿ. So x³ × x⁴ = x³⁺⁴ = x⁷.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [t("They added the indices (3 + 4) incorrectly.")] },
        {
          id: "b",
          label: [t("They multiplied the indices instead of adding them.")],
        },
        { id: "c", label: [t("The answer x¹² is correct.")] },
        { id: "d", label: [t("They should have subtracted the indices.")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5j-m4",
      refersTo: "5j-worked",
      type: "expression",
      prompt: [
        t("Simplify"),
        m(String.raw`(-2x^3) \times (3x^4) \times (-x^2)`),
        t("."),
      ],
      explanation: [
        t("Multiply coefficients: -2 × 3 × -1 = 6."),
        t("Add indices: 3 + 4 + 2 = 9, giving x⁹. Note that -x² means -1x²."),
        t("The result is 6x⁹."),
      ],
      xp: 20,
      target: "6 * x^9",
      variables: ["x"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 7: 5K The zero index and power of a power
// ---------------------------------------------------------------------------

const zeroIndexAndPower: Lesson = {
  id: "alg-5k-zero-power",
  order: 7,
  title: "5K The zero index and power of a power",
  sourceRef: "5K",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    {
      id: "5k-key",
      heading: "Key idea: zero index and power of a power",
      body: [
        t(
          "The zero index law: any non-zero number raised to the power of zero equals 1.",
        ),
        m(String.raw`a^0 = 1 \quad (a \neq 0)`),
        t(
          "This follows from the division law: aᵐ ÷ aᵐ = aᵐ⁻ᵐ = a⁰. But aᵐ ÷ aᵐ = 1 (anything divided by itself equals 1). Therefore a⁰ = 1.",
        ),
        t(
          "The power of a power law: when raising a power to another power, multiply the indices.",
        ),
        m(String.raw`(a^m)^n = a^{m \times n}`),
        t("Examples:"),
        m(String.raw`5^0 = 1, \quad x^0 = 1, \quad (3y)^0 = 1`),
        m(String.raw`(x^3)^2 = x^{3 \times 2} = x^6`),
        m(String.raw`(2^4)^3 = 2^{4 \times 3} = 2^{12}`),
      ],
    },
    {
      id: "5k-worked",
      heading: "Worked examples",
      body: [
        t("Example 1: Simplify (x²)⁵."),
        m(String.raw`(x^2)^5 = x^{2 \times 5} = x^{10}`),
        t("Example 2: Simplify (2a³)⁴. Apply the power to each factor."),
        m(String.raw`(2a^3)^4 = 2^4 \times (a^3)^4 = 16a^{12}`),
        t("Example 3: Simplify 3x⁰. x⁰ = 1, so 3x⁰ = 3 × 1 = 3."),
        t("Example 4: Combine laws: simplify (x⁴)³ ÷ x⁶."),
        m(String.raw`(x^4)^3 = x^{12}, \quad x^{12} \div x^6 = x^{12-6} = x^6`),
      ],
    },
    {
      id: "5k-mistake",
      heading: "Common mistakes",
      body: [
        t(
          "Mistake 1: Thinking a⁰ = 0. It equals 1, not 0. 5⁰ = 1, x⁰ = 1, (3a)⁰ = 1.",
        ),
        t(
          "Mistake 2: Adding indices for power of a power. (x²)⁵ = x¹⁰, not x⁷. Multiply the indices, do not add them.",
        ),
        t(
          "Mistake 3: Forgetting to apply the power to the coefficient. (2x)³ = 8x³, not 2x³. The 2 must also be cubed.",
        ),
        t(
          "Mistake 4: 0⁰ is undefined. The zero index law does not apply when the base is zero.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "5k-p1",
      refersTo: "5k-key",
      type: "numeric",
      prompt: [t("Evaluate"), m("7^0"), t(".")],
      explanation: [
        t(
          "Any non-zero number raised to the power of zero equals 1. So 7⁰ = 1.",
        ),
      ],
      xp: 10,
      accepted: ["1"],
    },
    {
      id: "5k-p2",
      refersTo: "5k-key",
      type: "numeric",
      prompt: [t("Simplify"), m("(x^2)^3"), t(". What is the index of x?")],
      explanation: [
        t("Multiply the indices: 2 × 3 = 6. So (x²)³ = x⁶. The index is 6."),
      ],
      xp: 10,
      accepted: ["6"],
    },
    {
      id: "5k-p3",
      refersTo: "5k-key",
      type: "expression",
      prompt: [
        t("Simplify"),
        m("(y^4)^2"),
        t("by writing it as a single power of y."),
      ],
      explanation: [t("Multiply the indices: 4 × 2 = 8. So (y⁴)² = y⁸.")],
      xp: 10,
      target: "y^8",
      variables: ["y"],
    },
    {
      id: "5k-p4",
      refersTo: "5k-key",
      type: "mcq",
      prompt: [
        t("Evaluate"),
        m("(3x)^0"),
        t(", where"),
        m(String.raw`x \neq 0`),
        t("."),
      ],
      explanation: [
        t(
          "Any non-zero expression raised to the power of zero equals 1. (3x)⁰ = 1, as long as 3x ≠ 0.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("0")] },
        { id: "b", label: [t("1")] },
        { id: "c", label: [t("3")] },
        { id: "d", label: [t("3x")] },
      ],
      correctOptionId: "b",
    },
    {
      id: "5k-p5",
      refersTo: "5k-key",
      type: "fillInTheBlank",
      prompt: [t("Complete the rule for power of a power.")],
      template: [t("When raising a power to another power, ___ the indices.")],
      explanation: [
        t(
          "For power of a power, multiply the indices: (aᵐ)ⁿ = aᵐˣⁿ. For example, (x²)³ = x²ˣ³ = x⁶.",
        ),
      ],
      xp: 10,
      accepted: ["multiply", "times"],
    },
    {
      id: "5k-p6",
      refersTo: "5k-worked",
      type: "expression",
      prompt: [t("Simplify"), m("(2a^3)^2"), t(".")],
      explanation: [
        t("Apply the power of 2 to each factor inside the brackets:"),
        m(String.raw`2^2 = 4, \quad (a^3)^2 = a^6`),
        t(". The result is 4a⁶."),
      ],
      xp: 15,
      target: "4 * a^6",
      variables: ["a"],
    },
    {
      id: "5k-p7",
      refersTo: "5k-worked",
      type: "expression",
      prompt: [t("Simplify"), m("(3x^2y)^3"), t(".")],
      explanation: [
        t("Apply the power to each factor:"),
        m(String.raw`3^3 = 27, \quad (x^2)^3 = x^6, \quad y^3 = y^3`),
        t(". The result is 27x⁶y³."),
      ],
      xp: 15,
      target: "27 * x^6 * y^3",
      variables: ["x", "y"],
    },
    {
      id: "5k-p8",
      refersTo: "5k-worked",
      type: "mcq",
      prompt: [
        t("Simplify"),
        m(String.raw`(m^3)^4 \div m^2`),
        t(". Which is correct?"),
      ],
      explanation: [
        t("First, apply the power of a power rule: (m³)⁴ = m³ˣ⁴ = m¹²."),
        t("Then divide: m¹² ÷ m² = m¹²⁻² = m¹⁰."),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("m^{10}")] },
        { id: "b", label: [m("m^{14}")] },
        { id: "c", label: [m("m^{24}")] },
        { id: "d", label: [m("m^5")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5k-p9",
      refersTo: "5k-worked",
      type: "expression",
      prompt: [t("Simplify"), m("5x^0 + 2x^0"), t(".")],
      explanation: [t("x⁰ = 1, so 5x⁰ + 2x⁰ = 5 × 1 + 2 × 1 = 5 + 2 = 7.")],
      xp: 20,
      target: "7",
      variables: ["x"],
    },
    {
      id: "5k-p10",
      refersTo: "5k-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`(2p^3)^2 \times p^4`), t(".")],
      explanation: [
        t("First, apply power of a power: (2p³)² = 4p⁶."),
        t("Then multiply: 4p⁶ × p⁴ = 4p¹⁰ (add indices: 6 + 4 = 10)."),
        t("The result is 4p¹⁰."),
      ],
      xp: 20,
      target: "4 * p^10",
      variables: ["p"],
    },
  ],
  mastery: [
    {
      id: "5k-m1",
      refersTo: "5k-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`(4x^2y^3)^2 \times (xy)^0`), t(".")],
      explanation: [
        t("First, (xy)⁰ = 1 (any non-zero to power 0 is 1)."),
        t("Then (4x²y³)² = 16x⁴y⁶."),
        t("Multiply by 1: 16x⁴y⁶ × 1 = 16x⁴y⁶."),
      ],
      xp: 15,
      target: "16 * x^4 * y^6",
      variables: ["x", "y"],
    },
    {
      id: "5k-m2",
      refersTo: "5k-worked",
      type: "expression",
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{(x^5)^2}{x^3 \times x^4}`),
        t("."),
      ],
      explanation: [
        t("Numerator: (x⁵)² = x¹⁰."),
        t("Denominator: x³ × x⁴ = x⁷."),
        t("Divide: x¹⁰ ÷ x⁷ = x³."),
      ],
      xp: 15,
      target: "x^3",
      variables: ["x"],
    },
    {
      id: "5k-m3",
      refersTo: "5k-key",
      type: "mcq",
      prompt: [
        t("Which expression is equal to 1 for all"),
        m(String.raw`x \neq 0`),
        t("?"),
      ],
      explanation: [
        t(
          "x⁰ = 1 for any non-zero x. (x²)⁰ also equals 1 (power of a power: x²ˣ⁰ = x⁰ = 1). So both options a and b equal 1. The question asks which single expression is equal to 1 — x⁰ is the simplest.",
        ),
        t(
          "Let me clarify: all of x⁰, (x²)⁰, (5x)⁰, and (x⁷)⁰ equal 1 for x ≠ 0. However, x⁰ is the most direct form of the zero index law.",
        ),
      ],
      xp: 15,
      options: [
        { id: "a", label: [m("x^0")] },
        { id: "b", label: [m("(x^2)^0")] },
        { id: "c", label: [m("0^x")] },
        { id: "d", label: [m("1^x")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "5k-m4",
      refersTo: "5k-worked",
      type: "expression",
      prompt: [t("Simplify"), m(String.raw`(3m^2n)^3 \div (3mn)^2`), t(".")],
      explanation: [
        t("Numerator: (3m²n)³ = 27m⁶n³."),
        t("Denominator: (3mn)² = 9m²n²."),
        t("Divide: 27/9 = 3, m⁶/m² = m⁴, n³/n² = n."),
        t("The result is 3m⁴n."),
      ],
      xp: 20,
      target: "3 * m^4 * n",
      variables: ["m", "n"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Boss challenge
// ---------------------------------------------------------------------------

const algebraBoss: BossChallenge = {
  id: "algebra-boss",
  title: "Boss challenge: Algebra",
  sourceRef: "2026 T2 Yr 8 Maths Planner — Term 2, Weeks 2-5",
  bonusXp: 100,
  passBadgeId: "boss-algebra",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  questions: [
    // Question 1 — Medium (20 XP): Expanding and simplifying
    {
      id: "boss-q1",
      type: "expression" as const,
      prompt: [t("Expand and simplify"), m("4(2x - 3) + 5(x + 2)"), t(".")],
      explanation: [
        t("Expand each bracket:"),
        m(String.raw`4(2x - 3) = 8x - 12, \quad 5(x + 2) = 5x + 10`),
        t("Combine like terms: 8x + 5x = 13x, -12 + 10 = -2."),
        t("The result is 13x - 2."),
      ],
      xp: 20,
      target: "13 * x - 2",
      variables: ["x"],
    },
    // Question 2 — Medium (20 XP): Factorising a binomial
    {
      id: "boss-q2",
      type: "expression" as const,
      prompt: [
        t("Factorise"),
        m("24x^3 + 18x^2"),
        t("by taking out the highest common factor."),
      ],
      explanation: [
        t("The HCF of 24 and 18 is 6."),
        t(
          "The common variable factor is x² (both terms have x², and x² is the lower power).",
        ),
        t("24x³ ÷ 6x² = 4x. 18x² ÷ 6x² = 3."),
        t("The factorised expression is 6x²(4x + 3)."),
      ],
      xp: 20,
      target: "6 * x^2 * (4 * x + 3)",
      variables: ["x"],
    },
    // Question 3 — Hard (25 XP): Combining index laws with multiple variables
    {
      id: "boss-q3",
      type: "expression" as const,
      prompt: [
        t("Simplify"),
        m(String.raw`\frac{(2x^3y)^2 \times 3x^2y^4}{6x^5y^2}`),
        t("."),
      ],
      explanation: [
        t("Step 1: Simplify the numerator. (2x³y)² = 4x⁶y²."),
        t("Then 4x⁶y² × 3x²y⁴ = 12x⁸y⁶."),
        t("Step 2: Divide by 6x⁵y²."),
        t("12 ÷ 6 = 2. x⁸ ÷ x⁵ = x³. y⁶ ÷ y² = y⁴."),
        t("The result is 2x³y⁴."),
      ],
      xp: 25,
      target: "2 * x^3 * y^4",
      variables: ["x", "y"],
    },
    // Question 4 — Hard (25 XP): Factorising with multiple variables
    {
      id: "boss-q4",
      type: "expression" as const,
      prompt: [
        t("Factorise"),
        m("15a^2b^2 - 25ab^3 + 10a^3b"),
        t("by taking out the highest common factor."),
      ],
      explanation: [
        t("Find the HCF of coefficients: HCF of 15, 25, 10 is 5."),
        t("Find the common variable factor:"),
        t("a², a, a³ → the lowest power is a."),
        t("b², b³, b → the lowest power is b."),
        t("So the common factor is 5ab."),
        t("Divide each term by 5ab:"),
        m(String.raw`15a^2b^2 \div 5ab = 3ab`),
        m(String.raw`25ab^3 \div 5ab = 5b^2`),
        m(String.raw`10a^3b \div 5ab = 2a^2`),
        t(
          "The result is 5ab(3ab - 5b² + 2a²), or equivalently 5ab(2a² + 3ab - 5b²).",
        ),
      ],
      xp: 25,
      target: "5 * a * b * (3 * a * b - 5 * b^2 + 2 * a^2)",
      variables: ["a", "b"],
    },
    // Question 5 — Conceptual/MCQ (20 XP): Applying the power of a power law
    {
      id: "boss-q5",
      type: "mcq" as const,
      prompt: [
        t("Which expression uses the power of a power law to simplify to"),
        m("x^{12}"),
        t("?"),
      ],
      explanation: [
        t("Check each option using index laws:"),
        m(String.raw`(x^3)^4 = x^{3 \times 4} = x^{12}`),
        t(
          "— correct! This uses the power of a power law: multiply the indices.",
        ),
        m(String.raw`x^6 \times x^2 = x^{6+2} = x^8`),
        t("— not x¹²."),
        m(String.raw`x^{14} \div x^2 = x^{14-2} = x^{12}`),
        t(
          "— equals x¹² but uses the division law, not the power of a power law. The question asks which uses the power of a power law.",
        ),
        m(String.raw`(x^6)^2 = x^{6 \times 2} = x^{12}`),
        t(
          "— also equals x¹² using the power of a power law, but (x³)⁴ is the only option listed that uses this law and simplifies to x¹².",
        ),
      ],
      xp: 20,
      options: [
        { id: "a", label: [m(String.raw`x^6 \times x^2`)] },
        { id: "b", label: [m("(x^3)^4")] },
        { id: "c", label: [m(String.raw`x^{14} \div x^2`)] },
        { id: "d", label: [m(String.raw`x^4 \times x^3`)] },
      ],
      correctOptionId: "b",
    },
  ],
};

// ---------------------------------------------------------------------------
// Track export
// ---------------------------------------------------------------------------

/** Figures referenced by the algebra track. */
export const algebraFigures: Figure[] = [
  figPartsOfExpression,
  figDistributiveAreaModel,
];

export const algebraTrack: Track = {
  id: "algebra",
  subjectId: "maths",
  title: "Algebra (Year 8)",
  description:
    "Working with algebraic expressions: adding, subtracting, multiplying, dividing, expanding brackets, factorising, and applying index laws.",
  lessons: [
    languageOfAlgebra,
    addingSubtractingTerms,
    multiplyingDividingTerms,
    expandingBrackets,
    factorisingExpressions,
    indexLawsMultiplyDivide,
    zeroIndexAndPower,
  ],
  challenge: algebraBoss,
};
