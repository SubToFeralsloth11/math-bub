/**
 * Algebraic equivalence by deterministic numeric sampling.
 *
 * Two expressions are equivalent if they evaluate equal at many fixed sample
 * assignments of their variables. The sample set is fixed (no `Math.random`), so
 * results are deterministic and tests are stable. Samples that make either side
 * undefined are skipped; if too few valid samples remain, the check falls back
 * to comparing mathjs-simplified forms (see contracts/markingApi.md).
 *
 * @module domain/marking/equivalence
 */

import { parse, simplify } from "mathjs";

// A fixed pool of non-integer sample values in a small magnitude range. Small
// magnitudes avoid overflow for index-law expressions; non-integers avoid
// coincidental integer agreements.
const SAMPLE_POOL = [
  2.3, -1.7, 3.1, 0.7, -3.4, 1.9, -2.6, 3.7, 1.3, -0.9, 2.8, -3.1, 0.4, -2.2,
  3.4, -1.1, 2.1, -3.7, 1.6, -0.6,
];

// The number of sample assignments to test, and the minimum number that must be
// valid before a clean sampling pass is trusted without the simplify fallback.
const SAMPLE_COUNT = 16;
const MIN_VALID_SAMPLES = 8;

/**
 * Builds the deterministic set of sample variable assignments.
 *
 * @param variables - The variable names to sample.
 * @returns A list of scope objects mapping each variable to a number.
 */
function buildSamples(variables: string[]): Record<string, number>[] {
  if (variables.length === 0) return [{}];
  const samples: Record<string, number>[] = [];
  for (let index = 0; index < SAMPLE_COUNT; index += 1) {
    const scope: Record<string, number> = {};
    for (const [variableIndex, name] of variables.entries()) {
      const poolIndex =
        (index * variables.length + variableIndex) % SAMPLE_POOL.length;
      scope[name] = SAMPLE_POOL[poolIndex];
    }
    samples.push(scope);
  }
  return samples;
}

/**
 * Whether a value is a usable finite real number.
 *
 * @param value - The value produced by evaluating an expression.
 * @returns True if the value is a finite number.
 */
function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * Whether two numbers agree within a small absolute/relative tolerance.
 *
 * @param a - The first value.
 * @param b - The second value.
 * @returns True if the values are close enough to be considered equal.
 */
function closeEnough(a: number, b: number): boolean {
  return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
}

/**
 * Compares two mathjs-simplified expressions for symbolic equality, used as a
 * fallback when sampling cannot gather enough valid points.
 *
 * @param a - The first expression.
 * @param b - The second expression.
 * @returns True if the simplified difference is zero.
 */
function simplifiesEqual(a: string, b: string): boolean {
  try {
    return simplify(`(${a}) - (${b})`).toString() === "0";
  } catch {
    return false;
  }
}

/**
 * Inserts explicit multiplication between adjacent single-character variables so
 * that a learner's concatenated answer like `6ab` is read as `6*a*b` rather than
 * the single symbol `ab` (mathjs does not treat `ab` as a product).
 *
 * @param expression - The expression to normalise.
 * @param variables - The declared single-character variables.
 * @returns The expression with explicit `*` inserted between adjacent variables.
 */
function withExplicitMultiplication(
  expression: string,
  variables: string[],
): string {
  const single = new Set(variables.filter((name) => name.length === 1));
  if (single.size === 0) return expression;
  let result = "";
  for (let index = 0; index < expression.length; index += 1) {
    const current = expression[index];
    const next = expression[index + 1];
    result += current;
    if (next !== undefined && single.has(current) && single.has(next)) {
      result += "*";
    }
  }
  return result;
}

/**
 * Tests whether two expressions are mathematically equivalent over the given
 * variables.
 *
 * @param a - The first expression (mathjs syntax).
 * @param b - The second expression (mathjs syntax).
 * @param variables - The variable symbols to sample.
 * @returns True if the expressions agree across all valid samples.
 * @throws If either expression fails to parse.
 */
export function areEquivalent(
  a: string,
  b: string,
  variables: string[],
): boolean {
  const compiledA = parse(withExplicitMultiplication(a, variables)).compile();
  const compiledB = parse(withExplicitMultiplication(b, variables)).compile();

  let validSamples = 0;
  for (const scope of buildSamples(variables)) {
    let valueA: unknown;
    let valueB: unknown;
    try {
      valueA = compiledA.evaluate(scope);
      valueB = compiledB.evaluate(scope);
    } catch {
      continue;
    }
    if (!isFiniteNumber(valueA) || !isFiniteNumber(valueB)) continue;
    validSamples += 1;
    if (!closeEnough(valueA, valueB)) return false;
  }

  if (validSamples >= MIN_VALID_SAMPLES) return true;
  return simplifiesEqual(
    withExplicitMultiplication(a, variables),
    withExplicitMultiplication(b, variables),
  );
}
