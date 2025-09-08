import React, { FC } from "react";

import { Collapse, CollapseProps } from "antd";

import { useStyles } from "./styles";

const { Panel } = Collapse;

type TCollapseUiProps = FC<CollapseProps> & {
  Panel: typeof Panel;
};

const CollapseUI: TCollapseUiProps = ({ ghost, expandIconPosition = "end", className, ...restProps }) => {
  const classes = useStyles();

  let classesCompose = classes.collapse;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return <Collapse ghost={ghost} expandIconPosition={expandIconPosition} className={classesCompose} {...restProps} />;
};

CollapseUI.Panel = Panel;

export { CollapseUI };
