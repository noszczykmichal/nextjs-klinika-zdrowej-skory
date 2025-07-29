import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "plugin:jsx-a11y/recommended",
      "prettier",
    ],

    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
    ignorePatterns: [
      "src/components/ui/sidebar.tsx",
      "src/components/ui/carousel.tsx",
    ],
  }),
];

export default eslintConfig;
