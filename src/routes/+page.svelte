<script lang="ts">
	import GoogleButton from "components/ui/button/GoogleButton.svelte";
	import ActionButtonContainer from "components/layout/ActionButtonContainer.svelte";
	import DateSelection from "components/layout/DateSelection.svelte";
	import OffDaySelection from "components/layout/OffDaySelection.svelte";
	import { dateStorage } from "$lib/DateStorage.svelte";

	let selectedStartDate: string | null = $state(null);
	let selectedEndDate: string | null = $state(null);
	let selectedTime: string | null = $state(null);

	const addNewEvent = async () => {
		await fetch("/api/events", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				accessToken: new URLSearchParams(window.location.search).get("token"),
				startDate: selectedStartDate,
				endDate: selectedEndDate,
				time: selectedTime!.replaceAll(" ", "")
			})
		});
	};
</script>

<div class="container">
	<h1 class="mb-4 text-center text-3xl font-bold text-gray-800">Event Planner</h1>

	<GoogleButton />
	<DateSelection />
	<OffDaySelection />
	<ActionButtonContainer />

	<!-- Message Box -->
	<div id="messageBox" class="message-box">
	</div>
</div>
