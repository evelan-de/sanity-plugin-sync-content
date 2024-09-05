/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ClipboardIcon, CopyIcon } from '@sanity/icons';
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Spinner,
  Stack,
  studioTheme,
  Text,
  ThemeProvider,
  useToast,
} from '@sanity/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { StringInputProps, useClient, useFormValue } from 'sanity';

import usePluginTranslation from '../hooks/usePluginTranslation';
import type { CheckedPage, Page } from '../types';
import {
  cn,
  deepSearchReplace,
  documentsQuery,
  getObjectFromLs,
  writeObjectToLs,
} from '../utils';
import SelectedPage from './SelectedPage';
import { SpinnerFixed } from './SpinnerFixed';

const CopyPasteInput: React.FC<StringInputProps> = ({ id }) => {
  const { t } = usePluginTranslation();
  const client = useClient({ apiVersion: '2021-10-21' });
  const toast = useToast();

  const [open, setOpen] = useState(false);
  const [isDeselect, setDeselect] = useState(false);
  const [pagesForMultipleCopy, setPagesForMultipleCopy] = useState<Page[]>([]);
  const [checkedPages, setCheckedPages] = useState<CheckedPage>({});
  const [isLoadingPaste, setLoadingPaste] = useState(false);
  const [allowedToPaste, setAllowedToPaste] = useState(false);

  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  const match = RegExp(/_key=="([\w-]+)"/).exec(id) ?? [];

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
    (block) => block._key === extractedString,
  );
  const duplicateDisable =
    Object.values(checkedPages).filter((value) => value).length < 1 ||
    isLoadingPaste;

  useEffect(() => {
    async function retrievePages() {
      const pages = await client.fetch<Page[]>(documentsQuery, {
        documentType,
      });

      return pages;
    }

    retrievePages()
      .then((pages) => setPagesForMultipleCopy(pages))
      .catch((error) => console.error(error));

    // Only allow to "Paste" if there's an block object from localstorage that's has the same "_type" as this current block
    const searchBlock = getObjectFromLs(parent._type);
    if (searchBlock) {
      setAllowedToPaste(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, documentType]);

  const onPaste = async () => {
    setLoadingPaste(true);
    const objCopy = deepSearchReplace(getObjectFromLs(parent._type));
    const nestedPath = `${blocksName}[${parentIndex}]`;
    const published = documentId.replace(/^drafts\./, '');
    const draftsVersionExist = await client.fetch(
      `!(count(*[_id == 'drafts.${published}'])==0)`,
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
            title: t('toast.success.paste.title'),
          });
        })
        .catch((err) => {
          setLoadingPaste(false);
          console.error(err);
          toast.push({
            status: 'error',
            title: `${t('toast.error.title')}: ${
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
  };

  const onCopy = (isToast = true) => {
    writeObjectToLs({ ...parent });
    if (isToast) {
      toast.push({
        status: 'success',
        title: t('toast.success.copy.title'),
      });
    }
    setAllowedToPaste(true);
  };

  const onSubmit = () => {
    setLoadingPaste(true);

    const objCopy = getObjectFromLs(parent._type);
    const pagesForPatch = Object.entries(checkedPages).filter(
      (page) => page[1],
    );

    let i = 0;
    const patchPages = new Promise<void>((resolve) => {
      pagesForPatch.forEach(async (page) => {
        const _id = page[0];
        const published = _id.replace(/^drafts\./, '');
        const draftsVersionExist = await client.fetch(
          `!(count(*[_id == 'drafts.${published}']) == 0)`,
        );
        const updateDocument = async () => {
          const copiedBlock = deepSearchReplace(objCopy);
          await client
            .patch(`drafts.${published}`)
            .setIfMissing({ [blocksName]: [] })
            .insert('after', `${blocksName}[-1]`, [copiedBlock])
            .commit({
              autoGenerateArrayKeys: true,
            })
            .then(() => {
              i++;
              if (i === pagesForPatch.length) {
                resolve();
              }
            })
            .catch((err) => {
              console.error(err);
              toast.push({
                status: 'error',
                title: `${t('toast.error.title')}: ${
                  err?.details?.items
                    ?.map((item: any) => item?.error?.description)
                    ?.join('; ') ||
                  err?.description ||
                  JSON.stringify(err)
                }`,
              });
              if (i === pagesForPatch.length) {
                resolve();
              }
            });
        };
        if (draftsVersionExist) {
          await updateDocument();
        } else {
          await client
            .fetch(`*[_id == '${published}'][0]`)
            .then(async (result) => {
              result._id = `drafts.${published}`;
              result._updatedAt = `${new Date().toISOString().slice(0, -5)}Z`;
              await client.createIfNotExists(result).then(async () => {
                await updateDocument();
              });
            });
        }
      });
    });
    patchPages
      .then(() => {
        onClose();
        if (i > 0) {
          setTimeout(() => {
            toast.push({
              status: 'success',
              title: t('toast.success.duplicate.title', { pageCount: i }),
            });
          }, 1000);
        } else {
          toast.push({
            status: 'warning',
            title: t('toast.warning.duplicate.title', { pageCount: i }),
          });
        }
        setLoadingPaste(false);
        setCheckedPages({});
      })
      .catch((e) => {
        console.error(e);
        setLoadingPaste(false);
      });
  };

  const multipleDuplicate = useCallback(() => {
    onCopy(false);
    onOpen();
  }, []);

  const deselectAll = () => {
    setCheckedPages({});
    setDeselect(true);
    setTimeout(() => {
      setDeselect(false);
    }, 100);
  };

  return (
    <ThemeProvider theme={studioTheme}>
      <Stack space={1}>
        {open && (
          <Dialog
            header={t('dialog.header.title')}
            id='dialog'
            onClose={onClose}
            zOffset={1000}
            width={600}
          >
            {pagesForMultipleCopy.length > 0 ? (
              <form onSubmit={onSubmit}>
                <Box className='relative overflow-visible h-[31.25rem]'>
                  <Box padding={4} className='max-h-full overflow-y-scroll'>
                    <Text size={1} muted>
                      {t('dialog.checkbox.form.title')}
                    </Text>
                    {pagesForMultipleCopy.map((page) => (
                      <SelectedPage
                        page={page}
                        setCheckedPages={setCheckedPages}
                        checkedPages={checkedPages}
                        key={page._id}
                        isDeselect={isDeselect}
                      />
                    ))}
                  </Box>
                  <Flex
                    className='!sticky !bottom-0 bg-white !py-2 !px-3 border-t'
                    justify='space-between'
                    wrap='wrap'
                  >
                    <Button
                      text={t('dialog.deselect.title')}
                      mode='ghost'
                      onClick={() => deselectAll()}
                      disabled={duplicateDisable}
                      className={cn(
                        duplicateDisable
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer',
                      )}
                    />
                    <Button
                      text={
                        isLoadingPaste
                          ? t('dialog.pasting.title')
                          : t('dialog.paste.title')
                      }
                      tone='positive'
                      disabled={duplicateDisable}
                      icon={CopyIcon}
                      type='submit'
                      className={cn(
                        duplicateDisable
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer',
                      )}
                    />
                  </Flex>
                </Box>
              </form>
            ) : (
              <Card padding={4}>
                <Flex
                  align='center'
                  direction='row'
                  gap={3}
                  height='fill'
                  justify='center'
                >
                  <Spinner muted />
                  <Text muted size={1}>
                    {t('dialog.loading.title')}
                  </Text>
                </Flex>
              </Card>
            )}
          </Dialog>
        )}
        <Flex gap={2} align='center' wrap='wrap'>
          <Button
            mode='ghost'
            type='button'
            onClick={multipleDuplicate}
            text={t('button.duplicate.title')}
            icon={CopyIcon}
          />
          <Button
            mode='ghost'
            type='button'
            onClick={() => onCopy()}
            text={t('button.copy.title')}
            icon={CopyIcon}
          />
          <Button
            mode='ghost'
            type='button'
            onClick={() => onPaste()}
            text={
              isLoadingPaste
                ? t('button.pasting.title')
                : t('button.paste.title')
            }
            icon={isLoadingPaste ? SpinnerFixed : ClipboardIcon}
            disabled={!allowedToPaste || isLoadingPaste}
            className={cn(
              allowedToPaste && !isLoadingPaste
                ? 'cursor-pointer'
                : 'cursor-not-allowed',
            )}
          />
        </Flex>
      </Stack>
    </ThemeProvider>
  );
};

CopyPasteInput.displayName = 'CopyPasteInput';

export default CopyPasteInput;
