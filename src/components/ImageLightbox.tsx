import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * @author John Grimes
 */

interface ImageLightboxProps {
  /** URL of the image to display at full size. */
  src: string;
  /** Accessible alt text for the image. */
  alt: string;
  /** Called when the lightbox has finished its close transition and should be removed. */
  onClose: () => void;
  /** Ref to the element that triggered the lightbox, for focus restore on close. */
  triggerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * A portal-based full-viewport image lightbox overlay.
 *
 * Renders a dark backdrop with the image centred and scaled to fit the
 * viewport. Closable via backdrop click, close button, or Escape key.
 * Traps focus within the overlay while open, locks background scroll, plays
 * a scale+fade close transition before unmounting, and honours
 * prefers-reduced-motion by making transitions instant.
 *
 * @param props - The component props.
 * @param props.src - The image source URL.
 * @param props.alt - Accessible alt text for the image.
 * @param props.onClose - Callback invoked after the close transition completes.
 * @param props.triggerRef - Ref to the element to restore focus to on close.
 * @returns A React portal rendering the lightbox into document.body.
 */
export function ImageLightbox({
  src,
  alt,
  onClose,
  triggerRef,
}: Readonly<ImageLightboxProps>) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const prefersReducedMotion = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  /** If the image is already cached, mark it as loaded immediately. */
  useEffect(() => {
    if (imageRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  /** Trigger the entry transition after the initial render commits. */
  useEffect(() => {
    setVisible(true);
  }, []);

  /** Lock body scroll while open and restore on close. */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  /** Restore focus to the trigger element on unmount. */
  useEffect(() => {
    const trigger = triggerRef?.current;
    return () => {
      trigger?.focus();
    };
  }, [triggerRef]);

  /** Focus the close button on mount so keyboard navigation starts inside the overlay. */
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  /** Begin the close transition, then notify the parent once it finishes. */
  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setVisible(false);

    const duration = prefersReducedMotion.current ? 0 : 200;
    closeTimerRef.current = setTimeout(() => {
      onCloseRef.current();
    }, duration);
  }, [closing]);

  /** Clean up the close timer if the component unmounts before it fires. */
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  /** Handle keyboard events: Escape to close, Tab/Shift+Tab for focus trap. */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      if (e.key === "Tab") {
        const focusable = [closeButtonRef.current, imageRef.current].filter(
          Boolean,
        ) as HTMLElement[];

        const currentIndex = focusable.indexOf(
          document.activeElement as HTMLElement,
        );

        e.preventDefault();

        if (e.shiftKey) {
          // Shift+Tab: move backward, or wrap to last element when at the first.
          if (currentIndex <= 0) {
            focusable.at(-1)?.focus();
          } else {
            focusable[currentIndex - 1]?.focus();
          }
        } else {
          // Tab: move forward, or wrap to first element when at the last.
          if (currentIndex >= focusable.length - 1 || currentIndex === -1) {
            focusable[0]?.focus();
          } else {
            focusable[currentIndex + 1]?.focus();
          }
        }
      }
    },
    [handleClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const reducedMotion = prefersReducedMotion.current;

  return createPortal(
    <div
      role="dialog"
      aria-label="Image lightbox"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 ${
        reducedMotion ? "" : "transition-opacity duration-200"
      } ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Backdrop click target. */}
      <div
        className="absolute inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Content area. On mobile fills viewport width with 16px padding per side. */}
      <div
        className={`relative flex max-h-[90vh] w-[calc(100vw-2rem)] items-center justify-center sm:w-[90vw] ${
          reducedMotion ? "" : "transition-all duration-200"
        } ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        {/* Close button — minimum 44×44px touch target. */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          aria-label="Close lightbox"
          className="absolute -top-11 right-0 z-10 flex h-11 w-11 items-center justify-center rounded-lg bg-white/95 text-ink hover:bg-white"
        >
          ✕
        </button>

        {/* Loading spinner. */}
        {!loaded && (
          <div role="status" aria-label="Loading image" className="absolute">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-hairline border-t-brand" />
          </div>
        )}

        {/* Image. */}
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          tabIndex={-1}
          onLoad={() => setLoaded(true)}
          className={`max-h-[85vh] max-w-full rounded-bub object-contain transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>,
    document.body,
  );
}
