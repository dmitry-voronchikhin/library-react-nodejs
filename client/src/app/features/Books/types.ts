import { Book } from '@app/graphql/types';

export type BookForm = {
  bookName: string | undefined;
  authorName: string | undefined;
  publishingHouse: string | undefined;
};

export type Action = 'REMOVE';

export type BookInfo = {
  book: Book | null;
  action: Action;
};
