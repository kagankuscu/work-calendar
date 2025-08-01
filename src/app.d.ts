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

		interface EventRequest {
			accessToken: string;
			events: MyEvent[]
		}

		interface MyEvent {
			colorId: string;
			summary: string;
			creator: Creator;
			start: {
				dateTime: string;
				timeZone?: string;
			};
			end: {
				dateTime: string;
				timeZone?: string;
			}
		}

		interface Creator {
			displayName: string;
			email: string;
		}
	}
}

export { };
