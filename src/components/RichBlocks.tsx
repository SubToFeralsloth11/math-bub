import { Fragment } from "react";

import { MathText } from "./MathText";

import type { RichBlock } from "../domain/content/types";

interface RichBlocksProps {
  /** The ordered content blocks to render. */
  blocks: RichBlock[];
  /**
   * Layout mode. "inline" flows text and maths together (prompts, options,
   * explanations); "prose" renders text blocks as paragraphs and maths blocks
   * as centred display equations (learn cards).
   */
  variant?: "inline" | "prose";
}

/**
 * Renders a sequence of rich-content blocks, mixing plain text and typeset maths.
 *
 * @param props - The component props.
 * @param props.blocks - The ordered content blocks.
 * @param props.variant - Layout mode: "inline" (default) or "prose".
 * @returns The rendered content.
 */
export function RichBlocks({
  blocks,
  variant = "inline",
}: Readonly<RichBlocksProps>) {
  if (variant === "prose") {
    return (
      <div className="flex flex-col gap-2">
        {blocks.map((block, index) =>
          block.kind === "text" ? (
            <p key={index} className="text-ink/80">
              {block.text}
            </p>
          ) : (
            <MathText
              key={index}
              tex={block.tex}
              fallback={block.fallback}
              display
            />
          ),
        )}
      </div>
    );
  }

  return (
    <span className="leading-relaxed">
      {blocks.map((block, index) => (
        <Fragment key={index}>
          {block.kind === "text" ? (
            <span>{block.text}</span>
          ) : (
            <MathText tex={block.tex} fallback={block.fallback} />
          )}{" "}
        </Fragment>
      ))}
    </span>
  );
}
