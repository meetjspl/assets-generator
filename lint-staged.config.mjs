const ESLINT_TASK = 'eslint --fix';
const PRETTIER_TASK = 'prettier -u -w';

/**
 * @type {import('lint-staged').Configuration}
 */
export default {
	'*.{ts,tsx}': [ESLINT_TASK, PRETTIER_TASK],
	'*': PRETTIER_TASK,
};
