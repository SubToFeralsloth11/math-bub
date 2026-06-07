import { useState } from "react";

import { Feedback } from "./Feedback";
import { ExpressionInput } from "./inputs/ExpressionInput";
import { McqInput } from "./inputs/McqInput";
import { NumericInput } from "./inputs/NumericInput";
import { Button } from "../../components/Button";
import { Figure } from "../../components/Figure";
import { RichBlocks } from "../../components/RichBlocks";
import { markAnswer } from "../../domain/marking/markAnswer";

import type { Question } from "../../domain/content/types";
import type { MarkResult } from "../../domain/marking/markResult";

interface QuestionViewProps {
  /** The question to present. */
  question: Question;
  /** Called once when a readable answer is checked. */
  onAnswered: (correct: boolean, xp: number) => void;
  /** Called to advance to the next step. */
  onContinue: () => void;
  /** Label for the continue action (e.g. "Next" or "Finish"). */
  continueLabel?: string;
}

/**
 * Presents one question: prompt, optional figure, the type-appropriate input,
 * immediate feedback, and a check/continue action. Marking is delegated to
 * `markAnswer`, so this view never branches on question type for marking.
 *
 * @param props - The component props.
 * @param props.question - The question to present.
 * @param props.onAnswered - Invoked once when a readable answer is checked.
 * @param props.onContinue - Invoked to advance to the next step.
 * @param props.continueLabel - Optional label for the continue button.
 * @returns The rendered question step.
 */
export function QuestionView({
  question,
  onAnswered,
  onContinue,
  continueLabel = "Next",
}: Readonly<QuestionViewProps>) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<MarkResult | null>(null);

  const hasAnswer =
    question.type === "mcq" ? selectedId !== null : value.trim() !== "";

  function handleCheck() {
    if (!hasAnswer || checked) return;
    const input = question.type === "mcq" ? (selectedId ?? "") : value;
    const marked = markAnswer(question, input);
    setResult(marked);
    // Unreadable input keeps the question editable for a fresh attempt.
    if (marked.status === "unreadable") return;
    setChecked(true);
    onAnswered(marked.status === "correct", question.xp);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl text-ink md:text-2xl">
        <RichBlocks blocks={question.prompt} />
      </div>

      {question.figure ? <Figure figure={question.figure} /> : null}

      {question.type === "mcq" ? (
        <McqInput
          question={question}
          selectedId={selectedId}
          onSelect={setSelectedId}
          revealed={checked}
        />
      ) : question.type === "expression" ? (
        <ExpressionInput
          value={value}
          onChange={setValue}
          onSubmit={handleCheck}
          revealed={checked}
        />
      ) : (
        <NumericInput
          value={value}
          onChange={setValue}
          onSubmit={handleCheck}
          revealed={checked}
          unit={question.unit}
        />
      )}

      {result ? <Feedback result={result} question={question} /> : null}

      <div className="flex justify-end">
        {checked ? (
          <Button onClick={onContinue}>{continueLabel} →</Button>
        ) : (
          <Button onClick={handleCheck} disabled={!hasAnswer}>
            Check answer
          </Button>
        )}
      </div>
    </div>
  );
}
