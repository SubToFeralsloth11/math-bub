# Generating StudyBub Content from OneNote Blueprints

Use the extracted OneNote JSON (`extracted.json`) as a curriculum blueprint to
generate comprehensive StudyBub content. Never copy OneNote text verbatim — the
notebook tells you what to teach, at what difficulty, and in what sequence. You
must generate fresh content that thoroughly covers and exercises each topic.

The content model contract is at `src/contracts/contentModel.md`.

## Pre-generation inventory (always do first)

Before writing any content, inventory the extracted pages:

1. Read the extracted JSON and list every page with its cleaned content.
2. Classify each page:
   - **curriculum-plan** — contains "Week N" headings and topic lines with
     exercise numbers (e.g. "1E/1F Adding and subtracting negative integers").
   - **exercise-table** — tab-separated exercise numbers in Fluency / Problem
     Solving / Enrichment columns.
   - **empty-template** — < 100 chars of cleaned content; skip.
   - **non-maths** — wellbeing factsheets, admin pages; skip.
3. Read all existing `src/content/tracks/*.ts` files and note which topics are
   already covered.
4. Cross-reference the curriculum-plan topics against existing tracks.
5. Identify uncovered topics and decide how to group them into new tracks.
6. **Examine every extracted image.** List each PNG in
   `/tmp/onenote-extraction/` alongside the page it came from. For each
   image, describe what it shows and note which topic it relates to. Images
   that are curriculum planners, diagrams, worked examples, or exercise
   layouts must be incorporated into the generated content as Figures.

**Do not write a separate generation script.** Create the track files directly
in `src/content/tracks/` following the content model contract. This is simpler
and avoids an indirection layer that would need maintenance.

## Content expansion principles

For every topic you generate content for, follow these rules:

1. **Never copy OneNote text verbatim.** Use it only to understand the topic
   scope, difficulty level, and exercise structure.
2. **Author at least 3 learnCards per lesson.** Include: (a) a key idea card
   with conceptual explanation, (b) a worked example with step-by-step
   solution, and (c) a common-mistake or extension card.
3. **Author at least 8 practice questions per lesson.** Spread them across:
   - 3–4 fluency/drill questions (straightforward, build confidence).
   - 2–3 problem-solving questions (multi-step, apply concepts).
   - 1–2 enrichment/extension questions (non-routine, deepen understanding).
4. **Author at least 3 mastery questions per lesson.** Each should test a
   different aspect of the topic so a pass means genuine competence, not
   memorisation of one pattern.
5. **Vary question types.** Use numeric, expression, mcq, shortText,
   fillInTheBlank, and matching types across the lesson. Do not default to
   all numeric. At least 40% of questions should be non-numeric types.
6. **Every question must have a thorough explanation.** Show the reasoning, not
   just the answer. The explanation is what the learner sees on wrong answers.
7. **Write real questions, never placeholders.** The `accepted` array must
   contain correct answers. Placeholder questions (with sentinel values like
   "(answer to be filled)") are not acceptable — every question must be fully
   answerable.

## Using the exercise-table as a difficulty guide

The exercise-table pages show question numbers organised by difficulty columns
(Fluency, Problem Solving, Enrichment). The notebook rarely contains actual
question text — it references textbook exercises by number. Use this to
calibrate your generated questions:

- **Fluency column** → your simplest practice questions. Single-step,
  straightforward application of the concept. 10–15 XP each.
- **Problem Solving column** → your intermediate practice questions.
  Multi-step, requires connecting ideas. 15–20 XP each.
- **Enrichment column** → your hardest practice questions and some mastery
  questions. Non-routine, deep thinking required. 20–25 XP each.

The number of exercise references in each column tells you the approximate
ratio of difficulty levels to generate. Generate fresh questions at each
difficulty level — do not attempt to recreate the textbook exercises.

## Structural mapping

