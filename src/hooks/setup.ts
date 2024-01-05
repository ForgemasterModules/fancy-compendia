export default function setup() {
  game.settings.register("fancy-compendia", "autoApplyFancySheets", {
    name: "Automatically Apply Fancy Sheets to Compendia",
    hint: "When enabled, the system will automatically apply the fancy sheet to all possible compendiums. This requires all documents in the compendium to be of the same type. These are only calculated once and stored in 'fancy-compendia.customPackMappings'.",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register('fancy-compendia', 'customPackMappings', {
    name: 'Custom Pack Mappings',
    hint: 'Custom mappings for packs that are not automatically detected',
    scope: 'world',
    config: false,
    type: Object,
    default: {}
  });
}
