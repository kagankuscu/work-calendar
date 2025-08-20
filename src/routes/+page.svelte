<script lang="ts">
	import GoogleButton from "components/ui/button/GoogleButton.svelte";
	import ActionButtonContainer from "components/layout/ActionButtonContainer.svelte";
	import DateSelection from "components/layout/DateSelection.svelte";
	import OffDaySelection from "components/layout/OffDaySelection.svelte";

</script>

<div class="container">
	<h1 class="mb-4 text-center text-3xl font-bold text-gray-800">Event Planner</h1>

	<GoogleButton />
	<DateSelection />
	<OffDaySelection />
	<ActionButtonContainer />

	<!-- Message Box -->
	<div id="messageBox" class="message-box">
	</div>
</div>
