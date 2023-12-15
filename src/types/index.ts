export interface Page {
  _id: string;
  _type: string;
  _updatedAt: string;
  title: string;
}
export interface CheckedPage {
  [id: string]: boolean;
}
