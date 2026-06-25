import { defineConfig } from "@tanstack/react-start-config";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";

/**
 * TanStack Start application configuration for StudyBub.
 *
 * Configures the Nitro Bun preset for production deployment and the
 * Vite plugins for Tailwind CSS and React. The routes directory
 * defaults to `src/routes/`.
 *
 * This file is the canonical TanStack Start configuration; the
 * `vite.config.ts` provides the full Vite-specific configuration
 * including SSR externalisation and dev server settings.
 */
export default defineConfig({
  server: {
    preset: "bun",
  },
  vite: {
    server: {
      port: 3000,
    },
    ssr: {
      external: ["bun:sqlite"],
    },
    plugins: [tailwindcss(), viteReact()],
  },
  tsr: {
    appDirectory: "src",
    routeFileIgnorePattern: String.raw`\.test\.(ts|tsx)$`,
  },
});
