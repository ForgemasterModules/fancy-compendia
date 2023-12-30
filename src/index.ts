/* eslint-disable no-console */
import './scss/main.scss';

import ready from './hooks/ready';

Hooks.once('setup', () => {
  // Get settings ready

});

Hooks.once('ready', () => {
  console.log('Fancy Compendia | Setting up...');
  ready();
});
