<script>
    import { getContext } from "svelte";
    import { fade } from "svelte/transition";

    export let compendiumType;
    const Adapter = getContext("adapter");
    console.log(Adapter);

    const filterComponent = Adapter.getFilterComponent(compendiumType);
</script>

<section class="filter-page" transition:fade>
    <svelte:component this={filterComponent} {compendiumType} />
</section>

<style lang="scss">
    .filter-page {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        grid-area: main;
        overflow-y: auto;
    }
</style>
