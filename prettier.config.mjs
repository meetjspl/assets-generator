/**
 * @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions}
 */
export default {
	arrowParens: 'avoid',
	singleQuote: true,
	useTabs: true,
	importOrderSeparation: true,
	importOrderSideEffects: false,
	importOrderSortSpecifiers: true,
	importOrder: [
		'^node:(.*)$',
		'<THIRD_PARTY_MODULES>',
		'^@/(.*)$',
		'^[./]',
		'<THIRD_PARTY_TS_TYPES>',
		'<TS_TYPES>^@/(.*)$',
		'<TS_TYPES>^[./]',
	],
	tailwindStylesheet: './src/assets/styles/global.css',
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],
};
