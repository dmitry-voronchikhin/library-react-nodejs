import { EMPTY_STRING } from '@app/constants';

export const TABLE_COLUMNS = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Автор',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Издательство',
    dataIndex: 'publishingHouse',
    key: 'publishingHouse',
  },
  {
    title: EMPTY_STRING,
    dataIndex: 'actions',
    key: 'actions',
  },
] as const;

export const PAGE_SIZE = 10;
