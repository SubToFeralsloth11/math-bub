import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { HomeScreen } from "./HomeScreen";
import { renderApp } from "../../test/renderApp";

beforeEach(() => {
  globalThis.localStorage.clear();
});

describe("HomeScreen", () => {
  it("shows subject cards with correct track counts", () => {
    renderApp(<HomeScreen />);

    expect(
      screen.getByRole("heading", { name: /choose a subject/i }),
    ).toBeInTheDocument();

    // Maths has 9 tracks.
    expect(screen.getByRole("link", { name: /Maths/i })).toHaveAttribute(
      "href",
      "/subject/maths",
    );
    expect(screen.getByText(/9 tracks/)).toBeInTheDocument();

    // Science has 2 tracks.
    expect(screen.getByRole("link", { name: /Science/i })).toHaveAttribute(
      "href",
      "/subject/science",
    );
    expect(screen.getByText(/2 tracks/)).toBeInTheDocument();

    // HSS has 1 track (Languages also has 1, so scope to the HSS card).
    const hssLink = screen.getByRole("link", { name: /HSS/i });
    expect(hssLink).toHaveAttribute("href", "/subject/hss");
    expect(within(hssLink).getByText(/1 track/)).toBeInTheDocument();
  });

  it("offers links to badges and a reset control", () => {
    renderApp(<HomeScreen />);
    expect(screen.getByRole("link", { name: /view badges/i })).toHaveAttribute(
      "href",
      "/badges",
    );
    expect(
      screen.getByRole("button", { name: /reset progress/i }),
    ).toBeInTheDocument();
  });
});
