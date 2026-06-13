# Mapping OneNote to StudyBub Content Model

Map the extracted OneNote JSON (`extracted.json`) into `AppContent` conforming
to `src/contracts/contentModel.md`.

## Pre-mapping inventory (always do first)

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

**Do not write a separate mapping script.** Create the track files directly
in `src/content/tracks/` following the content model contract. This is simpler
and avoids an indirection layer that would need maintenance.

## Content quality decision

Extracted notebooks rarely contain actual question text — they reference
textbook exercises by number. You have two options for each uncovered topic:

1. **Author real questions (preferred).** Write proper learnCards, practice,
   and mastery questions based on the topic. Mark with `aiProvenance`. This
   produces a usable app immediately.
2. **Create placeholder questions.** Use when time is limited or the content
   is planned for hand-authoring later. Each placeholder references the
   textbook exercise and has a sentinel accepted answer.

The mapping rules below describe both approaches.

## Structural mapping

| OneNote concept | StudyBub type | Notes |
|-----------------|---------------|-------|
| Notebook (e.g. "2026 - Year 8 Maths") | Subject | One Subject per notebook |
| Section (e.g. "Term 1") | Track | One Track per section with lesson pages |
| Page with lesson content | Lesson | learnCards from explanatory text, practice from worksheets |
| Page with exercise lists | Lesson | practice/mastery arrays built from question rows |
| Page with boss challenge | BossChallenge | Full-page challenge with mixed question types |
| Embedded image in page | Figure | Copy PNG to `public/figures/`, reference by filename stem |

## Subject mapping

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

## Track mapping

**The OneNote section structure is NOT a track structure.** OneNote sections
(Welcome, _Content Library, student section) are navigation artefacts. The
curriculum is organised by TERM within sections, and by TOPIC within terms.

Group related topics into sensible tracks based on subject area:

| Topics | Suggested track id |
|--------|-------------------|
| 1E/1F, 1G, 1H (negative integers, order of operations) | `integer-operations` |
| 4A, 4B, 4C, 4E, 4F (perimeter, circumference, area) | `perimeter-and-area` |
| 4K, 4L, 4M (Pythagoras) | `pythagoras` |
| 4H, 4I (volume, capacity) | `volume` |
| 3F (decimals) | `decimals` |
| 2D (quadrilaterals) | `quadrilaterals` |
| 10D, 10E, 10H, 10I (congruency, similarity) | `geometry` |

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
"Year 10"), correct them during mapping.

## Lesson mapping

Each topic line from a curriculum-plan page maps to a Lesson. The exercise
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
  learnCards: [...],
  practice: [...],
  mastery: [...],
}
```

The `sourceRef` field should reference the originating worksheet or textbook
reference, not the OneNote page name. For the planner-context source, use the
notebook title and the term/week the topic appears in.

### From exercise-table page

When only exercise numbers are available (no question text), you can either
author real questions (preferred) or create placeholders (see Exercise table
parsing section below).

### Exercise table parsing

The "Questions" page renders as (tab-separated):

```
Term 1 Questions
Exercise  Fluency  Problem Solving  Enrichment
1E        1, 3, 4  7, 9, 10         15
1F        2, 4     7, 8, 10         15
...
```

Parse each row into question IDs (e.g. `term-1-1e-q1`, `term-1-1e-q3`,
`term-1-1e-q4`). Each question references the source textbook exercise:

```typescript
{
  type: "numeric",
  id: "term-1-1e-q1",
  prompt: [t("Exercise 1E, Question 1 (Fluency)")],
  explanation: [t("See worked solution in textbook.")],
  xp: 10,
  accepted: ["(answer to be filled)"],
  sourceRef: "Cambridge Maths Year 8, Exercise 1E Q1",
}
```

**Important:** When the exercise questions are not authored into the notebook
(only exercise numbers are listed), the questions serve as placeholders — OR
you can author real questions directly. When creating placeholders, the
`accepted` array and `explanation` must be filled by a content author. Mark
these with `aiProvenance.role: "generated"` and a TODO comment in the
generated file.

## Question type detection

When actual question text is present on a page, detect the type:

| Pattern | Question type |
|---------|--------------|
| Multiple choice options (A/B/C/D with labels) | `mcq` |
| "Find the value of x", "Solve for …", equation present | `expression` or `numeric` |
| "Calculate …", numeric answer expected | `numeric` |
| "Explain …", "Describe …", "What is …" | `shortText` |
| Fill-in-the-blank with `___` marker | `fillInTheBlank` |
| Matching pairs (two-column layout) | `matching` |

## Figure mapping

For each extracted image:

1. Copy the PNG from `/tmp/onenote-extraction/` to `public/figures/`
2. Use the filename stem (without extension) as the `Figure.id`
3. Use the `alt` text from the extraction JSON, or generate a description
4. The `textFallback` should describe what the image shows in plain text

```typescript
{
  id: "term-1-maths-planner",
  alt: "Term 1 Year 8 Maths Planner — weekly topic schedule",
  textFallback: "A table showing the weekly maths topics for Term 1: Week 1 — 1A/1B Integers, Week 2 — 1E/1F Adding and subtracting fractions, …",
}
```

## BossChallenge mapping

Create a synthetic BossChallenge for each track from the hardest questions
across the track's lessons. Use a 5-question format:

- 2 questions of medium difficulty (20 XP each).
- 2 questions of high difficulty (25 XP each).
- 1 conceptual/multiple-choice question (20 XP).

The `sourceRef` should reference the curriculum planner (e.g.
"2026 T1 Yr 8 Maths Planner — Term 1, Week 2").

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

## Content file structure

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
