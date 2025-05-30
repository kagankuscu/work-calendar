<script lang="ts">
	import ArrowDownIcon from "icons/ArrowDownIcon.svelte";
	import ClockIcon from "icons/ClockIcon.svelte";
	import Times from "./Times.svelte";
	import { onMount } from "svelte";

	let { selectedTime = $bindable() } = $props();

	let toggle = $state(true);
	let times: App.TypeTimes[] = $state([]);

	const toggleTimePicker = () => {
		toggle = !toggle;
	};

	const selectedTimes = (itemId: number) => {
		times = times.map((item, i) => ({
			...item,
			active: i === itemId
		}));

		selectedTime = `${times[itemId].hour} : ${times[itemId].minute}`;
		toggleTimePicker();
	};

	const generateTimeOption = (interval: number) => {
		const startTime = new Date();
		startTime.setHours(0, 0, 0, 0);
		for (let i = 0; i < 24 * 60; i += interval) {
			const time = new Date(startTime.getTime() + i * 60_000);
			let hour = time.getHours();
			const minute = time.getMinutes().toString().padStart(2, "0");
			times.push({
				hour: hour.toString().padStart(2, "0"),
				minute: minute,
				active: false
			});
		}
	};

	onMount(() => {
		generateTimeOption(15);
	});
</script>

<section class="flex flex-wrap justify-center">
	<div class="max-w-[380px] w-full">
		<div class="mb-12">
			<div class="relative">
				<!-- Timepicker Input with Icons -->
				<div class="relative flex items-center">
					<!-- Clock Icon -->
					<span class="absolute left-0 pl-5 text-white">
						<ClockIcon />
					</span>
					<input
						id="timepicker"
						type="text"
						bind:value={selectedTime}
						class="border-stroke w-full rounded-lg border bg-stone-900/80 py-2.5 pr-8
                                pl-[50px] text-white outline-hidden transition focus:border-sky-500"
						placeholder="Select a time"
						readonly
					/>
					<span
						role="button"
						tabindex="0"
						onkeydown={(e) => e.key === "Enter"}
						onclick={toggleTimePicker}
						class="absolute right-0 cursor-pointer pr-4 text-white"
						id="toggleTimepicker"
					>
						<!-- Arrow Down Icon -->
						<ArrowDownIcon />
					</span>
				</div>

				<!-- Timepicker Container -->
				<div
					id="timepicker-container"
					class={[
						toggle ? "hidden" : "",
						"border-stroke shadow-datepicker no-scrollbar absolute right-0 mt-2 h-[262px] w-[162px] overflow-hidden overflow-y-auto rounded-md border bg-stone-900 p-2"
					]}
				>
					{#each times as time, i (i)}
						<Times {time} onclick={() => selectedTimes(i)} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}

	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
