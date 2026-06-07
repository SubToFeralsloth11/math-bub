/**
 * Design tokens for MathBub, mirrored from the Tailwind theme in `index.css`.
 *
 * The CSS layer is the source of truth for styling; these constants exist so
 * non-CSS code (confetti colours, per-track theming, chart fills) can reference
 * the same palette without hard-coding hex values in components.
 *
 * @module theme/tokens
 */

import type { TrackId } from "../domain/content/types";

/** The core MathBub colour palette. */
export const palette = {
  /** Warm cream page background. */
  cream: "#FBF4EA",
  /** Primary ink for body text and headings. */
  ink: "#2A2342",
  /** Muted ink for secondary text. */
  muted: "#6B6480",
  /** Signature brand colour (logo, primary actions, focus rings). */
  brand: "#6D4AFF",
  /** Reward colour for XP and level indicators. */
  xp: "#FFB020",
  /** Positive feedback colour. */
  success: "#1FA971",
  /** Gentle incorrect-answer colour (never harsh). */
  warn: "#F2545B",
} as const;

/** Accent colours keyed by track, used to theme maps, cards and figures. */
export const trackAccent: Record<TrackId, string> = {
  algebra: "#6D4AFF",
  geometry: "#0FB6A8",
  time: "#FF7A4D",
};

/**
 * The ordered colours used for the level-up confetti burst.
 *
 * @returns A list of hex colour strings drawn from the brand palette.
 */
export function confettiColours(): string[] {
  return [palette.brand, palette.xp, palette.success, trackAccent.geometry];
}
