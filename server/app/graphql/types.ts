export type GetAllBooksInput = {
  page: number;
  count: number;
};

export type AddBookInput = {
  name: string;
  publishingHouseId: string;
  author: string;
};

export type RemoveBookInput = {
  id: string;
};
