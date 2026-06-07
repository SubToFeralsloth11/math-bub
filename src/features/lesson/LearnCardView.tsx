import { Card } from "../../components/Card";
import { Figure } from "../../components/Figure";
import { RichBlocks } from "../../components/RichBlocks";

import type { LearnCard } from "../../domain/content/types";

interface LearnCardViewProps {
  /** The learn card to display. */
  card: LearnCard;
}

/**
 * Renders a single teaching card: a heading, its rich-content body, and an
 * optional figure.
 *
 * @param props - The component props.
 * @param props.card - The learn card to render.
 * @returns The rendered learn card.
 */
export function LearnCardView({ card }: Readonly<LearnCardViewProps>) {
  return (
    <Card className="animate-bub-rise p-6 md:p-8">
      <h2 className="mb-4 text-2xl text-ink">{card.heading}</h2>
      <div className="text-lg leading-relaxed">
        <RichBlocks blocks={card.body} variant="prose" />
      </div>
      {card.figure ? <Figure figure={card.figure} /> : null}
    </Card>
  );
}
