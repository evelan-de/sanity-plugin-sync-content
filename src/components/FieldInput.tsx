import { FC } from 'react';
import { FieldProps } from 'sanity';

import usePluginTranslation from '../hooks/usePluginTranslation';

type FieldInputProps = {
  fieldProps: FieldProps;
};

/**
 * This component overrides the "title" field for the schema
 */
const FieldInput: FC<FieldInputProps> = ({ fieldProps }) => {
  const { t } = usePluginTranslation();

  const renderDefault = fieldProps.renderDefault({
    ...fieldProps,
    title: t('schema.title'),
  });

  return renderDefault;
};

export default FieldInput;
