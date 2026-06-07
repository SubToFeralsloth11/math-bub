/**
 * Dev-time content validation for MathBub.
 *
 * `validateContent` asserts the structural invariants authors must satisfy (see
 * contracts/contentModel.md). It returns a list of human-readable issues - empty
 * when content is valid - rather than throwing, so callers can surface every
 * problem at once (a dev banner in development, a failing test in CI).
 *
 * @module domain/content/validateContent
 */

import { parse } from "mathjs";

import type { AppContent, Question, Track, TrackId } from "./types";

/** A single human-readable validation problem. */
export type ValidationIssue = string;

// Symbols that may appear in an expression target without being declared
// variables: standard mathematical constants understood by mathjs.
const ALLOWED_CONSTANTS = new Set(["pi", "e", "tau", "phi", "i"]);

/**
 * Collects the free-variable symbol names used in a parsed mathjs expression,
 * excluding function names (e.g. the `sqrt` in `sqrt(x)`).
 *
 * @param expression - A mathjs-parseable expression string.
 * @returns The set of symbol names referenced as values.
 * @throws If the expression cannot be parsed by mathjs.
 */
function symbolsIn(expression: string): Set<string> {
  const node = parse(expression);
  const symbols = new Set<string>();
  node.traverse((current, _path, parent) => {
    if (
      current.type === "SymbolNode" &&
      !(parent?.type === "FunctionNode" && _path === "fn")
    ) {
      symbols.add((current as unknown as { name: string }).name);
    }
  });
  return symbols;
}

/**
 * Validates a single question's variant-specific invariants.
 *
 * @param question - The question to validate.
 * @param where - A location label used in issue messages.
 * @param issues - The accumulating issue list, appended to in place.
 */
function validateQuestion(
  question: Question,
  where: string,
  issues: ValidationIssue[],
): void {
  if (question.explanation.length === 0) {
    issues.push(
      `${where}: question "${question.id}" has an empty explanation.`,
    );
  }

  switch (question.type) {
    case "mcq": {
      if (question.options.length < 2 || question.options.length > 5) {
        issues.push(
          `${where}: MCQ "${question.id}" must have 2-5 options (has ${question.options.length}).`,
        );
      }
      const optionIds = question.options.map((option) => option.id);
      if (new Set(optionIds).size !== optionIds.length) {
        issues.push(`${where}: MCQ "${question.id}" has duplicate option ids.`);
      }
      if (!optionIds.includes(question.correctOptionId)) {
        issues.push(
          `${where}: MCQ "${question.id}" correctOptionId "${question.correctOptionId}" matches no option.`,
        );
      }
      break;
    }
    case "numeric": {
      const meaningful = question.accepted.filter(
        (value) => value.trim() !== "",
      );
      if (meaningful.length === 0) {
        issues.push(
          `${where}: numeric "${question.id}" has no non-empty accepted answers.`,
        );
      }
      break;
    }
    case "expression": {
      if (question.variables.length === 0) {
        issues.push(
          `${where}: expression "${question.id}" declares no variables.`,
        );
      }
      try {
        const used = symbolsIn(question.target);
        const declared = new Set(question.variables);
        for (const symbol of used) {
          if (!declared.has(symbol) && !ALLOWED_CONSTANTS.has(symbol)) {
            issues.push(
              `${where}: expression "${question.id}" target uses undeclared symbol "${symbol}".`,
            );
          }
        }
      } catch {
        issues.push(
          `${where}: expression "${question.id}" target "${question.target}" does not parse.`,
        );
      }
      break;
    }
  }
}

/**
 * Validates a single track's lessons and questions.
 *
 * @param track - The track to validate.
 * @param issues - The accumulating issue list, appended to in place.
 */
function validateTrack(track: Track, issues: ValidationIssue[]): void {
  const lessonIds = track.lessons.map((lesson) => lesson.id);
  if (new Set(lessonIds).size !== lessonIds.length) {
    issues.push(`Track "${track.id}" has duplicate lesson ids.`);
  }

  const orders = track.lessons
    .map((lesson) => lesson.order)
    .toSorted((a, b) => a - b);
  const contiguous = orders.every((order, index) => order === index + 1);
  if (track.lessons.length === 0 || !contiguous) {
    issues.push(
      `Track "${track.id}" lesson order must be contiguous 1..n (got [${orders.join(", ")}]).`,
    );
  }

  for (const lesson of track.lessons) {
    const where = `${track.id}/${lesson.id}`;
    if (lesson.learnCards.length === 0) {
      issues.push(`${where}: lesson has no learn cards.`);
    }
    if (lesson.practice.length === 0) {
      issues.push(`${where}: lesson has no practice questions.`);
    }
    if (lesson.mastery.length === 0) {
      issues.push(`${where}: lesson has no mastery questions.`);
    }
    if (
      lesson.passThreshold !== undefined &&
      (lesson.passThreshold <= 0 || lesson.passThreshold > 1)
    ) {
      issues.push(`${where}: passThreshold must be in (0, 1].`);
    }

    const allQuestions = [...lesson.practice, ...lesson.mastery];
    const questionIds = allQuestions.map((question) => question.id);
    if (new Set(questionIds).size !== questionIds.length) {
      issues.push(`${where}: duplicate question ids within the lesson.`);
    }
    const cardIds = lesson.learnCards.map((card) => card.id);
    if (new Set(cardIds).size !== cardIds.length) {
      issues.push(`${where}: duplicate learn-card ids.`);
    }
    for (const question of allQuestions) {
      validateQuestion(question, where, issues);
    }
  }

  for (const question of track.challenge.questions) {
    validateQuestion(question, `${track.id}/challenge`, issues);
  }
}

/**
 * Validates the entire authored content set.
 *
 * @param content - The aggregate app content (tracks and badges).
 * @returns An array of human-readable issues; empty when content is valid.
 */
export function validateContent(content: AppContent): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const trackIds = content.tracks.map((track) => track.id);
  if (new Set(trackIds).size !== trackIds.length) {
    issues.push("Duplicate track ids across content.");
  }

  const badgeIds = new Set(content.badges.map((badge) => badge.id));
  if (badgeIds.size !== content.badges.length) {
    issues.push("Duplicate badge ids across content.");
  }
  const knownTracks = new Set<TrackId>(content.tracks.map((track) => track.id));

  // Badge criteria that reference a specific track must name a real track.
  for (const badge of content.badges) {
    const match = /^(?:track-complete|boss-pass):(.+)$/.exec(badge.criterion);
    if (match && !knownTracks.has(match[1] as TrackId)) {
      issues.push(
        `Badge "${badge.id}" criterion references unknown track "${match[1]}".`,
      );
    }
  }

  for (const track of content.tracks) {
    validateTrack(track, issues);
    if (!badgeIds.has(track.challenge.passBadgeId)) {
      issues.push(
        `Track "${track.id}" challenge references unknown badge "${track.challenge.passBadgeId}".`,
      );
    }
  }

  return issues;
}
