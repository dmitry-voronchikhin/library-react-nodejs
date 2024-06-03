import { EMPTY_STRING } from '@app/constants';

export const TABLE_COLUMNS = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: EMPTY_STRING,
    dataIndex: 'actions',
    key: 'actions',
  },
] as const;
