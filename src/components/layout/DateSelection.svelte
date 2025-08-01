<script lang="ts">
	import { dateStorage } from "$lib/DateStorage.svelte";

	let startDateStr = $derived(dateStorage.startDate.toISOString().split("T")[0]);
	let endDateStr = $state(dateStorage.endDate.toISOString().split("T")[0]);
	let startShiftTimeStr = $state(dateStorage.shiftTime);

	const updateStartDate = (e: Event) => {
		if (!(e.target instanceof HTMLInputElement)) return;
		dateStorage.setStartDate = new Date(e.target.value);
	};

	const updateEndDate = (e: Event) => {
		if (!(e.target instanceof HTMLInputElement)) return;
		dateStorage.setEndDate = new Date(e.target.value);
	};

	const updateStartTime = (e: Event) => {
		if (!(e.target instanceof HTMLInputElement)) return;
		dateStorage.shiftTime = e.target.value;
	};
</script>

<!-- Date and Time Selection -->
<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
	<div class="input-group">
		<label for="startDate">Start Date:</label>
		<input
			type="date"
			id="startDate"
			value={startDateStr}
			oninput={updateStartDate}
			class="mt-1 block w-full"
		/>
	</div>
	<div class="input-group">
		<label for="endDate">End Date:</label>
		<input
			type="date"
			id="endDate"
			value={endDateStr}
			oninput={updateEndDate}
			class="mt-1 block w-full"
		/>
	</div>
	<div class="input-group col-span-2">
		<label for="shiftStartTime">Shift Start Time:</label>
		<input
			type="time"
			id="shiftStartTime"
			value={startShiftTimeStr}
			oninput={updateStartTime}
			class="mt-1 block w-full"
		/>
	</div>
</div>