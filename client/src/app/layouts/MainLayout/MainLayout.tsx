import React, { FC, ReactNode, useContext, useMemo } from 'react';
import { Button, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { observer } from 'mobx-react-lite';
import { ItemType } from 'antd/es/menu/interface';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { compact } from 'lodash';

import { Context } from '@app/App';
import { getRoutes } from '@app/components/AppRoutes/routes';

import styles from './styles.module.scss';

export const MainLayout: FC<{
  children: ReactNode;
  contentClassName?: string;
}> = observer(({ children, contentClassName }) => {
  const { store } = useContext(Context);
  const routes = getRoutes(store.checkAuth());

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
    [routes],
  );

  const defaultSelectedKeys = [menuItems[0]?.key?.toString() || ''];
  const selectedKey = routes.filter(
    (item) => item.path === location.pathname,
  )[0].name;

  const logout = async () => {
    await store.logout();
  };

  return (
    <Layout>
      <Header className={styles.Header}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={defaultSelectedKeys}
          items={menuItems}
          selectedKeys={[selectedKey]}
          style={{ display: 'flex', minWidth: 500 }}
        />
        <Button onClick={logout} type="primary">
          Выйти
        </Button>
      </Header>
      <Content className={cn('site-layout', styles.Content)}>
        <div
          className={cn(
            'site-layout-background',
            styles.Content__Body,
            contentClassName,
          )}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
});
