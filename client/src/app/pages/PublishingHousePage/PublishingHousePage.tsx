import React, { FC } from 'react';

import { MainLayout } from '@app/layouts';
import { PublishingHouses } from '@app/features/PublishingHouses';

export const PublishingHousePage: FC = () => {
  return (
    <MainLayout>
      <PublishingHouses />
    </MainLayout>
  );
};
