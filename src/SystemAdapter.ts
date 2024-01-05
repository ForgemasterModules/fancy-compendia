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
  autoMappingConfig: Record<string, string[] | string>;
}

export default class SystemAdapter {
  ready: boolean = false;

  systemId: string;

  fieldConfig: Record<string, FieldConfig>;

  packMapping: Record<string, string>;

  autoMappingConfig: Record<string, string[] | string>;

  constructor(adapterConfig: SystemAdapterConfig) {
    if (game.system.id !== adapterConfig.systemId) {
      throw new Error('SystemAdapter must be initialized with the correct systemId');
    }

    this.systemId = adapterConfig.systemId;
    this.fieldConfig = adapterConfig.config ?? {};
    this.packMapping = adapterConfig.packMapping ?? {};
    this.autoMappingConfig = adapterConfig.autoMappingConfig ?? {};

    if (game.settings.get('fancy-compendia', 'autoApplyFancySheets')) this.getAutoMapping();
    this.getCustomMapping();
    this.buildIndexes();

    this.ready = true;
  }

  getAutoMapping(): void {
    const definedMapping = this.packMapping;
    const autoMaps: Record<string, string> = {};

    for (const pack of game.packs) {
      const id = pack.metadata.id || pack.collection;
      if (definedMapping[id]) continue;

      const documentType = pack.metadata.type;
      if (!documentType) continue;

      // Get type of all the documents in the pack
      const docTypes = new Set<string>([...pack.index].map((doc) => doc?.type));
      for (const [type, ids] of Object.entries(this.autoMappingConfig)) {
        if (typeof ids === 'string') {
          if (docTypes.size !== 1) continue;
          if (!docTypes.has(ids)) continue;
          autoMaps[id] = type;
        } else {
          if (docTypes.difference(new Set(ids)).size) continue;
          autoMaps[id] = type;
        }
      }
    }

    this.packMapping = foundry.utils.mergeObject(this.packMapping, autoMaps);

    // For future UseCases add these to the custom mappings
    if (!Object.keys(autoMaps).length) return;
    const customMappings: Record<string, string> = game.settings.get('fancy-compendia', 'customPackMappings');
    game.settings.set(
      'fancy-compendia',
      'customPackMappings',
      foundry.utils.mergeObject(customMappings, autoMaps)
    );
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

      const SvelteDialog = this.fieldConfig[type]?.sheet ?? null;
      if (!SvelteDialog) continue;

      const fields = this.fieldConfig[type]?.indexFields ?? [];
      if (!fields.length) continue;

      // eslint-disable-next-line no-console
      console.log(`Fancy Compendia | Building index for ${id}`);

      pack.getIndex({ fields });
      pack.applicationClass = SvelteDialog;
      pack.apps = [new SvelteDialog({ collection: pack }, {})]
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
