import type { SystemAdapterConfig } from '../SystemAdapter';

const DND5EAdapter: SystemAdapterConfig = {
  systemId: 'dnd5e',
  fieldConfig: {
    spell: {
      indexFields: [
        'system.description.value',
        'system.components',
        'system.level',
        'system.school'
      ],
      component: null
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
