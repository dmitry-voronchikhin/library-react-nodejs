import React, { FC, useState } from 'react';

import { PublishingHouseTable } from './PublishingHouseTable';
import { AddPublishingHouseForm } from './AddPublishingHouseForm';
import { RemovePublishingHouseModal } from './RemovePublishingHouseModal';
import { PublishingHouse } from '@app/graphql/types';
import { Action } from './types';

export const PublishingHouses: FC = () => {
  const [phInfo, setPhInfo] = useState<{
    publishingHouse: PublishingHouse;
    action: Action;
  } | null>(null);

  return (
    <>
      <AddPublishingHouseForm />
      <PublishingHouseTable setPhInfo={setPhInfo} />
      {phInfo?.action === 'REMOVE' && (
        <RemovePublishingHouseModal
          publishingHouse={phInfo.publishingHouse || {}}
          onCancel={() => setPhInfo(null)}
        />
      )}
    </>
  );
};
