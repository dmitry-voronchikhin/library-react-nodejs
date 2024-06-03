import { EMPTY_STRING } from '@app/constants';
import { PublishingHouse } from '@app/graphql/types';

export const getPublishingHouseSelectOptions = (
  pbList: (PublishingHouse | null)[] | null,
) => {
  return (
    pbList
      ?.filter((item) => !!(item?.id && item.name))
      .map((item) => {
        return {
          label: item?.name || EMPTY_STRING,
          value: item?.id || EMPTY_STRING,
        };
      }) || []
  );
};
