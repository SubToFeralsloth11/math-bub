import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { HomeScreen } from "./HomeScreen";
import { renderApp } from "../../test/renderApp";

beforeEach(() => {
  globalThis.localStorage.clear();
});

describe("HomeScreen", () => {
  it("shows a card linking to each authored track's map", () => {
    renderApp(<HomeScreen />);
    expect(
      screen.getByRole("heading", { name: /choose a track/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Algebra \(Year 8\)/i }),
    ).toHaveAttribute("href", "/track/algebra");
    expect(
      screen.getByRole("link", { name: /Geometry \(Year 10\)/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Time \(Year 4\)/i }),
    ).toBeInTheDocument();
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
