import { defineField, defineType } from 'sanity';
import CopyPasteInput from 'src/components/CopyPasteInput';

const copyPasteButtons = defineField({
  name: 'copypasteButtons',
  title: 'Copy/paste the item',
  type: 'string',
  components: {
    input: CopyPasteInput,
  },
});

export const copyPaste = defineType({
  name: 'copypaste',
  title: 'Copy/paste the item',
  type: 'object',
  fields: [copyPasteButtons],
});