| OneNote concept                       | StudyBub type    | How to use it                                                        |
| ------------------------------------- | ---------------- | -------------------------------------------------------------------- |
| Notebook (e.g. "2026 - Year 8 Maths") | Subject          | One Subject per notebook                                             |
| Section (e.g. "Term 1")               | Content grouping | Groups topics by term; topics within a term share a curriculum phase |
| Curriculum-plan topic line            | Lesson           | One lesson per topic; use exercise number as title prefix            |
| Exercise-table row                    | Difficulty guide | Calibrate question count and difficulty per lesson                   |
| Embedded image in page                | Figure           | Copy PNG to `public/figures/`, reference by filename stem            |

## Subject generation

Each Class Notebook maps to a Subject:

```typescript
{
  id: "maths",                    // Lowercase slug
  title: "Maths",
  description: "Algebra, geometry, statistics, and more — from the Year 8 curriculum",
  icon: "🧮",
  accent: "#6D4AFF",
}
```

The notebook title includes the year level and subject. Extract these to
populate the Subject.

## Track generation

**The OneNote section structure is NOT a track structure.** OneNote sections
(Welcome, \_Content Library, student section) are navigation artefacts. The
curriculum is organised by TERM within sections, and by TOPIC within terms.

Group related topics into sensible tracks based on subject area:

| Topics                                                 | Suggested track id   |
| ------------------------------------------------------ | -------------------- |
| 1E/1F, 1G, 1H (negative integers, order of operations) | `integer-operations` |
| 4A, 4B, 4C, 4E, 4F (perimeter, circumference, area)    | `perimeter-and-area` |
| 4K, 4L, 4M (Pythagoras)                                | `pythagoras`         |
| 4H, 4I (volume, capacity)                              | `volume`             |
| 3F (decimals)                                          | `decimals`           |
| 2D (quadrilaterals)                                    | `quadrilaterals`     |
| 10D, 10E, 10H, 10I (congruency, similarity)            | `geometry`           |

Each track:

```typescript
{
  id: "perimeter-and-area",          // Lowercase, hyphenated, descriptive
  subjectId: "maths",
  title: "Perimeter and Area (Year 8)", // Include year level per Principle IV
  description: "...",                   // Brief topic summary
  lessons: [...],
  challenge: { ... },
}
```

Year level comes from the notebook title. If existing tracks have incorrect
year labels (e.g. the notebook teaches them in Year 8 but the track says
"Year 10"), correct them during generation.

## Lesson generation

Each topic line from a curriculum-plan page generates a Lesson. The exercise
number becomes the title prefix; the description becomes the title.

### From curriculum-plan page

Parse lines like `1E/1F Adding and subtracting negative integers` into:

```typescript
{
  id: "int-1e-adding-subtracting",   // track-prefix + exercise + short-slug
  order: 1,                            // Contiguous within track
  title: "1E/1F Adding and subtracting negative integers",
  sourceRef: "1E/1F",
  aiProvenance: {
    tool: "Claude",
    sources: ["2026 - Year 8 Maths Class Notebook"],
    role: "generated",
  },
  learnCards: [
    // At least 3: key idea, worked example, common-mistake/extension
  ],
  practice: [
    // At least 8: mix of fluency, problem-solving, enrichment
  ],
  mastery: [
    // At least 3: each tests a different aspect
  ],
}
```

The `sourceRef` field should reference the originating worksheet or textbook
reference, not the OneNote page name. For the planner-context source, use the
notebook title and the term/week the topic appears in.

Every question must carry `aiProvenance` markers (at the lesson level) and a
`sourceRef` that traces back to the originating worksheet, not the OneNote page.

## Question type selection

Do not default to all numeric questions. Vary question types across the lesson:

| Question type    | When to use                                                                     |
| ---------------- | ------------------------------------------------------------------------------- |
| `numeric`        | Calculations with a single numeric answer                                       |
| `expression`     | Algebraic expressions where equivalence matters (use mathjs)                    |
| `mcq`            | Conceptual understanding, identifying correct methods, avoiding common mistakes |
| `shortText`      | Word answers, explanations, describing properties                               |
| `fillInTheBlank` | Partial answers, completing steps in a worked solution                          |
| `matching`       | Connecting related concepts (e.g. shape to formula, term to definition)         |

