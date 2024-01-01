export default function setup() {
  game.settings.register("fancy-compendia", "autoApplyFancySheets", {
    name: "Automatically apply fancy sheets",
    hint: "Automatically apply fancy sheets to actors when they are created.",
    scope: "world",
    config: true,
    default: true,
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
