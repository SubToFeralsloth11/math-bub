import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  type Placement,
} from "@floating-ui/react";
import { useEffect, type ReactNode } from "react";

interface PopoverProps {
  /** Whether the popover is open. */
  open: boolean;
  /** Called when the popover should close (Escape, click outside). */
  onClose: () => void;
  /** The popover content. */
  children: ReactNode;
  /** An optional anchor element rendered inline with the popover trigger area. */
  anchor?: ReactNode;
  /** The preferred placement relative to the anchor. */
  placement?: Placement;
}

/**
 * A generic popover panel positioned with floating-ui. It handles Escape key,
 * click-outside dismissal, and viewport collision detection via flip and shift
 * middleware.
 *
 * @param props - The component props.
 * @param props.open - Whether the popover is visible.
 * @param props.onClose - Callback when dismissal is requested.
 * @param props.children - The popover body content.
 * @param props.anchor - An optional anchor element rendered inline.
 * @param props.placement - The preferred placement.
 * @returns The rendered popover (or nothing when closed).
 */
export function Popover({
  open,
  onClose,
  children,
  anchor,
  placement = "bottom-end",
}: Readonly<PopoverProps>) {
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: (next) => {
      if (!next) onClose();
    },
    placement,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, {
    outsidePressEvent: "mousedown",
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  // Close on Escape key globally when open.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      {anchor ? (
        <span ref={refs.setReference} {...getReferenceProps()}>
          {anchor}
        </span>
      ) : null}
      {open ? (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 w-64 rounded-xl border border-hairline bg-card p-4 shadow-lg"
        >
          {children}
        </div>
      ) : null}
    </>
  );
}
