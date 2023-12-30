import { localize } from '#runtime/svelte/helper';
import { TJSDialog } from '#runtime/svelte/application';

import EncounterBuilderComponent from './view/EncounterBuilder.svelte';
import EncounterBuilderInfoDialog from './dialogs/EncounterBuilderInfoDialog';

/**
 * Provides a dialog for creating documents that by default is modal and not draggable.
 */
export default class EncounterBuilder extends TJSDialog {
  constructor() {
    const gameSettings = game.a5e.settings.store;

    super({
      title: localize('Encounter Builder'),
      content: {
        class: EncounterBuilderComponent,
        props: {
          settings: gameSettings
        }
      },
      resizable: true,
      zIndex: null
    }, {
      classes: ['a5e-sheet', 'a5e-sheet--encounter-builder'],
      width: 544,
      height: 500
    });

    this.data.content.props.sheet = this;
  }

  close() {
    game.dialogs.encounterBuilder = null;
    super.close();
  }

  _getHeaderButtons() {
    const buttons = super._getHeaderButtons();

    buttons.unshift({
      label: 'Info',
      icon: 'fa-solid fa-circle-info',
      title: 'Info',
      onclick: () => {
        game.dialogs ??= {};
        game.dialogs.a5eEncounterBuilderInfo ??= new EncounterBuilderInfoDialog();
        game.dialogs.a5eEncounterBuilderInfo.render(true);
      }
    });

    return buttons;
  }
}
