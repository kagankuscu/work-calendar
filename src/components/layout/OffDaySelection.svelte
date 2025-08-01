<script lang="ts">
	import { dateStorage } from "$lib/DateStorage.svelte";
	import { showMessage } from "$lib/utils";

    interface DayType {
        name: string;
        value: number;
    };

	let dayElements: HTMLElement[] = [];

	const daysOfWeek: DayType[] = [
		{ name: "Monday", value: 1 },
		{ name: "Tuesday", value: 2 },
		{ name: "Wednesday", value: 3 },
		{ name: "Thursday", value: 4 },
		{ name: "Friday", value: 5 },
		{ name: "Saturday", value: 6 },
		{ name: "Sunday", value: 0 },
	];

	const selected = (index: number, value: number) => {

		dayElements[index].classList.toggle('selected');
		if (dayElements[index].classList.contains('selected')) {
			if (dateStorage.selectedOfDays.size >= 2) {
				showMessage('Cannot');
				dayElements[index].classList.toggle('selected');
				return;
			}
			dateStorage.selectedOfDays.add(value);
		} else {
			dateStorage.selectedOfDays.delete(value);
		}
	}
</script>

<!-- Off Day Selection -->
<div>
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label class="mb-3 block font-semibold text-gray-700">Select Your Off Days:</label>
	<div id="daySelection" class="day-selection-grid">
        {#each daysOfWeek as day, i (day.value)}
            <div
				bind:this={dayElements[i]}
				tabindex="0"
				role="button"
				onkeyup={()=>{}}
				onclick={() => selected(i, day.value)}
				class={["day-checkbox", dateStorage.selectedOfDays.has(i) ? 'selected' : '']}
				data-day-value={day.value}>{day.name}</div>
        {/each}
	</div>
</div>
