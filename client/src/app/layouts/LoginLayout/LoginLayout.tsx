import React, { FC, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './styles.module.scss';

const LoginLayoutComponent: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className={styles.LoginLayout}>
      <div className={styles.LoginLayoutContent}>{children}</div>
    </div>
  );
};

export const LoginLayout = observer(LoginLayoutComponent);
