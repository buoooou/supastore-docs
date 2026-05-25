import nextPlugin from "@next/eslint-plugin-next"
import js from "@eslint/js"
import prettierConfig from "eslint-config-prettier"
import tsParser from "@typescript-eslint/parser"

export default [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/out/**",
      "**/coverage/**",
      "**/drizzle/**",
      "**/.content-collections/generated/**",
      "**/.content-collections/cache/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-undef": "off",
    },
  },
  {
    rules: {
      ...prettierConfig.rules,
      "@next/next/no-html-link-for-pages": "off",
      "no-unused-vars": "off",
    },
  },
]
