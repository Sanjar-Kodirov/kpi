import React, { FC, ReactNode } from "react";

import { useStyles as useModalStyles } from "#ui/modal/styles";
import { Drawer, DrawerProps } from "antd";

import { useStyles } from "./styles";
import cn from "classnames";

export interface DrawerPropTypes {
  children: ReactNode;
  afterClose?: () => void;
  withoutInner?: boolean;
}

export const DrawerModalUI: FC<DrawerPropTypes & DrawerProps> = (props) => {
  const { children, className, withoutInner, afterClose, ...restProps } = props;
  const classes = useStyles();
  useModalStyles();

  const afterOpenChange = (open: boolean) => {
    if (!open && afterClose) {
      afterClose();
    }
  };

  return (
    <Drawer
      className={`${classes.drawer} ${className}`}
      width={580}
      destroyOnClose={true}
      afterOpenChange={afterClose ? afterOpenChange : restProps.afterOpenChange}
      {...restProps}
    >
      {withoutInner ? <>{children}</> : <div className={cn(classes.drawerInner, "ant-drawer-inner")}>{children}</div>}
    </Drawer>
  );
};
