import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...compat.config({
    extends: ["prettier"],

    rules: {
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
        },
      ],
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

    settings: {
      "import/resolver": {
        typescript: {},
      },
    },

    overrides: [
      {
        files: ["*.d.ts"],
        rules: {
          "no-unused-vars": "off",
        },
      },
    ],
  }),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "coverage/*",
    ],
  },
];

export default eslintConfig;
