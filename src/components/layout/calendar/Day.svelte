<script lang="ts">
	let { day, year, month, onclick, startDate, endDate } = $props();

	let value = $derived(new Date(year, month, day).toLocaleDateString("en-US"));

	const update = (v: number) => {
		onclick(v);
	}
</script>

<div
	role="button"
	tabindex="0"
	onkeydown={(e) => (e.key === "Enter")}
	onclick={() => update(day)}
	class={["btn",
	value === startDate ? "btn-start-date" : "",
	new Date(value) > new Date(startDate)
		&& new Date(value) < new Date(endDate) ? "btn-between-date" : "",
	value === endDate ? "btn-end-date" : ""]}
>
	{day}
</div>