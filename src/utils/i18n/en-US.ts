import { removeUndefinedLocaleResources } from 'sanity';

export const DEFAULT_EN_SCHEMA_TRANSLATIONS = removeUndefinedLocaleResources({
  // Toast
  'toast.success.copy.title': 'Copied successfully',
  'toast.success.paste.title': 'Pasted successfully',
  'toast.success.duplicate.title':
    'Duplicated to {{pageCount}} pages successfully',
  'toast.warning.duplicate.title':
    'Duplicated to {{pageCount}} pages with some warnings',
  'toast.error.title': 'Something went wrong',

  // Dialog
  'dialog.header.title': 'Duplicate to multiple pages',
  'dialog.checkbox.form.title': 'Ordered by update date',
  'dialog.deselect.title': 'Deselect all',
  'dialog.pasting.title': 'Duplicating to selected pages...',
  'dialog.paste.title': 'Duplicate the block to selected pages',
  'dialog.loading.title': 'Loading some content…',

  // Buttons
  'button.duplicate.title': 'Duplicate to multiple pages',
  'button.copy.title': 'Copy',
  'button.paste.title': 'Paste',
  'button.pasting.title': 'Pasting...',
});
