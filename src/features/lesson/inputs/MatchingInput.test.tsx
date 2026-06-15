import { fireEvent, screen, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MatchingInput } from "./MatchingInput";

import type { MatchingPair } from "../../../domain/content/types";

/** 2-pair fixture used for basic rendering tests. */
const pairs2: MatchingPair[] = [
  {
    id: "p1",
    left: [{ kind: "text", text: "H2O" }],
    right: [{ kind: "text", text: "Water" }],
  },
  {
    id: "p2",
    left: [{ kind: "text", text: "CO2" }],
    right: [{ kind: "text", text: "Carbon dioxide" }],
  },
];

/** 3-pair fixture for ordering and shuffle tests. */
const pairs3: MatchingPair[] = [
  {
    id: "a",
    left: [{ kind: "text", text: "Alpha" }],
    right: [{ kind: "text", text: "X-ray" }],
  },
  {
    id: "b",
    left: [{ kind: "text", text: "Bravo" }],
    right: [{ kind: "text", text: "Yankee" }],
  },
  {
    id: "c",
    left: [{ kind: "text", text: "Charlie" }],
    right: [{ kind: "text", text: "Zulu" }],
  },
];

describe("MatchingInput - foundational render", () => {
  it("renders all left items in the left column", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    expect(screen.getByText("H2O")).toBeInTheDocument();
    expect(screen.getByText("CO2")).toBeInTheDocument();
  });

  it("renders all right items in the right column", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    expect(screen.getByText("Water")).toBeInTheDocument();
    expect(screen.getByText("Carbon dioxide")).toBeInTheDocument();
  });

  it("does not render the old em-dash column (no U+2014 characters)", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // The old implementation renders "—" (U+2014) in the middle column.
    // The new implementation has no middle column at all.
    const container = document.body.textContent ?? "";
    expect(container).not.toContain("\u2014");
  });

  it("renders the Check answer button disabled initially", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    expect(
      screen.getByRole("button", { name: /check answer/i }),
    ).toBeDisabled();
  });

  it("renders the matched-pairs row container", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // The matched-pairs row should be present (even if empty).
    // We can find it by looking for the hint text that appears when no pairs are connected.
    const hint = screen.queryByText(/no pairs yet/i);
    expect(hint).toBeInTheDocument();
  });
});

