---
name: stile-extraction
description: Extract educational content from Stile (stileapp.com) lessons using agent-browser DOM scraping and use it as source material to generate comprehensive StudyBub content (Subjects, Tracks, Lessons, Questions). Stile lessons contain substantial teaching material — learning objectives, video comprehension questions, textbook chapter content, source analysis tasks, and project activities — so extract thoroughly before re-imagining into engaging StudyBub formats. Use when the user asks to extract Stile content, pull lessons from Stile, convert Stile to StudyBub, or generate StudyBub content from a Stile subject. Trigger keywords include Stile, stileapp, extract Stile, Stile to StudyBub, Stile content extraction.
---

# Stile → StudyBub Content Generation

Extract lesson content from Stile subjects, then use it as source material to
generate comprehensive StudyBub content. Never copy Stile content verbatim —
Stile lessons provide the topic coverage, sequence, difficulty level, and key
facts, but you must re-imagine the content into engaging learnCards, varied
practice questions, and mastery checks with thorough explanations.

The content model contract is at `src/contracts/contentModel.md`.

## Quick start

```bash
# 1. Login to Stile via QLD Education SSO (once per session)
agent-browser open https://stileapp.com/login --session-name stile
agent-browser snapshot -i
agent-browser fill @e2 "username@eq.edu.au"
agent-browser click @e3  # Continue
# … complete QLD Education SSO flow (see references/login.md) …

# 2. Navigate to the target subject
agent-browser snapshot -i -d 4
agent-browser click @eN  # Click the subject link

# 3. Extract lessons systematically (see Extraction workflow below)
# Use agent-browser eval to get text, screenshots for images,
# and filtered href extraction for external links

# 4. Generate comprehensive StudyBub content (see Content generation below)
# Output: src/content/tracks/<trackName>.ts
```

## Stile page structure

### Subject overview page

A Stile subject page (`/institutions/1683/subjects/560320`) contains:

- **Folders** (collapsible sections): e.g. "2026 Assessment Documents",
  "8E 2026 Mr Kersnovske", "2026 8HSS Spanish Conquest Resources". Click the
  folder button to expand/collapse the lessons inside.
- **Lesson links**: individual lessons displayed as links under their parent
  folder. Each link navigates to a worksheet page.
- **Folder-less lessons**: some subjects place lessons directly on the overview
  page without a parent folder.

### Lesson (worksheet) page

Each lesson page (`/institution-1683/subject-560320/lesson-5043074/worksheet-48839726`) contains:

- **Learning objectives and success criteria**: "1. Introducing… 2. Viewing…"
  at the top of the page.
- **Rich content blocks**: text, embedded YouTube videos, PDF file links,
  images, tables.
- **Questions**: text-entry, multiple-choice, file upload, or rich-text
  response. Student answers may be present if the account has submitted work.
- **Navigation**: "Previous session" and "Next session" links to move between
  lessons sequentially.
- **Session selector**: a dropdown to jump directly to any lesson in the
  subject.
- **Teacher/student view**: the page may show edit buttons (teacher view) or
  submission status (student view). Content is readable in both modes.

### Assessment and resource pages

Some lessons contain:

- **Seen exam sources**: primary and secondary source texts with context
  statements. These are valuable for source analysis lessons.
- **Close reading guides**: teacher notes on methodology for source annotation.
- **Project briefs**: research tasks, infographic creation, Minecraft builds.
- **PDF attachments**: handouts, worksheets, foldable templates. Filenames and
  sizes are visible but PDF content requires download.

## Extraction workflow

### Step 1: Login

Use agent-browser with the QLD Education SSO credentials from 1Password.
See `references/login.md` for the exact eval commands and SSO quirks.

The QLD Education SSO flow is:

1. `stileapp.com/login` → enter `@eq.edu.au` email → Continue.
2. Redirect to `fed.education.qld.gov.au` → enter QED username and password,
   check "I accept the conditions of use" → Sign in.
3. Microsoft "Stay signed in?" prompt → click Yes.
4. Redirect back to Stile dashboard.

