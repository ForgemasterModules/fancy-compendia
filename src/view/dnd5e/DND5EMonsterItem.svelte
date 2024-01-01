<script>
    import { getContext } from "svelte";
    import { localize } from "#runtime/svelte/helper";

    import ImportButton from "../ImportButton.svelte";

    export let document;

    function getCRLabel(monster) {
        let cr = monster?.system?.details?.cr;

        if (cr === undefined) return "?";
        if (cr === 0.125 || cr === "0.125") return "⅛";
        if (cr === 0.25 || cr === "0.25") return "¼";
        if (cr === 0.5 || cr === "0.5") return "½";

        return cr;
    }

    function getMonsterDetailsLabel(monster) {
        const components = [];

        const cr = getCRLabel(monster);
        const creatureType = localize(
            creatureTypes[monster?.system?.details?.type?.value],
        );
        const sizeCategory = actorSizes[monster?.system?.traits?.size] ?? "";
        const xp = prepareXP(monster);

        if (cr === "?") {
            components.push(sizeCategory, creatureType);
        } else {
            components.push(
                sizeCategory,
                creatureType,
                "|",
                `CR ${cr}`,
                `(${xp} XP)`,
            );
        }

        return components
            .filter(
                (component) =>
                    !foundry.utils.isEmpty(component) && component !== "",
            )
            .join(" ");
    }

    function onDragStart(event) {
        const data = {
            type: collection.documentName,
            uuid: collection.getUuid(document._id),
        };
        return event.dataTransfer.setData("text/plain", JSON.stringify(data));
    }

    function prepareXP(monster) {
        const cr = parseFloat(monster?.system?.details?.cr || 0);
        let baseXp = 10;
        if (cr === 0.125) baseXp = 25;
        else if (cr === 0.25) baseXp = 50;
        else if (cr === 0.5) baseXp = 100;
        else
            baseXp =
                CONFIG.DND5E.CR_EXP_LEVELS[parseInt(cr, 10) > 30 ? 30 : cr];

        return baseXp;
    }

    function getImage() {
        const uuid = `Compendium.${collection.metadata.id}.${document._id}`;
        const art = game.dnd5e.moduleArt.map.get(uuid);

        return art?.actor || art?.token;
    }

    const collection = getContext("collection");
    const { actorSizes, creatureTypes } = CONFIG.DND5E;

    $: monsterDetails = getMonsterDetailsLabel(document);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<li
    class="fc-document"
    draggable="true"
    on:click={async () => {
        const doc =
            collection.get(document._id) ??
            (await collection.getDocument(document._id));
        doc.sheet?.render(true);
    }}
    on:dragstart={onDragStart}
>
    <img
        class="fc-document__image"
        src={document?.img || getImage(document)}
        alt={document?.name}
    />

    <h3 class="fc-document__name">
        {document?.name}

        {#if document?.system?.details?.isSwarm}
            <i
                class="fc-document__icon fa-solid fa-people-group"
                data-tooltip="Swarm"
                data-tooltip-direction="UP"
            />
        {/if}
    </h3>

    <span class="fc-document__details">
        {monsterDetails}
    </span>

    <ImportButton {document} />
</li>
