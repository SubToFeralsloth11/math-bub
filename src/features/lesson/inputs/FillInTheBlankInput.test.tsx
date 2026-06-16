import { fireEvent, screen, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FillInTheBlankInput } from "./FillInTheBlankInput";

const template = [
  { kind: "text" as const, text: "The " },
  { kind: "text" as const, text: "___ is the powerhouse of the cell." },
];

const multiBlankTemplate = [
  { kind: "text" as const, text: "___ Flughafen liegt in ___ Stadt." },
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

  describe("multiple blanks", () => {
    it("renders two input fields for two blanks", () => {
      render(
        <FillInTheBlankInput
          template={multiBlankTemplate}
          value=""
          onChange={vi.fn()}
          onSubmit={vi.fn()}
          revealed={false}
        />,
      );

      expect(
        screen.getByRole("textbox", { name: "Fill in the blank 1" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: "Fill in the blank 2" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Flughafen liegt in")).toBeInTheDocument();
      expect(screen.getByText("Stadt.")).toBeInTheDocument();
    });

    it("joins multiple blank values with ||| delimiter", () => {
      const onChange = vi.fn();
      const { rerender } = render(
        <FillInTheBlankInput
          template={multiBlankTemplate}
          value=""
          onChange={onChange}
          onSubmit={vi.fn()}
          revealed={false}
        />,
      );

      const input1 = screen.getByRole("textbox", {
        name: "Fill in the blank 1",
      });
      fireEvent.change(input1, { target: { value: "der" } });
      expect(onChange).toHaveBeenLastCalledWith("der|||");

      // Simulate the parent updating the value prop after onChange.
      rerender(
        <FillInTheBlankInput
          template={multiBlankTemplate}
          value="der|||"
          onChange={onChange}
          onSubmit={vi.fn()}
          revealed={false}
        />,
      );

      const input2 = screen.getByRole("textbox", {
        name: "Fill in the blank 2",
      });
      fireEvent.change(input2, { target: { value: "der" } });
      expect(onChange).toHaveBeenLastCalledWith("der|||der");
    });

    it("restores values from joined string", () => {
      render(
        <FillInTheBlankInput
          template={multiBlankTemplate}
          value="der|||der"
          onChange={vi.fn()}
          onSubmit={vi.fn()}
          revealed={false}
        />,
      );

      expect(
        screen.getByRole("textbox", { name: "Fill in the blank 1" }),
      ).toHaveValue("der");
      expect(
        screen.getByRole("textbox", { name: "Fill in the blank 2" }),
      ).toHaveValue("der");
    });
  });
});
