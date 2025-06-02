import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';


export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    parser: tsParser,
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    globals: globals.browser,
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      quotes: ['error', 'double'],
      semi: ['error', 'always'],
      'semi-spacing': ['error', { before: false, after: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: false,
        },
      ],
    },
  }
);
