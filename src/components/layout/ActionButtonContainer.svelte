<script lang="ts">
	import { dateStorage } from "$lib/DateStorage.svelte";
	import { showMessage } from "$lib/utils";
	import { googleEvent } from "$lib/event";

	const save = async () => {
		const { selectedOfDays, startDate, endDate, shiftTime } = dateStorage;
		if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
			showMessage('Please select valid start and end dates.', 'info');
			return;
		}

		if (shiftTime === undefined || shiftTime === null || shiftTime === '') {
			showMessage('Please select valid shift time.', 'error');
			return;
		}

		if (startDate > endDate) {
			showMessage('Start date cannot be after end date.', 'error');
			return;
		}

		const events: App.MyEvent[] = [];
		const [ hours, minutes ] = shiftTime.split(':');
		let currentDate = new Date(startDate);
		currentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
		endDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

		while (currentDate <= endDate) {
			const dayOfWeek = currentDate.getDay();

			let colorId = googleEvent.getColor(googleEvent.getShiftName(shiftTime) ?? '') ?? '0';

			let eventSummary = `W: ${shiftTime}`;
			if (selectedOfDays.has(dayOfWeek)) {
				eventSummary = 'OFF DAY';
				colorId = '8';
			}

			const event = googleEvent.createEvent(colorId, currentDate.toUTCString(), eventSummary);
			events.push(event);

			currentDate.setDate(currentDate.getDate() + 1);
		}

		const res = await fetch('/work-calendar/api/v2/events', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				accessToken: new URLSearchParams(window.location.search).get('token'),
				events
			}),
		});

		if (res.status !== 200) {
			showMessage('Something went wrong', 'error');
			return;
		}

		showMessage(`Generated ${events.length} events are saved.`);
	}
</script>

<!-- Action Buttons -->
<div class="button-group mt-6 flex flex-col justify-center gap-4 sm:flex-row">
	<button onclick={save} id="saveBtn" class="save-btn">
		<svg
			class="h-5 w-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3m-1-4l-3 3m0 0l-3-3m3 3V4"
			></path>
		</svg>
		Save Events
	</button>
</div>