The session file at `~/.agent-browser/sessions/stile-default.json` is
Playwright-compatible (standard `storageState` format).

**Ref stability:** agent-browser `@ref` identifiers change after every
navigation. Always re-snapshot before clicking. The "Next session" link is
consistently `@e7` on lesson pages but verify with `grep "Next session"`.

### Step 2: Map the subject

Before extracting individual lessons, map the subject structure:

1. Navigate to the subject overview page.
2. Snapshot with `-d 5` to see the full tree.
3. Expand each folder by clicking its button, then re-snapshot.
4. Record every lesson name and its parent folder.
5. Note which lessons are content-heavy (video + questions) vs
   activity-light (file upload, discussion prompts).

### Step 3: Extract each lesson

For every content-carrying lesson, do the following in order:

#### 3a. Navigate to the lesson

Click the lesson link from the subject overview. Wait for the page to load
(3–5 seconds is usually sufficient; `wait --load networkidle` can hang on
slow Stile pages).

#### 3b. Extract text content

```bash
agent-browser eval "document.querySelector('.worksheet-content') ? document.querySelector('.worksheet-content').innerText : document.body.innerText"
```

The `.worksheet-content` selector targets the main content area, filtering out
navigation chrome. Fall back to `document.body.innerText` if the selector is
absent.

The extracted text will include:

- Lesson title and section headings.
- Learning objectives and success criteria.
- Question prompts and student answers (if submitted).
- Embedded video titles (e.g. "The Aztec Empire in 2 minutes (Source: YouTube…)").
- PDF filenames and sizes.
- Teacher-only notes (prefixed with "Students can't see this on their screen").

Save the extracted text to `/tmp/stile-extraction/<lesson-name>.txt`.

#### 3c. Capture images

Stile pages use images extensively. Take a full-page screenshot of every
lesson:

```bash
agent-browser screenshot /tmp/stile-extraction/<lesson-name>.png --full
```

The `--full` flag captures the entire scrollable page, including content below
the fold. Standard screenshots (without `--full`) only capture the viewport.

**Important:** A large proportion of Stile's educational content may be held
within images (diagrams, timelines, maps, photographs of artefacts). Do not
skip screenshots. Examine each screenshot and describe the images it contains
before generating StudyBub content.

#### 3d. Extract external links

Stile lessons reference external resources: YouTube videos, research websites,
Kahoot quizzes, Minecraft builds, PDFs. Extract all external links:

```bash
agent-browser eval "
const allLinks = Array.from(document.querySelectorAll('a[href]'))
  .filter(a => a.href && !a.href.includes('stileapp.com')
    && !a.href.includes('stileeducation.com')
    && !a.href.includes('login.microsoftonline.com')
    && !a.href.includes('microsoft.com')
    && a.innerText.trim());
JSON.stringify(allLinks.map(a => ({
  text: a.innerText.trim().substring(0, 120),
  href: a.href
})), null, 2)
"
```

This filters out Stile-internal navigation links, Microsoft SSO URLs, and
empty-link UI elements, leaving only the external educational resources.

**YouTube videos:** Stile embeds YouTube via iframes. The video IDs are loaded
dynamically by React and are not present in the DOM. To find them:

1. Note the video title from the extracted text.
2. Search YouTube with the title (see Step 3e below).
3. Add the resolved YouTube URL to the lesson's sourceRef or aiProvenance.

**PDFs:** Stile hosts PDFs (handouts, worksheets, foldable templates) at
internal URLs. The filenames and sizes are visible in the extracted text.

#### 3e. Enrich with external content

After extracting all links, fetch the most content-rich external resources to
enrich the StudyBub content:

1. **World History Encyclopedia** articles: fetch the machine-readable markdown
   version by appending `.md` to the URL
   (e.g. `worldhistory.org/article/723/aztec-food--agriculture/.md`).
2. **YouTube videos**: search for the video title via Brave Search or by
   scraping YouTube search results for `videoId` values.
