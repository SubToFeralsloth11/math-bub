import { createFileRoute } from "@tanstack/react-router";

import { LessonScreen } from "../features/lesson/LessonScreen";

/**
 * The lesson page route. Shows learn cards and practice questions.
 */
export const Route = createFileRoute("/lesson/$trackId/$lessonId")({
  component: LessonScreen,
});
