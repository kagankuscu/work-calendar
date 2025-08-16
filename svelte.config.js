import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			"components": "src/components",
			"icons": "src/icons"
		},
		paths: {
			base: '/work-calendar'
		}
	}
};

export default config;
