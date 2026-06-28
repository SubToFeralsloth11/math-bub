/**
 * Dev-time content validation for StudyBub.
 *
 * `validateContent` asserts the structural invariants authors must satisfy (see
 * src/contracts/contentModel.md). It returns a list of human-readable issues - empty
 * when content is valid - rather than throwing, so callers can surface every
 * problem at once (a dev banner in development, a failing test in CI).
 *
 * @module domain/content/validateContent
 */

import { parse } from "mathjs";

import type {
  AiProvenance,
  AppContent,
  MatchingQuestion,
  Question,
  Track,
} from "./types";

/** A single human-readable validation problem. */
export type ValidationIssue = string;

/** The valid AI provenance roles. */
const AI_ROLES = new Set(["generated", "checked", "both"]);

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
 * Validates aiProvenance well-formedness when present.
 *
 * @param provenance - The provenance to validate (may be undefined).
 * @param where - Location label for issue messages.
 * @param issues - The accumulating issue list.
 */
function validateAiProvenance(
  provenance: AiProvenance | undefined,
  where: string,
  issues: ValidationIssue[],
): void {
  if (!provenance) return;
  if (!provenance.tool || provenance.tool.trim() === "") {
    issues.push(`${where}: aiProvenance has empty tool name.`);
  }
  if (!AI_ROLES.has(provenance.role)) {
    issues.push(
      `${where}: aiProvenance has invalid role "${provenance.role}" (must be generated|checked|both).`,
    );
  }
}

/**
 * Checks whether rich-blocks contain a `___` marker (in text blocks).
 */
function hasBlankMarker(blocks: { kind: string; text?: string }[]): boolean {
  return blocks.some(
    (block) => block.kind === "text" && (block.text ?? "").includes("___"),
  );
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
    case "shortText": {
      const meaningful = question.accepted.filter(
        (value) => value.trim() !== "",
      );
      if (meaningful.length === 0) {
        issues.push(
          `${where}: shortText "${question.id}" has no non-empty accepted answers.`,
        );
      }
      // Flag accepted lists where every value looks numeric (integer,
      // decimal, or number with a unit suffix). These likely belong on
      // a numeric question type.
      // A value "looks numeric" when it is an integer or decimal
      // optionally followed by a measurement-unit suffix. The suffix
      // must start with a letter (e.g. "m", "cm", "mm", "x") and
      // may include trailing digits/^ for exponents ("m2", "cm^2").
      // This avoids flagging time formats like "14:30" or expression
      // fragments like "2*pi".
      if (
        meaningful.length > 0 &&
        meaningful.every((value) =>
          /^\d*\.?\d+(?:\s*[a-zA-Z][a-zA-Z\d^]*)?$/.test(value),
        )
      ) {
        issues.push(
          `${where}: shortText "${question.id}" accepted list contains only numeric values — consider using "numeric" question type.`,
        );
      }
      // Flag overly long accepted lists, which are a keyword-list smell
      // under substring matching.
      if (meaningful.length > 8) {
        issues.push(
          `${where}: shortText "${question.id}" has ${meaningful.length} accepted items — consider trimming to 8 or fewer.`,
        );
      }
      break;
    }
    case "fillInTheBlank": {
      const meaningful = question.accepted.filter(
        (value) => value.trim() !== "",
      );
      if (meaningful.length === 0) {
        issues.push(
          `${where}: fillInTheBlank "${question.id}" has no non-empty accepted answers.`,
        );
      }
      if (
        question.template.length === 0 ||
        !hasBlankMarker(question.template)
      ) {
        issues.push(
          `${where}: fillInTheBlank "${question.id}" template must contain "___" marker.`,
        );
      }
      break;
    }
    case "matching": {
      const matchQ = question as MatchingQuestion;
      if (matchQ.pairs.length < 2) {
        issues.push(
          `${where}: matching "${question.id}" must have at least 2 pairs (has ${matchQ.pairs.length}).`,
        );
      }
      const pairIds = matchQ.pairs.map((pair) => pair.id);
      if (new Set(pairIds).size !== pairIds.length) {
        issues.push(
          `${where}: matching "${question.id}" has duplicate pair id.`,
        );
      }
      for (const pair of matchQ.pairs) {
        if (pair.left.length === 0) {
          issues.push(
            `${where}: matching "${question.id}" pair "${pair.id}" has empty left content.`,
          );
        }
        if (pair.right.length === 0) {
          issues.push(
            `${where}: matching "${question.id}" pair "${pair.id}" has empty right content.`,
          );
        }
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
    // A question's refersTo, when present, must resolve to a learn-card id
    // in the same lesson. Cross-lesson links are not supported.
    const cardIdSet = new Set(cardIds);
    for (const question of allQuestions) {
      if (question.refersTo && !cardIdSet.has(question.refersTo)) {
        issues.push(
          `${where}: question ${question.id} refersTo unresolvable card id "${question.refersTo}".`,
        );
      }
    }

    validateAiProvenance(lesson.aiProvenance, where, issues);

    for (const question of allQuestions) {
      validateQuestion(question, where, issues);
    }
  }

  const challengeWhere = `${track.id}/challenge`;
  validateAiProvenance(track.challenge.aiProvenance, challengeWhere, issues);

  for (const question of track.challenge.questions) {
    validateQuestion(question, challengeWhere, issues);
  }
}

/**
 * Validates the entire authored content set.
 *
 * @param content - The aggregate app content (subjects, tracks and badges).
 * @returns An array of human-readable issues; empty when content is valid.
 */
export function validateContent(content: AppContent): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Subject validation.
  if (content.subjects.length === 0) {
    issues.push("Content must have at least one subject.");
  }
  const subjectIds = content.subjects.map((subject) => subject.id);
  if (new Set(subjectIds).size !== subjectIds.length) {
    issues.push("Duplicate subject ids across content.");
  }
  const validSubjectIds = new Set(subjectIds);

  for (const subject of content.subjects) {
    if (!subject.id || subject.id.trim() === "") {
      issues.push("A subject has an empty id.");
    }
    if (!subject.title || subject.title.trim() === "") {
      issues.push(`Subject "${subject.id}" has an empty title.`);
    }
    if (!subject.description || subject.description.trim() === "") {
      issues.push(`Subject "${subject.id}" has an empty description.`);
    }
    if (!subject.icon || subject.icon.trim() === "") {
      issues.push(`Subject "${subject.id}" has an empty icon.`);
    }
    if (!subject.accent || !/^#[0-9A-Fa-f]{6}$/.test(subject.accent)) {
      issues.push(
        `Subject "${subject.id}" has an invalid accent colour "${subject.accent}" (must be #RRGGBB).`,
      );
    }
  }

  const trackIds = content.tracks.map((track) => track.id);
  if (new Set(trackIds).size !== trackIds.length) {
    issues.push("Duplicate track ids across content.");
  }

  // Validate every track's subjectId references a real subject.
  for (const track of content.tracks) {
    if (!validSubjectIds.has(track.subjectId)) {
      issues.push(
        `Track "${track.id}" references unknown subject "${track.subjectId}".`,
      );
    }
  }

  const badgeIds = new Set(content.badges.map((badge) => badge.id));
  if (badgeIds.size !== content.badges.length) {
    issues.push("Duplicate badge ids across content.");
  }
  const knownTracks = new Set<string>(content.tracks.map((track) => track.id));

  // Badge criteria that reference a specific track must name a real track.
  for (const badge of content.badges) {
    const match = /^(?:track-complete|boss-pass):(.+)$/.exec(badge.criterion);
    if (match && !knownTracks.has(match[1])) {
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
