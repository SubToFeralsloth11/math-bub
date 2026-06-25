/**
 * The stats screen showing the learner's progress metrics.
 *
 * Displays six key metrics: current level, total XP, current streak,
 * longest streak, badges earned, and lessons completed.
 *
 * @author John Grimes
 * @module components/StatsScreen
 */

import { Navigate } from "@tanstack/react-router";

import { Card } from "./Card";
import { StatsXpBar } from "./StatsXpBar";
import {
  findLevelMessage,
  computeTotalLessonsCompleted,
  computeLongestStreak,
  computeFirstLogin,
  computeBadgeProgress,
} from "../domain/progress/stats";
import { levelProgress } from "../domain/progress/xp";
import { useProgress } from "../state/progressContext";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: string;
}

/**
 * Renders a single stat card.
 *
 * @param props - The component props.
 * @param props.title - The card title (e.g., "Level", "Total XP").
 * @param props.value - The main value to display.
 * @param props.subtitle - Optional secondary information.
 * @param props.icon - Optional emoji icon.
 * @returns The stat card element.
 */
function StatCard({ title, value, subtitle, icon }: Readonly<StatCardProps>) {
  return (
    <Card className="stat-card">
      <div className="stat-card-header">
        {icon ? <span className="stat-icon">{icon}</span> : null}
        <span>{title}</span>
      </div>
      <div className="stat-card-value">{value}</div>
      {subtitle ? <div className="stat-card-subtitle">{subtitle}</div> : null}
    </Card>
  );
}

interface SummaryRowProps {
  label: string;
  value: string;
}

/**
 * Renders a summary row in the progress section.
 *
 * @param props - The component props.
 * @param props.label - The label (e.g., "First login").
 * @param props.value - The value to display.
 * @returns The summary row element.
 */
function SummaryRow({ label, value }: Readonly<SummaryRowProps>) {
  return (
    <div className="summary-row">
      <span className="summary-label">{label}</span>
      <span className="summary-value">{value}</span>
    </div>
  );
}

/**
 * The main stats screen component.
 *
 * @returns The stats screen element.
 */
export function StatsScreen() {
  const { state } = useProgress();
  const progress = levelProgress(state.saved.xp);
  const levelMessage = findLevelMessage(progress.level);
  const badgeProgress = computeBadgeProgress(state.saved.badges.length, 30);
  const longestStreak = computeLongestStreak(state.saved.activeDates);
  const firstLogin = computeFirstLogin(state.saved.activeDates);
  const totalLessons = computeTotalLessonsCompleted(state.saved.lessons);

  if (state.saved.badges.length > 30) {
    // Migration warning if badges > 30 (shouldn't happen)
    return <Navigate to="/badges" replace />;
  }

  const currentStreakDisplay = `🔥 ${state.saved.streak.count}-day streak`;
  const longestStreakDisplay = `Longest: 🔥 ${longestStreak} days`;
  const badgesDisplay = `${badgeProgress.earned} of 30 badges`;
  const lessonsDisplay = `${totalLessons} lessons completed`;

  const levelValue = `Level ${progress.level}`;

  return (
    <div className="stats-page">
      <h1>My Progress</h1>

      <div className="stats-grid">
        <StatCard
          title="Level"
          value={levelValue}
          subtitle={levelMessage.message}
          icon="🎯"
        />

        <StatCard
          title="Total XP"
          value={state.saved.xp.toLocaleString()}
          icon="⭐"
        />

        <StatCard
          title="Current Streak"
          value={currentStreakDisplay}
          icon="🔥"
        />

        <StatCard
          title="Longest Streak"
          value={longestStreakDisplay}
          icon="🏅"
        />

        <StatCard title="Badges Earned" value={badgesDisplay} icon="🏅" />

        <StatCard title="Lessons Completed" value={lessonsDisplay} icon="📚" />

        <div className="summary-section">
          <h2 className="summary-heading">Progress Summary</h2>
          <SummaryRow label="First login" value={firstLogin} />
          <SummaryRow
            label="Active days"
            value={state.saved.activeDates.length.toString()}
          />
        </div>

        <div className="progress-section">
          <h2 className="progress-heading">Level Progress</h2>
          <StatsXpBar
            intoLevel={progress.intoLevel}
            span={progress.span}
            label={`${progress.intoLevel} / ${progress.toNext} XP`}
          />
        </div>
      </div>
    </div>
  );
}
