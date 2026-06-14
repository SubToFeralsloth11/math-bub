---
name: onenote-extraction
description: Extract educational content from OneNote Class Notebooks (login via agent-browser + Playwright DOM scraping or Graph API) and use it as a seed to generate comprehensive StudyBub content (Subjects, Tracks, Lessons, Questions). The OneNote content is a curriculum blueprint, not a direct source — expand each topic into thorough learnCards, varied practice, and mastery questions. Use when the user asks to extract OneNote content, pull pages from OneNote, convert OneNote to StudyBub, scrape a Class Notebook, or generate StudyBub content from a Class Notebook. Trigger keywords include OneNote, Class Notebook, extract pages, content extraction, StudyBub format, OneNote to StudyBub.
---

# OneNote → StudyBub Content Generation

Extract curriculum structure and topic exemplars from OneNote Class Notebooks,
then use them as a seed to generate comprehensive StudyBub content. Never copy
OneNote content verbatim — the notebook is a blueprint that tells you what
topics to teach, at what difficulty, and in what sequence. You must expand each
topic into thorough learnCards, varied practice questions, and mastery checks
that exercise every dimension of the content area.

The content model contract is at `src/contracts/contentModel.md`.

## Quick start

```bash
# 0. Check if extraction already exists (skip to step 3 if so)
ls /tmp/onenote-extraction/extracted.json 2>/dev/null && echo "Already extracted — skip to step 3"

# 1. Login (once per session) — see references/login.md for SSO quirks
agent-browser open https://onenote.cloud.microsoft/notebooks --session-name onenote
# … complete the login flow …

# 2. Extract pages
bun run .agents/skills/onenote-extraction/scripts/extractPages.ts
# Output: /tmp/onenote-extraction/extracted.json + image PNGs

# 3. Generate comprehensive StudyBub content (see Expansion workflow below)
# Output: src/content/tracks/<trackName>.ts files
```

## Extraction approach

### Playwright DOM scraping

No Azure AD app required. Works with existing 1Password credentials and
agent-browser session. Extracts rendered text + images from the WOPI iframe.

**When to use:** Quick extraction, no Azure portal access, only need curriculum
structure and topic exemplars (not verbatim content).

**Script:** `scripts/extractPages.ts`

**Limitations:** Extracts text as plain strings (no maths notation preserved,
no question-type detection). Images extracted as PNGs to `/tmp/onenote-extraction/`.
Content limited to what OneNote Online renders in the browser. This is fine —
we do not need perfect extraction because we are generating new content, not
copying.

**What it typically captures from a well-organised Class Notebook:**

- **Curriculum-plan pages** (e.g. "Term 1", "Term 2"): week-by-week topic lists
  with textbook exercise references. These provide the track/lesson structure.
- **Exercise-table pages** (e.g. "Questions"): exercise numbers organised by
  difficulty columns (Fluency, Problem Solving, Enrichment). These tell you the
  scope and difficulty gradient.
- **Empty template pages** (e.g. "Class Notes", "Handouts", "Homework",
  "Quizzes"): navigation chrome only — no real content. Skip these.
- **Planner images** (e.g. the Term Maths Planner): screenshots of the
  curriculum overview. Useful as reference but not as lesson content.

The actual teaching content (explanations, worked examples, question text) is
rarely in OneNote — it is typically in the textbook the exercises reference.
This is why we use OneNote as a blueprint, not a content source.

## Workflow

### Step 1: Login to OneNote

Use agent-browser with the QLD Education SSO credentials from 1Password.
See `references/login.md` for the exact eval commands and SSO quirks.

The session file at `~/.agent-browser/sessions/onenote-default.json` is
Playwright-compatible (standard `storageState` format).

### Step 2: Extract pages

`extractPages.ts` (bundled at `scripts/extractPages.ts`) does the following:

1. Loads the agent-browser session into Playwright
2. Opens the Class Notebook URL (SharePoint `doc.aspx`)
3. Waits for the WOPI iframe (`officeapps.live.com`) to load
4. Discovers sections via `[role="navigation"] [role="tree"]`
5. Clicks each section, then each page within the section
6. Extracts page text from the WOPI frame's DOM
7. Extracts images, saving them as PNGs and recording metadata
8. Deduplicates images that appear on multiple pages (WOPI UI chrome)
9. Writes `extracted.json` to `/tmp/onenote-extraction/`

