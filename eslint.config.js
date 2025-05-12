import eslint from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import { defineConfig, globalIgnores } from 'eslint/config'
import checkFile from 'eslint-plugin-check-file'
import pluginImport from 'eslint-plugin-import'
// eslint-plugin-prettier and eslint-config-prettier 둘 다 설정함
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import * as tseslint from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    extends: [
      // https://eslint.org/docs/latest/rules
      eslint.configs.recommended,
      // https://typescript-eslint.io/rules/?=recommended
      ...tseslint.configs.recommended,
    ],
    rules: {
      'linebreak-style': ['error', 'unix'],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    // https://github.com/jsx-eslint/eslint-plugin-react?tab=readme-ov-file
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
    },
    settings: {
      react: {
        // eslint-plugin-react 사용자가 설치한 버전을 자동으로 선택
        version: 'detect',
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
    extends: [pluginJsxA11y.flatConfigs.recommended],
    rules: {
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
  // https://react.dev/reference/rules/rules-of-hooks
  reactHooks.configs['recommended-latest'],
  // https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query
  ...pluginQuery.configs['flat/recommended'],
  {
    // https://github.com/import-js/eslint-plugin-import/tree/main
    extends: [
      pluginImport.flatConfigs.recommended,
      pluginImport.flatConfigs.typescript,
    ],
    // import 문에서 타입스크립트 파일 인식 가능
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // disables cross-feature imports:
            {
              target: './src/features/goals',
              from: './src/features',
              except: ['./goals'],
            },
            {
              target: './src/features/test',
              from: './src/features',
              except: ['./test'],
            },

            // enforce unidirectional codebase:

            // e.g., src/app can import from src/features but not the other way around
            {
              target: './src/features',
              from: './src/app',
            },

            // e.g., src/features and src/app can import from these shared modules but not the other way around
            {
              target: [
                './src/components',
                './src/hooks',
                './src/lib',
                './src/types',
                './src/utils',
              ],
              from: ['./src/features', './src/app'],
            },
          ],
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-cycle': 'error',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
    },
  },
  {
    plugins: {
      'check-file': checkFile,
    },
    files: ['!./src/routes/(home)/__root.tsx'],
    rules: {
      // 파일 이름 규칙
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
  globalIgnores(['src/routeTree.gen.ts']),
])
