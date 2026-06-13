---
name: onenote-extraction
description: Extract educational content from OneNote Class Notebooks (login via agent-browser + Playwright DOM scraping or Graph API) and convert it into StudyBub content model format (Subjects, Tracks, Lessons, Questions). Use when the user asks to extract OneNote content, pull pages from OneNote, convert OneNote to StudyBub, scrape a Class Notebook, or map OneNote pages to lessons. Trigger keywords include OneNote, Class Notebook, extract pages, content extraction, StudyBub format, OneNote to StudyBub.
---

# OneNote → StudyBub Content Extraction

Extract text and images from OneNote Class Notebooks and convert them into the
StudyBub content model (`src/contracts/contentModel.md`).

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

# 3. Map to StudyBub format (write a mapping script per mapping.md rules)
# Output: src/content/oneNoteContent.ts  (an AppContent export)
```

## Two extraction approaches

### Approach A: Playwright DOM scraping (use first)

No Azure AD app required. Works with existing 1Password credentials and
agent-browser session. Extracts rendered text + images from the WOPI iframe.

**When to use:** Quick extraction, no Azure portal access, only need text + images.

**Script:** `scripts/extractPages.ts`

**Limitations:** Extracts text as plain strings (no maths notation preserved,
no question-type detection). Images extracted as PNGs to `/tmp/onenote-extraction/`.
Content limited to what OneNote Online renders in the browser.

**What it typically captures from a well-organised Class Notebook:**
- **Curriculum-plan pages** (e.g. "Term 1", "Term 2"): week-by-week topic lists
  with textbook exercise references. These provide the track/lesson structure.
- **Exercise-table pages** (e.g. "Questions"): exercise numbers organised by
  difficulty columns (Fluency, Problem Solving, Enrichment).
- **Empty template pages** (e.g. "Class Notes", "Handouts", "Homework",
  "Quizzes"): navigation chrome only — no real content. Skip these during mapping.
- **Planner images** (e.g. the Term Maths Planner): screenshots of the
  curriculum overview. Useful as reference but not as lesson content.

The actual teaching content (explanations, worked examples, question text) is
rarely in OneNote — it is typically in the textbook the exercises reference.

### Approach B: Microsoft Graph API (preferred for production)

Requires an Azure AD app registration with `Notes.Read` delegated permission.
Returns structured OneNote page HTML with preserved formatting, embedded images,
and maths notation.

**When to use:** Production pipeline, need to preserve formatting, need
incremental sync, or DOM scraping fails.

**Script:** `scripts/pocGraphApi.ts`

See `references/graph-api.md` for registration and auth details.

## Workflow (Approach A)

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

**Pages to skip during mapping:**

- Pages with < 100 chars of cleaned content (empty templates).
- Duplicate sections: the student section (e.g. "GRIMES, Thomas") often mirrors
  the Content Library. Prefer the Content Library version.
- Non-subject pages (e.g. "Connect" pages with wellbeing factsheets).
- The "Welcome" section — its pages are almost always empty templates.

### Step 4: Map to StudyBub format

**Do not write a separate mapping script.** The preferred workflow is:

1. Read the extracted JSON.
2. Read the existing `src/content/tracks/*.ts` files to understand what topics
   are already covered.
3. Cross-reference the curriculum-plan pages against existing tracks.
4. Identify uncovered topics and create new track files directly in
   `src/content/tracks/`.
5. Create new badge entries in `src/content/badges.ts` for each new track.
6. Wire everything into `src/content/index.ts`.
7. Run the TypeScript compiler and `validateContent` to confirm correctness.

**Topic-to-track grouping:** Do not create one track per OneNote section.
Group related topics into sensible tracks:

- Number topics (negative integers, order of operations, decimals) → one track.
- Measurement topics (perimeter, circumference, area) → one track.
- Geometry topics (Pythagoras) → one track.
- Spatial topics (volume, capacity) → one track.
- Shape topics (congruency, similarity, quadrilaterals) → one track.

See `references/mapping.md` for the detailed mapping rules, content model
contract, and the inventory-first workflow.

## Image extraction notes

- Images are WOPI-rendered content inside the WOPI iframe.
- Blob URLs and data URLs are resolved within the frame context.
- Regular URL images are fetched via Playwright's request API.
- SVG images are filtered out (they are WOPI UI elements, not content).
- Cross-page deduplication removes UI chrome that appears on every page.
- Output: PNG files in `/tmp/onenote-extraction/` named `{section}__{page}__img{NNN}.png`.

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

The most valuable pages for mapping are the curriculum-plan pages (e.g.
"Term 1", "Term 2"). Their structure is predictable:

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

### Year-level corrections

The OneNote shows what year level each topic is taught in this class. If
existing tracks have incorrect year labels (e.g. geometry marked "Year 10"
but the OneNote teaches it in Year 8), correct them during the mapping
workflow.

### IRM encryption
`.one` files downloaded from SharePoint are encrypted at rest by Information
Rights Management (IRM). Do not attempt to parse `.one` files directly.
