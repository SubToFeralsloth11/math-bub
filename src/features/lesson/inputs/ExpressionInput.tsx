import { parse } from "mathjs";
import { useMemo } from "react";

import { MathText } from "../../../components/MathText";
import { TextAnswerField } from "../../../components/TextAnswerField";

interface ExpressionInputProps {
  /** The current input value. */
  value: string;
  /** Called when the input value changes. */
  onChange: (value: string) => void;
  /** Called when the learner submits (e.g. presses Enter). */
  onSubmit: () => void;
  /** Whether the answer has been checked (locks the input). */
  revealed: boolean;
}

/**
 * Attempts to convert a plain expression string to TeX for echoing.
 *
 * @param value - The raw expression input.
 * @returns The TeX string, or null if the input cannot be parsed.
 */
function toTexOrNull(value: string): string | null {
  if (value.trim() === "") return null;
  try {
    return parse(value).toTex();
  } catch {
    return null;
  }
}

/**
 * An algebraic-expression answer input. As the learner types, a readable form is
 * echoed back as typeset maths; unparseable input shows a gentle hint and keeps
 * the field editable so the learner can simply correct it (FR-010).
 *
 * @param props - The component props.
 * @param props.value - The current value.
 * @param props.onChange - Change handler.
 * @param props.onSubmit - Submit handler (Enter key).
 * @param props.revealed - Whether the input is locked after checking.
 * @returns The rendered expression input.
 */
export function ExpressionInput({
  value,
  onChange,
  onSubmit,
  revealed,
}: Readonly<ExpressionInputProps>) {
  const tex = useMemo(() => toTexOrNull(value), [value]);
  const hasInput = value.trim() !== "";

  return (
    <div className="flex flex-col gap-2">
      <TextAnswerField
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        disabled={revealed}
        label="Type your expression"
        placeholder="e.g. 2(a+b)"
        mono
      />
      {hasInput && tex ? (
        <p className="px-1 text-muted">
          <span className="text-sm">Reads as: </span>
          <MathText tex={tex} fallback={value} />
        </p>
      ) : null}
      {hasInput && !tex ? (
        <p className="px-1 text-sm text-warn">
          Hmm, I can&apos;t read that yet - check your brackets and symbols.
        </p>
      ) : null}
    </div>
  );
}
