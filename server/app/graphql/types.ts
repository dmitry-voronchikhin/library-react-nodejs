export type GetAllBooksInput = {
  page: number;
  count: number;
  type: string;
};

export enum BooksTypeEnum {
  ALL = "ALL",
  ISSUED = "ISSUED",
  NOT_ISSUED = "NOT_ISSUED",
}

export type GetBooksByReaderInput = {
  readerId: string;
};

export type AddBookInput = {
  name: string;
  publishingHouseId: string;
  author: string;
};

export type IssueBookInput = {
  readerId: string;
  bookId: string;
};

export type ReturnBookInput = {
  bookId: string;
};

export type RemoveBookInput = {
  id: string;
};

export type AddPublishingHouseInput = {
  name: string;
  address: string;
};

export type RemovePublishingHouseInput = {
  id: string;
};

export type GetAllReadersInput = {
  page: number;
  count: number;
};

export type ReaderInput = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  author: string;
  address: string;
};

export type UpdateReaderInput = {
  id: string;
} & ReaderInput;

export type RemoveReaderInput = {
  id: string;
};
