import React, { MouseEvent, ReactNode } from "react";

import { CloseModalSvgIcon } from "#src/assets/svg";
import { ErrorResponseModel } from "#types/api";
import { ButtonUI } from "#ui/button";
import { Spinner } from "#ui/spinner";
import { Alert, Modal, ModalProps } from "antd";

import { useStyles } from "./styles";
import cn from "classnames";

type ModalUiProps = ModalProps;

const ModalUI = (props: ModalUiProps) => {
  const { className = "", width = 450, footer = false, ...restProps } = props;

  useStyles();

  let classesCompose = "custom-modal";

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  return (
    <Modal
      {...restProps}
      className={classesCompose}
      wrapClassName={"custom-modal-wrap"}
      width={width}
      footer={footer}
      destroyOnClose={true}
    />
  );
};

type HeaderProps = {
  children?: ReactNode;
  onCancelClick?: (p: MouseEvent<HTMLButtonElement>) => void;
};

const Header = (props: HeaderProps) => {
  const { onCancelClick, children } = props;
  return (
    <div className={`custom-modal__header`}>
      {children}
      {onCancelClick && (
        <div className={`custom-modal__header__cancelBtnWr`}>
          <ButtonUI icon={<CloseModalSvgIcon />} onClick={onCancelClick} />
        </div>
      )}
    </div>
  );
};

type TitleProps = {
  children?: ReactNode;
};
const Title = (props: TitleProps) => {
  return <div className="custom-modal__title">{props.children}</div>;
};

type FooterProps = {
  children?: ReactNode;
};

const Footer = (props: FooterProps) => {
  return <div className={`custom-modal__footer`}>{props.children}</div>;
};

type MiddleProps = {
  children?: ReactNode;
};

const Middle = (props: MiddleProps) => {
  const { children } = props;
  return <div className={cn("custom-modal__middle u-fancy-scrollbar")}>{children}</div>;
};

type ButtonsProps = {
  children?: ReactNode;
};

const Buttons = (props: ButtonsProps) => {
  useStyles();

  return <div className={`custom-modal__buttons`}>{props.children}</div>;
};

type ButtonColProps = {
  children?: ReactNode;
};

const ButtonCol = (props: ButtonColProps) => {
  return <div className={`custom-modal__buttons__col`}>{props.children}</div>;
};

type LoadingPropsType = {
  show: boolean;
};

const Loading: React.FC<LoadingPropsType> = ({ show }) => {
  if (show) {
    return (
      <div className="abs-loader">
        <Spinner />
      </div>
    );
  }

  return null;
};

type ErrorPropsType = {
  error?: ErrorResponseModel;
};

const Error: React.FC<ErrorPropsType> = ({ error }) => {
  if (!error) return null;

  return <Alert className="custom-modal__error" message={error.title} type="error" />;
};

ModalUI.Header = Header;
ModalUI.Title = Title;
ModalUI.Footer = Footer;
ModalUI.Middle = Middle;
ModalUI.Buttons = Buttons;
Buttons.Col = ButtonCol;

ModalUI.Loading = Loading;
ModalUI.Error = Error;
ModalUI.confirm = Modal.confirm;

export { ModalUI };
