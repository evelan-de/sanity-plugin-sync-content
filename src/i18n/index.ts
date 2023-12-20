import { defineLocaleResourceBundle } from 'sanity';

export const englishBundle = defineLocaleResourceBundle({
  locale: 'en-US',
  namespace: 'sanity-plugin-inline-icon-manager',
  resources: () => import('./resources/en-US'),
});

export const deutschBundle = defineLocaleResourceBundle({
  locale: 'de-DE',
  namespace: 'sanity-plugin-inline-icon-manager',
  resources: () => import('./resources/de-DE'),
});