3. **Kahoot quizzes**: the Kahoot REST API at
   `create.kahoot.it/rest/kahoots/<uuid>` returns the full quiz JSON including
   questions, choices, and correct answers. Use this to inform boss challenge
   questions.
4. **Primary sources** (e.g. AHA, historians.org): these often have Cloudflare
   protection and may require agent-browser to access.

Save enriched content to `/tmp/stile-extraction/enriched/`.

### Step 4: Navigate between lessons

After extracting a lesson, move to the next one:

```bash
agent-browser snapshot -i -d 3 | grep "Next session"
agent-browser click @e7  # Verify the ref matches the grep output
sleep 3
```

The "Previous session" link (`@e6`) goes backward. The session selector
dropdown allows jumping to any lesson by name.

To return to the subject overview from any lesson:

```bash
agent-browser snapshot -i -d 3 | grep "Back to subject"
agent-browser click @eNN  # Use the ref from the grep output
```

### Step 5: Organise extracted content

After extracting all lessons, organise the content into a structured inventory:

```
/tmp/stile-extraction/
├── subject-overview.txt          # Full snapshot of the subject page
├── lesson-01-aztec-empire-intro.txt
├── lesson-01-aztec-empire-intro.png
├── lesson-02-key-groups-society.txt
├── lesson-02-key-groups-society.png
├── ...
├── enriched/
│   ├── whe-aztec-food.md
│   ├── whe-aztec-warfare.md
│   ├── kahoot-gold-god-glory.json
│   └── youtube-video-ids.txt
└── inventory.md                  # Your structured map of all content
```

Create an `inventory.md` that maps each Stile lesson to:

- The StudyBub lesson it will seed.
- Key facts, dates, names, and concepts extracted.
- External resources that enrich it.
- Images captured and their content description.
- Question types present in the Stile original.

## Content generation

### Principles

Stile content is more substantial than OneNote — it includes learning
objectives, explanatory text, video comprehension questions, and assessment
tasks. Nevertheless, do not copy it verbatim. Instead:

1. **Re-imagine the format.** Stile's linear worksheet style becomes StudyBub's
   learnCards → practice → mastery flow. A Stile video + 10 comprehension
   questions becomes a learnCard summarising the key concepts + practice
   questions that test understanding in varied formats.

2. **Expand thin areas.** Stile lessons that are just a PDF link and a file
   upload (e.g. "Ch11.3 Key groups in Aztec Society") need substantial
   expansion. Use the textbook chapter content implied by the PDF title and
   enrich with external sources.

3. **Vary question types.** Stile relies heavily on text-entry questions.
   Convert these into a mix of MCQ, matching, fill-in-the-blank, shortText,
   and numeric types. At least 40% of StudyBub questions should be non-text
   types.

4. **Add thorough explanations.** Stile questions rarely have model answers
   visible in the student view. Every StudyBub question must have a detailed
   explanation that shows the reasoning, not just the answer.

5. **Respect the source.** Every lesson and boss challenge must carry a
   `sourceRef` linking back to the Stile subject. Use `aiProvenance` to
   declare AI involvement and list all Stile lessons and external sources used.
6. **Never copy source images verbatim.** Stile screenshots, embedded
   photographs, and third-party illustrations are reference material,
   not assets to reuse. They carry Stile chrome, third-party
   copyright, and inconsistent visual style. Use the `openai-image`
   skill to generate a fresh, StudyBub-style figure for every concept
   that benefits from one. A regenerated figure can be tightly focused
   on the learning objective, properly labelled, accessibility-friendly,
   and visually consistent with the rest of the track. See "Generating
   figures with the openai-image skill" below.

### Structural mapping

