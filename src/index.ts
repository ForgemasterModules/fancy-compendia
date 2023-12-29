/* eslint-disable no-console */
import './scss/main.scss';

import setup from './hooks/setup';

Hooks.once('setup', () => {
  console.log('Fancy Compendia | Setting up...');
  setup();
});
