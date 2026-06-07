import { useId } from "react";

import { RichBlocks } from "../../../components/RichBlocks";

import type { McqQuestion } from "../../../domain/content/types";

interface McqInputProps {
  /** The MCQ being answered. */
  question: McqQuestion;
  /** The currently-selected option id, or null. */
  selectedId: string | null;
  /** Called when the learner selects an option. */
  onSelect: (optionId: string) => void;
  /** Whether the answer has been checked and the result revealed. */
  revealed: boolean;
}

/**
 * Decides the visual state class for an option once the answer is revealed.
 *
 * @param optionId - The option being styled.
 * @param question - The MCQ, for the correct option id.
 * @param selectedId - The learner's selection.
 * @returns Tailwind classes for the option's revealed state.
 */
function revealedClasses(
  optionId: string,
  question: McqQuestion,
  selectedId: string | null,
): string {
  if (optionId === question.correctOptionId) {
    return "ring-success bg-success-soft text-ink";
  }
  if (optionId === selectedId) {
    return "ring-warn bg-warn-soft text-ink line-through decoration-warn/60";
  }
  return "ring-hairline opacity-60";
}

/**
 * An accessible multiple-choice input rendered as a radio group of option cards.
 *
 * @param props - The component props.
 * @param props.question - The MCQ being answered.
 * @param props.selectedId - The selected option id, or null.
 * @param props.onSelect - Selection handler.
 * @param props.revealed - Whether the result is revealed (locks the inputs).
 * @returns The rendered option group.
 */
export function McqInput({
  question,
  selectedId,
  onSelect,
  revealed,
}: Readonly<McqInputProps>) {
  const groupName = useId();

  return (
    <fieldset className="flex flex-col gap-3" disabled={revealed}>
      <legend className="sr-only">Choose the correct answer</legend>
      {question.options.map((option) => {
        const isSelected = option.id === selectedId;
        const stateClasses = revealed
          ? revealedClasses(option.id, question, selectedId)
          : isSelected
            ? "ring-brand bg-brand-soft text-ink"
            : "ring-hairline hover:ring-brand/40";
        return (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center gap-3 rounded-bub bg-card px-5 py-4 text-lg ring-2 transition ${stateClasses} ${revealed ? "cursor-default" : ""}`}
          >
            <input
              type="radio"
              name={groupName}
              value={option.id}
              checked={isSelected}
              onChange={() => onSelect(option.id)}
              className="size-5 accent-brand"
            />
            <span className="flex-1">
              <RichBlocks blocks={option.label} />
            </span>
            {revealed && option.id === question.correctOptionId ? (
              <span aria-hidden className="text-success">
                ✓
              </span>
            ) : null}
          </label>
        );
      })}
    </fieldset>
  );
}
