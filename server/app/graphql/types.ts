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

export type AddPublishingHouseInput = {
  name: string;
  address: string;
};

export type RemovePublishingHouseInput = {
  id: string;
};
