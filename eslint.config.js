import eslint from '@eslint/js';
import configPrettier from 'eslint-config-prettier/flat';
import { importX } from 'eslint-plugin-import-x';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			eslint.configs.recommended,
			tseslint.configs.recommendedTypeChecked,
			importX.flatConfigs.recommended,
			importX.flatConfigs.typescript,
			react.configs.flat.recommended,
			react.configs.flat['jsx-runtime'],
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-misused-promises': [
				'error',
				{ checksVoidReturn: false },
			],
			'@typescript-eslint/no-non-null-assertion': 'error',
			'@typescript-eslint/prefer-optional-chain': 'error',
			'import-x/first': 'error',
			'import-x/newline-after-import': 'error',
			'require-await': 'error',
		},
	},
	configPrettier,
]);
