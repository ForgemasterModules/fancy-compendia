/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
export interface FieldConfig {
  indexFields: string[];
  component: any;
}

export interface SystemAdapterConfig {
  systemId: string;
  fieldConfig: Record<string, FieldConfig>;
  packMapping: Record<string, string>;
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

      const component = this.config[type]?.component ?? null;
      if (!component) continue;

      const fields = this.config[type]?.indexFields ?? [];
      if (!fields.length) continue;

      pack.getIndex({ fields });
      pack.applicationClass = component;
    }
  }
}