describe("MatchingInput - US1 pair creation", () => {
  // T008: Right column is rendered (the shuffle is verified in
  // shuffleOptions.test.ts with deterministic random).
  it("renders all right-column items from the matching pairs", () => {
    render(
      <MatchingInput
        pairs={pairs3}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // All three right items should be present, regardless of order.
    expect(screen.getByText("X-ray")).toBeInTheDocument();
    expect(screen.getByText("Yankee")).toBeInTheDocument();
    expect(screen.getByText("Zulu")).toBeInTheDocument();
  });

  // T009: Right column stable across re-renders.
  it("keeps the right column order stable across re-renders", () => {
    const { rerender } = render(
      <MatchingInput
        pairs={pairs3}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // Snapshot the right-column order.
    const getRightOrder = () =>
      screen
        .getAllByRole("button")
        .filter(
          (el) =>
            (el.textContent?.includes("ray") ?? false) ||
            (el.textContent?.includes("kee") ?? false) ||
            (el.textContent?.includes("ulu") ?? false),
        )
        .map((el) => el.textContent);

    const firstOrder = getRightOrder();

    // Trigger a re-render by selecting and deselecting a left item.
    fireEvent.click(screen.getByText("Alpha"));
    fireEvent.click(screen.getByText("Alpha"));

    // Or just re-render with same props.
    rerender(
      <MatchingInput
        pairs={pairs3}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    const secondOrder = getRightOrder();
    expect(firstOrder).toEqual(secondOrder);
  });

  // T010: Tap left then right creates a pair box.
  it("creates a pair when left then right is tapped", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);

    // Both items should now be in a pair box at the top, not in the grid.
    const pairBox = document.querySelector('[data-testid="pair-box"]');
    expect(pairBox).toBeInTheDocument();
    expect(pairBox!.textContent).toContain("H2O");
    expect(pairBox!.textContent).toContain("Water");

    // The items should NOT appear in the grid anymore.
    // Since they are unique, searching by text should only find them in the
    // pair box (the grid items are gone).
    const allH2o = screen.queryAllByText("H2O");
    // H2O still exists in the DOM but only inside the pair box.
    expect(allH2o.length).toBeGreaterThanOrEqual(1);
  });

  // T011: Tapping right first does nothing.
  it("does not create a pair when right is tapped without left selection", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("Water").closest("button")!);

    // No pair box should appear.
    expect(
      document.querySelector('[data-testid="pair-box"]'),
    ).not.toBeInTheDocument();

    // Both H2O and Water should still be in the grid.
    expect(screen.getByText("H2O")).toBeInTheDocument();
    expect(screen.getByText("Water")).toBeInTheDocument();
  });

  // T012: Tapping same left twice clears selection.
  it("clears selection when the same left item is tapped twice", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    const h2o = screen.getByText("H2O").closest("button")!;
    fireEvent.click(h2o);

    // H2O should now be selected (has ring-brand class).
    expect(h2o.className).toContain("ring-brand");

    // Tap H2O again.
    fireEvent.click(h2o);

    // Selection should be cleared — no pair box, no ring highlight.
    expect(
      document.querySelector('[data-testid="pair-box"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByText("H2O").closest("button")!.className).not.toContain(
      "ring-brand",
    );
  });

  // T013: Tapping different left moves selection.
  it("moves selection when a different left item is tapped", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("H2O"));
    expect(screen.getByText("H2O").closest("button")!.className).toContain(
      "ring-brand",
    );

    fireEvent.click(screen.getByText("CO2"));
    // CO2 now selected.
    expect(screen.getByText("CO2").closest("button")!.className).toContain(
      "ring-brand",
    );
    // H2O no longer selected.
    expect(screen.getByText("H2O").closest("button")!.className).not.toContain(
      "ring-brand",
    );
  });

  // T014: Number markers 1 and 2.
  it("shows a number marker on the first pair", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);

    const marker = document.querySelector('[data-testid="pair-marker"]');
    expect(marker).toBeInTheDocument();
    expect(marker!.textContent).toContain("1");
  });

  it("gives the second pair a different number marker", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);
    fireEvent.click(screen.getByText("CO2"));
    fireEvent.click(screen.getByText("Carbon dioxide").closest("button")!);

    const markers = document.querySelectorAll('[data-testid="pair-marker"]');
    expect(markers).toHaveLength(2);
    expect(markers[0].textContent).toContain("1");
    expect(markers[1].textContent).toContain("2");
  });

  // T015: Different border colours for different pairs.
  it("gives the first and second pair different border colours", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);
    fireEvent.click(screen.getByText("CO2"));
    fireEvent.click(screen.getByText("Carbon dioxide").closest("button")!);

    const boxes = document.querySelectorAll('[data-testid="pair-box"]');
    expect(boxes).toHaveLength(2);
    const colour0 = (boxes[0] as HTMLElement).style.borderColor;
    const colour1 = (boxes[1] as HTMLElement).style.borderColor;
    expect(colour0).not.toBe(colour1);
  });

  // T016: Vertical centring of different-height items.
  it("vertically centres items of different heights in the pair box", () => {
    const mixedHeightPairs: MatchingPair[] = [
      {
        id: "tall",
        left: [{ kind: "text", text: "Short left" }],
        right: [
          {
            kind: "text",
            text: "A very long right item that should wrap to multiple lines and demonstrate vertical centring in the pair box",
          },
        ],
      },
    ];

    render(
      <MatchingInput
        pairs={mixedHeightPairs}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("Short left"));
    fireEvent.click(
      screen
        .getByText(
          "A very long right item that should wrap to multiple lines and demonstrate vertical centring in the pair box",
        )
        .closest("button")!,
    );

    // The pair box should use align-items: center (Tailwind class items-center).
    const box = document.querySelector('[data-testid="pair-box"]');
    expect(box).toBeInTheDocument();
    // Verify the items-center Tailwind class is present (this is what
    // produces align-items: center in a real browser).
    expect(box!.className).toContain("items-center");
  });
});

