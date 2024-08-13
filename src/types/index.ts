export interface Page {
  _id: string;
  _type: string;
  _updatedAt: string;
  slug?: string;
  title: string;
  language?: string;
}

export interface CheckedPage {
  [id: string]: boolean;
}
