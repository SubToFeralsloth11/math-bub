/**
 * Small helpers for authoring rich-content blocks concisely.
 *
 * @module content/blocks
 */

import type { RichBlock } from "../domain/content/types";

/**
 * Builds a plain-text content block.
 *
 * @param text - The text content.
 * @returns A text {@link RichBlock}.
 */
export function t(text: string): RichBlock {
  return { kind: "text", text };
}

/**
 * Builds a maths content block.
 *
 * @param tex - The TeX source to typeset.
 * @param fallback - Plain-text fallback; defaults to the TeX source.
 * @returns A maths {@link RichBlock}.
 */
export function m(tex: string, fallback?: string): RichBlock {
  return { kind: "math", tex, fallback: fallback ?? tex };
}
