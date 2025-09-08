import React, { FC } from "react";

import { Tabs, TabsProps } from "antd";
import { useStyles } from "./styles";
import cn from "classnames";

export const TabsUI: FC<TabsProps> = (props) => {
  const { className, ...restProps } = props;
  useStyles();

  return <Tabs className={cn("ui-tabs", className)} {...restProps} />;
};
