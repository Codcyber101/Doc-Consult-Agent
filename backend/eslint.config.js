// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Cursor agent prompt-id: prod-hardening-testing-ci
// Generated-at: 2026-02-23T00:00:00Z

const tseslint = require("typescript-eslint");

module.exports = [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Keep CI noise low for now; tighten later.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];

