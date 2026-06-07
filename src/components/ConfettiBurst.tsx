import confetti from "canvas-confetti";
import { useEffect } from "react";

import { confettiColours } from "../theme/tokens";

/**
 * Whether the user has asked for reduced motion.
 *
 * @returns True if the prefers-reduced-motion media query matches.
 */
function prefersReducedMotion(): boolean {
  return (
    typeof globalThis.matchMedia === "function" &&
    globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Fires a brief confetti burst once when mounted, for celebration moments such
 * as completing a lesson or levelling up. It honours reduced-motion preferences
 * and fails silently if the confetti library is unavailable, so it never blocks
 * the surrounding screen.
 *
 * @returns Nothing; this component renders no DOM.
 */
export function ConfettiBurst() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    try {
      void confetti({
        particleCount: 120,
        spread: 75,
        startVelocity: 38,
        origin: { y: 0.6 },
        colors: confettiColours(),
        disableForReducedMotion: true,
      });
    } catch {
      // A celebration animation is non-essential; ignore any failure.
    }
  }, []);

  return null;
}
