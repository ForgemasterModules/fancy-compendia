/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */

import type { SvelteComponent } from 'svelte';

export interface FieldConfig {
  indexFields: string[];
  sheet: any;
  listComponent: SvelteComponent;
  filterComponent: SvelteComponent;
  itemReducerGroups: Record<string, string>;
  itemReducerTypeFilters: Record<string, any[]>;
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

  config: Record<string, FieldConfig>;

  packMapping: Record<string, string>;

  constructor(adapterConfig: SystemAdapterConfig) {
    if (game.system.id !== adapterConfig.systemId) {
      throw new Error('SystemAdapter must be initialized with the correct systemId');
    }

    this.systemId = adapterConfig.systemId;
    this.config = adapterConfig.fieldConfig ?? {};
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

      const component = this.config[type]?.sheet ?? null;
      if (!component) continue;

      const fields = this.config[type]?.indexFields ?? [];
      if (!fields.length) continue;

      console.log(`Fancy Compendia | Building index for ${id}`);

      pack.getIndex({ fields });
      pack.applicationClass = component;
    }
  }
}
