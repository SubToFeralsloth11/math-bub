import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ReferenceDrawer } from "./ReferenceDrawer";

import type { LearnCard } from "../../domain/content/types";

// Override the matchMedia stub from tests/setup.ts for reduced-motion tests.
function setReducedMotion(enabled: boolean): void {
  const value = enabled;
  vi.stubGlobal(
    "matchMedia",
    (query: string) =>
      ({
        matches: value,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );
}

const cards: LearnCard[] = [
  {
    id: "card-1",
    heading: "First idea",
    body: [{ kind: "text", text: "First card body" }],
  },
  {
    id: "card-2",
    heading: "Second idea",
    body: [{ kind: "text", text: "Second card body" }],
  },
  {
    id: "card-3",
    heading: "Third idea",
    body: [{ kind: "text", text: "Third card body" }],
  },
];

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ReferenceDrawer - focus trap", () => {
  it("cycles only across the surface's focusable controls", async () => {
    const user = userEvent.setup();
    render(
      <ReferenceDrawer
        cards={cards}
        currentCardId="card-1"
        onBrowse={() => {}}
        onClose={() => {}}
      />,
    );

    // The close, prev, and next controls are the only tabbable elements.
    const close = screen.getByRole("button", { name: /close reference/i });
    const prev = screen.getByRole("button", { name: /previous card/i });
    const next = screen.getByRole("button", { name: /next card/i });

    // Focus lands inside the surface on open.
    expect([close, prev, next]).toContain(document.activeElement);

    // Tab forward cycles close -> prev -> next -> close.
    await user.tab();
    expect([close, prev, next]).toContain(document.activeElement);
    // The Tab never escapes the three controls across a full cycle.
    for (let index = 0; index < 6; index++) {
      await user.tab();
      expect([close, prev, next]).toContain(document.activeElement);
    }

    // Shift+Tab cycles backwards and stays within the three controls.
    for (let index = 0; index < 6; index++) {
      await user.tab({ shift: true });
      expect([close, prev, next]).toContain(document.activeElement);
    }
  });
});

describe("ReferenceDrawer - card rendering", () => {
  it("renders the learn card whose id equals currentCardId via LearnCardView", () => {
    render(
      <ReferenceDrawer
        cards={cards}
        currentCardId="card-2"
        onBrowse={() => {}}
        onClose={() => {}}
      />,
    );
    expect(screen.getByText(/second idea/i)).toBeInTheDocument();
  });

  it("labels the surface as a dialog", () => {
    render(
      <ReferenceDrawer
        cards={cards}
        currentCardId="card-1"
        onBrowse={() => {}}
        onClose={() => {}}
      />,
    );
    expect(
      screen.getByRole("dialog", { name: /reference/i }),
    ).toBeInTheDocument();
  });
});

describe("ReferenceDrawer - browse controls", () => {
  it("dispatches BROWSE_REFERENCE through prev/next and disables at bounds", async () => {
    const onBrowse = vi.fn();
    const user = userEvent.setup();
    render(
      <ReferenceDrawer
        cards={cards}
        currentCardId="card-2"
        onBrowse={onBrowse}
        onClose={() => {}}
      />,
    );

    const prev = screen.getByRole("button", { name: /previous card/i });
    const next = screen.getByRole("button", { name: /next card/i });

    // On the middle card both are enabled and dispatch to neighbours.
    await user.click(next);
    expect(onBrowse).toHaveBeenLastCalledWith("card-3");
    await user.click(prev);
    expect(onBrowse).toHaveBeenLastCalledWith("card-1");
  });

  it("disables prev on the first card", () => {
    render(
      <ReferenceDrawer
        cards={cards}
        currentCardId="card-1"
        onBrowse={() => {}}
        onClose={() => {}}
      />,
    );
    expect(
      screen.getByRole("button", { name: /previous card/i }),
    ).toBeDisabled();
  });

  it("disables next on the last card", () => {
    render(
      <ReferenceDrawer
        cards={cards}
        currentCardId="card-3"
        onBrowse={() => {}}
        onClose={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /next card/i })).toBeDisabled();
  });

  it("shows the card index indicator", () => {
    render(
      <ReferenceDrawer
        cards={cards}
        currentCardId="card-2"
        onBrowse={() => {}}
        onClose={() => {}}
      />,
    );
    expect(screen.getByText(/2 \/ 3 cards/i)).toBeInTheDocument();
  });
});

describe("ReferenceDrawer - responsiveness", () => {
  it("renders bottom-sheet classes on narrow and drawer variants at md+", () => {
    render(
      <ReferenceDrawer
        cards={cards}
        currentCardId="card-1"
        onBrowse={() => {}}
        onClose={() => {}}
      />,
    );
    const dialog = screen.getByRole("dialog", { name: /reference/i });
    expect(dialog.className).toContain("bottom-0");
    expect(dialog.className).toContain("md:");
  });
});

describe("ReferenceDrawer - reduced motion", () => {
  it("applies the entrance animation normally", () => {
    setReducedMotion(false);
    render(
      <ReferenceDrawer
        cards={cards}
        currentCardId="card-1"
        onBrowse={() => {}}
        onClose={() => {}}
      />,
    );
    const dialog = screen.getByRole("dialog", { name: /reference/i });
    expect(dialog.className).toContain("animate-bub-rise");
  });

  it("suppresses the entrance animation under prefers-reduced-motion", () => {
    setReducedMotion(true);
    render(
      <ReferenceDrawer
        cards={cards}
        currentCardId="card-1"
        onBrowse={() => {}}
        onClose={() => {}}
      />,
    );
    const dialog = screen.getByRole("dialog", { name: /reference/i });
    expect(dialog.className).not.toContain("animate-bub-rise");
  });
});