| Stile concept                                        | StudyBub type                   | How to use it                                                                       |
| ---------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| Stile subject (e.g. "2026 8HSS T2 Spanish Conquest") | Track                           | One track per Stile subject                                                         |
| Subject area (e.g. HSS, Science, English)            | Subject                         | Group tracks under subjects                                                         |
| Lesson/worksheet                                     | Lesson                          | One StudyBub lesson per content-heavy Stile lesson                                  |
| Learning objectives                                  | LearnCard heading/body          | Convert objectives into "Key idea" learnCard content                                |
| Video + comprehension questions                      | LearnCard + practice Qs         | Summarise video content in a learnCard; convert comprehension Qs to varied practice |
| Textbook chapter content                             | LearnCard body                  | Expand chapter summaries into detailed learnCards with worked examples              |
| Discussion/prompt activities                         | Practice Qs (shortText)         | Convert discussion prompts into short-text questions with accepted answer patterns  |
| Source analysis task                                 | Lesson (standalone)             | Create a dedicated lesson on historical source skills                               |
| Assessment/exam sources                              | LearnCard examples + mastery Qs | Use sources as case studies in learnCards; create source-analysis mastery questions |
| Project brief                                        | Lesson topic seed               | Use the project topic list to generate a lesson on that aspect of the subject       |
| Kahoot quiz                                          | Boss challenge Qs               | Use quiz questions to inform boss challenge content and difficulty                  |
| PDF handout                                          | LearnCard content               | Incorporate the implied content (from the PDF title) into learnCards                |

### Lesson structure

Each content-heavy Stile lesson generates a StudyBub Lesson:

```typescript
{
  id: "track-prefix-short-slug",     // e.g. "aztec-origins"
  order: 1,                           // Contiguous within track
  title: "Descriptive lesson title",  // Not the Stile worksheet name
  sourceRef: "Stile lesson name (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: <lesson name>",
      "External: <enrichment source>",
    ],
    role: "generated",
  },
  learnCards: [
    // At least 3: key idea, supporting detail, common-misconception/extension
  ],
  practice: [
    // At least 8: mix of question types and difficulty levels
  ],
  mastery: [
    // At least 2-3: each tests a different aspect of the lesson
  ],
}
```

### Grouping lessons into tracks

Stile subjects vary in size. Group related lessons sensibly:

- **Small subject (5-8 lessons):** one track covering all lessons.
- **Large subject (9+ lessons):** one track with all lessons, ordered to tell
  a coherent narrative. Do not split into multiple tracks unless the subject
  covers clearly distinct topic areas.

If the Stile subject includes assessment/resource-only lessons (exam sources,
close reading guides), incorporate their content into the nearest related
lesson rather than creating standalone lessons for thin content.

### Boss challenge generation

Create a synthetic BossChallenge that draws on key concepts from across the
track's lessons. Use external enrichment (Kahoot quizzes, WHE articles) to
inform question content and difficulty. Structure:

- 2 questions of medium difficulty (20 XP each).
- 2 questions of high difficulty (25 XP each).
- 1-2 conceptual/multiple-choice questions (20-25 XP each).
- 1 matching question connecting key figures/events/concepts (25 XP).

The `sourceRef` should reference the Stile subject and term
(e.g. "2026 8HSS Spanish Conquest Stile Unit, The Gap State High School").

### Image handling

Unlike OneNote, Stile images cannot be downloaded as separate files (they are
embedded in the React app). Screenshots of Stile pages are reference
material — they help you identify which concepts warrant a visual — but
they are **not** to be copied into `public/figures/`. Stile screenshots
carry the Stile chrome, embedded third-party images (often copyrighted),
and styling that is inconsistent with StudyBub. The StudyBub figures are
_generated_ by the `openai-image` skill, inspired by the concept the
source image conveys but redrawn in the project's clean, textbook style.

Workflow:

1. Take full-page screenshots of every lesson.
2. Examine each screenshot and describe every content image it contains
   (diagrams, maps, timelines, photographs, infographics). For each
   image, record the underlying concept the image is trying to convey.
3. For each concept that would benefit from a StudyBub figure, use the
   `openai-image` skill to generate a fresh illustration. Do not look
   for "equivalent public-domain or Creative Commons alternatives" and do
   not embed Stile screenshots — generate a new figure every time. See
   "Generating figures with the openai-image skill" below.
4. If a concept cannot be cleanly redrawn (e.g. a famous photograph of
   a real artefact whose appearance is the point of the question), use
   a thorough `textFallback` in the `Figure` definition and skip image
   generation. The question remains answerable.
