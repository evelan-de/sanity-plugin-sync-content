/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Dialog, Stack, Text } from '@sanity/ui';
import React, { Dispatch, FC, useCallback, useEffect, useState } from 'react';

import { GenericSanityObject } from '../../types';
import { getAllLocalStorage } from '../../utils';
import ClipboardItem from './ClipboardItem';

interface ClipboardDialogProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

const ClipboardDialog: FC<ClipboardDialogProps> = ({ open, setOpen }) => {
  const [copies, setCopies] = useState<GenericSanityObject[]>([]);

  const onClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      const localStorageCopies = getAllLocalStorage();

      const copyObjectPairs = Object.fromEntries(
        Object.entries(localStorageCopies).filter(([key]) =>
          key.startsWith('copyObject_')
        )
      );
      const sanitizeCopies: GenericSanityObject[] = Object.entries(
        copyObjectPairs
      ).map(([_, value]) => JSON.parse(value));

      if (sanitizeCopies.length > 0) {
        setCopies(sanitizeCopies);
      }
    }
  }, [open]);

  return (
    <Dialog
      header="Clipboard"
      id="dialog"
      onClose={onClose}
      zOffset={1000}
      width={600}
    >
      <Box padding={4} style={{ maxHeight: '500px' }}>
        <Box marginBottom={5}>
          <Text size={1} muted>
            Copies
          </Text>
        </Box>
        {copies.length > 0 ? (
          <Stack space={3} paddingBottom={4}>
            {copies.map((item) => {
              return <ClipboardItem key={item._key} item={item} />;
            })}
          </Stack>
        ) : (
          <Text align="center">No Copies</Text>
        )}
      </Box>
    </Dialog>
  );
};
export default ClipboardDialog;
