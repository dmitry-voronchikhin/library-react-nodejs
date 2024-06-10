import React, { FC } from 'react';
import { Radio } from 'antd';

import { BooksTypeEnum } from '@app/graphql/types.d';

import styles from './styles.module.scss';

type Props = {
  setType: React.Dispatch<React.SetStateAction<BooksTypeEnum>>;
};

export const BooksFilter: FC<Props> = ({ setType }) => {
  return (
    <div className={styles.FiltersContainer}>
      <Radio.Group
        buttonStyle="solid"
        defaultValue={BooksTypeEnum.All}
        onChange={(e) => setType(e.target.value)}
      >
        <Radio.Button value={BooksTypeEnum.All}>Все</Radio.Button>
        <Radio.Button value={BooksTypeEnum.Issued}>Выданные</Radio.Button>
        <Radio.Button value={BooksTypeEnum.NotIssued}>Остаток</Radio.Button>
      </Radio.Group>
    </div>
  );
};
