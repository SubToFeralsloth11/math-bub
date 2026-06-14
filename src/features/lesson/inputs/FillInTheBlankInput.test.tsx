import { fireEvent, screen, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FillInTheBlankInput } from "./FillInTheBlankInput";

const template = [
  { kind: "text" as const, text: "The " },
  { kind: "text" as const, text: "___ is the powerhouse of the cell." },
];

describe("FillInTheBlankInput", () => {
  it("renders template with gap input", () => {
    render(
      <FillInTheBlankInput
        template={template}
        value=""
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        revealed={false}
      />,
    );

    expect(screen.getByText("The")).toBeInTheDocument();
    expect(
      screen.getByText("is the powerhouse of the cell."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /fill in the blank/i }),
    ).toBeInTheDocument();
  });

  it("accepts input in the gap", () => {
    const onChange = vi.fn();
    render(
      <FillInTheBlankInput
        template={template}
        value=""
        onChange={onChange}
        onSubmit={vi.fn()}
        revealed={false}
      />,
    );

    const input = screen.getByRole("textbox", { name: /fill in the blank/i });
    fireEvent.change(input, { target: { value: "mitochondria" } });
    expect(onChange).toHaveBeenCalledWith("mitochondria");
  });

  it("submits on Enter", () => {
    const onSubmit = vi.fn();
    render(
      <FillInTheBlankInput
        template={template}
        value="mitochondria"
        onChange={vi.fn()}
        onSubmit={onSubmit}
        revealed={false}
      />,
    );

    const input = screen.getByRole("textbox", { name: /fill in the blank/i });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSubmit).toHaveBeenCalled();
  });

  it("disables input when revealed", () => {
    render(
      <FillInTheBlankInput
        template={template}
        value="mitochondria"
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        revealed
      />,
    );

    expect(
      screen.getByRole("textbox", { name: /fill in the blank/i }),
    ).toBeDisabled();
  });
});
