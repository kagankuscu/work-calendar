<script lang="ts">
	let { selectedStartDate = null, selectedEndDate = null } = $props();
</script>

<div class="flex items-center justify-center space-x-3 pt-4 sm:space-x-4">
	<button
		id="startDate"
		class="border-stroke text-white hover:border-sky-500 focus:border-sky-800 h-[37px] rounded border bg-transparent px-5 text-sm font-medium"
	>
		{ selectedStartDate ?? "Select Start Date" }
	</button>
	<button
		id="endDate"
		class="border-stroke text-white hover:border-sky-500 focus:border-sky-800 h-[37px] rounded border bg-transparent px-5 text-sm font-medium"
	>
		{ selectedEndDate ?? "Select End Date" }
	</button>
</div>
