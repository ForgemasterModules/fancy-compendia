/* eslint-disable no-console */
import './scss/main.scss';

import ready from './hooks/ready';

Hooks.once('setup', () => {
  // Get settings ready
  game.settings.register('fancy-compendia', 'customPackMappings', {
    name: 'Custom Pack Mappings',
    hint: 'Custom mappings for packs that are not automatically detected',
    scope: 'world',
    config: true,
    type: Object,
    default: {}
  });
});

Hooks.once('ready', () => {
  console.log('Fancy Compendia | Setting up...');
  ready();
});
