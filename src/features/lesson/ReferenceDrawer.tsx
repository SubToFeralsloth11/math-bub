/**
 * The Reference surface: a hand-rolled modal that shows the lesson's learn
 * cards one at a time so a learner can re-read them while answering a question
 * or studying a card without losing their place in the run.
 *
 * Renders as a bottom sheet on narrow viewports and a right-anchored drawer at
 * `md+` via Tailwind `md:` variants. No runtime dependency; the focus trap,
 * Escape dismissal, and focus restoration are hand-rolled.
 *
 * @module features/lesson/ReferenceDrawer
 * @author John Grimes
 */

import { useEffect, useRef, type RefObject } from "react";

import { LearnCardView } from "./LearnCardView";
import { Button } from "../../components/Button";

import type { LearnCard } from "../../domain/content/types";

/**
 * Reads the user's reduced-motion preference, returning no-preference when
 * `matchMedia` is unavailable.
 *
 * @returns Whether the surface should suppress its entrance animation.
 */
function prefersReducedMotion(): boolean {
  const win = globalThis.window;
  if (win === undefined || typeof win.matchMedia !== "function") {
    return false;
  }
  return win.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** A CSS selector matching the surface's tabbable controls. */
const FOCUSABLES_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ReferenceDrawerProps {
  /** The lesson's learn cards, browsed one at a time. */
  cards: LearnCard[];
  /** The card id currently shown in the surface. */
  currentCardId: string | null;
  /** Browse to a neighbouring card (carries the chosen card id). */
  onBrowse: (cardId: string) => void;
  /** Dismiss the surface. */
  onClose: () => void;
  /** The control to return focus to when the surface closes. */
  referenceControlRef?: RefObject<HTMLButtonElement | null>;
}

/**
 * Renders the Reference surface modal.
 *
 * @param props - The component props.
 * @returns The rendered surface.
 */
export function ReferenceDrawer({
  cards,
  currentCardId,
  onBrowse,
  onClose,
  referenceControlRef,
}: Readonly<ReferenceDrawerProps>) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const reducedMotion = prefersReducedMotion();

  // Resolve the current card; default to the first when the carried id is null.
  const currentIndex =
    currentCardId === null
      ? 0
      : Math.max(
          cards.findIndex((card) => card.id === currentCardId),
          0,
        );
  const currentCard = cards[currentIndex];
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= cards.length - 1;

  // Move focus into the surface on open and restore it to the control on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    const control = referenceControlRef?.current ?? null;
    if (dialog) {
      const first = dialog.querySelector<HTMLElement>(FOCUSABLES_SELECTOR);
      (first ?? dialog).focus();
    }
    return () => {
      control?.focus();
    };
    // The surface mounts once per open; run only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Trap keyboard focus and dismiss on Escape while the surface is open.
  // A document-level listener catches Tab even if focus strays outside the
  // dialog and keeps the dimmed lesson behind the scrim out of the tab cycle.
  useEffect(() => {
    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = [
        ...dialog.querySelectorAll<HTMLElement>(FOCUSABLES_SELECTOR),
      ];
      if (focusables.length === 0) return;
      const active = document.activeElement as HTMLElement | null;
      const activeIndex = active ? focusables.indexOf(active) : -1;
      const lastIndex = focusables.length - 1;
      event.preventDefault();
      if (event.shiftKey) {
        focusables[activeIndex <= 0 ? lastIndex : activeIndex - 1].focus();
      } else {
        focusables[
          activeIndex === -1 || activeIndex === lastIndex ? 0 : activeIndex + 1
        ].focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div
        data-testid="ref-scrim"
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-ink/45"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Reference cards"
        tabIndex={-1}
        className={`flex max-h-[85vh] flex-col rounded-t-bub bg-card p-5 shadow-bub-lg absolute inset-x-0 bottom-0 md:inset-y-0 md:left-auto md:right-0 md:w-[36rem] md:max-h-none md:rounded-l-bub md:rounded-tr-none ${
          reducedMotion ? "" : "animate-bub-rise"
        }`}
      >
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg text-ink">📖 Reference</h2>
          <button
            type="button"
            aria-label="Close reference"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-pill bg-cream-deep text-muted transition hover:text-ink"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {currentCard ? (
            <LearnCardView key={currentCard.id} card={currentCard} />
          ) : null}
        </div>

        <nav className="mt-4 flex items-center justify-between">
          <Button
            variant="secondary"
            aria-label="Previous card"
            disabled={isFirst}
            onClick={() => onBrowse(cards[currentIndex - 1].id)}
          >
            ← Prev
          </Button>
          <span className="text-sm text-muted">
            {currentIndex + 1} / {cards.length} cards
          </span>
          <Button
            variant="secondary"
            aria-label="Next card"
            disabled={isLast}
            onClick={() => onBrowse(cards[currentIndex + 1].id)}
          >
            Next →
          </Button>
        </nav>
      </div>
    </div>
  );
}
