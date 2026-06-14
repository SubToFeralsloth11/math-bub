import { useCallback, useEffect, useRef, useState } from "react";

import { ImageLightbox } from "./ImageLightbox";

import type { Figure as FigureData } from "../domain/content/types";

/**
 * @author John Grimes
 */

/** Module-level reference to the close handler of the currently-open lightbox, so
 * opening a second figure automatically closes any previously-open one. */
let activeCloseHandler: (() => void) | null = null;

interface FigureProps {
  /** The figure content (asset id, alt text, text fallback). */
  figure: FigureData;
}

/**
 * Renders a geometry figure as an image when its asset is available, degrading
 * to a clearly-labelled text description when the image is missing or fails to
 * load, so the surrounding question remains answerable (FR-013).
 *
 * When the image loads successfully, the inline figure gains a zoom cursor and
 * a magnifying-glass icon on hover. Clicking the image opens a full-viewport
 * lightbox overlay (FR-001, FR-002).
 *
 * @param props - The component props.
 * @param props.figure - The figure content.
 * @returns The image, or a labelled text-fallback panel.
 */
export function Figure({ figure }: Readonly<FigureProps>) {
  const [failed, setFailed] = useState(false);
  const [triedWebp, setTriedWebp] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  /** Open this figure's lightbox, closing any previously-open lightbox first. */
  const openLightbox = useCallback(() => {
    activeCloseHandler?.();
    setLightboxOpen(true);
  }, []);

  /** Close this figure's lightbox and clear the module-level handler. */
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  /** Register this figure as the active lightbox when open. */
  useEffect(() => {
    activeCloseHandler = lightboxOpen ? closeLightbox : null;
    return () => {
      if (activeCloseHandler === closeLightbox) {
        activeCloseHandler = null;
      }
    };
  }, [lightboxOpen, closeLightbox]);

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

  /** Try WebP first, falling back to PNG if unavailable. */
  const handleError = () => {
    if (triedWebp) {
      setFailed(true);
    } else {
      setTriedWebp(true);
    }
  };

  const ext = triedWebp ? ".png" : ".webp";
  const src = `/figures/${figure.id}${ext}`;

  return (
    <>
      <div
        ref={triggerRef}
        className="group relative my-3 cursor-zoom-in"
        onClick={openLightbox}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightbox();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View full size: ${figure.alt}`}
      >
        <img
          src={src}
          alt={figure.alt}
          onError={handleError}
          className="max-h-72 w-full rounded-bub object-contain ring-1 ring-hairline"
        />
        {/* Magnifying-glass icon, visible on hover. Hidden from screen readers
            because the parent button already conveys the label. */}
        <div
          aria-hidden="true"
          data-testid="zoom-icon"
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-md bg-white/90 opacity-0 ring-1 ring-hairline transition-opacity group-hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5 text-ink/60"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox
          src={src}
          alt={figure.alt}
          onClose={closeLightbox}
          triggerRef={triggerRef}
        />
      )}
    </>
  );
}
