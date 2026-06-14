# Content Authoring Contract: StudyBub

This is the contract content authors write against. Every data structure here is
enforced by `validateContent` in `src/domain/content/validateContent.ts`.
See also `src/domain/content/types.ts` for the TypeScript definitions.

---

## RichBlock — the building block

Every piece of displayed content is a `RichBlock`: either plain text or a KaTeX
expression with a plain-text fallback.

```typescript
type RichBlock =
  | { kind: "text"; text: string }
  | { kind: "math"; tex: string; fallback: string };
```

The `"math"` kind is rendered via KaTeX for any symbolic notation (maths,
chemistry, physics formulae). It is not exclusively maths.

Helpers in `src/content/blocks.ts`:

- `t(text)` → `{ kind: "text", text }`
- `m(tex, fallback?)` → `{ kind: "math", tex, fallback: fallback ?? tex }`

---

## Figure

A referenced image asset. The image is expected at `public/figures/<id>.png`;
when absent, `textFallback` is shown so the question remains answerable.

```typescript
interface Figure {
  id: string; // Maps to the asset filename
  alt: string; // Accessible description / image alt text
  textFallback: string; // Shown in place of a missing image
}
```

---

## Subjects

A Subject is a top-level content area. It declares metadata; it does NOT contain
tracks directly — tracks reference their subject via `subjectId`.

```typescript
interface Subject {
  id: string; // Unique slug, e.g. "maths", "science"
  title: string; // Display name, e.g. "Maths", "Science"
  description: string; // Blurb, e.g. "Algebra, geometry, and more"
  icon: string; // Single emoji, e.g. "🧮", "🔬"
  accent: string; // Hex colour, e.g. "#6D4AFF"
}
```

**Constraints**:

- `id` unique across all subjects
- All fields non-empty
- `accent` is a 7-char hex colour (`#RRGGBB`)

---

## Tracks

A content track that belongs to a subject. The subject's icon is used for
the track card in list views.

```typescript
interface Track {
  id: string; // Unique slug (any alphanumeric string)
  subjectId: string; // References Subject.id
  title: string; // Display name, e.g. "Algebra (Year 8)"
  description: string; // Blurb
  lessons: Lesson[]; // Ordered; order values 1..n contiguous with no gaps
  challenge: BossChallenge;
}
```

**Constraints**:

- `subjectId` must reference a real Subject.id
- `id` unique across all tracks
- At least one lesson, with unique IDs per track
- Lesson `order` values contiguous 1..n

---

## Lessons

```typescript
interface Lesson {
  id: string; // Unique within the track
  order: number; // 1-based position; contiguous within a track
  title: string; // Display title, e.g. "5G Expanding brackets"
  sourceRef: string; // Originating worksheet reference, e.g. "5G"
  learnCards: LearnCard[]; // At least one, shown before practice
  practice: Question[]; // At least one practice question
  mastery: Question[]; // At least one mastery-check question
  passThreshold?: number; // Fraction 0..1; defaults to 0.8
  aiProvenance?: AiProvenance; // Optional AI involvement marker
}
```

**Constraints**:

- `learnCards`, `practice`, `mastery` all non-empty
- `passThreshold` must be in (0, 1] if present
- No duplicate learn-card IDs, no duplicate question IDs (across practice + mastery)

---

## LearnCard

```typescript
interface LearnCard {
  id: string; // Unique within the lesson
  heading: string; // Card heading, e.g. "Key idea"
  body: RichBlock[]; // Ordered rich-content blocks
  figure?: Figure | null; // Optional figure
}
```

---

## BossChallenge

```typescript
interface BossChallenge {
  id: string; // Stable id, e.g. "algebra-boss"
  title: string; // Display title
  sourceRef: string; // Originating practice paper
  questions: Question[]; // Challenge question set (no learn cards)
  bonusXp: number; // Bonus XP awarded on completion
  passBadgeId: string; // Badge granted for finishing the challenge
  aiProvenance?: AiProvenance; // Optional AI involvement marker
}
```

---

## Questions

### QuestionBase

Fields common to every question variant:

```typescript
interface QuestionBase {
  id: string; // Unique within its set (lesson or challenge)
  prompt: RichBlock[]; // The question text/maths
  figure?: Figure | null; // Optional figure shown with the question
  explanation: RichBlock[]; // Worked explanation shown on wrong answer
  xp: number; // XP awarded for a correct answer
}
```

**Constraint**: `explanation` must be non-empty for every question type.

### McqQuestion

```typescript
interface McqQuestion {
  type: "mcq";
  id: string;
  prompt: RichBlock[];
  figure?: Figure | null;
  explanation: RichBlock[];
  xp: number;
  options: McqOption[]; // 2–5 options, unique ids
  correctOptionId: string; // Must match one option's id
}

interface McqOption {
  id: string;
  label: RichBlock[];
}
```

**Marking**: Selected option id must equal `correctOptionId`.

### NumericQuestion

