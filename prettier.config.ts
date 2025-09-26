import type { Config } from 'prettier';
import type { PluginOptions } from 'prettier-plugin-tailwindcss';

const config: Config & PluginOptions = {
	arrowParens: 'avoid',
	singleQuote: true,
	useTabs: true,
	importOrderSeparation: true,
	importOrderSideEffects: false,
	importOrderSortSpecifiers: true,
	importOrder: [
		'^node:(.)$',
		'<THIRD_PARTY_MODULES>',
		'^@twc/(.)$',
		'^[./]',
		'<THIRD_PARTY_TS_TYPES>',
		'<TS_TYPES>^@twc/(.*)$',
		'<TS_TYPES>^[./]',
	],
	tailwindStylesheet: './src/index.css',
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],
};

export default config;
