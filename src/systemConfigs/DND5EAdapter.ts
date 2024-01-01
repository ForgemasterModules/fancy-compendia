import type { SystemAdapterConfig } from '../SystemAdapter';

import DND5ESpellCompendiumSheet from '../dialogs/dnd5e/DND5ESpellCompendiumSheet';

const DND5EAdapter: SystemAdapterConfig = {
  systemId: 'dnd5e',
  fieldConfig: {
    // item: {
    //   indexFields: [
    //     'system.description.value'
    //   ],
    //   sheet: null
    // },
    spell: {
      indexFields: [
        'system.description.value',
        'system.components',
        'system.level',
        'system.school'
      ],
      sheet: DND5ESpellCompendiumSheet
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
