export type ReaderForm = {
  id: string;
  name: string | undefined;
  birthDate: string | undefined;
  address: string | undefined;
  phoneNumber: string | undefined;
};

export type Action = 'ADD' | 'REMOVE' | 'EDIT' | 'BOOKS' | 'ISSUE_BOOK';
