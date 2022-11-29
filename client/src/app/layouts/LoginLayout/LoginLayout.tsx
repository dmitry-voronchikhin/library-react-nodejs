import { observer } from 'mobx-react-lite';
import React, { FC, ReactElement, ReactNode } from 'react';

import styles from './styles.module.scss';

const LoginLayoutComponent: FC<{
  children: ReactNode | ReactElement | null | undefined;
}> = ({ children }) => {
  return (
    <div className={styles.LoginLayout}>
      <div className={styles.LoginLayoutContent}>{children}</div>
    </div>
  );
};

export const LoginLayout = observer(LoginLayoutComponent);
