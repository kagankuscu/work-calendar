<script lang="ts">
    let { value, active = false } = $props();
</script>

<div class=
{[
    "text-wihte dark:text-dark-6 flex h-[60px] w-full max-w-[60px] items-center justify-center rounded-md text-md font-medium",
    active && "bg-sky-400/40"
]}>
	{ value }
</div>
