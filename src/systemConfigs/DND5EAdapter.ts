/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import type { SystemAdapterConfig } from '../SystemAdapter';

import DND5ESpellSheet from '../dialogs/dnd5e/DND5ESpellSheet';
import DND5ESpellFilters from '../view/dnd5e/DND5ESpellFilters.svelte';
import Dnd5ESpellItem from '../view/dnd5e/DND5ESpellItem.svelte';

const DND5EAdapter: SystemAdapterConfig = {
  systemId: 'dnd5e',
  config: {
    item: {
      indexFields: [
        'system.description.value'
      ],
      sheet: null,
      filterComponent: null,
      listComponent: null,
      itemReducerGroupKey: 'system.rarity',
      itemReducerGroupFilterValues: ['', 'common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact'],
      itemReducerCategoryName: (rarity: string | number) => {
        if (typeof rarity === 'number') rarity = rarity.toString();
        if (rarity == '') return 'Common Items';
        return `${rarity.capitalize()} Items`;
      },
      filterConfig: {
        objectType: {
          key: 'type',
          type: 'value'
        },
        rarity: {
          key: 'system.rarity',
          type: 'value'
        },
        miscellaneous: {
          subFilters: {
            attunement: {
              key: 'system.attunement',
              type: 'boolean'
            }
          }
        }
      }
    },

    monster: {
      indexFields: [
        'system.details.cr',
        'system.traits.size',
        'system.details.type'
      ],
      sheet: null,
      filterComponent: null,
      listComponent: null,
      itemReducerGroupKey: 'system.details.cr',
      itemReducerGroupFilterValues: [
        0,
        0.125,
        0.25,
        0.5,
        ...Array.from(Array(30).keys(), (n) => (n + 1))
      ],
      itemReducerCategoryName: (cr: string | number) => {
        if (cr == 0.125) return 'CR ⅛';
        if (cr == 0.25) return 'CR ¼';
        if (cr == 0.5) return 'CR ½';

        return `CR ${cr}`;
      },
      filterConfig: {
        cr: {
          key: 'system.details.cr',
          type: 'value'
        },
        creatureSize: {
          key: 'system.traits.size',
          type: 'value'
        },
        creatureType: {
          key: 'system.details.type',
          type: 'value'
        }
      }
    },

    spell: {
      indexFields: [
        'system.description.value',
        'system.components',
        'system.level',
        'system.school'
      ],
      sheet: DND5ESpellSheet,
      filterComponent: DND5ESpellFilters,
      listComponent: Dnd5ESpellItem,
      itemReducerGroupKey: 'system.level',
      itemReducerGroupFilterValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      itemReducerCategoryName: (level: string | number) => {
        if (level == 0) return 'Cantrips';
        if (typeof level === 'string') level = parseInt(level, 10);
        // @ts-ignore
        level = Number.isNaN(level) ? (1).ordinalString() : level.ordinalString();

        return `${level} Level Spells`;
      },
      filterConfig: {
        spellLevels: {
          key: 'system.level',
          type: 'value'
        },
        primarySpellSchools: {
          key: 'system.school',
          type: 'value'
        },
        miscellaneous: {
          subFilters: {
            concentration: {
              key: 'system.components.concentration',
              type: 'boolean'
            },
            ritual: {
              key: 'system.components.ritual',
              type: 'boolean'
            }
          }
        }
      }
    }
  },
  packMapping: {
    'dnd5e.monsters': 'monster',
    'dnd5e.spells': 'spell',
    'dnd5e.items': 'item',
    'dnd5e.tradegoods': 'item'
  }
};

export default DND5EAdapter;
