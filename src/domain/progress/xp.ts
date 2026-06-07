/**
 * XP arithmetic, level derivation, and accuracy helpers.
 *
 * Levels follow a smoothly increasing curve: the cumulative XP required to reach
 * level L is `25 * (L - 1) * L`, so each level costs 50 XP more than the last
 * (50, 100, 150, ...). Level derivation is the inverse of that curve.
 *
 * @module domain/progress/xp
 */

/**
 * The cumulative XP required to reach a given level.
 *
 * @param level - The level (1-based).
 * @returns The total XP needed to be at that level.
 */
export function xpForLevel(level: number): number {
  return 25 * (level - 1) * level;
}

/**
 * Derives the current level from a total XP amount.
 *
 * @param xp - The total accumulated XP.
 * @returns The 1-based level for that XP total.
 */
export function levelFor(xp: number): number {
  if (xp <= 0) return 1;
  const level = Math.floor((1 + Math.sqrt(1 + (4 * xp) / 25)) / 2);
  return Math.max(1, level);
}

/**
 * Whether adding XP crossed into a new level.
 *
 * @param previousXp - The XP total before the award.
 * @param newXp - The XP total after the award.
 * @returns True if the level increased.
 */
export function isLevelUp(previousXp: number, newXp: number): boolean {
  return levelFor(newXp) > levelFor(previousXp);
}

/** A summary of progress through the current level, for the XP bar. */
export interface LevelProgress {
  /** The current level. */
  level: number;
  /** XP earned into the current level. */
  intoLevel: number;
  /** Total XP span of the current level. */
  span: number;
  /** XP remaining until the next level. */
  toNext: number;
  /** Fraction through the current level, 0..1. */
  fraction: number;
}

/**
 * Computes progress through the current level for display.
 *
 * @param xp - The total accumulated XP.
 * @returns A {@link LevelProgress} summary.
 */
export function levelProgress(xp: number): LevelProgress {
  const level = levelFor(xp);
  const start = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const span = next - start;
  const intoLevel = xp - start;
  return {
    level,
    intoLevel,
    span,
    toNext: next - xp,
    fraction: span > 0 ? intoLevel / span : 0,
  };
}

/**
 * Adds an XP amount to a running total, clamped to be non-negative.
 *
 * @param current - The current XP total.
 * @param amount - The XP to add (may be zero).
 * @returns The new total, never below zero.
 */
export function addXp(current: number, amount: number): number {
  return Math.max(0, current + amount);
}

/**
 * Computes answer accuracy as a fraction in the range 0..1.
 *
 * @param correct - The number of correct answers.
 * @param total - The total number of questions.
 * @returns The accuracy fraction; 0 when there are no questions.
 */
export function accuracy(correct: number, total: number): number {
  if (total <= 0) return 0;
  return correct / total;
}
