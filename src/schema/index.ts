import { defineField } from 'sanity';
import CopyPasteInput from 'src/components/CopyPasteInput';

export const copyPaste = defineField({
  name: 'copypaste',
  title: 'Copy/paste the item',
  type: 'string',
  components: {
    input: CopyPasteInput,
  },
});
