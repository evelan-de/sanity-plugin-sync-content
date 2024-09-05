import { defineLocaleResourceBundle } from 'sanity';

import { I18N_NAMESPACE } from '../const';
import { DEFAULT_DE_SCHEMA_TRANSLATIONS } from './de-DE';
import { DEFAULT_EN_SCHEMA_TRANSLATIONS } from './en-US';

export type ResourcesKeys = keyof typeof DEFAULT_EN_SCHEMA_TRANSLATIONS;

export const DEFAULT_RESOURCE_BUNDLE_EN = defineLocaleResourceBundle({
  locale: 'en-US',
  namespace: I18N_NAMESPACE,
  resources: DEFAULT_EN_SCHEMA_TRANSLATIONS,
});

export const DEFAULT_RESOURCE_BUNDLE_DE = defineLocaleResourceBundle({
  locale: 'de-DE',
  namespace: I18N_NAMESPACE,
  resources: DEFAULT_DE_SCHEMA_TRANSLATIONS,
});
