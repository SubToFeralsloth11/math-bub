import { forwardRef, useId } from "react";

interface TextAnswerFieldProps {
  /** The current value. */
  value: string;
  /** Called when the value changes. */
  onChange: (value: string) => void;
  /** Called when the learner submits (Enter key). */
  onSubmit: () => void;
  /** Whether the field is locked after checking. */
  disabled: boolean;
  /** Placeholder text. */
  placeholder: string;
  /** Accessible label for the field. */
  label: string;
  /** Render in a monospace font (for expressions). */
  mono?: boolean;
}

/**
 * A single-line answer field shared by the numeric and expression inputs.
 * Pressing Enter submits, so a question can be answered from the keyboard alone.
 *
 * @param props - The component props.
 * @returns The rendered input with a screen-reader label.
 */
export const TextAnswerField = forwardRef<
  HTMLInputElement,
  TextAnswerFieldProps
>(function TextAnswerField(
  { value, onChange, onSubmit, disabled, placeholder, label, mono = false },
  ref,
) {
  const inputId = useId();
  return (
    <>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        ref={ref}
        type="text"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onSubmit();
          }
        }}
        className={`w-full rounded-bub border-0 bg-card px-5 py-4 text-lg text-ink ring-2 ring-hairline transition focus:ring-brand disabled:opacity-70 ${mono ? "font-mono" : ""}`}
        placeholder={placeholder}
      />
    </>
  );
});