**Configuration in the script:**

- `NOTEBOOK_URL` — the SharePoint doc.aspx URL for the Class Notebook
- `SECTIONS` — hardcoded list of section names to extract (dynamic detection is unstable)
- Image size threshold: `naturalWidth > 60 && naturalHeight > 60`
- Data URI minimum size: 500 bytes (filters UI sprites)

### Step 3: Clean extracted text

The raw page text includes OneNote navigation chrome that must be stripped:

- Header block: "2026 - Year 8 Maths … File Home Insert … Share …"
- "Conflicting change." notifications
- "Add section" / "Add page" UI labels
- Section tree listings repeated in page content

Use the regex patterns in `extractPages.ts` (`getPageContent` function) or
apply a post-processing pass with similar patterns.

**Pages to skip:**

- Pages with < 100 chars of cleaned content (empty templates).
- Duplicate sections: the student section (e.g. "GRIMES, Thomas") often mirrors
  the Content Library. Prefer the Content Library version.
- Non-subject pages (e.g. "Connect" pages with wellbeing factsheets).
- The "Welcome" section — its pages are almost always empty templates.

### Step 3b: Examine extracted images

Before proceeding to content generation, examine every image extracted to
`/tmp/onenote-extraction/`. Text extraction alone misses curriculum structure
and worked examples that exist only as images.

1. List all PNG files in `/tmp/onenote-extraction/`.
2. Open each one (use the read tool or `open`) and describe what it shows.
3. Record each image's source page and the topic it relates to.
4. Copy any content-carrying images to `public/figures/` now, so they are
   available when writing track files.
5. Note images that are OneNote UI chrome (toolbar icons, navigation
   buttons) — these can be discarded.

### Step 4: Generate comprehensive content (the expansion step)

This is the core step. **Do not convert OneNote content verbatim.** The
notebook tells you what topics to teach and at what difficulty — you must
generate fresh, comprehensive content that thoroughly covers each topic.

Use the curriculum-plan pages as your blueprint. Each topic line (e.g.
"1E/1F Adding and subtracting negative integers") becomes a lesson. But
instead of extracting whatever sparse text might exist on that OneNote page,
you must author full lesson content from scratch.

**Do not write a separate generation script.** Create the track files directly
in `src/content/tracks/` following the content model contract.

#### Pre-generation inventory (always do first)

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

#### Content expansion principles

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
8. **Never copy source images verbatim.** Source images are reference
   material that tells you which concepts warrant a visual, not assets
   to copy into `public/figures/`. They are usually blurry scans, photo
   snapshots, or screenshots with chrome and inconsistent labelling.
   Use the `openai-image` skill to generate a fresh, clean,
   StudyBub-style figure for every concept that benefits from one. A
   regenerated figure can be tightly focused on the learning objective,
   properly labelled, accessibility-friendly, and visually consistent
   with the rest of the track. See "Generating figures with the
   openai-image skill" below.

#### Topic-to-track grouping

Do not create one track per OneNote section. Group related topics into
sensible tracks based on subject area:

| Topics                                                 | Suggested track id   |
| ------------------------------------------------------ | -------------------- |
| 1E/1F, 1G, 1H (negative integers, order of operations) | `integer-operations` |
| 4A, 4B, 4C, 4E, 4F (perimeter, circumference, area)    | `perimeter-and-area` |
| 4K, 4L, 4M (Pythagoras)                                | `pythagoras`         |
| 4H, 4I (volume, capacity)                              | `volume`             |
| 3F (decimals)                                          | `decimals`           |
| 2D (quadrilaterals)                                    | `quadrilaterals`     |
| 10D, 10E, 10H, 10I (congruency, similarity)            | `geometry`           |

#### Using the exercise-table as a difficulty guide

The exercise-table pages show question numbers organised by difficulty columns
(Fluency, Problem Solving, Enrichment). Use this to calibrate your generated
questions:

