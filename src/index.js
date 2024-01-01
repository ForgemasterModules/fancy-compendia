/* eslint-disable no-console */
import './scss/main.scss';

import ready from './hooks/ready';
import setup from './hooks/setup';

Hooks.once('setup', () => {
  setup();
});

Hooks.once('ready', () => {
  console.log('Fancy Compendia | Preparing System Adapter...');
  ready();
});
