import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

/**
 * TanStack Start Vite configuration for StudyBub.
 *
 * The TanStack Start plugin provides the SSR framework, Nitro handles the
 * server build with the Bun preset, and Tailwind CSS processes styles. The
 * React Vite plugin must come after the TanStack Start plugin.
 */
export default defineConfig({
  server: {
    // Pin the dev server to the IPv4 loopback interface. Under `bun --bun
    // vite dev` Bun's HTTP server binds to the IPv6 loopback (`::1`) only on
    // Linux, while `localhost` resolves to IPv4 (`127.0.0.1`) there. That
    // mismatch left the port unreachable to Playwright's webServer probe and
    // to `curl localhost`, so the E2E job timed out. Binding explicitly to
    // `127.0.0.1` keeps it reachable on both macOS and Linux without exposing
    // it on the network.
    host: "127.0.0.1",
    port: 3000,
  },
  ssr: {
    // Bun built-in modules are resolved at runtime by the Bun server,
    // not by Vite's ESM loader. Externalising them prevents Vite from
    // failing to resolve the `bun:` protocol during SSR module graph
    // traversal.
    external: ["bun:sqlite"],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      router: {
        // Ignore test files so they don't trigger route generation warnings.
        routeFileIgnorePattern: String.raw`\.test\.(ts|tsx)$`,
      },
    }),
    nitro(),
    viteReact(),
  ],
});
