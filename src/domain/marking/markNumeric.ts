/**
 * Marking for numeric and short-text questions.
 *
 * @module domain/marking/markNumeric
 */

import { normalise } from "./normalise";

import type { MarkResult } from "./markResult";
import type { NumericQuestion } from "../content/types";

/**
 * Marks a numeric or short-text answer after normalisation.
 *
 * Input and accepted answers are normalised identically (trim, collapse
 * whitespace, case-fold, strip the configured unit), so insignificant formatting
 * differences do not cause a mismatch. Empty input is incorrect, never unreadable.
 *
 * @param question - The numeric question being answered.
 * @param rawInput - The learner's raw input.
 * @returns `correct` on any accepted match, otherwise `incorrect`.
 */
export function markNumeric(
  question: NumericQuestion,
  rawInput: string,
): MarkResult {
  const input = normalise(rawInput, question.unit);
  if (input === "") {
    return { status: "incorrect" };
  }
  const accepted = question.accepted.map((value) =>
    normalise(value, question.unit),
  );
  return accepted.includes(input)
    ? { status: "correct" }
    : { status: "incorrect" };
}
