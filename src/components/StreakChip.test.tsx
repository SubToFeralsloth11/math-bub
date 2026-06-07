import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StreakChip } from "./StreakChip";

describe("StreakChip", () => {
  it("shows a prompt when there is no streak", () => {
    render(<StreakChip count={0} />);
    expect(screen.getByLabelText(/no streak yet/i)).toBeInTheDocument();
  });

  it("reflects an active streak count", () => {
    render(<StreakChip count={5} />);
    const chip = screen.getByLabelText("5 day streak");
    expect(chip).toHaveTextContent("5");
  });
});
