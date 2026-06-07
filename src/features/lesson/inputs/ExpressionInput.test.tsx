import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ExpressionInput } from "./ExpressionInput";

describe("ExpressionInput", () => {
  it("echoes parseable input as typeset maths", () => {
    const { container } = render(
      <ExpressionInput
        value="2(a+b)"
        onChange={() => {}}
        onSubmit={() => {}}
        revealed={false}
      />,
    );
    expect(container.querySelector(".katex")).not.toBeNull();
  });

  it("shows a gentle hint for unreadable input and keeps the field editable", () => {
    render(
      <ExpressionInput
        value="2a +"
        onChange={() => {}}
        onSubmit={() => {}}
        revealed={false}
      />,
    );
    expect(screen.getByText(/can't read that yet/i)).toBeInTheDocument();
    // The field remains enabled so the learner can correct the input.
    expect(screen.getByRole("textbox")).toBeEnabled();
  });

  it("submits on Enter", async () => {
    const onSubmit = vi.fn();
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(
      <ExpressionInput
        value="x^2"
        onChange={() => {}}
        onSubmit={onSubmit}
        revealed={false}
      />,
    );
    await user.click(screen.getByRole("textbox"));
    await user.keyboard("{Enter}");
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
