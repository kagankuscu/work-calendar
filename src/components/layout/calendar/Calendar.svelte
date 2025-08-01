<script lang="ts">
	import { onMount } from "svelte";
	import ArrowLeftIcon from "components/ui/icons/ArrowLeftIcon.svelte";
	import ArrowRightIcon from "components/ui/icons/ArrowRightIcon.svelte";
	import CalendarIcon from "components/ui/icons/CalendarIcon.svelte";
	import DayHeaderContainer from "./DayHeaderContainer.svelte";
	import DaysContainer from "./DaysContainer.svelte";

	let { selectedStartDate = $bindable(), selectedEndDate = $bindable() } = $props();

	let currentDate: Date = $state(new Date());
    let adjustedFirstDay: number = $state(0);
    let daysInMonth: number = $state(0);

	let month: number = $state(0);
	let year: number = $state(0);

    const prevMonth = () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    }

    const nextMonth= () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    }

    const updateCalendar = () => {
        currentDate = new Date(currentDate);
        year = currentDate.getFullYear();
        month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        daysInMonth = new Date(year, month + 1, 0).getDate();
        adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    }

    onMount(() => {
        updateCalendar();
    });
</script>

<section class="py-5">
	<div class="container">
		<div class="mx-auto max-w-[380px]">
			<div class="relative mb-3">
				<input
					id="datepicker"
					type="text"
					placeholder="Pick a date"
					class="border-stroke text-white focus:border-primary h-12 w-full appearance-none rounded-lg border bg-stone-900/80 pr-4 pl-12 outline-none"
				/>
				<button
					id="toggleDatepicker"
					class="text-white absolute inset-y-0 flex h-12 w-12 items-center justify-center"
				>
					<CalendarIcon />
			</button>
			</div>
			<div
				id="datepicker-container"
				class="border-stroke w-full flex-col rounded-lg border bg-stone-900/80 px-4 py-6 shadow-xs sm:px-6 sm:py-[30px]"
			>
				<div class="flex items-center justify-between pb-2">
					<p id="currentMonth" class="text-white text-base font-medium">
						{currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
					</p>
					<div class="flex items-center justify-end space-x-[10px]">
						<button
							id="prevMonth"
                            onclick={prevMonth}
							class="border-stroke bg-gray-700 text-white hover:border-primary hover:bg-gray-500
							flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border-[.5px] hover:text-white"
						>
							<ArrowRightIcon />
						</button>
						<button
							id="nextMonth"
                            onclick={nextMonth}
							class="border-stroke bg-gray-700 text-white hover:border-primary hover:bg-gray-500
							flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border-[.5px] hover:text-white"
						>
							<ArrowLeftIcon />
                        </button>
					</div>
				</div>
				<DayHeaderContainer />

                <DaysContainer bind:selectedStartDate
					bind:selectedEndDate
					adjustedDay={adjustedFirstDay} {daysInMonth} {year} {month} />

			</div>
		</div>
	</div>
</section>