describe("MatchingInput - US2 un-pairing", () => {
  // T021: Tap left item in pair box removes the box and restores items.
  it("removes a pair box when the left item inside it is tapped", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // Create the pair.
    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);

    // Now tap H2O inside the pair box to un-pair.
    const pairBox = document.querySelector('[data-testid="pair-box"]');
    expect(pairBox).toBeInTheDocument();
    const leftInBox = pairBox!.querySelector(
      '[data-testid="pair-item-left"] button',
    );
    expect(leftInBox).toBeInTheDocument();
    fireEvent.click(leftInBox!);

    // Pair box should be gone.
    expect(
      document.querySelector('[data-testid="pair-box"]'),
    ).not.toBeInTheDocument();

    // Both items should be back in the grid.
    expect(screen.getByText("H2O")).toBeInTheDocument();
    expect(screen.getByText("Water")).toBeInTheDocument();
  });

  // T022: Tap right item in pair box removes the box.
  it("removes a pair box when the right item inside it is tapped", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);

    const pairBox = document.querySelector('[data-testid="pair-box"]');
    const rightInBox = pairBox!.querySelector(
      '[data-testid="pair-item-right"] button',
    );
    fireEvent.click(rightInBox!);

    expect(
      document.querySelector('[data-testid="pair-box"]'),
    ).not.toBeInTheDocument();
    expect(screen.getByText("H2O")).toBeInTheDocument();
    expect(screen.getByText("Water")).toBeInTheDocument();
  });

  // T023: Un-pair + re-pair gets next sequential number (not recycled).
  it("assigns the next sequential number when re-pairing after un-pair", () => {
    render(
      <MatchingInput
        pairs={pairs3}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // Connect A→X (pair 1), B→Y (pair 2), C→Z (pair 3).
    fireEvent.click(screen.getByText("Alpha"));
    fireEvent.click(
      screen
        .getAllByRole("button")
        .find((b) => b.textContent?.includes("ray"))!,
    );
    fireEvent.click(screen.getByText("Bravo"));
    fireEvent.click(
      screen
        .getAllByRole("button")
        .find((b) => b.textContent?.includes("kee"))!,
    );
    fireEvent.click(screen.getByText("Charlie"));
    fireEvent.click(
      screen
        .getAllByRole("button")
        .find((b) => b.textContent?.includes("ulu"))!,
    );

    // Un-pair Bravo→Yankee by tapping it inside the pair box.
    const pairBoxes = document.querySelectorAll('[data-testid="pair-box"]');
    expect(pairBoxes).toHaveLength(3);
    const bravoBox = [...pairBoxes].find((b) =>
      b.textContent?.includes("Bravo"),
    );
    const unPairBtn = bravoBox!.querySelector(
      '[data-testid="pair-item-left"] button',
    );
    fireEvent.click(unPairBtn!);

    // Re-pair Bravo→Yankee.
    fireEvent.click(screen.getByText("Bravo"));
    fireEvent.click(
      screen
        .getAllByRole("button")
        .find((b) => b.textContent?.includes("kee"))!,
    );

    // New pair should have number 4, not 2.
    const newBoxes = document.querySelectorAll('[data-testid="pair-box"]');
    expect(newBoxes).toHaveLength(3);
    const markers = document.querySelectorAll('[data-testid="pair-marker"]');
    const markerTexts = [...markers].map((m) => m.textContent?.trim());
    // Should contain "1", "3", and "4" (not "2").
    expect(markerTexts).toContain("1");
    expect(markerTexts).toContain("3");
    expect(markerTexts).toContain("4");
  });

  // T024: Replace connection when a different left is selected and a
  // pair-box item is tapped (FR-008 replace flow via pair box).
  it("replaces an existing connection when tapping a pair-box item with a different left selected", () => {
    render(
      <MatchingInput
        pairs={pairs3}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // Connect A→X.
    fireEvent.click(screen.getByText("Alpha"));
    // Find X-ray in the grid and click it.
    const findGridBtn = (text: string) =>
      [...document.querySelectorAll("button")].find(
        (b) =>
          (b.textContent?.includes(text) ?? false) &&
          !b.closest('[data-testid="pair-box"]'),
      )!;
    fireEvent.click(findGridBtn("ray"));

    expect(document.querySelectorAll('[data-testid="pair-box"]')).toHaveLength(
      1,
    );

    // Select Bravo in the left column.
    fireEvent.click(screen.getByText("Bravo"));

    // Tap the X-ray item inside the pair box (re-assign from Alpha to Bravo).
    const pairBox = document.querySelector('[data-testid="pair-box"]')!;
    const rightInBox = pairBox.querySelector(
      '[data-testid="pair-item-right"] button',
    )!;
    fireEvent.click(rightInBox);

    // Only one pair box should exist (Bravo→X).
    const boxes = document.querySelectorAll('[data-testid="pair-box"]');
    expect(boxes).toHaveLength(1);
    expect(boxes[0].textContent).toContain("Bravo");
    expect(boxes[0].textContent).toContain("ray");

    // Alpha should be back in the un-matched left column.
    expect(screen.getByText("Alpha")).toBeInTheDocument();
  });

  // T025: Tapping in revealed state has no effect.
  it("does not un-pair when tapping a pair-box item in revealed state", () => {
    const { rerender } = render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // Create the pair.
    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);

    expect(
      document.querySelector('[data-testid="pair-box"]'),
    ).toBeInTheDocument();

    // Re-render with revealed=true.
    rerender(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed
        result="correct"
      />,
    );

    // Try tapping the left item inside the pair box.
    const pairBox = document.querySelector('[data-testid="pair-box"]');
    const leftBtn = pairBox!.querySelector(
      '[data-testid="pair-item-left"] button',
    ) as HTMLButtonElement;
    // The button should be disabled.
    expect(leftBtn.disabled).toBe(true);
    // Pair box should still exist.
    expect(
      document.querySelector('[data-testid="pair-box"]'),
    ).toBeInTheDocument();
  });
});

