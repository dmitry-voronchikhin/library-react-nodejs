import React, { FC, ReactElement, ReactNode } from 'react';

import styles from './styles.module.scss';

export const LoginLayout: FC<{
  children: ReactNode | ReactElement | null | undefined;
}> = ({ children }) => {
  return (
    <div className={styles.LoginLayout}>
      <div className={styles.LoginLayoutContent}>{children}</div>
    </div>
  );
};
