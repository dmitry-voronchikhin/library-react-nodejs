export type BookForm = {
  bookName: string | undefined;
  authorName: string | undefined;
  publishingHouse: string | undefined;
};

export type Action = 'REMOVE';

export type DataType = {
  key: string;
  name: string;
  author: string;
  publishingHouse: string;
  actions: Action[];
};
