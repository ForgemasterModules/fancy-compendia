import type { SystemAdapterConfig } from '../SystemAdapter';

import DND5ESpellCompendiumSheet from '../dialogs/dnd5e/DND5ESpellCompendiumSheet';
import DND5ESpellFilters from '../view/dnd5e/DND5ESpellFilters.svelte';
import Dnd5ESpellItem from '../view/dnd5e/DND5ESpellItem.svelte';

const DND5EAdapter: SystemAdapterConfig = {
  systemId: 'dnd5e',
  fieldConfig: {
    item: {
      indexFields: [
        'system.description.value'
      ],
      sheet: null,
      filterComponent: null,
      listComponent: null,
      itemReducerGroupKey: 'system.rarity',
      itemReducerGroupFilterValues: ['', 'common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact']
    },
    monster: {
      indexFields: [
        'system.details.cr'
      ],
      sheet: null,
      filterComponent: null,
      listComponent: null,
      itemReducerGroupKey: 'system.details.cr',
      itemReducerGroupFilterValues: [
        '0',
        '1/8',
        '1/4',
        '1/2',
        ...Array.from(Array(30).keys(), (n) => (n + 1).toString())
      ]
    },
    spell: {
      indexFields: [
        'system.description.value',
        'system.components',
        'system.level',
        'system.school'
      ],
      sheet: DND5ESpellCompendiumSheet,
      filterComponent: DND5ESpellFilters,
      listComponent: Dnd5ESpellItem,
      itemReducerGroupKey: 'system.level',
      itemReducerGroupFilterValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  packMapping: {
    'dnd5e.monsters': 'monster',
    'dnd5e.spells': 'spell',
    'dnd5e.items': 'item',
    'dnd5e.tradegoods': 'item'
  },
  filterConfig: {}
};

export default DND5EAdapter;
