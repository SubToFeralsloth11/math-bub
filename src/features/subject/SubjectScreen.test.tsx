import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { SubjectScreen } from "./SubjectScreen";
import { renderApp } from "../../test/renderApp";

beforeEach(() => {
  globalThis.localStorage.clear();
});

describe("SubjectScreen", () => {
  it("renders tracks for a subject with progress", () => {
    renderApp(<SubjectScreen />, {
      route: "/subject/maths",
      path: "/subject/:subjectId",
    });

    expect(screen.getByRole("heading", { name: /Maths/i })).toBeInTheDocument();
    expect(screen.getByText(/Algebra, geometry, and more/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Algebra \(Year 8\)/i }),
    ).toHaveAttribute("href", "/subject/maths/track/algebra");
    expect(
      screen.getByRole("link", { name: /Geometry \(Year 10\)/i }),
    ).toHaveAttribute("href", "/subject/maths/track/geometry");
    expect(
      screen.getByRole("link", { name: /Time \(Year 8\)/i }),
    ).toHaveAttribute("href", "/subject/maths/track/time");
  });

  it("shows empty state when subject has no tracks", () => {
    renderApp(<SubjectScreen />, {
      route: "/subject/hass",
      path: "/subject/:subjectId",
    });

    expect(screen.getByRole("heading", { name: /HASS/i })).toBeInTheDocument();
    expect(screen.getByText(/No tracks yet/i)).toBeInTheDocument();
  });

  it("shows a not-found state for an unknown subject", () => {
    renderApp(<SubjectScreen />, {
      route: "/subject/nonexistent",
      path: "/subject/:subjectId",
    });

    expect(screen.getByText(/Subject not found/i)).toBeInTheDocument();
  });
});
