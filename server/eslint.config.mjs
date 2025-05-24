import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist/**", "node_modules/**"]
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: { 
      globals: globals.node,
      ecmaVersion: 2020,
      sourceType: "module"
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off"
    },
  },
  ...tseslint.configs.recommended
];
