import { useState } from "react";

import type { Figure as FigureData } from "../domain/content/types";

interface FigureProps {
  /** The figure content (asset id, alt text, text fallback). */
  figure: FigureData;
}

/**
 * Renders a geometry figure as an image when its asset is available, degrading
 * to a clearly-labelled text description when the image is missing or fails to
 * load, so the surrounding question remains answerable (FR-013).
 *
 * @param props - The component props.
 * @param props.figure - The figure content.
 * @returns The image, or a labelled text-fallback panel.
 */
export function Figure({ figure }: Readonly<FigureProps>) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <figure className="my-3 rounded-bub bg-cream-deep p-4 ring-1 ring-hairline">
        <figcaption className="mb-1 font-display text-sm font-semibold text-muted">
          Figure description
        </figcaption>
        <p className="text-ink/80">{figure.textFallback}</p>
      </figure>
    );
  }

  return (
    <img
      src={`/figures/${figure.id}.png`}
      alt={figure.alt}
      onError={() => setFailed(true)}
      className="my-3 max-h-72 w-full rounded-bub object-contain ring-1 ring-hairline"
    />
  );
}
