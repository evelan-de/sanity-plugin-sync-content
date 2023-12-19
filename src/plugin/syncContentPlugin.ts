import { definePlugin } from 'sanity';
import { copyPaste } from 'src/schema/objects';

export const syncContentPlugin = definePlugin<void>(() => {
  return {
    name: 'sanity-plugin-sync-content',
    schema: {
      types: [copyPaste],
    },
  };
});
