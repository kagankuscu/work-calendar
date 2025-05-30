<script lang="ts">
	import { onMount } from "svelte";
	import ArrowLeftIcon from "icons/ArrowLeftIcon.svelte";
	import ArrowRightIcon from "icons/ArrowRightIcon.svelte";
	import CalendarIcon from "icons/CalendarIcon.svelte";
	import DayHeaderContainer from "./DayHeaderContainer.svelte";
	import DaysContainer from "./DaysContainer.svelte";
	import ButtonContainer from "./ButtonContainer.svelte";

	// const datepicker = document.getElementById('datepicker');
	// const datepickerContainer = document.getElementById('datepicker-container');
	// const daysContainer = document.getElementById('days-container');
	// const currentMonthElement = document.getElementById('currentMonth');
	// const prevMonthButton = document.getElementById('prevMonth');
	// const nextMonthButton = document.getElementById('nextMonth');
	// const toggleDatepicker = document.getElementById('toggleDatepicker');

	let currentDate: Date = $state(new Date());
	// let selectedStartDate: string | null = $state(null);
	// let selectedEndDate: string | null = $state(null);
    let adjustedFirstDay: number = $state(0);
    let daysInMonth: number = $state(0);
	let toggle: boolean = $state(false);

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

	const toggleDatePicker = () => {
		toggle = !toggle;
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

<section class="dark:bg-dark bg-white py-20">
	<div class="container">
		<div class="mx-auto max-w-[380px]">
			<div class="relative mb-3">
				<input
					id="datepicker"
					type="text"
					placeholder="Pick a date"
					onclick={toggleDatePicker}
					class="border-stroke text-dark focus:border-primary dark:border-dark-3 dark:bg-dark-2 h-12 w-full appearance-none rounded-lg border bg-white pr-4 pl-12 outline-none dark:text-white"
				/>
				<button
					id="toggleDatepicker"
					onclick={toggleDatePicker}
					class="text-dark-5 absolute inset-y-0 flex h-12 w-12 items-center justify-center"
				>
					<CalendarIcon />
			</button>
			</div>
			<div
				id="datepicker-container"
				class={[toggle ? "hidden" : "", "border-stroke dark:border-dark-3 dark:bg-dark-2 w-full flex-col rounded-lg border bg-white px-4 py-6 shadow-xs sm:px-6 sm:py-[30px]"]}
			>
				<div class="flex items-center justify-between pb-2">
					<p id="currentMonth" class="text-dark text-base font-medium dark:text-white">
						{currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
					</p>
					<div class="flex items-center justify-end space-x-[10px]">
						<button
							id="prevMonth"
                            onclick={prevMonth}
							class="border-stroke bg-gray-2 text-dark hover:border-primary hover:bg-primary dark:border-dark-3 dark:bg-dark flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border-[.5px] hover:text-white dark:text-white"
						>
							<ArrowRightIcon />
						</button>
						<button
							id="nextMonth"
                            onclick={nextMonth}
							class="border-stroke bg-gray-2 text-dark hover:border-primary hover:bg-primary dark:border-dark-3 dark:bg-dark flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded border-[.5px] hover:text-white dark:text-white"
						>
							<ArrowLeftIcon />
                        </button>
					</div>
				</div>
				<DayHeaderContainer />

                <DaysContainer adjustedDay={adjustedFirstDay} {daysInMonth} {year} {month} />

			</div>
		</div>
	</div>
</section>
