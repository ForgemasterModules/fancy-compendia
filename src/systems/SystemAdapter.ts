export interface ConfigItem {
  indexFields: string[];
  component: any;
}

export default class SystemAdapter {
  systemId: string;

  config: Record<string, ConfigItem> = {};

  packIds: string[] = [];

  constructor(id: string, config: Record<string, any> = {}) {
    this.systemId = id;
    this.config = config;
  }

  buildIndexes(): void {

  }
}
