/**
 * The Reference surface: a hand-rolled modal that shows the lesson's learn
 * cards one at a time so a learner can re-read them while answering a question
 * or studying a card without losing their place in the run.
 *
 * Renders as a bottom sheet on narrow viewports and a right-anchored drawer at
 * `md+` via Tailwind `md:` variants. No runtime dependency; the focus trap is
 * hand-rolled.
 *
 * @module features/lesson/ReferenceDrawer
 * @author John Grimes
 */

import type { LessonFlowState } from "./lessonFlow";

interface ReferenceDrawerProps {
  /** The flow state driving the surface (its `reference` sub-state). */
  flow: LessonFlowState;
}

/**
 * Renders the Reference surface modal.
 *
 * @param _props - The component props (filled in by the implementation task).
 * @returns The rendered surface.
 */
export function ReferenceDrawer(_props: Readonly<ReferenceDrawerProps>) {
  return null;
}