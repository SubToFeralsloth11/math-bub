import "katex/dist/katex.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { appContent } from "./content";
import { ProgressProvider } from "./state/progressContext";
import "./index.css";

const rootElement = document.querySelector("#root");
if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <ProgressProvider content={appContent}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProgressProvider>
    </ErrorBoundary>
  </StrictMode>,
);
