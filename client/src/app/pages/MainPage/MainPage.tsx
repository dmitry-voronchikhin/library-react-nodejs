import { Card, Typography } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { LINKS_LIST } from './constants';
import { MainLayout } from '@app/layouts';

import styles from './styles.module.scss';

export const MainPage: FC = () => {
  return (
    <MainLayout contentClassName={styles.Content}>
      {LINKS_LIST.map((item) => {
        return (
          <Link key={item.id} to={item.link}>
            <Card className={styles.Card}>
              <Typography.Title level={2}>{item.text}</Typography.Title>
            </Card>
          </Link>
        );
      })}
    </MainLayout>
  );
};
