<script lang="ts">

    async function addNewEvent() {
        const res = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({
                'access_token': new URLSearchParams(window.location.search).get('token')
            })
        });

        console.log(await res.json());
    }

</script>

<h1>Google Calendar Events</h1>

<a href="/api/auth/login">
	<button class="px-2 py-4 bg-green-700 text-white">Login with Google</button>
</a>

<button class="px-2 py-4 bg-red-700 text-white" onclick={addNewEvent}>Add Event</button>
