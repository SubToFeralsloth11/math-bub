# MathBub

MathBub is a single-learner, browser-based maths learning platform. It teaches
Time (Year 4), Algebra (Year 8) and Geometry (Year 10) through a gamified
learn → practise → master loop laid out on per-track progress maps, with XP,
levels, daily streaks, milestone badges, and end-of-track practice-paper boss
challenges. It runs entirely in the browser, with progress saved to local
storage; there is no backend and no network access at runtime.

## Getting started

This project uses [bun](https://bun.sh) for package management and scripts.

```bash
bun install
bun run dev
```

The app opens at the address Vite prints (by default `http://localhost:5173`).

## Scripts

| Script                     | Purpose                                       |
| -------------------------- | --------------------------------------------- |
| `bun run dev`              | Start the Vite dev server.                    |
| `bun run build`            | Type-check and build for production.          |
| `bun run preview`          | Preview the production build.                 |
| `bun run lint`             | Run ESLint.                                   |
| `bun run lint:fix`         | Run ESLint with autofix.                      |
| `bun run format`           | Format with Prettier.                         |
| `bun run format:check`     | Check formatting.                             |
| `bun run lint:duplication` | Detect copy-paste duplication with jscpd.     |
| `bun run test`             | Run the unit and component tests once.        |
| `bun run test:watch`       | Run the tests in watch mode.                  |
| `bun run test:coverage`    | Run the tests with coverage (80% thresholds). |
| `bun run test:e2e`         | Run the Playwright end-to-end tests.          |

The Playwright tests start the dev server automatically. Install the browser
once with `bunx playwright install chromium` before the first run.

## Architecture

The code is split into a pure, framework-free domain layer and a thin React
layer:

- `src/domain/` - pure logic with no React: answer marking and algebraic
  equivalence (`marking/`), XP/levels, streaks, unlocking and badges
  (`progress/`), versioned persistence (`persistence/`), and content types and
  validation (`content/`). All of this is unit-tested.
- `src/content/` - the authored learning content as typed TypeScript data.
- `src/state/` - a single progress `Context` backed by a pure `useReducer` that
  composes the domain functions, hydrated from and persisted to local storage.
- `src/components/` and `src/features/` - shared presentational components and
  the seven screens.

Maths is typeset with KaTeX (with a plain-text fallback), and algebraic answers
are marked by parsing with mathjs and testing equivalence via deterministic
numeric sampling, so any equivalent form of an answer is accepted.

## Authoring content

Lessons and questions are plain typed data under `src/content/`, validated at
development time by `validateContent` (and in the test suite). To add a lesson:

1. Add a `Lesson` to the relevant track in `src/content/tracks/`. Give it a
   unique `id`, a contiguous 1-based `order`, at least one learn card, and at
   least one practice and one mastery question.
2. Write question prompts and explanations with the `t()` (text) and `m()`
   (maths) helpers from `src/content/blocks.ts`.
3. Choose the question type:
   - `mcq` for single-correct multiple choice (use this for "factorise"
     questions, where equivalence marking would otherwise accept an
     un-factorised answer);
   - `numeric` for numeric or short-text answers (tolerant of whitespace, case
     and an optional unit);
   - `expression` for algebraic answers marked by equivalence to a `target`
     (declare every symbol the target uses in `variables`).
4. Run `bun run test` - content validation will flag any structural problems.

## Geometry figures

Geometry figures are raster images produced externally. The per-figure prompts,
target filenames and alt text live in
`.local/specs/001-math-learning-platform/figures/prompts.md`. Generate the
images with an image model and drop the PNGs into `public/figures/`, named by
figure id. Until an image is present, the app shows the figure's text-description
fallback, so every question remains answerable.

## Copyright

Copyright © 2025, Commonwealth Scientific and Industrial Research Organisation
(CSIRO) ABN 41 687 119 230.
