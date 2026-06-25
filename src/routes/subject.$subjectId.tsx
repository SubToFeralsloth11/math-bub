import { createFileRoute } from "@tanstack/react-router";

import { SubjectScreen } from "../features/subject/SubjectScreen";

/**
 * The subject page route. Shows the tracks available within a subject.
 */
export const Route = createFileRoute("/subject/$subjectId")({
  component: SubjectScreen,
});
