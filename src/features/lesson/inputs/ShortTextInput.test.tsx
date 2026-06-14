import { fireEvent, screen, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ShortTextInput } from "./ShortTextInput";

describe("ShortTextInput", () => {
  it("renders input and accepts text", () => {
    const onChange = vi.fn();
    render(
      <ShortTextInput
        value=""
        onChange={onChange}
        onSubmit={vi.fn()}
        revealed={false}
      />,
    );

    const input = screen.getByRole("textbox", { name: /your answer/i });
    fireEvent.change(input, { target: { value: "Paris" } });
    expect(onChange).toHaveBeenCalledWith("Paris");
  });

  it("submits on Enter", () => {
    const onSubmit = vi.fn();
    render(
      <ShortTextInput
        value="Paris"
        onChange={vi.fn()}
        onSubmit={onSubmit}
        revealed={false}
      />,
    );

    const input = screen.getByRole("textbox", { name: /your answer/i });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSubmit).toHaveBeenCalled();
  });

  it("disables input when revealed", () => {
    render(
      <ShortTextInput
        value="Paris"
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        revealed
      />,
    );

    expect(
      screen.getByRole("textbox", { name: /your answer/i }),
    ).toBeDisabled();
  });
});