5. Record the decision per concept: "generated as `<id>.webp`" or
   "text-only via `textFallback`".

#### Generating figures with the openai-image skill

Stile content is image-rich — it contains historical scenes, maps, social
hierarchy diagrams, artefact photographs, and source illustrations. Many
of these cannot be re-used in StudyBub (they are embedded screenshots, or
copyrighted photos of artefacts). The standard approach is to regenerate
the educational figure from scratch using the `openai-image` skill at
`.agents/skills/openai-image/`. See `public/figures/README.md` for the
project's authoring convention and the existing
`spanishConquestFigures` array in `src/content/tracks/spanishConquest.ts`
for worked examples.

**When to generate a figure for a lesson:**

- The source has a clear, educationally useful image (a map, a social
  hierarchy diagram, a labelled illustration of an artefact, a timeline)
  that you cannot reuse directly.
- The concept is spatial, structural, or chronological and would be
  clearer with a visual (e.g. a map of the Aztec Empire, a flowchart of
  the Spanish conquest sequence, a diagram of the three social classes).
- A worked example, primary source, or assessment source is being
  re-presented in StudyBub and would benefit from a labelled illustration.
- A first lesson of the track would benefit from a topic-overview image
  that sets the scene (a stylised map of the region, a title plate).

**When NOT to generate a figure:**

- The source is a photograph of a real person or place that you cannot
  accurately recreate. A poor rendering of a historical figure can be
  misleading. Use a `textFallback` instead.
