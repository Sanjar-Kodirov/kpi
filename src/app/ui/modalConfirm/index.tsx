import React, { ReactElement, ReactNode } from "react";

import { useModalControl } from "#hooks/useModalControl";
import { ButtonUI } from "#ui/button";
import { ModalUI } from "#ui/modal";
import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

type ModalConfirmUiProps = {
  title: ReactNode;
  onOk: () => void;
  okText?: ReactNode;
  children: ReactNode;
};

export const ModalConfirmUI = (props: ModalConfirmUiProps) => {
  const { title, onOk, okText } = props;
  const classes = useStyles();

  const modalControl = useModalControl();
  const { t } = useTranslation();
  const handleClick = () => {
    modalControl.openModal();
  };

  const closeModal = () => {
    modalControl.closeModal();
  };

  const onOkClick = () => {
    onOk();
    closeModal();
  };

  return (
    <>
      {React.cloneElement(props.children as ReactElement, { onClick: handleClick })}

      <ModalUI
        className={classes.confirmModal}
        open={modalControl.modalProps.visible}
        onCancel={modalControl.closeModal}
        closable={false}
      >
        <ModalUI.Title>{title}</ModalUI.Title>

        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={closeModal}>
              {t("buttons.cancellation")}
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={onOkClick}>
              {okText || t("notifications.yes")}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI>
    </>
  );
};
