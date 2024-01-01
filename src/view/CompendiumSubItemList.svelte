<script>
    export let ItemComponent;
    export let name;
    export let reducer;
</script>

{#if reducer.length}
    <h3 class="fc-category-heading">
        {name}
    </h3>

    {#each [...$reducer] as document}
        <svelte:component this={ItemComponent} {document} />
    {/each}
{/if}

<style>
    .fc-category-heading {
        padding: 0.125rem 0.5rem;
        font-family: var(--fc-font-serif);
        font-size: var(--fc-text-size-sm);
        color: #f6f2eb;
        background: #425f65;
        border: 1px solid #3e4240;
        box-shadow: 0 0 10px #2e4246 inset;
        border-radius: 3px;
    }
</style>
