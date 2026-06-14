import { normaliseShortText } from "./normalise";

import type { MarkResult } from "./markResult";
import type { FillInTheBlankQuestion } from "../content/types";

/**
 *
 */
export function markFillInTheBlank(
  question: FillInTheBlankQuestion,
  rawInput: string,
): MarkResult {
  const input = normaliseShortText(rawInput);
  if (input === "") {
    return { status: "incorrect" };
  }
  const accepted = question.accepted.map((value) => normaliseShortText(value));
  return accepted.includes(input)
    ? { status: "correct" }
    : { status: "incorrect" };
}
