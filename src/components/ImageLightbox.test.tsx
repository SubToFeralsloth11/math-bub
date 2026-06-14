/**
 * @author John Grimes
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ImageLightbox } from "./ImageLightbox";

describe("ImageLightbox", () => {
  const defaultProps = {
    src: "/figures/triangle.webp",
    alt: "A triangle diagram",
    onClose: () => {},
  };

  // ---- Foundational ----

  it("renders an image into a portal with correct src and alt", () => {
    render(<ImageLightbox {...defaultProps} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", defaultProps.src);
    expect(image).toHaveAttribute("alt", defaultProps.alt);
  });

  it("shows a loading spinner before the image onLoad event fires", () => {
    render(<ImageLightbox {...defaultProps} />);

    // jsdom never fires onLoad automatically, so the spinner should be visible.
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("hides the spinner once the image finishes loading", () => {
    render(<ImageLightbox {...defaultProps} />);

    const image = screen.getByRole("img");
    fireEvent.load(image);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("uses role='dialog' and an accessible aria-label", () => {
    render(<ImageLightbox {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Image lightbox");
  });

  // ---- User Story 2: Close the lightbox ----

  it("calls onClose when the backdrop is clicked, after the close transition", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ImageLightbox {...defaultProps} onClose={onClose} />);

    // The backdrop is the first child of the dialog (aria-hidden div).
    const backdrop = screen.getByRole("dialog").firstElementChild!;
    await user.click(backdrop);

    // The close transition defers onClose by 200ms (default) or 0ms (reduced motion).
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it("calls onClose when the close button is clicked, after the close transition", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ImageLightbox {...defaultProps} onClose={onClose} />);

    const closeButton = screen.getByLabelText("Close lightbox");
    await user.click(closeButton);

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it("calls onClose when the Escape key is pressed, after the close transition", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ImageLightbox {...defaultProps} onClose={onClose} />);

    await user.keyboard("{Escape}");

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });

  it("does nothing when an unrelated key is pressed while the lightbox is open", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<ImageLightbox {...defaultProps} onClose={onClose} />);

    await user.keyboard("{ArrowRight}");

    expect(onClose).not.toHaveBeenCalled();
    // The lightbox should still be rendered.
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("traps focus within the overlay when Tab and Shift+Tab are pressed", () => {
    render(<ImageLightbox {...defaultProps} />);

    const closeButton = screen.getByLabelText("Close lightbox");
    const image = screen.getByRole("img");

    // Focus starts on the close button (auto-focused on mount).
    expect(closeButton).toHaveFocus();

    // Tab moves focus to the image.
    fireEvent.keyDown(document, { key: "Tab", shiftKey: false });
    expect(image).toHaveFocus();

    // Shift+Tab from the image moves back to the close button.
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(closeButton).toHaveFocus();

    // Tab again moves forward to the image.
    fireEvent.keyDown(document, { key: "Tab", shiftKey: false });
    expect(image).toHaveFocus();

    // Tab again wraps from image (last element) back to close button.
    fireEvent.keyDown(document, { key: "Tab", shiftKey: false });
    expect(closeButton).toHaveFocus();

    // Shift+Tab from close button wraps to image (last element).
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(image).toHaveFocus();
  });

  it("restores focus to the trigger element on close", () => {
    // Create a trigger element in the DOM that had focus before the lightbox opened.
    const trigger = document.createElement("button");
    trigger.dataset.testid = "trigger";
    document.body.append(trigger);
    trigger.focus();

    const triggerRef = { current: trigger };
    const { unmount } = render(
      <ImageLightbox {...defaultProps} triggerRef={triggerRef} />,
    );

    unmount();

    expect(trigger).toHaveFocus();

    trigger.remove();
  });

  it("locks body scroll while open and restores it on close", () => {
    const originalOverflow = document.body.style.overflow;

    const { unmount } = render(<ImageLightbox {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe(originalOverflow);
  });

  it("honours prefers-reduced-motion by omitting the transition class", () => {
    // Mock matchMedia to simulate reduced-motion preference.
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<ImageLightbox {...defaultProps} />);

    // The dialog backdrop should not have the transition class when reduced motion is preferred.
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).not.toContain("transition-opacity");

    window.matchMedia = originalMatchMedia;
  });

  it("scales the content area to fill the viewport width without a small max-width cap", () => {
    render(<ImageLightbox {...defaultProps} />);

    const content = screen
      .getByRole("dialog")
      .querySelector("div > div:last-child")!;
    // Should use 90% of viewport width on larger screens, not be capped at a small max-width.
    expect(content.className).not.toContain("max-w-4xl");
    expect(content.className).toContain("sm:w-[90vw]");
  });

  it("applies the transition class when motion is not reduced", () => {
    // Mock matchMedia to simulate no reduced-motion preference.
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<ImageLightbox {...defaultProps} />);

    // The dialog backdrop should have the transition class when motion is not reduced.
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("transition-opacity");

    window.matchMedia = originalMatchMedia;
  });
});
