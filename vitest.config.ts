import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Vitest configuration: jsdom environment for component tests, v8 coverage with
// the project-mandated 80% thresholds, and a shared setup file for jest-dom matchers.
// Server-side tests (src/server/, scripts/) use the "bun" pool via a Vitest workspace
// to access Bun APIs.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    passWithNoTests: true,
    setupFiles: ["./tests/setup.ts", "./src/test/mocks.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["src/server/**/*.test.ts", "scripts/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/main.tsx",
        "src/test/**",
        "src/**/*.d.ts",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
