import svelte from 'eslint-plugin-svelte';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelteParser from 'svelte-eslint-parser';
import prettier from 'eslint-config-prettier';

export default [
  // Base config for JS/TS files
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      '@typescript-eslint': ts,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...ts.configs.recommended.rules,
    },
  },

  // Svelte specific config
  {
    files: ['**/*.svelte'],
    plugins: {
      svelte,
    },
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser, // Use TS parser for the script part of Svelte files
      },
    },
    rules: {
      ...svelte.configs['flat/recommended'].rules,
    },
  },

  // Prettier to disable conflicting rules
  prettier,
];