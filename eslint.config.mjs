import react from "eslint-plugin-react";
import { browser, es2021, node } from "globals";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...browser,
        ...es2021,
        ...node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React rules
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/prop-types": "off", // Wyłączone, ponieważ używamy TypeScript
      "react/react-in-jsx-scope": "off", // Dla React 17+

      // TypeScript rules
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // General rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-vars": "off", // Wyłączone na rzecz @typescript-eslint/no-unused-vars
      "prefer-const": "error",
      "arrow-body-style": ["error", "as-needed"],
      "no-var": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "max-len": ["warn", { code: 100 }],

      // Import rules
      "import/prefer-default-export": "off",
      "import/no-default-export": "error",

      // Accessibility rules (opcjonalne, ale zalecane)
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
];
