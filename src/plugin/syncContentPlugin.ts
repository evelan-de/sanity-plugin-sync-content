import { definePlugin } from 'sanity';

import {
  DEFAULT_RESOURCE_BUNDLE_DE,
  DEFAULT_RESOURCE_BUNDLE_EN,
} from '../utils/i18n/resourceBundles';

export const syncContentPlugin = definePlugin<void>(() => {
  return {
    name: 'sanity-plugin-sync-content',
    i18n: {
      bundles: [DEFAULT_RESOURCE_BUNDLE_EN, DEFAULT_RESOURCE_BUNDLE_DE],
    },
  };
});
