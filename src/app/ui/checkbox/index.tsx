import React from "react";

import { Checkbox } from "antd";
import { CheckboxProps } from "antd/es/checkbox";

import { useStyles } from "./styles";

type PropsType = CheckboxProps &
  React.RefAttributes<HTMLInputElement> & {
    readOnly?: boolean;
  };

type CheckboxUIType = React.FC<PropsType> & {
  Group: typeof Checkbox.Group;
};

export const CheckboxUI: CheckboxUIType = (props) => {
  const { className, disabled, readOnly, ...restProps } = props;
  useStyles();

  let classesCompose = "ui-checkbox";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return <Checkbox className={classesCompose} disabled={disabled || !!readOnly} {...restProps} />;
};

CheckboxUI.Group = Checkbox.Group;
