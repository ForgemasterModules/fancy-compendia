<script>
    import { getContext } from "svelte";
    import { localize } from "#runtime/svelte/helper";

    import ImportButton from "../ImportButton.svelte";

    export let document;

    function getSpellDetailsLabel(spell) {
        const { level, school } = spell.system;
        const spellLevel = spellLevels[level] ?? "";
        const spellSchoolsLabel = spellSchools[school] ?? school;

        if (spellSchoolsLabel) return `${spellLevel} (${spellSchoolsLabel})`;
        return spellLevel;
    }

    function onDragStart(event) {
        const data = {
            type: collection.documentName,
            uuid: collection.getUuid(document._id),
        };
        return event.dataTransfer.setData("text/plain", JSON.stringify(data));
    }

    const collection = getContext("collection");
    const { spellSchools, spellLevels } = CONFIG.DND5E;

    $: spellDetails = getSpellDetailsLabel(document);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<li
    class="fc-document fc-document--spell"
    draggable="true"
    on:click={async () => {
        const doc =
            collection.get(document._id) ??
            (await collection.getDocument(document._id));
        doc.sheet?.render(true);
    }}
    on:dragstart={onDragStart}
>
    <img class="fc-document__image" src={document.img} alt={document.name} />

    <span class="fc-document__name">
        {document.name}
    </span>

    <span class="fc-document__details">
        {spellDetails}
    </span>

    <ul class="component-wrapper">
        {#if document.system.components.vocal}
            <span
                class="component"
                data-tooltip="DND5E.ComponentVerbal"
                data-tooltip-direction="UP"
            >
                {localize("DND5E.ComponentVerbalAbbr")}
            </span>
        {/if}

        {#if document.system.components.somatic}
            <span
                class="component"
                data-tooltip="DND5E.ComponentSomatic"
                data-tooltip-direction="UP"
            >
                {localize("DND5E.ComponentSomaticAbbr")}
            </span>
        {/if}

        {#if document.system.components.material}
            <span
                class="component"
                data-tooltip="DND5E.ComponentMaterial"
                data-tooltip-direction="UP"
            >
                {localize("DND5E.ComponentMaterialAbbr")}
            </span>
        {/if}

        {#if document.system.components.concentration}
            <span
                class="component"
                data-tooltip="DND5E.Concentration"
                data-tooltip-direction="UP"
            >
                {localize("DND5E.ConcentrationAbbr")}
            </span>
        {/if}

        {#if document.system.components.ritual}
            <span
                class="component"
                data-tooltip="DND5E.Ritual"
                data-tooltip-direction="UP"
            >
                {localize("DND5E.RitualAbbr")}
            </span>
        {/if}
    </ul>

    <ImportButton {document} />
</li>

<style lang="scss">
    .component {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1rem;
        width: 1rem;
        border-radius: 3px;
        font-size: var(--fc-text-size-xxs);
        background: #c6c5bc;
    }

    .component-wrapper {
        display: flex;
        justify-content: flex-end;
        gap: 0.25rem;
        grid-area: components;
        margin: 0 0.25rem;
        padding: 0;
        font-family: var(--fc-font-sans-serif);
        list-style: none;
    }
</style>