At least 40% of questions across a lesson should be non-numeric types.

## BossChallenge generation

Create a synthetic BossChallenge for each track that draws on the hardest
concepts from across the track's lessons. Use the exercise-table enrichment
column to identify the most challenging topics. Format:

- 2 questions of medium difficulty (20 XP each).
- 2 questions of high difficulty (25 XP each).
- 1 conceptual/multiple-choice question (20 XP).

The `sourceRef` should reference the curriculum planner (e.g.
"2026 T1 Yr 8 Maths Planner — Term 1, Week 2").

## Figure handling

Every image extracted from OneNote must be examined and either used or
explicitly discarded with a reason. Images carry curriculum structure, worked
examples, and exercise layouts that text extraction alone misses.

**Examination process:**

1. Open each PNG in `/tmp/onenote-extraction/` to view it.
2. Record: page source, what the image shows, which topic it relates to.
3. Classify each image:
   - **curriculum-planner** — term/week overview tables. Use as a Figure in
     the first learnCard of the track's first lesson.
   - **worked-example** — handwritten or typeset solution steps. Incorporate
     into a learnCard as a Figure.
   - **diagram** — geometry shapes, number lines, graphs. Use as a Figure in
     practice or mastery questions.
   - **exercise-layout** — formatted exercise tables. Reference for
     difficulty calibration, not as a Figure.
   - **ui-chrome** — OneNote toolbar icons. Discard.

For each kept image:

1. Copy the PNG from `/tmp/onenote-extraction/` to `public/figures/`
2. Use the filename stem (without extension) as the `Figure.id`
3. Write a descriptive `alt` text
4. Write a `textFallback` that describes what the image shows in plain text
5. Wire the Figure into at least one learnCard or question

```typescript
{
  id: "term-1-maths-planner",
  alt: "Term 1 Year 8 Maths Planner — weekly topic schedule",
  textFallback: "A table showing the weekly maths topics for Term 1: Week 1 — 1A/1B Integers, Week 2 — 1E/1F Adding and subtracting fractions, …",
}
```

## Integration checklist (after creating content)

After creating new track files, complete these steps:

1. **Add badges** — add a `track-complete:<id>` and `boss-pass:<id>` badge
   to `src/content/badges.ts` for each new track.
2. **Wire imports** — import each new track in `src/content/index.ts` and add
   it to the `tracks` array.
3. **Run validation** — execute `validateContent(appContent)` and confirm zero
   issues.
4. **Check references** — verify every `subjectId`, `passBadgeId`, and badge
   `criterion` resolves to a real entity.
5. **Fix existing labels** — if the notebook shows existing tracks have wrong
   year labels, correct them now.
6. **TypeScript check** — run `npx tsc --noEmit` to confirm no type errors.

## Content file template

Each track file in `src/content/tracks/` should follow this pattern:

```typescript
/**
 * TrackName track content (Year 8, chapter X).
 *
 * Covers ... — based on the 2026 Year 8 Maths Class Notebook
 * curriculum plan (Term N, Week M).
 *
 * @author John Grimes
 * @module content/tracks/trackName
 */

import { m, t } from "../blocks";
import type { Lesson, Track, Question } from "../../domain/content/types";

// Lesson definitions as exported consts...
// Challenge questions array...

/** The TrackName track. */
export const trackNameTrack: Track = {
  id: "track-name",
  subjectId: "maths",
  title: "Track Name (Year 8)",
  description: "Short description.",
  lessons: [...],
  challenge: {
    id: "track-name-boss",
    title: "Boss challenge: Track name",
    sourceRef: "2026 TN Yr 8 Maths Planner — Term N, Week M",
    questions: challengeQuestions,
    bonusXp: 120,
    passBadgeId: "boss-track-name",
    aiProvenance: {
      tool: "Claude",
      sources: ["2026 - Year 8 Maths Class Notebook"],
      role: "generated",
    },
  },
};
```
