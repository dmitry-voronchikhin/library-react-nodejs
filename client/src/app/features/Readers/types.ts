export type ReaderForm = {
  id: string;
  name: string | undefined;
  birthDate: string | undefined;
  address: string | undefined;
  phoneNumber: string | undefined;
};

export type Action = 'REMOVE' | 'EDIT';

export type DataType = {
  id: string;
  name: string;
  birthDate: string;
  address: string;
  phoneNumber: string;
  actions: Action[];
};