- The concept is purely textual or conceptual (e.g. "explain why the
  Spanish were able to defeat the Aztecs"). A Figure is rarely worth the
  generation cost here.
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
   `public/figures/` (e.g. `tenochtitlan.webp`, `aztec-hierarchy.webp`,
   `cortes-moctezuma.webp`) for the established look. Be specific about
   composition: what is on the page, what labels appear, what colours
   distinguish which elements.
3. Generate the image:
   ```bash
   op run -- uv run /Users/gri306/Code/studybub/.agents/skills/openai-image/scripts/generate.py \
     "your prompt here" -o /tmp/stile-extraction/<id>.png --size 1024x1024 --quality medium
   ```
   Use a generous timeout: `--quality medium` is 180 s, `--quality high` is
   300 s. Start with `--quality medium` and only escalate to high if the
   medium-quality result is not legible.
4. Convert to WebP for web delivery (the existing convention in
   `public/figures/`):
   ```bash
   cwebp -q 80 /tmp/stile-extraction/<id>.png -o /Users/gri306/Code/studybub/public/figures/<id>.webp
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

**Prompting tips for historical/social-studies figures:**

- Specify "white background", "textbook illustration", "no shadow" and
  "no decorative elements" to get clean diagrams. Historical scenes can
  be slightly more stylised (e.g. a hand-coloured woodcut style for
  colonial-era content) but stay close to the textbook convention so
  figures look consistent across tracks.
- For maps, name the region, the key locations to label, and any borders
  or features to emphasise. Avoid generating modern political boundaries
  that anachronistically project onto a historical scene.
- For social hierarchies and diagrams, name the levels/parts and the
  labels that should appear. Specify the relative sizes if hierarchy
  matters (e.g. "pyramid shape, emperor largest at top, slaves smallest
  at bottom").
- For scenes, name the people involved, their clothing, the setting, and
  any props (e.g. "Hernán Cortés in Spanish armour meeting Moctezuma II
  in feathered headdress and gold jewellery, in a courtyard of
  Tenochtitlan, with Malinche translating"). Avoid generating recognisable
  modern faces or contemporary clothing.

**Don't generate every figure at once.** Generate figures in batches as
you write the lessons that use them. If a generation fails or produces a
poor result, refine the prompt and retry. The `textFallback` in the
`Figure` definition means the track remains fully usable even before the
image is generated, so you can write the track first and generate the
images second.

### Integration checklist (after creating content)

1. **Create subject** — add a new subject file in `src/content/subjects/` if
   the subject area does not already exist.
2. **Create track** — write the track file in `src/content/tracks/`.
3. **Generate figures** — for any figure referenced in the new lessons
   that is not already in `public/figures/`, generate it with the
   `openai-image` skill, convert to WebP, and confirm the file is in
   place. See "Generating figures with the openai-image skill" above.
4. **Wire figure manifests** — export the new track's figures as a
   `*Figures` array and add it to the `figuresManifest` array in
   `src/content/content.test.ts` so the manifest check passes.
5. **Add badges** — add `track-complete:<id>` and `boss-pass:<id>` badges to
   `src/content/badges.ts`.
6. **Wire imports** — import the new subject and track in `src/content/index.ts`
   and add them to their respective arrays.
7. **Run validation** — `bun test src/domain/content/validateContent.test.ts`
   and confirm all tests pass.
8. **Run integration tests** — `bun test src/content/content.test.ts` and
   confirm all tests pass.
9. **TypeScript check** — `npx tsc --noEmit` and confirm no type errors.
10. **Dev server** — start the dev server and confirm no content validation
    errors appear in the console.

## Key constraints and limitations

### SSO session duration

The QLD Education SSO session expires when the browser is closed. Each new
agent-browser session requires re-login. Use `--session-name stile` to
preserve session state within a session but expect to re-authenticate if the
browser is closed.

### Dynamic content loading

Stile is a React single-page application. Content loads dynamically after
navigation. The `wait --load networkidle` command can hang indefinitely on
Stile pages. Instead, use fixed sleep durations (3-5 seconds) after navigation.

### YouTube video IDs

YouTube embeds in Stile use the YouTube iframe API. The video IDs are stored
in React component state and are not present in the static HTML or DOM
attributes. You must resolve them by searching YouTube with the video title.

### Teacher vs student view

The extracted content depends on the logged-in account's role. Teacher accounts
see edit buttons and "Students can't see this" annotations. Student accounts
see their submitted answers. Both views show the lesson content. Prefer the
student view for cleaner extraction.

### PDF content

Stile hosts PDFs but does not render them inline. You can see the filename and
file size but cannot extract the PDF content through the browser. Use the
filename as a content hint (e.g. "Ch11.3_Key_groups_in_Aztec_Society.pdf"
tells you the topic is Aztec social structure from textbook chapter 11.3).

### Cloudflare protection on external links

Some external resources (particularly historians.org and other academic sites)
use Cloudflare bot protection. These pages cannot be fetched with `curl` and
may require agent-browser to access. If Cloudflare blocks extraction, use
alternative sources or rely on the content already extracted from the Stile
page itself.

### Ref volatility

agent-browser `@ref` identifiers change after every navigation and DOM update.
Always take a fresh snapshot before interacting. Grep for the link text to
find the current ref:

```bash
agent-browser snapshot -i -d 3 | grep "Next session"
# → - link "Next session" [ref=e7]
agent-browser click @e7
```

## Content file template

Each track file in `src/content/tracks/` should follow this pattern:

```typescript
/**
 * TrackName track content (Year 8, Subject Area).
 *
 * Covers … — based on the 2026 Stile <Subject Name> unit
 * at <School Name>.
 *
 * @author John Grimes
 * @module content/tracks/trackName
 */

import { m, t } from "../blocks";
import type { Lesson, Track, Question } from "../../domain/content/types";

// Lesson definitions as exported consts…
// Challenge questions array…

/** The TrackName track. */
export const trackNameTrack: Track = {
  id: "track-name",
  subjectId: "subject-id",
  title: "Track Name (Year 8)",
  description: "Short description.",
  lessons: [...],
  challenge: {
    id: "track-name-boss",
    title: "Boss challenge: Track name",
    sourceRef: "2026 Stile Unit, School Name",
    questions: challengeQuestions,
    bonusXp: 100,
    passBadgeId: "boss-track-name",
    aiProvenance: {
      tool: "Claude",
      sources: [
        "Stile: <subject name> (all lessons, school name)",
      ],
      role: "generated",
    },
  },
};
```
