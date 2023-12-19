import { defineField } from 'sanity';

import CopyPasteInput from '../../components/CopyPasteInput';

export const copyPaste = defineField({
  name: 'copypasteButtons',
  title: 'Copy/paste the item',
  type: 'string',
  components: {
    input: CopyPasteInput,
  },
});
