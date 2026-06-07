import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Vite configuration for the MathBub single-page application.
// React Fast Refresh and Tailwind v4 are wired in via plugins; no PostCSS step is needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
