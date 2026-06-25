import { StartClient } from "@tanstack/react-start/client";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import "katex/dist/katex.min.css";

// Hydrate the client-side application. The StartClient component handles
// the TanStack Start client-side routing and state hydration.
hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
);
