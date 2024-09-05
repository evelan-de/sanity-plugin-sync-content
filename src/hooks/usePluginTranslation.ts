import { useTranslation, UseTranslationResponse } from 'sanity';

import { I18N_NAMESPACE } from '../utils/const';

export default function usePluginTranslation(): UseTranslationResponse<
  typeof I18N_NAMESPACE,
  undefined
> {
  return useTranslation(I18N_NAMESPACE);
}
