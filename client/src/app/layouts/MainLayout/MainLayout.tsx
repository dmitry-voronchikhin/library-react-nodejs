import React, { FC, ReactNode, useContext, useMemo } from 'react';
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

  const menuItems: ItemType[] = useMemo(
    () =>
      compact<ItemType>(
        routes.map((route) => {
          if (route.inNav) {
            return {
              key: route.name,
              label: <Link to={route.path}>{route.name}</Link>,
            };
          }
        }),
      ),
    [],
  );

  const defaultSelectedKeys = [menuItems[0]?.key?.toString() || ''];

  const logout = () => {
    store.logout();
  };

  return (
    <Layout>
      <Header className={styles.Header}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={defaultSelectedKeys}
          items={menuItems}
        />
        <Button onClick={logout} type="primary">
          Выйти
        </Button>
      </Header>
      <Content className={cn('site-layout', styles.Content)}>
        <div className={cn('site-layout-background', styles.Content__Body)}>
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export const MainLayout = observer(MainLayoutComponent);
