import SystemAdapter from '../SystemAdapter';
import DND5EAdapter from '../systemConfigs/DND5EAdapter';

export default async function ready() {
  let Adapter: SystemAdapter | null = null;

  if (game.system.id === 'dnd5e') {
    Adapter = new SystemAdapter(DND5EAdapter);
  }

  if (!Adapter) {
    throw new Error('Fancy Compendia | System not supported');
  }

  // Add adapter instance
  CONFIG.FancyCompendia = {
    SystemAdapter: Adapter
  };
}
