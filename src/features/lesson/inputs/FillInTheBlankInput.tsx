import { RichBlocks } from "../../../components/RichBlocks";

import type { RichBlock } from "../../../domain/content/types";

interface FillInTheBlankInputProps {
  template: RichBlock[];
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  revealed: boolean;
}

/**
 * Delimiter used to join values from multiple blanks into a single string
 * for the parent component. Chosen to be unlikely to appear in real answers.
 */
const BLANK_DELIMITER = "|||";

/**
 * Renders a fill-in-the-blank question with one or more blanks. Each `___`
 * in the template text is replaced by a text input. When multiple blanks
 * are present, their values are joined with `|||` so the parent continues
 * to work with a single string.
 */
export function FillInTheBlankInput({
  template,
  value,
  onChange,
  onSubmit,
  revealed,
}: Readonly<FillInTheBlankInputProps>) {
  // Build a flat sequence of text segments and blank slots from the template.
  type Part =
    | { kind: "text"; blocks: RichBlock[] }
    | { kind: "blank"; index: number };

  const parts: Part[] = [];
  let blankIndex = 0;

  for (const block of template) {
    if (block.kind === "text" && block.text.includes("___")) {
      const fragments = block.text.split("___");
      for (let fi = 0; fi < fragments.length; fi++) {
        if (fragments[fi]) {
          parts.push({
            kind: "text",
            blocks: [{ kind: "text", text: fragments[fi] }],
          });
        }
        if (fi < fragments.length - 1) {
          parts.push({ kind: "blank", index: blankIndex++ });
        }
      }
    } else {
      // Merge consecutive text blocks for cleaner rendering.
      const last = parts.at(-1);
      if (last?.kind === "text") {
        last.blocks.push(block);
      } else {
        parts.push({ kind: "text", blocks: [block] });
      }
    }
  }

  const blankCount = blankIndex;

  // Decode the joined value back into per-blank strings, padding if needed.
  const values = value ? value.split(BLANK_DELIMITER) : [];
  while (values.length < blankCount) {
    values.push("");
  }

  function handleChange(index: number, text: string): void {
    const next = [...values];
    next[index] = text;
    onChange(next.join(BLANK_DELIMITER));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-lg leading-relaxed text-ink">
        {parts.map((part, pi) => {
          if (part.kind === "text") {
            if (part.blocks.length === 0) return null;
            return <RichBlocks key={`text-${pi}`} blocks={part.blocks} />;
          }
          const idx = part.index;
          return (
            <input
              key={`blank-${idx}`}
              type="text"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              value={values[idx] ?? ""}
              disabled={revealed}
              onChange={(event) => handleChange(idx, event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onSubmit();
                }
              }}
              className="inline-block w-40 rounded-bub border-0 bg-card px-3 py-1 text-center text-lg text-ink ring-2 ring-hairline transition focus:ring-brand disabled:opacity-70"
              placeholder="..."
              aria-label={`Fill in the blank ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
