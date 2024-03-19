/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Code, Dialog, Text } from '@sanity/ui';
import React, { Dispatch, FC, useCallback } from 'react';

import { GenericSanityObject } from '../../types';

interface ClipboardItemDetailsProps {
  item: GenericSanityObject;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

const ClipboardItemDetails: FC<ClipboardItemDetailsProps> = ({
  item,
  setOpen,
}) => {
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <Dialog
      header="Clipboard"
      id="dialog"
      onClose={onClose}
      zOffset={1000}
      width={600}
    >
      <Box padding={4}>
        <Box marginBottom={5}>
          <Text size={1} muted>
            Item Details
          </Text>
        </Box>

        <Code size={1}>{JSON.stringify(item, undefined, 4)}</Code>
      </Box>
    </Dialog>
  );
};
export default ClipboardItemDetails;
