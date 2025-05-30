// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		type TypeTimes = {
			hour: number | string;
			minute: number | string;
			active: boolean;
		}

		type TypeEventRequest = {
			accessToken: string;
			startDate: string;
			endDate: string;
			time: string;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
