import { definePlugin } from 'sanity';

import { deutschBundle, englishBundle } from '../i18n';

export const syncContentPlugin = definePlugin<void>(() => {
  return {
    name: 'sanity-plugin-sync-content',
    i18n: {
      bundles: [englishBundle, deutschBundle],
    },
  };
});
