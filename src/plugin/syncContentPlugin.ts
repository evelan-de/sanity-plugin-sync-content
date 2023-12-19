import { definePlugin } from 'sanity';

export const syncContentPlugin = definePlugin<void>(() => {
  return {
    name: 'sanity-plugin-sync-content',
  };
});
