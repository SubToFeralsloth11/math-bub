/**
 * Marking for algebraic-expression questions.
 *
 * Any input mathematically equivalent to the question's target is correct.
 * Unparseable input is reported as `unreadable` (never thrown) so the UI can
 * prompt a gentle re-entry (FR-010).
 *
 * @module domain/marking/markExpression
 */

import { parse } from "mathjs";

import { areEquivalent } from "./equivalence";
import { normaliseExpression } from "./normaliseMathInput";

import type { MarkResult } from "./markResult";
import type { ExpressionQuestion } from "../content/types";

/**
 * Marks an algebraic-expression answer by equivalence to the target.
 *
 * Input is normalised first: Unicode math symbols are converted to ASCII
 * equivalents (e.g. ×→*, ÷→/, ²→^2), and when the input contains `=` the
 * right-hand side is used as the answer expression so learners can type
 * "x=5" or "2(a+b)=2a+2b" naturally.
 *
 * @param question - The expression question being answered.
 * @param rawInput - The learner's raw input.
 * @returns `unreadable` if the input cannot be parsed, otherwise `correct` when
 *   equivalent to the target and `incorrect` when not.
 */
export function markExpression(
  question: ExpressionQuestion,
  rawInput: string,
): MarkResult {
  const { expression } = normaliseExpression(rawInput);

  if (expression === "") {
    return { status: "unreadable" };
  }
  try {
    parse(expression);
  } catch {
    return { status: "unreadable" };
  }
  try {
    return areEquivalent(expression, question.target, question.variables)
      ? { status: "correct" }
      : { status: "incorrect" };
  } catch {
    // Any unexpected parse/evaluation failure degrades to a re-entry prompt
    // rather than crashing the lesson.
    return { status: "unreadable" };
  }
}