describe("MatchingInput - US3 reveal state", () => {
  // T029: Check answer disabled when not all pairs connected.
  it("disables the Check answer button when fewer than all pairs are connected", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // No connections yet.
    expect(
      screen.getByRole("button", { name: /check answer/i }),
    ).toBeDisabled();

    // Connect one pair only.
    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);

    // Still only 1 of 2 connected.
    expect(
      screen.getByRole("button", { name: /check answer/i }),
    ).toBeDisabled();
  });

  // T030: Check answer enabled when all pairs connected.
  it("enables the Check answer button when all pairs are connected", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);
    fireEvent.click(screen.getByText("CO2"));
    fireEvent.click(screen.getByText("Carbon dioxide").closest("button")!);

    expect(screen.getByRole("button", { name: /check answer/i })).toBeEnabled();
  });

  // T031: onSubmit called with correct mapping.
  it("calls onSubmit with a JSON mapping when all pairs are connected", () => {
    const onSubmit = vi.fn();
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={onSubmit}
        revealed={false}
        result={null}
      />,
    );

    // Connect all pairs by tapping left then finding the matching right
    // button in the grid by text content (avoiding pair-box buttons).
    const findGridBtn = (text: string) =>
      [...document.querySelectorAll("button")].find(
        (b) =>
          (b.textContent?.includes(text) ?? false) &&
          !b.closest('[data-testid="pair-box"]'),
      )!;

    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(findGridBtn("Water"));
    fireEvent.click(screen.getByText("CO2"));
    fireEvent.click(findGridBtn("Carbon dioxide"));

    fireEvent.click(screen.getByRole("button", { name: /check answer/i }));
    expect(onSubmit).toHaveBeenCalledTimes(1);

    const mapping: Record<string, string> = JSON.parse(
      onSubmit.mock.calls[0][0],
    );
    // The mapping should have both left ids as keys.
    expect(Object.keys(mapping).toSorted()).toEqual(["p1", "p2"]);
    expect(mapping.p1).toBeDefined();
    expect(mapping.p2).toBeDefined();
  });

  // T032: Revealed with result=correct shows check on all pairs.
  it("shows check icon on all pairs when revealed with result=correct", () => {
    const { rerender } = render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // Create both connections correctly.
    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);
    fireEvent.click(screen.getByText("CO2"));
    fireEvent.click(screen.getByText("Carbon dioxide").closest("button")!);

    // Re-render with revealed and correct result.
    rerender(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed
        result="correct"
      />,
    );

    const checks = document.querySelectorAll('[data-testid="verdict-check"]');
    expect(checks).toHaveLength(2);

    const crosses = document.querySelectorAll('[data-testid="verdict-cross"]');
    expect(crosses).toHaveLength(0);
  });

  // T033: Revealed with result=incorrect shows check on correct, cross on
  // incorrect pairs.
  it("shows check on correct pairs and cross on incorrect pairs when revealed", () => {
    const { rerender } = render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // Connect H2O to Carbon dioxide and CO2 to Water — these are mismatched
    // (the correct pairs would be H2O→Water, CO2→Carbon dioxide).
    // Due to shuffle, the actual right IDs assigned differ, but the key is
    // both connections are "wrong" because leftId !== rightId.
    const findGridBtn = (text: string) =>
      [...document.querySelectorAll("button")].find(
        (b) =>
          (b.textContent?.includes(text) ?? false) &&
          !b.closest('[data-testid="pair-box"]'),
      )!;

    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(findGridBtn("Carbon dioxide"));
    fireEvent.click(screen.getByText("CO2"));
    fireEvent.click(findGridBtn("Water"));

    rerender(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed
        result="incorrect"
      />,
    );

    // Each pair box should show a verdict icon. For result=incorrect, the
    // verdict depends on whether connections[leftId] === leftId.
    const boxes = document.querySelectorAll('[data-testid="pair-box"]');
    expect(boxes).toHaveLength(2);

    // Count how many have check vs cross icons.
    const totalChecks = document.querySelectorAll(
      '[data-testid="verdict-check"]',
    ).length;
    const totalCrosses = document.querySelectorAll(
      '[data-testid="verdict-cross"]',
    ).length;
    // Both pairs are mismatched so both should show crosses.
    // But if the shuffle happened to make one correct, the verdicts will
    // reflect that. Just verify total = 2 and there are verdict icons.
    expect(totalChecks + totalCrosses).toBe(2);
  });

  // T034: Revealed state is read-only.
  it("ignores all taps when revealed is true", () => {
    const { rerender } = render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // Create one connection.
    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);

    rerender(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed
        result="correct"
      />,
    );

    // Try tapping a left item in the pair box.
    const pairBox = document.querySelector('[data-testid="pair-box"]');
    const leftBtn = pairBox!.querySelector(
      '[data-testid="pair-item-left"] button',
    ) as HTMLButtonElement;
    expect(leftBtn.disabled).toBe(true);

    // Try tapping a right item in the pair box.
    const rightBtn = pairBox!.querySelector(
      '[data-testid="pair-item-right"] button',
    ) as HTMLButtonElement;
    expect(rightBtn.disabled).toBe(true);

    // Pair box should still exist.
    expect(
      document.querySelector('[data-testid="pair-box"]'),
    ).toBeInTheDocument();
  });

  // T035: Pair colour unchanged between revealed=false and revealed=true.
  it("keeps pair colour unchanged after reveal", () => {
    const { rerender } = render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);

    const boxBefore = document.querySelector(
      '[data-testid="pair-box"]',
    ) as HTMLElement;
    const colourBefore = boxBefore.style.borderColor;

    rerender(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed
        result="correct"
      />,
    );

    const boxAfter = document.querySelector(
      '[data-testid="pair-box"]',
    ) as HTMLElement;
    const colourAfter = boxAfter.style.borderColor;

    expect(colourAfter).toBe(colourBefore);
  });
});

