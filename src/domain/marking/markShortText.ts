import { markAcceptedSubstring } from "./markAcceptedSubstring";

import type { MarkResult } from "./markResult";
import type { ShortTextQuestion } from "../content/types";

/**
 * Marks a short-text answer using word-boundary-aware substring matching
 * against the `accepted` keyword/phrase list. At least `ceil(n / 2)` of the
 * accepted values must appear as whole-word substrings in the learner's
 * answer for it to be marked correct.
 *
 * `markAcceptedText` (exact matching) is still used by
 * `markFillInTheBlank`; `markShortText` was changed to substring matching
 * because short-text questions expect sentence answers where exact
 * strings are an unreasonable bar.
 *
 * @param question - The short-text question.
 * @param rawInput - The raw user input.
 * @returns A {@link MarkResult} with status "correct" or "incorrect".
 */
export function markShortText(
  question: ShortTextQuestion,
  rawInput: string,
): MarkResult {
  return markAcceptedSubstring(rawInput, question.accepted);
}
