import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// TanStack Start configuration for StudyBub.
// React plugin must come after tanstackStart per TanStack Start conventions.
// The Bun server preset is configured via the tanstackStart options.
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      server: {
        preset: "bun",
      },
    }),
    viteReact(),
  ],
});
