import { removeUndefinedLocaleResources } from 'sanity';

export const DEFAULT_DE_SCHEMA_TRANSLATIONS = removeUndefinedLocaleResources({
  // Toast
  'toast.success.copy.title': 'Erfolgreich kopiert',
  'toast.success.paste.title': 'Erfolgreich eingefügt',
  'toast.success.duplicate.title':
    'Erfolgreich auf {{pageCount}} Seiten dupliziert',
  'toast.warning.duplicate.title':
    'Auf {{pageCount}} Seiten mit einigen Warnungen dupliziert',
  'toast.error.title': 'Etwas ist schiefgelaufen',

  // Dialog
  'dialog.header.title': 'Auf mehrere Seiten duplizieren',
  'dialog.checkbox.form.title': 'Nach Aktualisierungsdatum sortiert',
  'dialog.deselect.title': 'Alle abwählen',
  'dialog.pasting.title': 'Wird auf ausgewählte Seiten dupliziert...',
  'dialog.paste.title': 'Den Block auf ausgewählte Seiten duplizieren',
  'dialog.loading.title': 'Inhalte werden geladen…',

  // Buttons
  'button.duplicate.title': 'Auf mehrere Seiten duplizieren',
  'button.copy.title': 'Kopieren',
  'button.paste.title': 'Einfügen',
  'button.pasting.title': 'Wird eingefügt...',
});
