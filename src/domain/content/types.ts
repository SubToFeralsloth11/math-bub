/**
 * Authored content types for MathBub.
 *
 * These describe the read-only learning material shipped with the app: tracks,
 * lessons, learn cards, the three question variants, figures, boss challenges and
 * badges. They are the contract authors write content against (see
 * contracts/contentModel.md) and that `validateContent` enforces invariants over.
 *
 * @module domain/content/types
 */

/** Stable slug identifying a track. */
export type TrackId = "algebra" | "geometry" | "time";

/** Stable slug identifying a badge. */
export type BadgeId = string;

/**
 * A unit of rich content: either plain text or a piece of typeset maths with a
 * plain-text fallback used when typesetting fails (FR-012).
 */
export type RichBlock =
  | { kind: "text"; text: string }
  | { kind: "math"; tex: string; fallback: string };

/**
 * A geometry figure referenced by a learn card or question. The image is
 * expected at `public/figures/<id>.png`; when absent, `textFallback` is shown so
 * the question remains answerable (FR-013).
 */
export interface Figure {
  /** Stable id; maps to the asset filename. */
  id: string;
  /** Accessible description, also used as the image `alt` text. */
  alt: string;
  /** Text shown in place of a missing image. */
  textFallback: string;
}

/** A single multiple-choice option. */
export interface McqOption {
  /** Unique id within the question. */
  id: string;
  /** Option content (supports typeset maths). */
  label: RichBlock[];
}

/** Fields common to every question variant. */
interface QuestionBase {
  /** Unique id within its set. */
  id: string;
  /** The question text/maths. */
  prompt: RichBlock[];
  /** Optional figure shown with the question. */
  figure?: Figure | null;
  /** Worked explanation shown on a wrong answer and available on request. */
  explanation: RichBlock[];
  /** XP awarded for a correct answer. */
  xp: number;
}

/** A multiple-choice question with exactly one correct option. */
export interface McqQuestion extends QuestionBase {
  type: "mcq";
  /** Between two and five options. */
  options: McqOption[];
  /** The id of the single correct option. */
  correctOptionId: string;
}

/** A numeric or short-text question marked against accepted answers. */
export interface NumericQuestion extends QuestionBase {
  type: "numeric";
  /** One or more accepted answers, compared after normalisation. */
  accepted: string[];
  /** Optional unit stripped from input before comparison (e.g. "cm"). */
  unit?: string;
}

/** An algebraic-expression question marked by equivalence to a target. */
export interface ExpressionQuestion extends QuestionBase {
  type: "expression";
  /** A mathjs-parseable target expression. */
  target: string;
  /** Symbols sampled when testing equivalence. */
  variables: string[];
}

/** The discriminated union of all question variants. */
export type Question = McqQuestion | NumericQuestion | ExpressionQuestion;

/** A teaching snippet shown before practice. */
export interface LearnCard {
  /** Unique id within the lesson. */
  id: string;
  /** Card heading, e.g. "Key idea". */
  heading: string;
  /** Ordered rich-content blocks. */
  body: RichBlock[];
  /** Optional figure (geometry). */
  figure?: Figure | null;
}

/** A lesson within a track. */
export interface Lesson {
  /** Unique id within the track. */
  id: string;
  /** 1-based position on the map; contiguous within a track. */
  order: number;
  /** Display title, e.g. "5G Expanding brackets". */
  title: string;
  /** The originating worksheet reference, e.g. "5G". */
  sourceRef: string;
  /** One or more learn cards, shown before practice. */
  learnCards: LearnCard[];
  /** Practice question set (at least one). */
  practice: Question[];
  /** Mastery-check question set (at least one). */
  mastery: Question[];
  /** Pass threshold as a fraction 0..1; defaults to 0.8 when omitted. */
  passThreshold?: number;
}

/** An end-of-track practice-paper assessment. */
export interface BossChallenge {
  /** Stable id, e.g. "algebra-boss". */
  id: string;
  /** Display title. */
  title: string;
  /** Originating practice paper. */
  sourceRef: string;
  /** Challenge question set (no learn cards). */
  questions: Question[];
  /** Bonus XP awarded on completion. */
  bonusXp: number;
  /** Badge granted for finishing the challenge. */
  passBadgeId: BadgeId;
}

/** A top-level subject area. */
export interface Track {
  /** Stable slug. */
  id: TrackId;
  /** Display name, e.g. "Algebra (Year 8)". */
  title: string;
  /** Short blurb for the home card. */
  description: string;
  /** Ordered lessons; `order` values run 1..n with no gaps. */
  lessons: Lesson[];
  /** The end-of-track boss challenge. */
  challenge: BossChallenge;
}

/** Machine-evaluable badge criteria tags. */
export type BadgeCriterion =
  | "first-lesson"
  | "perfect-mastery"
  | "streak-5"
  | "streak-7"
  | `track-complete:${TrackId}`
  | `boss-pass:${TrackId}`
  | "all-tracks-complete";

/** A milestone award definition. */
export interface Badge {
  /** Stable slug. */
  id: BadgeId;
  /** Display title, e.g. "Perfect mastery". */
  title: string;
  /** Unlock condition shown to the learner. */
  description: string;
  /** The rule key evaluated to award the badge. */
  criterion: BadgeCriterion;
  /** A short emoji or glyph used as the badge icon. */
  icon: string;
}

/** The aggregate of all authored content the app ships with. */
export interface AppContent {
  /** All tracks in display order. */
  tracks: Track[];
  /** All badge definitions. */
  badges: Badge[];
}
