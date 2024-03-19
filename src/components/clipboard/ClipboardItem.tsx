/* eslint-disable react/jsx-no-bind */
import { InfoOutlineIcon } from '@sanity/icons';
import { Box, Card, Flex, Text } from '@sanity/ui';
import { FC, useCallback, useState } from 'react';

import { GenericSanityObject } from '../../types';
import ClipboardItemDetails from './ClipboardItemDetails';

interface ClipboardItemProps {
  item: GenericSanityObject;
}

const ClipboardItem: FC<ClipboardItemProps> = ({ item }) => {
  const [openDetails, setOpenDetails] = useState(false);

  const onDetails = useCallback(() => {
    setOpenDetails(true);
  }, []);

  return (
    <>
      {openDetails && (
        <ClipboardItemDetails setOpen={setOpenDetails} item={item} />
      )}
      <Card radius={2} padding={3} shadow={1}>
        <Flex direction="row">
          <Flex direction="column" gap={2} style={{ flexGrow: 1 }}>
            <Text>Type: {item._type}</Text>
            <Text size={1} muted>
              Key: {item._key}
            </Text>
          </Flex>

          {/* BUTTONS */}
          <Flex
            direction="row"
            align="center"
            gap={2}
            style={{ fontSize: '32px' }}
          >
            <Box title="Details" onClick={onDetails}>
              <InfoOutlineIcon cursor="pointer" />
            </Box>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};
export default ClipboardItem;