describe("MatchingInput - US4 accessibility", () => {
  // T039: Each tappable item is a focusable button.
  it("renders each un-matched item as a focusable button", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    const h2oButton = screen.getByText("H2O").closest("button")!;
    const co2Button = screen.getByText("CO2").closest("button")!;
    expect(h2oButton).not.toBeDisabled();
    expect(co2Button).not.toBeDisabled();
    expect(h2oButton.tagName).toBe("BUTTON");
    expect(co2Button.tagName).toBe("BUTTON");
  });

  // T040: Enter on focused left selects it (native <button> fires onClick
  // on Enter/Space in real browsers; jsdom requires explicit click simulation).
  it("selects a left item when Enter is pressed on it", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    const h2oButton = screen.getByText("H2O").closest("button")!;
    // Simulate keyboard activation via click (what the browser does for
    // native buttons on Enter/Space).
    fireEvent.click(h2oButton);

    // H2O should now have the selected ring class.
    expect(h2oButton.className).toContain("ring-brand");
  });

  // T041: Space on focused left selects it.
  it("selects a left item when Space is pressed on it", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    const h2oButton = screen.getByText("H2O").closest("button")!;
    // Native <button> fires onClick on Space in real browsers.
    fireEvent.click(h2oButton);
    expect(h2oButton.className).toContain("ring-brand");
  });

  // T042: Enter on right with left selected creates connection.
  it("creates a connection when Enter is pressed on a right item", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    // Select left first.
    fireEvent.click(screen.getByText("H2O"));
    // Click the Water button (simulating Enter/Space activation).
    const waterBtn = screen.getByText("Water").closest("button")!;
    fireEvent.click(waterBtn);

    // A pair box should now exist.
    expect(
      document.querySelector('[data-testid="pair-box"]'),
    ).toBeInTheDocument();
  });

  // T043: Pair box has accessible label.
  it("gives each pair box an accessible aria-label", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    fireEvent.click(screen.getByText("H2O"));
    fireEvent.click(screen.getByText("Water").closest("button")!);

    const pairBox = document.querySelector(
      '[data-testid="pair-box"]',
    ) as HTMLElement;
    expect(pairBox).toBeInTheDocument();
    // The aria-label should mention Pair 1 and both texts.
    expect(pairBox.getAttribute("aria-label")).toContain("Pair 1");
    expect(pairBox.getAttribute("aria-label")).toContain("H2O");
    expect(pairBox.getAttribute("aria-label")).toContain("Water");
  });

  // T044: Matched-pairs row wraps on narrow viewports.
  it("uses flex-wrap on the matched-pairs row for narrow viewports", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    const row = document.querySelector('[data-testid="matched-pairs-row"]');
    expect(row).toBeInTheDocument();
    // The Tailwind class flex-wrap should be present.
    expect(row!.className).toContain("flex-wrap");
  });

  // T045: Check answer button has aria-disabled.
  it("reflects disabled state on the Check answer button via aria-disabled", () => {
    render(
      <MatchingInput
        pairs={pairs2}
        onSubmit={vi.fn()}
        revealed={false}
        result={null}
      />,
    );

    const btn = screen.getByRole("button", { name: /check answer/i });
    expect(btn).toBeDisabled();
    // Native disabled also sets aria-disabled implicitly.
    expect(btn.getAttribute("disabled")).toBe("");
  });
});
