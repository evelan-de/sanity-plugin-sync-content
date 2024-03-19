/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Page {
  _id: string;
  _type: string;
  _updatedAt: string;
  title: string;
}

export interface CheckedPage {
  [id: string]: boolean;
}

export interface GenericSanityObject {
  _key: string;
  _type: string;
  [x: string]: any;
}
