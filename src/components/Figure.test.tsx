/**
 * @author John Grimes
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Figure } from "./Figure";

const figure = {
  id: "congruent-triangles",
  alt: "Two congruent triangles ABC and DEF",
  textFallback: "Triangle ABC and triangle DEF have equal matching sides.",
};

describe("Figure", () => {
  it("renders an image with descriptive alt text, trying WebP first", () => {
    render(<Figure figure={figure} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", figure.alt);
    expect(image).toHaveAttribute("src", `/figures/${figure.id}.webp`);
  });

  it("falls back to PNG when the WebP asset is missing", () => {
    render(<Figure figure={figure} />);
    const image = screen.getByRole("img");
    // Simulate WebP being missing.
    fireEvent.error(image);
    expect(image).toHaveAttribute("src", `/figures/${figure.id}.png`);
  });

  it("falls back to a labelled text description when both WebP and PNG fail", () => {
    render(<Figure figure={figure} />);
    const image = screen.getByRole("img");
    // Simulate WebP being missing.
    fireEvent.error(image);
    // Simulate PNG also being missing.
    fireEvent.error(image);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText(figure.textFallback)).toBeInTheDocument();
    expect(screen.getByText(/figure description/i)).toBeInTheDocument();
  });

  // User Story 1: View a figure at full size.

  it("inline image shows cursor-zoom-in class and a magnifying-glass element on hover when image loaded", async () => {
    const user = userEvent.setup();
    render(<Figure figure={figure} />);

    const img = screen.getByRole("img");
    const wrapper = img.parentElement!;

    // Wrapper carries the zoom cursor class.
    expect(wrapper).toHaveClass("cursor-zoom-in");

    // Magnifying-glass icon is present but hidden (opacity-0) until hover.
    const zoomIcon = screen.getByTestId("zoom-icon");
    expect(zoomIcon).toHaveClass("opacity-0");

    // On hover the icon becomes visible.
    await user.hover(wrapper);
    expect(zoomIcon).toHaveClass("group-hover:opacity-100");
  });

  it("text-fallback card does not have cursor-zoom-in and does not render the magnifying-glass icon", () => {
    render(<Figure figure={figure} />);
    const image = screen.getByRole("img");
    // Force the text-fallback state.
    fireEvent.error(image);
    fireEvent.error(image);

    // No image remains, and no zoom affordance.
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByTestId("zoom-icon")).not.toBeInTheDocument();
  });

  it("clicking the inline image opens the ImageLightbox via portal", async () => {
    const user = userEvent.setup();
    render(<Figure figure={figure} />);

    const img = screen.getByRole("img");
    await user.click(img);

    // The lightbox dialog appears in the portal (document.body).
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // The lightbox image has the correct src and alt.
    const lightboxImg = dialog.querySelector("img");
    expect(lightboxImg).toHaveAttribute("alt", figure.alt);
  });

  it("opens the lightbox when Enter key is pressed on the figure wrapper", async () => {
    const user = userEvent.setup();
    render(<Figure figure={figure} />);

    const wrapper = screen.getByRole("button", {
      name: `View full size: ${figure.alt}`,
    });
    wrapper.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("opens the lightbox when Space key is pressed on the figure wrapper", async () => {
    const user = userEvent.setup();
    render(<Figure figure={figure} />);

    const wrapper = screen.getByRole("button", {
      name: `View full size: ${figure.alt}`,
    });
    wrapper.focus();
    await user.keyboard(" ");

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not open the lightbox when an unrelated key is pressed on the figure wrapper", async () => {
    const user = userEvent.setup();
    render(<Figure figure={figure} />);

    const wrapper = screen.getByRole("button", {
      name: `View full size: ${figure.alt}`,
    });
    wrapper.focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the lightbox and removes it from the DOM when onClose is called", async () => {
    const user = userEvent.setup();
    render(<Figure figure={figure} />);

    // Open the lightbox.
    await user.click(screen.getByRole("img"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close via Escape key. The lightbox defers onClose by a close-transition
    // timeout, so wait for the dialog to be removed.
    await user.keyboard("{Escape}");

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("restores focus to the inline figure trigger when the lightbox closes", async () => {
    const user = userEvent.setup();
    render(<Figure figure={figure} />);

    const wrapper = screen.getByRole("button", {
      name: `View full size: ${figure.alt}`,
    });

    // Open the lightbox by clicking the image.
    await user.click(screen.getByRole("img"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close via Escape key and wait for the close transition to complete.
    await user.keyboard("{Escape}");

    await waitFor(() => expect(wrapper).toHaveFocus());
  });
});
