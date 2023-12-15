import {definePlugin} from 'sanity'

export const copyPastePlugin = definePlugin<void>(() => {
  return {
    name: 'sanity-copy-paste',
  }
})
