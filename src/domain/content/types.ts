/**
 * Authored content types for StudyBub.
 *
 * These describe the read-only learning material shipped with the app: subjects,
 * tracks, lessons, learn cards, the six question variants, figures, boss
 * challenges and badges. They are the contract authors write content against (see
 * src/contracts/contentModel.md) and that `validateContent` enforces invariants over.
 *
 * @module domain/content/types
 */

/** Stable slug identifying a track. */
export type TrackId = string;

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

/** AI involvement marker on authored content. */
export type AiRole = "generated" | "checked" | "both";

/** Optional AI provenance marker for lessons and boss challenges. */
export interface AiProvenance {
  /** Name of the AI tool, e.g. "Claude", "ChatGPT". */
  tool: string;
  /** Source materials provided to the AI (filenames, URLs). */
  sources: string[];
  /** Whether the AI generated, checked, or both. */
  role: AiRole;
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
  /**
   * Optional id of the learn card in the same lesson that teaches the idea
   * this question tests. The Reference surface opens on this card when the
   * learner peeks from this question. When absent, Reference opens on the
   * first learn card of the lesson (or the card being studied in the learn
   * phase). Must resolve to a learn-card id within the same lesson; enforced
   * by validateContent.
   */
  refersTo?: string;
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

/** A short-text question with case-insensitive accepted-answer matching. */
export interface ShortTextQuestion extends QuestionBase {
  type: "shortText";
  /** One or more accepted answers, compared case-insensitively after normalisation. */
  accepted: string[];
}

/** A fill-in-the-blank question with a gap in a sentence template. */
export interface FillInTheBlankQuestion extends QuestionBase {
  type: "fillInTheBlank";
  /** Sentence parts with `___` marking the gap position. */
  template: RichBlock[];
  /** One or more accepted answers, compared case-insensitively after normalisation. */
  accepted: string[];
}

/** A single left-right pair in a matching question. */
export interface MatchingPair {
  /** Unique id within the question. */
  id: string;
  /** Left-column content. */
  left: RichBlock[];
  /** Right-column content. */
  right: RichBlock[];
}

/** A matching question where the learner pairs left and right items. */
export interface MatchingQuestion extends QuestionBase {
  type: "matching";
  /** Pairs to match, each with left and right content. */
  pairs: MatchingPair[];
}

/** The discriminated union of all question variants. */
export type Question =
  | McqQuestion
  | NumericQuestion
  | ExpressionQuestion
  | ShortTextQuestion
  | FillInTheBlankQuestion
  | MatchingQuestion;

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
  /** Optional AI provenance marker. */
  aiProvenance?: AiProvenance;
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
  /** Optional AI provenance marker. */
  aiProvenance?: AiProvenance;
}

/** A top-level subject area displayed on the home screen. */
export interface Subject {
  /** Stable slug, e.g. "maths", "science". */
  id: string;
  /** Display name, e.g. "Maths", "Science". */
  title: string;
  /** Short blurb, e.g. "Algebra, geometry, and more". */
  description: string;
  /** Single emoji, e.g. "🧮", "🔬". */
  icon: string;
  /** Hex colour, e.g. "#6D4AFF". */
  accent: string;
}

/** A content track that belongs to a subject. */
export interface Track {
  /** Stable slug (now any string, not a fixed union). */
  id: TrackId;
  /** The id of the subject this track belongs to. */
  subjectId: string;
  /** Display name, e.g. "Algebra (Year 8)". */
  title: string;
  /** Short blurb for the card. */
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
  | `track-complete:${string}`
  | `boss-pass:${string}`
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
  /** All subjects in display order. */
  subjects: Subject[];
  /** All tracks in display order. */
  tracks: Track[];
  /** All badge definitions. */
  badges: Badge[];
}
