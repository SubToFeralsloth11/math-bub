# StudyBub

StudyBub is a single-learner, full-stack learning platform built with TanStack
Start and Bun. It teaches maths, science, languages, and humanities through a
gamified learn → practise → master loop laid out on per-track progress maps,
with XP, levels, daily streaks, milestone badges, and end-of-track boss
challenges. A Reference control in the lesson header lets the learner re-read
any learn card mid-question without losing their place in the run. Progress is
stored server-side in SQLite; authentication uses passkeys (WebAuthn).

## Getting started

This project uses [bun](https://bun.sh) for package management and scripts.

```bash
bun install
```

### Environment variables

Copy the example file and fill in the values:

```bash
cp .env.example .env
```

Required variables:

| Variable         | Purpose                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `ENCRYPTION_KEY` | 64 hex characters (32 bytes) for AES-256-GCM encryption of AI configs. Generate with `openssl rand -hex 32`. |
| `SESSION_SECRET` | At least 32 random characters for signing session cookies. Generate with `openssl rand -hex 32`.             |

Optional:

| Variable   | Purpose                                 |
| ---------- | --------------------------------------- |
| `NODE_ENV` | Set to `production` for secure cookies. |

### Database

The SQLite database file (`studybub.db`) is created automatically on first run
in the project root. Run the migration script to initialise the schema and
create invitation tokens:

```bash
bun run scripts/migrate.ts invite --name "Learner Name" --base-url http://localhost:3000
```

The script prints an invitation link. Open it in a browser to register a
passkey and create your account. Each token is single-use.

### Development

```bash
bun run dev
```

The app opens at `http://localhost:3000`.

### Production build

```bash
bun run build
bun run start
```

The `build` script type-checks and builds the client and server bundles (Nitro
with the Bun preset). The `start` script runs the production server on
`http://localhost:3000`.

## Deployment

StudyBub is deployed to a VPS (`vps-80cc1cc4.vps.ovh.ca`) via GitHub Actions.
Pushes to `main` that pass all quality gates trigger an automatic deploy.

### Provisioning a new VPS

Run the provisioning script on a fresh Ubuntu VPS (22.04 or 24.04):

```bash
# Copy the script to the VPS.
scp scripts/provision-vps.sh root@<vps-host>:/tmp/

# Execute it.
ssh root@<vps-host> sudo bash /tmp/provision-vps.sh
```

The script installs Bun, creates the `studybub` system user, generates
secrets, configures the systemd unit and nginx reverse proxy, and obtains
a TLS certificate. After provisioning, the VPS is ready to receive deploys.

### GitHub Actions environment

Before the first deploy, create a `production` environment in the repository
settings with these variables and secrets:

```bash
gh api /repos/:owner/:repo/environments/production -X PUT

# Secret: SSH private key for VPS access.
gh secret set VPS_SSH_KEY --env production --body "$(cat ~/.ssh/studybub-deploy)"

# Variables: VPS connection details.
gh variable set VPS_HOST --env production --body "vps-80cc1cc4.vps.ovh.ca"
gh variable set VPS_USER --env production --body "studybub"
gh variable set VPS_PATH --env production --body "/opt/studybub"
```

### Deploy lifecycle

1. Push to `main` triggers the full CI pipeline.
2. All quality gates must pass (static analysis, unit tests, build, e2e).
3. The deploy job rsyncs the build to the VPS while the service continues
   serving the previous version, runs `bun install --production`, then
   restarts the service with `systemctl restart`.
4. The database at `/var/lib/studybub/data.db` is outside the application
   directory and is never touched by rsync.

### Rollback on deploy failure

If the deploy job fails, the service may be left in a stopped state. To
recover, SSH to the VPS and restart the previous version:

```bash
ssh root@<vps-host>
systemctl start studybub
```

The old service continues serving until the restart step. If rsync or
`bun install` fails before the restart, the old version remains running
uninterrupted. If restart fails, systemd's `Restart=on-failure` retries
the new version. To manually revert, restore a previous `.output/` from
backup and run `systemctl start studybub`.

## Scripts

| Script                      | Purpose                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| `bun run dev`               | Start the Vite + TanStack Start dev server.                                                  |
| `bun run build`             | Type-check and build for production.                                                         |
| `bun run start`             | Start the production Bun server.                                                             |
| `bun run preview`           | Preview the production build.                                                                |
| `bun run lint`              | Run ESLint.                                                                                  |
| `bun run lint:fix`          | Run ESLint with autofix.                                                                     |
| `bun run format`            | Format with Prettier.                                                                        |
| `bun run format:check`      | Check formatting.                                                                            |
| `bun run lint:duplication`  | Detect copy-paste duplication with jscpd.                                                    |
| `bun run test`              | Run the app (Node/jsdom) and server (Bun) test suites once.                                  |
| `bun run test:watch`        | Watch the app (Node/jsdom) suite.                                                            |
| `bun run test:server`       | Run the server suite once under Bun (`src/server/`, needs `bun:sqlite`).                     |
| `bun run test:server:watch` | Watch the server suite under Bun.                                                            |
| `bun run test:coverage`     | Run both suites with coverage (app enforces 80% thresholds; server reports coverage).        |
| `bun run test:e2e`          | Run the Playwright end-to-end tests.                                                         |
| `bun run check`             | Run all quality gates: lint, format, duplication, tests + coverage, type-check + build, e2e. |

The Playwright tests start the dev server automatically. Install the browser
once with `bunx playwright install chromium` before the first run.

## CLI tool

The `scripts/migrate.ts` script provides user management and progress
migration:

```bash
# Create a new user and generate an invitation link
bun run scripts/migrate.ts invite --name "Oscar" --base-url http://localhost:3000

# Import progress from a JSON file (e.g., from localStorage export)
bun run scripts/migrate.ts import --user-id "abc123" --progress-file progress.json

# Import progress with AI config
bun run scripts/migrate.ts import --user-id "abc123" --progress-file progress.json --ai-config-file aiConfig.json
```

### Extracting localStorage data from browser DevTools

1. Open the StudyBub app in your browser.
2. Open DevTools (F12) and go to the Console tab.
3. Run: `copy(localStorage.getItem("studybub.progress.v1"))`
4. Paste into a file (e.g., progress.json).
5. (Optional) For AI config: `copy(localStorage.getItem("studybub.aiConfig.v1"))`

## Architecture

The code is split into a pure, framework-free domain layer and a thin React
layer, with server-side persistence via TanStack Start server functions:

- `src/domain/` - pure logic with no React: answer marking and algebraic
  equivalence (`marking/`), XP/levels, streaks, unlocking and badges
  (`progress/`), versioned persistence schemas (`persistence/`), and content
  types and validation (`content/`). All of this is unit-tested.
- `src/content/` - the authored learning content as typed TypeScript data.
- `src/state/` - React context providers for progress and AI config, backed
  by pure reducers that compose the domain functions. State is hydrated from
  and persisted to the server-side database.
- `src/server/` - TanStack Start server functions (progress, auth, AI config),
  the SQLite database layer, session management, WebAuthn integration, and
  AES-256-GCM encryption for API keys.
- `src/components/` and `src/features/` - shared presentational components and
  the screen components.
- `src/routes/` - file-based TanStack Router route definitions.

Progress is stored server-side in SQLite. The client never accesses the
database directly - all persistence goes through `createServerFn` RPC calls
that enforce authentication via session cookies.

Authentication uses passkeys (WebAuthn). New users are created via single-use
invitation tokens generated by the CLI tool. Sessions are HTTP-only signed
cookies with a 7-day expiry.

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
4. Optionally set a question's `refersTo` to the id of the learn card in the
   same lesson that teaches its idea; the Reference surface then opens on
   that card. Omit it for lesson-wide questions. `validateContent` rejects
   any `refersTo` that does not resolve to a learn card in the same lesson.
5. Run `bun run test` - content validation will flag any structural problems.

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