- **Fluency column** → your simplest practice questions. Single-step,
  straightforward application of the concept. 10–15 XP each.
- **Problem Solving column** → your intermediate practice questions.
  Multi-step, requires connecting ideas. 15–20 XP each.
- **Enrichment column** → your hardest practice questions and some mastery
  questions. Non-routine, deep thinking required. 20–25 XP each.

The number of exercise references in each column tells you the approximate
ratio of difficulty levels to generate.

#### Structural mapping

| OneNote concept                       | StudyBub type    | How to use it                                                        |
| ------------------------------------- | ---------------- | -------------------------------------------------------------------- |
| Notebook (e.g. "2026 - Year 8 Maths") | Subject          | One Subject per notebook                                             |
| Section (e.g. "Term 1")               | Content grouping | Groups topics by term; topics within a term share a curriculum phase |
| Curriculum-plan topic line            | Lesson           | One lesson per topic; use exercise number as title prefix            |
| Exercise-table row                    | Difficulty guide | Calibrate question count and difficulty per lesson                   |
| Embedded image in page                | Figure seed      | Identify the concept; generate a fresh figure with `openai-image` |

#### Image examination and figure usage

Every image extracted from OneNote must be examined. This is not optional
— images carry curriculum structure, worked examples, and exercise
layouts that inform content generation. But they are **reference
material**, not assets. Do not copy PNGs into `public/figures/`. The
StudyBub figures are *generated* by the `openai-image` skill, inspired
by what the source image conveys but redrawn in the project's clean,
textbook style.

**Examination process:**

1. Open each PNG in `/tmp/onenote-extraction/` (use `open` or the read tool
   to view it).
2. Record: page source, what the image shows, which topic it relates to,
   and the underlying concept that the image is trying to convey.
