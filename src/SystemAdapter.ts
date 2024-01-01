/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */

// TODO: Make this type more robust
export interface FilterConfig {
  [key: string]: {
    key?: string;
    type?: 'array' | 'boolean' | 'range' | 'value';
    subFilters?: FilterConfig;
  };
}

export interface FieldConfig {
  indexFields: string[];
  sheet: any;
  filterComponent: any;
  listComponent: any;
  itemReducerGroupKey: string;
  itemReducerGroupFilterValues: any[];
  itemReducerCategoryName: (value: string | number) => string;
  filterConfig: FilterConfig;
}

export interface SystemAdapterConfig {
  systemId: string;
  config: Record<string, FieldConfig>;
  packMapping: Record<string, string>;
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
    this.fieldConfig = adapterConfig.config ?? {};
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

      const type = foundry.utils.getProperty(this.packMapping, id);
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
  getCategoryName(compendiaType: string, value: string | number): string {
    return this.fieldConfig[compendiaType]?.itemReducerCategoryName(value);
  }

  getFilterComponent(compendiaType: string): any {
    return this.fieldConfig[compendiaType]?.filterComponent;
  }

  getFilterConfig(compendiaType: string): FilterConfig {
    return this.fieldConfig[compendiaType]?.filterConfig;
  }

  getItemListComponent(compendiaType: string): any {
    return this.fieldConfig[compendiaType]?.listComponent;
  }

  getReducerGroupKey(compendiaType: string): string {
    return this.fieldConfig[compendiaType]?.itemReducerGroupKey;
  }

  getReducerGroupFilterValues(compendiaType: string): any[] {
    return this.fieldConfig[compendiaType]?.itemReducerGroupFilterValues;
  }
}
