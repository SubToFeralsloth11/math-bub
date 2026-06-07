/**
 * Marking for multiple-choice questions.
 *
 * @module domain/marking/markMcq
 */

import type { MarkResult } from "./markResult";
import type { McqQuestion } from "../content/types";

/**
 * Marks a multiple-choice answer.
 *
 * @param question - The MCQ being answered.
 * @param selectedOptionId - The id of the option the learner selected.
 * @returns `correct` when the selected option is the correct one, else `incorrect`.
 */
export function markMcq(
  question: McqQuestion,
  selectedOptionId: string,
): MarkResult {
  return selectedOptionId === question.correctOptionId
    ? { status: "correct" }
    : { status: "incorrect" };
}
