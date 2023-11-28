import React, { FC, ReactNode, useContext, useMemo } from 'react';
import { Button, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { observer } from 'mobx-react-lite';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { compact } from 'lodash';

import { Context } from '@app/App';
import { getRoutes } from '@app/components/AppRoutes/routes';

import styles from './styles.module.scss';

const MainLayoutComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
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
    navigate('/login');
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
          inlineCollapsed={false}
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
