<script lang="ts">
	import ArrowDownIcon from "icons/ArrowDownIcon.svelte";
	import ClockIcon from "icons/ClockIcon.svelte";
	import Times from "./Times.svelte";
	import { onMount } from "svelte";

    let { selectedTime = $bindable() } = $props();

    let toggle = $state(true);
    let times: App.TypeTimes[] = $state([]);

    const toggleTimePicker = () => {
        toggle = !toggle
    }

    const selectedTimes = (itemId: number) => {
        times = times.map((item, i) => ({
            ...item,
            active: i === itemId
        }))

        selectedTime = `${times[itemId].hour} : ${times[itemId].minute}`;
        toggleTimePicker();
    }

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
            })
        }
    }

    onMount(() => {
        generateTimeOption(15);
    });

</script>
<section class="dark:bg-dark pt-20 pb-10 lg:pt-[120px] lg:pb-[120px]">
	<div class="container mx-auto">
		<div class="-mx-4 flex flex-wrap">
			<div class="w-full px-4 md:w-1/2 lg:w-1/3">
				<div class="mb-12">
					<label for="" class="text-dark mb-[10px] block text-base font-medium dark:text-white">
						Timepicker
					</label>

					<div class="relative">
						<!-- Timepicker Input with Icons -->
						<div class="relative flex items-center">
							<!-- Clock Icon -->
							<span class="text-dark-5 absolute left-0 pl-5">
                                <ClockIcon />
                            </span>
							<input
								id="timepicker"
								type="text"
                                bind:value={selectedTime}
								class="text-dark-2 dark:text-dark-6 border-stroke dark:border-dark-3 focus:border-primary dark:focus:border-primary w-full rounded-lg border bg-transparent py-2.5 pr-8 pl-[50px] outline-hidden transition"
								placeholder="Select a time"
								readonly
							/>
							<span
                            role="button"
                            tabindex="0"
                            onkeydown={(e) => e.key === "Enter"}
                            onclick={toggleTimePicker}
                            class="text-dark-5 absolute right-0 cursor-pointer pr-4" id="toggleTimepicker">
								<!-- Arrow Down Icon -->
								<ArrowDownIcon />
							</span>
						</div>

						<!-- Timepicker Container -->
						<div
							id="timepicker-container"
							class={
                                [
                                    toggle ? "hidden" : "",
                                    "dark:bg-dark-2 border-stroke dark:border-dark-3 shadow-datepicker no-scrollbar absolute right-0 mt-2 h-[262px] w-[162px] overflow-hidden overflow-y-auto rounded-md border bg-white p-2"
                                ]
                            }
						>

                            {#each times as time, i (i) }
                                <Times {time}
                                    onclick={() => selectedTimes(i)}
                                />
                            {/each}
						</div>
					</div>
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