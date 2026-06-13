import { screen } from "@testing-library/react";
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

    // Maths has 8 tracks.
    expect(
      screen.getByRole("link", { name: /Maths/i }),
    ).toHaveAttribute("href", "/subject/maths");
    expect(screen.getByText(/8 tracks/)).toBeInTheDocument();

    // Other subjects have no tracks yet.
    expect(
      screen.getByRole("link", { name: /Science/i }),
    ).toHaveAttribute("href", "/subject/science");
    expect(screen.getAllByText("No tracks yet").length).toBeGreaterThan(0);

    expect(
      screen.getByRole("link", { name: /HASS/i }),
    ).toHaveAttribute("href", "/subject/hass");

    expect(
      screen.getByRole("link", { name: /English/i }),
    ).toHaveAttribute("href", "/subject/english");

    expect(
      screen.getByRole("link", { name: /German/i }),
    ).toHaveAttribute("href", "/subject/german");

    expect(
      screen.getByRole("link", { name: /HPE/i }),
    ).toHaveAttribute("href", "/subject/hpe");
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