3. Classify each image:
   - **curriculum-planner** — term/week overview tables. Identify the
     concept it represents (e.g. "the term's topic sequence"). This
     concept, if useful to the learner, becomes a freshly generated
     figure (typically a topic-overview or roadmap figure for the first
     lesson of the track). Do not copy the planner image itself.
   - **worked-example** — handwritten or typeset solution steps. Identify
     the worked example concept (e.g. "subtracting a negative on the
     number line"). Re-author the worked example as StudyBub text in a
     learnCard and, if it benefits visually, generate a clean
     re-illustration. Do not copy the original handwriting or scan.
   - **diagram** — geometry shapes, number lines, graphs. Identify the
     underlying concept. Generate a clean, StudyBub-style version with
     the openai-image skill — do not copy the source PNG, which is often
     low resolution, off-style, or cropped.
   - **exercise-layout** — formatted exercise tables or question lists.
     Use these to calibrate question difficulty and volume. Do not
     incorporate them as figures; their information is structural, not
     visual.
   - **ui-chrome** — OneNote toolbar icons, navigation buttons. Discard.
   - **photo-of-textbook** — photographs of textbook pages. The text
     itself is the source material; the photo is noise. Extract the
     concept and discard the image.
4. For each *concept* the source image represents, decide whether a
   freshly generated figure would add learning or engagement value. If
   yes, write a `Figure` entry in the relevant track file and generate
   the image as described in "Generating figures with the openai-image
   skill" below. If no, discard the concept.
5. Wire each generated Figure into at least one learnCard or question.

**Images that must not be silently ignored (but also must not be copied):**

- The Term Maths Planner (curriculum roadmap) — the concept is "term
  topic sequence"; the image is a blurry photo or OneNote screenshot.
  Generate a clean replacement or skip if not needed.
- Worked-example images — the concept is the procedure being taught;
  the image is a scan. Re-author the procedure in text and, if visual
  value warrants, generate a fresh illustration.
- Diagram images of geometric shapes, number lines, or graphs — the
  concept is the labelled diagram; the image is a low-resolution photo
  or hand-drawn sketch. Generate a clean replacement in StudyBub style.
- Exercise tables with difficulty columns — the data is structural; do
  not incorporate them as figures.

#### Generating figures with the openai-image skill

OneNote content is mostly text and tends to be sparse on diagrams. Most
lessons you generate will not have a source image at all. For those
lessons, decide which concepts would benefit from an accompanying
illustration, then generate it using the `openai-image` skill at
`.agents/skills/openai-image/`. See `public/figures/README.md` for the
project's authoring convention.

**When to generate a figure for a lesson:**

- The concept is geometric, graphical, or spatial (shapes, angles,
  transformations, number lines, area diagrams, coordinate grids, Venn
  diagrams, bar/line graphs).
- A worked example would be clearer with a visual (labelled diagram of a
  triangle with the Pythagorean triple marked, a perimeter broken into
  segments, a number line showing the jumps when subtracting a negative).
- The lesson is about interpreting a chart, table, or visual pattern.
- The first lesson of a track would benefit from a topic-overview figure
  (e.g. "the four operations on the number line", "the family of
  quadrilaterals").

**When NOT to generate a figure:**

- A lesson whose concept is purely procedural or symbolic (e.g. expanding
  brackets, simplifying fractions, substitution). A Figure is rarely
  worth the generation cost here.
- Decorative or motivational imagery. StudyBub is a study tool, not a
  picture book.
- Anything that duplicates an existing figure in `public/figures/`.

**Generation workflow:**

1. Write a `Figure` entry in the track file with a descriptive `id` (kebab
   case), `alt` (accessibility description), and `textFallback` (text shown
   if the image is missing). The `id` is the asset filename stem.
2. Compose a focused text prompt for the openai-image skill. Use the
   project's standard style: white background, bold labels, clean textbook
   style with no decorative shading. See existing figures in
   `public/figures/` (e.g. `tenochtitlan.webp`, `congruent-triangles-sss.webp`)
   for the established look. Be specific about composition: what is on the
   page, what labels appear, what colours distinguish which elements.
3. Generate the image:
   ```bash
   op run -- uv run /Users/gri306/Code/studybub/.agents/skills/openai-image/scripts/generate.py \
     "your prompt here" -o /tmp/onenote-extraction/<id>.png --size 1024x1024 --quality medium
   ```
   Use a generous timeout: `--quality medium` is 180 s, `--quality high` is
   300 s. Start with `--quality medium` and only escalate to high if the
   medium-quality result is not legible.
4. Convert to WebP for web delivery (the existing convention in
   `public/figures/`):
   ```bash
   cwebp -q 80 /tmp/onenote-extraction/<id>.png -o /Users/gri306/Code/studybub/public/figures/<id>.webp
   ```
   Keep the original PNG alongside the WebP so the `Figure` component can
   fall back to it (see `public/figures/README.md` for the file-naming
   convention). PNG fallback is also useful if regeneration is needed.
5. Reference the figure from a learnCard (`learnCard.figure`) or a question
   (`question.figure`) — not both with the same figure unless the reuse is
   intentional.
6. Export the figure as part of a `*Figures` array at the bottom of the
   track file (e.g. `export const trackNameFigures: Figure[] = [...]`) and
   wire that array into `src/content/content.test.ts` so the manifest check
   passes. Match the convention used by `spanishConquestFigures` and
   `biologyFigures`.

**Prompting tips for maths figures:**

- Specify "white background", "textbook illustration", "no shadow" and
  "no decorative elements" to get clean diagrams.
- For shapes, name the shape, its key parts, and the labels that should
  appear (e.g. "a right-angled triangle with vertices labelled A, B, C, the
  right angle at B, the hypotenuse from A to C, side lengths a, b, c
  marked").
- For number lines, specify the range, the marked points, and any
  annotations (e.g. "a number line from -10 to 10, with the integers
  marked and arrows showing the jump from -3 to +5").
- For coordinate planes, specify the visible quadrant, scale, and any
  plotted points or lines.

**Don't generate every figure at once.** Generate figures in batches as
you write the lessons that use them. If a generation fails or produces a
poor result, refine the prompt and retry. The `textFallback` in the
`Figure` definition means the track remains fully usable even before the
image is generated, so you can write the track first and generate the
images second.

#### Lesson structure

Each topic line from a curriculum-plan page generates a Lesson. Parse lines
like `1E/1F Adding and subtracting negative integers` into:

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

#### BossChallenge generation

Create a synthetic BossChallenge for each track that draws on the hardest
concepts from across the track's lessons. Use the exercise-table enrichment
column to identify the most challenging topics. Format:

- 2 questions of medium difficulty (20 XP each).
- 2 questions of high difficulty (25 XP each).
- 1 conceptual/multiple-choice question (20 XP).

The `sourceRef` should reference the curriculum planner (e.g.
"2026 T1 Yr 8 Maths Planner — Term 1, Week 2").

#### Year-level corrections

The OneNote shows what year level each topic is taught in this class. If
existing tracks have incorrect year labels (e.g. geometry marked "Year 10"
but the OneNote teaches it in Year 8), correct them during this workflow.

#### Integration checklist (after creating content)

After creating new track files, complete these steps:

1. **Add badges** — add a `track-complete:<id>` and `boss-pass:<id>` badge
   to `src/content/badges.ts` for each new track.
2. **Wire imports** — import each new track in `src/content/index.ts` and add
   it to the `tracks` array.
3. **Generate figures** — for any figure referenced in the new lessons
   that is not already in `public/figures/`, generate it with the
   `openai-image` skill, convert to WebP, and confirm the file is in
   place. See "Generating figures with the openai-image skill" above.
4. **Wire figure manifests** — export the new track's figures as a
   `*Figures` array and add it to the `figuresManifest` array in
   `src/content/content.test.ts` so the manifest check passes.
5. **Run validation** — execute `validateContent(appContent)` and confirm zero
   issues.
6. **Check references** — verify every `subjectId`, `passBadgeId`, and badge
   `criterion` resolves to a real entity.
7. **Fix existing labels** — if the notebook shows existing tracks have wrong
   year labels, correct them now.
8. **TypeScript check** — run `npx tsc --noEmit` to confirm no type errors.

#### Content file template

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

## Image extraction notes

- Images are WOPI-rendered content inside the WOPI iframe.
- Blob URLs and data URLs are resolved within the frame context.
- Regular URL images are fetched via Playwright's request API.
- SVG images are filtered out (they are WOPI UI elements, not content).
- Cross-page deduplication removes UI chrome that appears on every page.
- Output: PNG files in `/tmp/onenote-extraction/` named `{section}__{page}__img{NNN}.png`.
- **Every extracted PNG must be examined** as part of the pre-generation
  inventory (see Step 4, "Image examination and figure usage"). Do not skip
  image examination — images carry curriculum structure and worked examples
  that text extraction alone misses.

## Key constraints and limitations

### WOPI iframe isolation

The WOPI frame (`officeapps.live.com`) is cross-origin from the parent
SharePoint page. `agent-browser snapshot` cannot see inside it. Use
Playwright's `page.frames()` to access the iframe directly.

### Read-only mode

Class Notebooks open in read-only mode (`edit=0`). The File backstage ("File"
tab) does not expose Export, Save As, or Download options. Text extraction must
be done via DOM scraping.

### Dynamic section tree

The section tree structure changes after clicking sections (collapsed sections
expand). Use hardcoded section names from a prior manual inspection rather than
dynamic discovery for reliability.

### Curriculum-plan page structure

The most valuable pages for content generation are the curriculum-plan pages
(e.g. "Term 1", "Term 2"). Their structure is predictable:

- A "Week N" heading.
- Topic lines under each week: exercise number, then topic name.
- Extension topics marked with "EXTENSION" prefix.

Example from a cleaned page:

```
Week 2
1E/1F Adding and subtracting negative integers
1G Multiplying and dividing negative numbers
1H Order of Operations and Substitution
EXTENSION 3C Operations with negative fractions
Week 3
4A Length and perimeter
4B Circumference of a circle
```

Parse these to build the track lesson list. Each topic line becomes a lesson.
Group consecutive weeks that cover related topics into the same track.

### IRM encryption

`.one` files downloaded from SharePoint are encrypted at rest by Information
Rights Management (IRM). Do not attempt to parse `.one` files directly.
