<script lang="ts">
	import Button from "components/button/Button.svelte";
	import Calendar from "components/calendar/Calendar.svelte";
	import Timepicker from "components/timepicker/Timepicker.svelte";

	let selectedStartDate: string | null = $state(null);
	let selectedEndDate: string | null = $state(null);
	let selectedTime: string | null = $state(null);

	let formattedStartDate = $derived(selectedStartDate && new Date(selectedStartDate).toString());

	async function addNewEvent() {
		const res = await fetch("/api/events", {
			method: "POST",
			body: JSON.stringify({
				access_token: new URLSearchParams(window.location.search).get("token"),
				startDate: formattedStartDate,
				endDate: selectedEndDate,
				time: selectedTime!.replaceAll(" ", "")
			})
		});
	}
</script>

<div
	class="flex h-[100vh] w-full items-center justify-center bg-gray-800 text-white dark:bg-gray-800 dark:text-white"
>
	<div class="container flex justify-center">
		<div class="w-1/2">
			<h1 class="text-4xl text-center font-semibold">Shift</h1>

			<Calendar bind:selectedStartDate bind:selectedEndDate />
			<Timepicker bind:selectedTime />

			<div class="flex justify-center">
				<Button
					value="Login Google"
					onclick={addNewEvent}
					clazz="bg-emerald-500 border-emerald-500 border rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-emerald-700 hover:border-emerald-700 active:bg-emerald-700 active:border-emerald-700 mx-4"
				/>
				<Button
					value="Add Event"
					onclick={addNewEvent}
					clazz="bg-sky-500 border-sky-500 border rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-[#1B44C8] hover:border-[#1B44C8] active:bg-[#1B44C8] active:border-[#1B44C8] mx-4"
				/>
			</div>
		</div>
	</div>
</div>