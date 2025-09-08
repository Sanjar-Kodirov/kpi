import React, { FC, ReactNode } from "react";

import styles from "./index.module.sass";

type PropsType = {
  children: string;
  icon: ReactNode;
  collapsed: boolean;
  onClick?: () => void;
};

export const TextWithIcon: FC<PropsType> = (props) => {
  const { children, icon, collapsed, onClick } = props;

  return (
    <div className={collapsed ? `${styles.wrapper} ${styles.center}` : styles.wrapper} onClick={onClick}>
      {icon}
      {!collapsed && <span className={styles.text}>{children}</span>}
    </div>
  );
};
