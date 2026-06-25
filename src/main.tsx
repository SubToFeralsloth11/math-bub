import "katex/dist/katex.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { appContent } from "./content";
import { AiConfigProvider } from "./state/aiConfigContext";
import { ProgressProvider } from "./state/progressContext";
import "./index.css";

// Restore the intended route after a GitHub Pages 404 redirect.
// public/404.html stores the path in sessionStorage before redirecting to the root.
const savedRedirect = sessionStorage.getItem("spaRedirect");
if (savedRedirect) {
  sessionStorage.removeItem("spaRedirect");
  window.history.replaceState(null, "", savedRedirect);
}

const rootElement = document.querySelector("#root");
if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <ProgressProvider content={appContent}>
        <AiConfigProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <App />
          </BrowserRouter>
        </AiConfigProvider>
      </ProgressProvider>
    </ErrorBoundary>
  </StrictMode>,
);
