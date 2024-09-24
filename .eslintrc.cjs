module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    quotes: ["warn", "double"],
    indent: ["error", 2],
    "jsx-quotes": ["error", "prefer-double"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
