import React, { FC } from 'react';

import { PublishingHouseTable } from './PublishingHouseTable';
import { AddPublishingHouseForm } from './AddPublishingHouseForm';
import { MainLayout } from '@app/layouts';

export const PublishingHousePage: FC = () => {
  return (
    <MainLayout>
      <AddPublishingHouseForm />
      <PublishingHouseTable />
    </MainLayout>
  );
};
