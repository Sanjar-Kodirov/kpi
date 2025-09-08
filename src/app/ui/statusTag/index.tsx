import React, { ReactNode } from "react";
import { FC } from "react";

import { useStyles } from "./styles";
import cn from "classnames";
type PropsType = {
  className?: string;
  status?: string;
  color?: string;
  children: ReactNode | ReactNode[];
};

export const StatusTagUI: FC<PropsType> = (props) => {
  const { className = "", status, color, children } = props;
  const classes = useStyles({ status, color });

  return (
    <div className={classes.cont}>
      <div className={classes.dot} />
      <div className={`${classes.status} ${className} custom-status`}>{children}</div>
    </div>
  );
};

type StatusBigPropsType = PropsType & {
  children: ReactNode | ReactNode[];
  fullWidth?: boolean;
};

export const StatusTagBigUI: FC<StatusBigPropsType> = (props) => {
  const { className = "", status, color, fullWidth, children } = props;
  const classes = useStyles({ status, color });

  return (
    <div className={`${classes.statusBigCont} custom-status_content`}>
      <div className={cn(classes.statusBig, className, "custom-status", { [classes.fullWidth]: fullWidth })}>
        {children}
      </div>
    </div>
  );
};
