import { SvelteApplication } from '#runtime/svelte/application';

import CompendiumSheetComponent from '../../view/CompendiumSheet.svelte';
import DND5ESpellFilterStore from '../../stores/dnd5e/DND5ESpellFilterStore';

export default class DND5ESpellSheet extends SvelteApplication {

  constructor(compendiumCollection, options = {}) {
    const { collection } = compendiumCollection;

    super(foundry.utils.mergeObject(options, {
      id: 'collection.metadata.package',
      title: `${collection.metadata.label} ${collection.locked ? '[LOCKED]' : ''}`,
      width: 560,
      height: 'auto',
      resizable: true,
      svelte: {
        class: CompendiumSheetComponent,
        props: {
          compendiumType: 'spell',
          customImporter: options.importer ?? null,
          document: null,
          filterStore: DND5ESpellFilterStore
        }
      }
    }));

    this.compendiumCollection = compendiumCollection;
    this.options.svelte.props.document = collection;

    this.options.svelte.props.sheet = this;
  }

  /**
 * Default Application options
 *
 * @returns {object} options - Application options.
 * @see https://foundryvtt.com/api/interfaces/client.ApplicationOptions.html
 */
  static get defaultOptions() {
    // @ts-ignore
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['fc-compendium-sheet'],
      minimizable: true,
      svelte: {
        target: document.body
      }
    });
  }
}
