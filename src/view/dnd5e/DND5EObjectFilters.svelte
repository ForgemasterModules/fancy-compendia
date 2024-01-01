<script>
    import { getContext } from "svelte";

    import CompendiumFilterCategory from "../CompendiumFilterCategory.svelte";

    import constructReducerFilters from "../../handlers/constructReducerFilters";

    export let compendiumType = "object";

    const Adapter = getContext("adapter");
    const filterStore = getContext("filterStore");
    const reducer = getContext("reducer");
    const { itemRarity } = CONFIG.DND5E;
    const objectTypes = {
        backpack: "TYPES.Item.backpack",
        consumable: "TYPES.Item.consumable",
        equipment: "TYPES.Item.equipment",
        loot: "TYPES.Item.loot",
        tool: "TYPES.Item.tool",
        weapon: "TYPES.Item.weapon",
    };

    function getFormSections() {
        const formSectionMap = [
            {
                filterKey: "objectType",
                heading: "Object Type",
                options: objectTypes,
            },
            {
                filterKey: "rarity",
                heading: "Item Rarity",
                options: itemRarity,
            },
            {
                filterKey: "miscellaneous",
                heading: "Miscellaneous",
                options: {
                    attunement: "Attunement Required",
                },
            },
        ];

        return formSectionMap;
    }

    let filterSelections = {};

    filterStore.subscribe((store) => {
        filterSelections = store;
    });

    $: filterCount = constructReducerFilters(
        reducer,
        filterSelections,
        Adapter.getFilterConfig(compendiumType),
    );
</script>

{#each getFormSections() as { display, heading, filterKey, options }}
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
