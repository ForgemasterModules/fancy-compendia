<script>
    import { createEventDispatcher, getContext } from "svelte";
    import { fade } from "svelte/transition";

    import CompendiumSubItemList from "./CompendiumSubItemList.svelte";

    export let documents = [];
    export let compendiumType;
    export let enableGrouping = false;

    const Adapter = getContext("adapter");
    const itemViewComponent = Adapter.getItemListComponent(compendiumType);
    const reducerGroupKey = Adapter.getReducerGroupKey(compendiumType);
    const reducerFilterValues =
        Adapter.getReducerGroupFilterValues(compendiumType);

    const reducer = getContext("reducer");
    let derived = [];

    function setupGrouping(enableGrouping) {
        if (!enableGrouping) {
            reducer.derived.clear();
            derived = [];
            return;
        }

        for (const filterValue of reducerFilterValues) {
            const dr = $reducer.derived.create(`${filterValue}`);
            dr.filters.add(
                (doc) =>
                    foundry.utils.getProperty(doc, reducerGroupKey) ==
                    filterValue,
            );

            dr.index.update(true);
            const categoryName = Adapter.getCategoryName(
                compendiumType,
                filterValue,
            );

            derived.push({
                name: categoryName,
                derivedReducer: dr,
            });
        }

        derived = derived;
    }

    const dispatch = createEventDispatcher();

    $: setupGrouping(enableGrouping);
</script>

<ul
    class="fc-document-list"
    transition:fade
    on:scroll={({ target }) =>
        dispatch(
            "listScrolled",
            (target.scrollTop / (target.scrollHeight - target.clientHeight)) *
                100,
        )}
>
    {#if derived.length}
        {#each derived as { name, derivedReducer }}
            {#if [...derivedReducer].length !== 0}
                <CompendiumSubItemList
                    {name}
                    ItemComponent={itemViewComponent}
                    reducer={derivedReducer}
                />
            {/if}
        {/each}
    {:else}
        {#each documents as document}
            <svelte:component this={itemViewComponent} {document} />
        {/each}
    {/if}
</ul>
