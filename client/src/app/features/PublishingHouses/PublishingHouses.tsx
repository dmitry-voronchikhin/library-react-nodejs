import React, { FC } from 'react';

import { PublishingHouseTable } from './PublishingHouseTable';
import { AddPublishingHouseForm } from './AddPublishingHouseForm';

export const PublishingHouses: FC = () => {
  return (
    <>
      <AddPublishingHouseForm />
      <PublishingHouseTable />
    </>
  );
};
