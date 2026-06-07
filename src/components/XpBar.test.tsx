import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { XpBar } from "./XpBar";
import { xpForLevel } from "../domain/progress/xp";

describe("XpBar", () => {
  it("shows an empty bar at the start of a level", () => {
    render(<XpBar xp={xpForLevel(2)} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  });

  it("reflects progress partway through a level", () => {
    const start = xpForLevel(2);
    const span = xpForLevel(3) - start;
    render(<XpBar xp={start + span / 2} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
  });

  it("renders the numeric label when requested", () => {
    render(<XpBar xp={xpForLevel(2)} showLabel />);
    expect(screen.getByText(/XP to level 3/i)).toBeInTheDocument();
  });
});
