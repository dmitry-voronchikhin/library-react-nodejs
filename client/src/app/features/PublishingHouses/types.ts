export type PublishingHouseForm = {
  name: string | undefined;
  address: string | undefined;
};

export type Action = 'REMOVE';

export type DataType = {
  key: string;
  name: string;
  address: string;
  actions: Action[];
};
