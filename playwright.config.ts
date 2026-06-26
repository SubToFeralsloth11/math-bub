import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for StudyBub end-to-end tests.
 *
 * The TanStack Start dev server runs on port 3000 (configured in
 * vite.config.ts) and is started automatically via the webServer config.
 * Tests run against the dev server for fast feedback.
 */
const port = 3000;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `bun run dev`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      VITE_BYPASS_AUTH: "true",
    },
  },
});