```typescript
interface NumericQuestion {
  type: "numeric";
  id: string;
  prompt: RichBlock[];
  figure?: Figure | null;
  explanation: RichBlock[];
  xp: number;
  accepted: string[]; // At least one non-empty string
  unit?: string; // Optional unit stripped before comparison (e.g. "cm")
}
```

**Marking**: Input is normalised (NFKC, trim, lowercase, collapse whitespace,
strip unit) and checked against normalised accepted answers.

### ExpressionQuestion

```typescript
interface ExpressionQuestion {
  type: "expression";
  id: string;
  prompt: RichBlock[];
  figure?: Figure | null;
  explanation: RichBlock[];
  xp: number;
  target: string; // A mathjs-parseable target expression
  variables: string[]; // Symbols sampled when testing equivalence
}
```

**Marking**: Input is compared by mathematical equivalence to `target` using
mathjs, sampling across the declared `variables` domain.

### ShortTextQuestion

```typescript
interface ShortTextQuestion {
  type: "shortText";
  id: string;
  prompt: RichBlock[];
  figure?: Figure | null;
  explanation: RichBlock[];
  xp: number;
  accepted: string[]; // At least one non-empty string
}
```

**Marking**: Input is normalised (NFKD, trim, lowercase, strip diacritics,
collapse whitespace) and checked against normalised accepted answers.
Case-insensitive. E.g. `"Café"` matches accepted `["cafe"]`.

### FillInTheBlankQuestion

```typescript
interface FillInTheBlankQuestion {
  type: "fillInTheBlank";
  id: string;
  prompt: RichBlock[];
  explanation: RichBlock[];
  xp: number;
  template: RichBlock[]; // Contains ___ marker where gap goes
  accepted: string[]; // At least one non-empty string
}
```

**Template constraint**: At least one `text` block in `template` must contain
`___` (triple underscore). The renderer splits at the first `___` and inserts
an input field at that position. If `___` appears in a `math` block, it is
treated as literal LaTeX and ignored by the splitter.

**Marking**: Same normalisation as ShortTextQuestion.

### MatchingQuestion

```typescript
interface MatchingPair {
  id: string; // Unique within the question
  left: RichBlock[]; // Left-column content (non-empty)
  right: RichBlock[]; // Right-column content (non-empty)
}

interface MatchingQuestion {
  type: "matching";
  id: string;
  prompt: RichBlock[];
  explanation: RichBlock[];
  xp: number;
  pairs: MatchingPair[]; // At least 2, no duplicate IDs
}
```

**Marking**: The learner connects left items to right items. Submission is a
JSON mapping `{ [leftId]: rightId }`. All pairs must be correctly matched
(each `left` connected to the `right` with the same `id`). No partial credit.

**Rendering**: Left items in a fixed column, right items shuffled. Tap left
then right to connect. Re-tapping a connected right reassigns.

---

## AI Provenance (optional)

Every `Lesson` and `BossChallenge` may carry:

```typescript
interface AiProvenance {
  tool: string; // Non-empty, e.g. "Claude", "ChatGPT"
  sources: string[]; // May be empty
  role: "generated" | "checked" | "both";
}
```

**Constraints**: When present, `tool` must be non-empty and `role` must be one
of `"generated"`, `"checked"`, `"both"`. When absent, validation passes normally.

---

## Badges

```typescript
type BadgeCriterion =
  | "first-lesson"
  | "perfect-mastery"
  | "streak-5"
  | "streak-7"
  | `track-complete:${string}`
  | `boss-pass:${string}`
  | "all-tracks-complete";

interface Badge {
  id: string; // Stable slug
  title: string; // Display title
  description: string; // Unlock condition shown to learner
  criterion: BadgeCriterion; // Rule key evaluated to award the badge
  icon: string; // Short emoji or glyph
}
```

---

## AppContent — the aggregate

```typescript
interface AppContent {
  subjects: Subject[]; // Display-order list
  tracks: Track[]; // Display-order list
  badges: Badge[]; // Display-order list
}
```

**Constraints**:

- At least one subject
- No duplicate subject, track, or badge IDs
- Every track's `subjectId` references a real subject
- Every badge's track-scoped criterion references a real track
- Every track's `challenge.passBadgeId` references a real badge

---

## URL Structure

| Path                                 | Screen              | Description                            |
| ------------------------------------ | ------------------- | -------------------------------------- |
| `/`                                  | HomeScreen          | Subject cards                          |
| `/subject/:subjectId`                | SubjectScreen       | Tracks within subject                  |
| `/subject/:subjectId/track/:trackId` | TrackMapScreen      | Lesson map                             |
| `/lesson/:trackId/:lessonId`         | LessonScreen        | Lesson flow                            |
| `/challenge/:trackId`                | BossChallengeScreen | Boss challenge                         |
| `/track/:trackId`                    | Redirect            | → `/subject/:subjectId/track/:trackId` |
| `/badges`                            | BadgesScreen        | Badge collection                       |
