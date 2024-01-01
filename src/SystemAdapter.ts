/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */

export interface FieldConfig {
  indexFields: string[];
  sheet: any;
  filterComponent: any;
  listComponent: any;
  itemReducerGroupKey: string;
  itemReducerGroupFilterValues: any[];
}

export interface FilterConfig {
  [key: string]: {
    key: string;
    type: 'array' | 'boolean' | 'range' | 'value';
    subFilters?: Record<string, FilterConfig>;
  };
}

export interface SystemAdapterConfig {
  systemId: string;
  fieldConfig: Record<string, FieldConfig>;
  packMapping: Record<string, string>;
  filterConfig: Record<string, FilterConfig>;
}

export default class SystemAdapter {
  ready: boolean = false;

  systemId: string;

  fieldConfig: Record<string, FieldConfig>;

  packMapping: Record<string, string>;

  constructor(adapterConfig: SystemAdapterConfig) {
    if (game.system.id !== adapterConfig.systemId) {
      throw new Error('SystemAdapter must be initialized with the correct systemId');
    }

    this.systemId = adapterConfig.systemId;
    this.fieldConfig = adapterConfig.fieldConfig ?? {};
    this.packMapping = adapterConfig.packMapping ?? {};

    this.getCustomMapping();
    this.buildIndexes();

    this.ready = true;
  }

  getCustomMapping(): void {
    const customMappings: Record<string, string> = game.settings.get('fancy-compendia', 'customPackMappings');
    this.packMapping = foundry.utils.mergeObject(this.packMapping, customMappings);
  }

  buildIndexes(): void {
    for (const pack of game.packs) {
      const id = pack.metadata.id || pack.collection;

      const type = this.packMapping[id];
      if (!type) continue;

      const component = this.fieldConfig[type]?.sheet ?? null;
      if (!component) continue;

      const fields = this.fieldConfig[type]?.indexFields ?? [];
      if (!fields.length) continue;

      // eslint-disable-next-line no-console
      console.log(`Fancy Compendia | Building index for ${id}`);

      pack.getIndex({ fields });
      pack.applicationClass = component;
    }
  }

  // External API
  getFilterComponent(compendiaType: string): any {
    return this.fieldConfig[compendiaType]?.filterComponent;
  }
}
