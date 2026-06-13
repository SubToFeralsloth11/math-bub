/**
 * Normalisation for numeric and short-text answers.
 *
 * @module domain/marking/normalise
 */

/**
 * Escapes a string for safe use inside a regular expression.
 *
 * @param value - The raw string to escape.
 * @returns The string with regex metacharacters escaped.
 */
function escapeRegExp(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

/**
 * Normalises raw answer input for tolerant comparison: Unicode-normalises,
 * trims, collapses internal whitespace, case-folds, converts common Unicode
 * math symbols (minus, multiplication, division) to ASCII, and strips a
 * trailing unit when one is supplied.
 *
 * @param raw - The raw input string.
 * @param unit - An optional unit to strip from the end (e.g. "cm").
 * @returns The normalised string (empty for whitespace-only input).
 */
export function normalise(raw: string, unit?: string): string {
  let value = raw
    .normalize("NFKC")
    .replaceAll("−", "-")
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .trim()
    .toLowerCase()
    .replaceAll(/\s+/g, " ");

  if (unit) {
    const unitPattern = new RegExp(
      String.raw`\s*${escapeRegExp(unit.toLowerCase())}$`,
    );
    value = value.replace(unitPattern, "").trim();
  }

  return value;
}
