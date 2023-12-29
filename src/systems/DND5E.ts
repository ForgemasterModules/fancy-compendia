import SystemAdapter, { type ConfigItem } from './SystemAdapter';

export default class DND5EAdapter extends SystemAdapter {
  constructor() {
    const config: Record<string, ConfigItem> = {
      spell: {
        indexFields: [
          'system.description.value',
          'system.components',
          'system.level',
          'system.school'
        ],
        component: null
      }
    };

    super('dnd5e', config);
  }
}
