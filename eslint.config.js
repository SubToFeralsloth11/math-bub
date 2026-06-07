import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

// Flat ESLint configuration for MathBub. It composes the project-mandated plugin
// stack (typescript-eslint, React, hooks, jsx-a11y, jsdoc, import, unicorn) and
// disables only the rules that conflict with this project's documented
// conventions (camelCase filenames, deliberate `null` usage, React idioms).
export default tseslint.config(
  {
    ignores: [
      "dist",
      "coverage",
      "node_modules",
      "playwright-report",
      "test-results",
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  unicorn.configs.recommended,

  // Application and library source.
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "react-refresh": reactRefresh,
      import: importPlugin,
      jsdoc,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      // Allow deliberately-unused underscore-prefixed bindings (e.g. reducer
      // parameters reserved for later phases).
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "none",
        },
      ],

      // React conventions from the project rules.
      "react/prop-types": "off",
      "react/jsx-pascal-case": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/self-closing-comp": "error",

      // React hooks.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Import ordering per the static-analysis rules.
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-duplicates": "error",

      // JSDoc on exported declarations (advisory: warnings do not fail the gate).
      "jsdoc/require-jsdoc": [
        "warn",
        {
          publicOnly: true,
          require: {
            FunctionDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
        },
      ],

      // Conventions that diverge from unicorn's defaults.
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-nested-ternary": "off",
      "unicorn/prefer-global-this": "off",
      "unicorn/no-keyword-prefix": "off",
    },
  },

  // State modules intentionally co-locate a provider component with its hook,
  // so the Fast Refresh component-only rule does not apply.
  {
    files: ["src/state/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },

  // Test files: enable the Vitest plugin and its globals.
  {
    files: ["src/**/*.test.{ts,tsx}", "tests/**/*.{ts,tsx}"],
    plugins: { vitest },
    languageOptions: {
      globals: { ...vitest.environments.env.globals },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "unicorn/consistent-function-scoping": "off",
    },
  },

  // Build tooling configuration files run in Node.
  {
    files: ["*.config.ts", "*.config.js"],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      "unicorn/prefer-module": "off",
    },
  },
);
