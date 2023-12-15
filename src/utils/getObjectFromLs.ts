import { ls } from 'src/utils';

export const getObjectFromLs = (blockType: string): object | string | null => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const obj = JSON.parse(ls(`copyObject_${blockType}`) as string);
  if (!obj || obj === 'null' || obj === 'undefined') {
    return null;
  }
  return obj;
};
