import { escapeRegExp, normaliseShortText } from "./normalise";

import type { MarkResult } from "./markResult";

/**
 * Marks a short-text answer using word-boundary-aware substring matching
 * against the `accepted` keyword/phrase list. The learner's answer is marked
 * correct when at least `ceil(n / 2)` of the accepted values appear as
 * whole-word (or whole-phrase) substrings in the normalised input.
 *
 * Word boundaries are detected using the JavaScript `\b` anchor, which
 * matches at the transition between a word character (`[a-zA-Z0-9_]`) and a
 * non-word character (including start/end of string). This prevents e.g.
 * `"12"` from matching inside `"123"` while allowing `"living,"` to match
 * `"living"`.
 *
 * Empty or whitespace-only input is rejected before any matching is
 * attempted, preserving the guard from the original `markAcceptedText`.
 *
 * @param rawInput - The raw user input.
 * @param accepted - The list of accepted keywords or phrases.
 * @returns A {@link MarkResult} with status "correct" or "incorrect".
 *
 * @example
 * // Sentence answer with sufficient keyword matches.
 * markAcceptedSubstring(
 *   "Yes, a raw mushroom is a living organism made of cells",
 *   ["yes", "living", "organism", "made of cells"],
 * );
 * // → { status: "correct" } (4 of 4 matched, ceil(4/2) = 2 threshold)
 *
 * @example
 * // Input below the threshold.
 * markAcceptedSubstring("I don't know", ["yes", "living", "organism", "made of cells"]);
 * // → { status: "incorrect" } (0 of 4 matched)
 */
export function markAcceptedSubstring(
  rawInput: string,
  accepted: string[],
): MarkResult {
  const input = normaliseShortText(rawInput);
  if (input === "") {
    return { status: "incorrect" };
  }

  const threshold = Math.ceil(accepted.length / 2);
  let matchCount = 0;

  for (const value of accepted) {
    const normalised = normaliseShortText(value);
    if (normalised === "") {
      continue;
    }
    const escaped = escapeRegExp(normalised);
    const regex = new RegExp(String.raw`\b${escaped}\b`);
    if (regex.test(input)) {
      matchCount++;
      if (matchCount >= threshold) {
        return { status: "correct" };
      }
    }
  }

  return { status: "incorrect" };
}
