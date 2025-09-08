import React, { ReactNode } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import { useStyles } from "./styles";

type PropsType = {
  spinning?: boolean;
  size?: "small" | "large";
  children?: ReactNode;
  center?: boolean;
};

const getFontSize = (size?: string) => {
  if (size === "small") {
    return 32;
  } else if (size === "large") {
    return 56;
  } else {
    return 46;
  }
};

export const Spinner: React.FC<PropsType> = (props) => {
  const { size, center, ...restProps } = props;

  const classes = useStyles();

  const antIcon = <LoadingOutlined style={{ fontSize: getFontSize(size) }} spin />;

  const spin = <Spin indicator={antIcon} {...restProps} />;

  if (center) {
    return <div className={classes.wrapper}>{spin}</div>;
  } else {
    return spin;
  }
};
