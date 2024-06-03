import React, { FC, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './styles.module.scss';

export const LoginLayout: FC<{
  children: ReactNode;
}> = observer(({ children }) => {
  return (
    <div className={styles.LoginLayout}>
      <div className={styles.LoginLayoutContent}>{children}</div>
    </div>
  );
});
