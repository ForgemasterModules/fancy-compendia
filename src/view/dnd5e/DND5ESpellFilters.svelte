<script>
    import { getContext } from "svelte";

    import CompendiumFilterCategory from "../CompendiumFilterCategory.svelte";

    import constructReducerFilters from "../../handlers/constructReducerFilters";

    export let compendiumType = "spell";

    const Adapter = getContext("adapter");
    const filterStore = getContext("filterStore");
    const reducer = getContext("reducer");
    const { classSpellLists, spellLevels, spellSchools } = CONFIG.DND5E;

    let filterSelections = {};

    filterStore.subscribe((store) => {
        filterSelections = store;
    });

    const formSectionMap = [
        {
            filterKey: "spellLevels",
            heading: "Spell Levels",
            options: spellLevels,
        },
        {
            filterKey: "spellSchools",
            heading: "Spell Schools",
            options: spellSchools,
        },
        {
            filterKey: "miscellaneous",
            heading: "Miscellaneous",
            options: {
                concentration: "Concentration",
                ritual: "Ritual",
            },
        },
    ];

    $: filterCount = constructReducerFilters(
        reducer,
        filterSelections,
        Adapter.getFilterConfig(compendiumType),
    );
</script>

{#each formSectionMap as { display, heading, filterKey, options }}
    {#if display ?? true}
        <CompendiumFilterCategory
            {filterKey}
            {filterSelections}
            {heading}
            {options}
            on:updateExclusiveMode={({ detail }) => {
                filterStore.update((currentFilterSelections) => ({
                    ...currentFilterSelections,
                    [filterKey]: {
                        inclusive: filterSelections[filterKey].inclusive,
                        inclusiveMode:
                            filterSelections[filterKey].inclusiveMode,
                        exclusive: filterSelections[filterKey].exclusive,
                        exclusiveMode: detail,
                    },
                }));
            }}
            on:updateInclusiveMode={({ detail }) => {
                filterStore.update((currentFilterSelections) => ({
                    ...currentFilterSelections,
                    [filterKey]: {
                        inclusive: filterSelections[filterKey].inclusive,
                        inclusiveMode: detail,
                        exclusive: filterSelections[filterKey].exclusive,
                        exclusiveMode:
                            filterSelections[filterKey].exclusiveMode,
                    },
                }));
            }}
            on:updateSelection={({ detail }) => {
                filterStore.update((currentFilterSelections) => ({
                    ...currentFilterSelections,
                    [filterKey]: {
                        inclusive: detail[0],
                        inclusiveMode:
                            filterSelections[filterKey].inclusiveMode,
                        exclusive: detail[1],
                        exclusiveMode:
                            filterSelections[filterKey].exclusiveMode,
                    },
                }));
            }}
        />
    {/if}
{/each}
