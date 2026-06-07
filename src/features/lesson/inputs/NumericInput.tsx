import { TextAnswerField } from "../../../components/TextAnswerField";

interface NumericInputProps {
  /** The current input value. */
  value: string;
  /** Called when the input value changes. */
  onChange: (value: string) => void;
  /** Called when the learner submits (e.g. presses Enter). */
  onSubmit: () => void;
  /** Whether the answer has been checked (locks the input). */
  revealed: boolean;
  /** Optional unit shown as a suffix hint (e.g. "cm"). */
  unit?: string;
}

/**
 * A numeric / short-text answer input with an optional unit suffix.
 *
 * @param props - The component props.
 * @param props.value - The current value.
 * @param props.onChange - Change handler.
 * @param props.onSubmit - Submit handler (Enter key).
 * @param props.revealed - Whether the input is locked after checking.
 * @param props.unit - Optional unit suffix hint.
 * @returns The rendered input.
 */
export function NumericInput({
  value,
  onChange,
  onSubmit,
  revealed,
  unit,
}: Readonly<NumericInputProps>) {
  return (
    <div className="flex items-center gap-3">
      <TextAnswerField
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        disabled={revealed}
        label="Your answer"
        placeholder="Type your answer"
      />
      {unit ? <span className="font-display text-muted">{unit}</span> : null}
    </div>
  );
}
