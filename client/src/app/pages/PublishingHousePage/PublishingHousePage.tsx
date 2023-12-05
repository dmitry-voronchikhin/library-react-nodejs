import React, { FC } from 'react';

import { PublishingHouseTable } from './PublishingHouseTable';
import { AddPublishingHouseForm } from './AddPublishingHouseForm';

export const PublishingHousePage: FC = () => {
  return (
    <div>
      <AddPublishingHouseForm />
      <PublishingHouseTable />
    </div>
  );
};
