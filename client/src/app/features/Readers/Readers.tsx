import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Reader } from '@app/graphql/types';
import { EMPTY_STRING } from '@app/constants';
import { EditReaderModal } from './EditReaderModal';
import { ReaderBooks } from './ReaderBooks';
import { IssueBookModal } from './IssueBookModal';
import { AddReaderModal } from './AddReaderModal';
import { RemoveReaderModal } from './RemoveReaderModal';
import { ReadersList } from './ReadersList';
import { ReaderAction } from './types';

import styles from './styles.module.scss';

export const Readers: FC = () => {
  const [readerInfo, setReaderInfo] = useState<{
    reader: Reader | null;
    action: ReaderAction;
  } | null>(null);

  const clearReaderInfo = () => {
    setReaderInfo(null);
  };

  return (
    <>
      <div className={styles.AddReaderButtonWrapper}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setReaderInfo({ action: 'ADD', reader: null })}
        >
          Добавить читателя
        </Button>
      </div>
      <div className={styles.ReadersListWrapper}>
        <ReadersList readerInfo={readerInfo} setReaderInfo={setReaderInfo} />
        {readerInfo?.action === 'BOOKS' && (
          <ReaderBooks readerId={readerInfo?.reader?.id || EMPTY_STRING} />
        )}
      </div>
      {readerInfo?.action === 'ADD' && (
        <AddReaderModal onCancel={clearReaderInfo} />
      )}
      {readerInfo?.action === 'REMOVE' && (
        <RemoveReaderModal
          reader={readerInfo.reader || {}}
          onClose={clearReaderInfo}
        />
      )}
      {readerInfo?.action === 'EDIT' && (
        <EditReaderModal
          onClose={clearReaderInfo}
          reader={readerInfo.reader || {}}
        />
      )}
      {readerInfo?.action === 'ISSUE_BOOK' && (
        <IssueBookModal
          readerId={readerInfo.reader?.id || EMPTY_STRING}
          onCancel={clearReaderInfo}
        />
      )}
    </>
  );
};
