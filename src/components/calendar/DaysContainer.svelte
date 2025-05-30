<script lang="ts">
	import ButtonContainer from "./ButtonContainer.svelte";
	import Day from "./Day.svelte";

    let { adjustedDay, daysInMonth, month, year } = $props();

    let selectedStartDate: string | null = $state(null);
	let selectedEndDate: string | null = $state(null);

    let formattedStartDate = $derived(selectedStartDate && new Date(selectedStartDate!)
        .toLocaleDateString("en-GB"));
    let formattedEndDate = $derived(selectedEndDate && new Date(selectedEndDate!)
        .toLocaleDateString("en-GB"));

    const selectDate = (value: number) => {
        const day = new Date(year, month, value);
        const dayString = day.toLocaleDateString("en-US");

        if (!selectedStartDate) {
            selectedStartDate = dayString;
            return;
        }

        if (!selectedEndDate && new Date(selectedStartDate) <= new Date(day) ) {
            selectedEndDate = dayString;
            return;
        }

        if (selectedStartDate && selectedEndDate) {
            selectedStartDate = null;
            selectedEndDate = null;
        }
    }
</script>

<div id="days-container" class="text-dark grid grid-cols-7 text-sm font-medium dark:text-white">
	{#each Array(adjustedDay) as _}
		<div></div>
	{/each}
    {#each Array(daysInMonth).fill(0).map((_, i) => i + 1) as day}
        <Day
            {year}
            {month}
            {day}
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            onclick={selectDate}
        />
    {/each}
</div>

<ButtonContainer selectedStartDate={formattedStartDate} selectedEndDate={formattedEndDate} />