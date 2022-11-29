import React, { FC, ReactNode, useContext } from 'react';
import { Button, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { observer } from 'mobx-react-lite';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { compact } from 'lodash';

import { Context } from '@app/App';
import { routes } from '@app/components/AppRoutes/routes';

import styles from './styles.module.scss';

const MainLayoutComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const { store } = useContext(Context);

  const menuItems: ItemType[] = compact<ItemType>(
    routes.map((route) => {
      if (route.inNav) {
        return {
          key: route.name,
          label: <Link to={route.path}>{route.name}</Link>,
        };
      }
    }),
  );

  return (
    <Layout>
      <Header className={styles.Header}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />
        <Button onClick={() => store.logout()} type="primary">
          Выйти
        </Button>
      </Header>
      <Content className={cn('site-layout', styles.Content)}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export const MainLayout = observer(MainLayoutComponent);
