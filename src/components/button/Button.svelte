<script lang="ts">
    let { value, clazz, href = "#", onclick = null} = $props();
</script>

<a
    {href}
    {onclick}
    class={clazz}>
    {value}
</a>