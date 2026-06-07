/// <reference types="vite/client" />

// Allow side-effect imports of stylesheets (Tailwind entry and KaTeX) under
// the strict `noUncheckedSideEffectImports` compiler option.
declare module "*.css";
