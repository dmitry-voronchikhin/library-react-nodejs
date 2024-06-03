import { Option } from '@app/types';
import { getPublishingHouseSelectOptions } from '../utils/getPublishingHouseSelectOptions';
import { PublishingHouse } from '@app/graphql/types';

describe('test for getPublishingHouseSelectOptions', () => {
  test('should return options list', () => {
    const list: PublishingHouse[] = [
      {
        id: 'e2288a4f-a663-4a5f-b0b9-768681f8f242',
        name: 'Москва',
        address: 'г. Москва',
        __typename: 'PublishingHouse',
      },
      {
        id: '52382594-d61e-40a9-9685-a0e3ed59caa6',
        name: 'Форскан',
        address: 'Ижевск, Петрова, 1',
        __typename: 'PublishingHouse',
      },
    ];

    const result: Option[] = [
      {
        label: 'Москва',
        value: 'e2288a4f-a663-4a5f-b0b9-768681f8f242',
      },
      {
        label: 'Форскан',
        value: '52382594-d61e-40a9-9685-a0e3ed59caa6',
      },
    ];

    expect(getPublishingHouseSelectOptions(list)).toEqual(result);
  });

  test('should return empty list', () => {
    expect(getPublishingHouseSelectOptions(null)).toEqual([]);
    expect(getPublishingHouseSelectOptions([])).toEqual([]);
  });
});
