// Production Bun server for StudyBub.
// Starts the TanStack Start server built with the Bun Nitro preset.
// Run with: bun run server.ts

// The built server handler is produced by `vinxi build` with preset: "bun".
// It lives under the output directory (often .output/server/index.mjs).
// This thin wrapper resolves and starts it.

const serverEntry = await import(
  /* @vite-ignore */
  ".output/server/index.mjs"
);

// The default export of the built server is a fetch-compatible handler.
// Bun.serve accepts a fetch handler directly.
const handler = serverEntry.default ?? serverEntry.fetch;

if (typeof handler !== "function") {
  console.error(
    "Server handler not found. Run `bun run build` first to build the production server.",
  );
  process.exit(1);
}

const port = Number(process.env.PORT) || 3000;

Bun.serve({
  port,
  fetch: handler,
});

console.log(`StudyBub server running on http://localhost:${port}`);
