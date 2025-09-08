import React, { FC } from "react";

import { BarCodeScannerIconSvg } from "#svgIcons/scan";
import { Badge, Button, ButtonProps } from "antd";
import { Link } from "react-router-dom";

import { useStyles } from "./styles";

const getLinkSizeClass = (size?: string) => {
  if (size === "large") {
    return "ant-btn-lg";
  } else if (size === "small") {
    return "ant-btn-sm";
  }

  return "";
};

type TCodeScanProps = {
  count?: number;
  showZero?: boolean;
} & ButtonUIPropsType;

export const CodeScan: FC<TCodeScanProps> = ({ count = 0, showZero, ...restProps }) => {
  return (
    <Badge count={count} showZero={showZero} offset={[-7, 7]}>
      <ButtonUI icon={<BarCodeScannerIconSvg />} {...restProps} />
    </Badge>
  );
};

export interface ButtonUIPropsType extends Omit<ButtonProps, "type"> {
  type?:
    | "primary"
    | "primary-light"
    | "secondary"
    | "auth"
    | "aPay"
    | "aPay-bordered"
    | "bordered"
    | "light-blue"
    | "light"
    | "orange"
    | "green"
    | "green-filled"
    | "danger";
  fullWidth?: boolean;
  withIcon?: boolean;
  link?: string;
  noBorder?: boolean;
}

type TButtonUI = FC<ButtonUIPropsType> & {
  CodeScan: typeof CodeScan;
};

const ButtonUI: TButtonUI = (props) => {
  const { className = "", withIcon, fullWidth, link, noBorder, type, ...restProps } = props;

  const classes = useStyles();

  let classesCompose = `${classes.btn} custom-btn`;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  if (type) {
    classesCompose = `${classesCompose} ${
      // @ts-ignore
      type === "primary" ? "ant-btn-primary" : classes[type]
    }`;
  }

  if (withIcon) {
    classesCompose = `${classesCompose} ${classes.btnWithIcon}`;
  }

  if (fullWidth) {
    classesCompose = `${classesCompose} ${classes.fullWidth}`;
  }

  if (noBorder) {
    classesCompose = `${classesCompose} ${classes.noBorder}`;
  }

  if (link && !restProps.disabled) {
    classesCompose = `ant-btn ${classesCompose} ${getLinkSizeClass(props.size)}`;

    return <Link {...restProps} to={link} className={classesCompose} />;
  }

  return <Button {...restProps} className={classesCompose} />;
};

ButtonUI.CodeScan = CodeScan;

export { ButtonUI };
