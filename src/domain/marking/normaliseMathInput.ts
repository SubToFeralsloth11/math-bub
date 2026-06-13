/**
 * Normalisation of learner math input before parsing or comparison.
 *
 * Converts common Unicode math symbols to their ASCII equivalents so that
 * mathjs (which requires strict ASCII input) can parse expressions learners
 * may type or paste (e.g. fullwidth plus/equals, multiplication sign,
 * superscript digits, Unicode minus).
 *
 * @module domain/marking/normaliseMathInput
 */

/** Maps Unicode superscript and subscript digits to their normal forms. */
const SUPERSCRIPT_TO_DIGIT: Record<string, string> = {
  "\u2070": "0",
  "\u00B9": "1",
  "\u00B2": "2",
  "\u00B3": "3",
  "\u2074": "4",
  "\u2075": "5",
  "\u2076": "6",
  "\u2077": "7",
  "\u2078": "8",
  "\u2079": "9",
  "\u207A": "+",
  "\u207B": "-",
};

/**
 * Converts superscript-digit/-sign runs (e.g. "x²" → "x^2", "x⁻¹" → "x^-1")
 * into power notation before NFKC strips the superscript glyphs.
 */
function convertSuperscripts(raw: string): string {
  let result = "";
  let inSuperscript = false;
  for (const char of raw) {
    const mapped = SUPERSCRIPT_TO_DIGIT[char];
    if (mapped === undefined) {
      inSuperscript = false;
      result += char;
    } else {
      if (!inSuperscript) {
        result += "^";
        inSuperscript = true;
      }
      result += mapped;
    }
  }
  return result;
}

/**
 * Normalises raw learner input for math expression parsing.
 *
 * - NFKC normalises (converts fullwidth ＋→+, ＝→=, －→−, etc.)
 * - Converts Unicode minus − → -
 * - Converts multiplication sign × → *
 * - Converts division sign ÷ → /
 * - Converts superscript digits (x² → x^2, x³ → x^3, etc.)
 * - Trims and collapses whitespace
 *
 * @param raw - The raw learner input string.
 * @returns The normalised string suitable for mathjs parsing.
 */
export function normaliseMathInput(raw: string): string {
  return convertSuperscripts(raw)
    .normalize("NFKC")
    .replaceAll("−", "-")
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replaceAll(/\s+/g, " ")
    .trim();
}

/**
 * Normalises and prepares an expression for equivalence checking.
 *
 * Handles the `=` case: if the input contains `=`, the right-hand side
 * (after the last `=`) is used as the answer expression.  This lets a
 * learner type "x=5" when the target expression is "5".
 *
 * @param raw - The raw learner input string.
 * @returns The normalised expression ready for parsing, and whether the
 *   original input contained an `=` sign.
 */
export function normaliseExpression(raw: string): {
  expression: string;
  hadEquals: boolean;
} {
  let value = normaliseMathInput(raw);

  if (value.includes("=")) {
    const parts = value.split("=");
    // Take the right-hand side of the last `=`
    value = parts.at(-1)!.trim();
    return { expression: value, hadEquals: true };
  }

  return { expression: value, hadEquals: false };
}
