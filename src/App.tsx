import { Navigate, Route, Routes, useParams } from "react-router-dom";

import { findSubjectForTrack } from "./content";
import { BadgesScreen } from "./features/badges/BadgesScreen";
import { BossChallengeScreen } from "./features/challenge/BossChallengeScreen";
import { HomeScreen } from "./features/home/HomeScreen";
import { LessonScreen } from "./features/lesson/LessonScreen";
import { SettingsScreen } from "./features/settings/SettingsScreen";
import { SubjectScreen } from "./features/subject/SubjectScreen";
import { TrackMapScreen } from "./features/trackMap/TrackMapScreen";

function TrackRedirect() {
  const { trackId } = useParams<{ trackId: string }>();
  const subject = findSubjectForTrack(trackId ?? "");
  if (subject) {
    return <Navigate to={`/subject/${subject.id}/track/${trackId}`} replace />;
  }
  return <Navigate to="/" replace />;
}

/**
 *
 */
export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/subject/:subjectId" element={<SubjectScreen />} />
      <Route
        path="/subject/:subjectId/track/:trackId"
        element={<TrackMapScreen />}
      />
      <Route path="/lesson/:trackId/:lessonId" element={<LessonScreen />} />
      <Route path="/challenge/:trackId" element={<BossChallengeScreen />} />
      <Route path="/badges" element={<BadgesScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="/track/:trackId" element={<TrackRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
