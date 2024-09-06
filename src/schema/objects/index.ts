import { defineField } from 'sanity';

import CopyPasteInput from '../../components/CopyPasteInput';
import FieldInput from '../../components/FieldInput';

export const copyPaste = defineField({
  name: 'copypasteButtons',
  title: 'Copy/paste the item', // Will get overriden in the FieldInput({})
  type: 'string',
  components: {
    input: CopyPasteInput,
    field: (props) =>
      FieldInput({
        fieldProps: props,
      }),
  },
});
