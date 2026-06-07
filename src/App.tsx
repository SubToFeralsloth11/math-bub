import { Navigate, Route, Routes } from "react-router-dom";

import { BadgesScreen } from "./features/badges/BadgesScreen";
import { BossChallengeScreen } from "./features/challenge/BossChallengeScreen";
import { HomeScreen } from "./features/home/HomeScreen";
import { LessonScreen } from "./features/lesson/LessonScreen";
import { TrackMapScreen } from "./features/trackMap/TrackMapScreen";

/**
 * Root application component defining the routes for MathBub's screens.
 *
 * @returns The route table for the application.
 */
export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/track/:trackId" element={<TrackMapScreen />} />
      <Route path="/lesson/:trackId/:lessonId" element={<LessonScreen />} />
      <Route path="/challenge/:trackId" element={<BossChallengeScreen />} />
      <Route path="/badges" element={<BadgesScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
