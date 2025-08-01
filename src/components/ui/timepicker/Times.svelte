<script lang="ts">
	import TimeCell from "./TimeCell.svelte";

	type Props = {
		time: App.TypeTimes
		onclick: any;
	}
	let { time, onclick }: Props = $props();


</script>

<div
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === "Enter"}
	onclick={onclick}
	class="time-option flex cursor-pointer justify-between gap-1">
	<TimeCell value={time.hour} active={time.active} />
	<TimeCell value={time.minute} active={time.active} />
</div>
