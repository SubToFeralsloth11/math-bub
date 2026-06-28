import { defineConfig } from "vitest/config";

// Server-side Vitest configuration.
//
// These tests import `bun:sqlite` and other Bun-only modules, so they must run
// under Bun's runtime. The matching `bun --bun vitest ... -c vitest.server.config.ts`
// invocation executes vitest under Bun, whose fork-pool children are therefore
// Bun processes in which `bun:sqlite` resolves. (Vitest 4 has no built-in `bun`
// pool, so forcing the host runtime to Bun via `--bun` is the supported path.)
//
// The Istanbul coverage provider instruments source at Vite transform time, so
// it works under Bun (where the V8 provider cannot collect coverage). Coverage
// is scoped to `src/server/**` and the project-mandated 80% thresholds are
// enforced over that slice, matching `vitest.config.ts`. Each server module is
// covered: the pure helpers (`db.server.ts`, `rpInfo.ts`,
// `encryption.server.ts`, `webAuthn.server.ts`, `session.server.ts`) by direct
// unit tests, and the `createServerFn`-backed handlers (`api/auth.ts`,
// `api/progress.ts`, `api/aiConfig.ts`, `api/requireUserId.server.ts`) via
// tests that stub the framework factory and session so the real handlers run
// against an in-memory database.
//
// `bun:sqlite` itself is a built-in external module and is never matched by
// `coverage.include`, so it is excluded automatically.
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    passWithNoTests: true,
    include: ["src/server/**/*.test.ts"],
    exclude: ["node_modules/**", ".output/**", ".vinxi/**"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage/server",
      include: ["src/server/**/*.{ts,tsx}"],
      exclude: ["src/server/**/*.test.ts", "src/server/**/*.d.ts"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
