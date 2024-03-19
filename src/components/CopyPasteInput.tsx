/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ClipboardIcon, ComposeIcon, CopyIcon } from '@sanity/icons';
import {
  Button,
  Flex,
  Stack,
  studioTheme,
  ThemeProvider,
  useToast,
} from '@sanity/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { StringInputProps, useClient, useFormValue } from 'sanity';

import {
  cn,
  deepSearchReplace,
  getObjectFromLs,
  writeObjectToLs,
} from '../utils';
import ClipboardDialog from './clipboard/ClipboardDialog';
import MultiplePagesDialog from './MultiplePagesDialog';
import { SpinnerFixed } from './SpinnerFixed';

const CopyPasteInput: React.FC<StringInputProps> = ({ id }) => {
  const client = useClient({ apiVersion: '2021-10-21' });
  const toast = useToast();

  const [openMultiplePagesDialog, setOpenMultiplePagesDialog] = useState(false);
  const [openClipboard, setOpenClipboard] = useState(false);
  const [isLoadingPaste, setLoadingPaste] = useState(false);
  const [allowedToPaste, setAllowedToPaste] = useState(false);

  const match = RegExp(/_key=="(\w+)"/).exec(id) ?? [];
  const extractedString = match[1];
  const blocksName = id.split('[')[0];

  const blocks = useFormValue([blocksName]) as { _key: string }[];
  const documentId = useFormValue(['_id']) as string;
  const documentType = useFormValue(['_type']) as string;

  const parent = blocks.find((block) => block._key === extractedString) as {
    _type: string;
    _key: string;
  };
  const parentIndex = blocks.findIndex(
    (block) => block._key === extractedString
  );

  useEffect(() => {
    // Only allow to "Paste" if there's an block object from localstorage that's has the same "_type" as this current block
    const searchBlock = getObjectFromLs(parent._type);
    if (searchBlock) {
      setAllowedToPaste(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, documentType]);

  const onPaste = useCallback(async () => {
    setLoadingPaste(true);
    const objCopy = deepSearchReplace(getObjectFromLs(parent._type));
    const nestedPath = `${blocksName}[${parentIndex}]`;
    const published = documentId.replace(/^drafts\./, '');
    const draftsVersionExist = await client.fetch(
      `!(count(*[_id == 'drafts.${published}'])==0)`
    );
    const updateDocument = async () => {
      await client
        .patch(`drafts.${published}`)
        .set({ [nestedPath]: objCopy })
        .commit()
        .then(() => {
          setLoadingPaste(false);
          toast.push({
            status: 'success',
            title: 'Pasted successfully',
          });
        })
        .catch((err) => {
          setLoadingPaste(false);
          console.error(err);
          toast.push({
            status: 'error',
            title: `Something went wrong: ${
              err.details?.items
                ? err?.details?.items
                    .map((item: any) => item?.error?.description)
                    .join('; ')
                : err?.details?.description
            }`,
          });
        });
    };

    if (draftsVersionExist) {
      await updateDocument();
    } else {
      await client.fetch(`*[_id == '${published}'][0]`).then(async (result) => {
        result._id = `drafts.${published}`;
        result._updatedAt = `${new Date().toISOString().slice(0, -5)}Z`;
        await client.createIfNotExists(result).then(async () => {
          await updateDocument();
        });
      });
    }
  }, []);

  const onCopy = useCallback((isToast = true) => {
    writeObjectToLs({ ...parent });
    if (isToast) {
      toast.push({
        status: 'success',
        title: 'Copied successfully',
      });
    }
    setAllowedToPaste(true);
  }, []);

  const multipleDuplicate = useCallback(() => {
    onCopy(false);
    setOpenMultiplePagesDialog(true);
  }, []);

  const onClipboard = useCallback(() => {
    setOpenClipboard(true);
  }, []);

  return (
    <ThemeProvider theme={studioTheme}>
      <Stack space={1}>
        {openMultiplePagesDialog && (
          <MultiplePagesDialog
            id={id}
            isLoadingPaste={isLoadingPaste}
            setLoadingPaste={setLoadingPaste}
            setOpen={setOpenMultiplePagesDialog}
          />
        )}
        {openClipboard && (
          <ClipboardDialog open={openClipboard} setOpen={setOpenClipboard} />
        )}
        <Flex gap={2} align="center" wrap="wrap">
          <Button
            mode="ghost"
            type="button"
            onClick={multipleDuplicate}
            text={'Duplicate to multiple pages'}
            icon={CopyIcon}
          />
          <Button
            mode="ghost"
            type="button"
            onClick={() => onCopy()}
            text={'Copy'}
            icon={CopyIcon}
          />
          <Button
            mode="ghost"
            type="button"
            onClick={onPaste}
            text={isLoadingPaste ? 'Pasting...' : 'Paste'}
            icon={isLoadingPaste ? SpinnerFixed : ClipboardIcon}
            disabled={!allowedToPaste || isLoadingPaste}
            className={cn(
              allowedToPaste && !isLoadingPaste
                ? 'cursor-pointer'
                : 'cursor-not-allowed'
            )}
          />
          <Button
            mode="ghost"
            type="button"
            onClick={onClipboard}
            text={'Clipboard'}
            icon={ComposeIcon}
          />
        </Flex>
      </Stack>
    </ThemeProvider>
  );
};

CopyPasteInput.displayName = 'CopyPasteInput';

export default CopyPasteInput;
