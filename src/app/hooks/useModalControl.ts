import { useState } from "react";

type TInitialModalProps<T> = { visible?: boolean } & T;

export type ModalControlType<T = unknown> = {
  modalProps: { visible: boolean } & T;
  openModal: (props?: T) => void;
  closeModal: () => void;
  updateProps: (props: T) => void;
  resetModal: () => void;
};

export const useModalControl = <T extends object>(
  initialModalProps: TInitialModalProps<T> = {} as TInitialModalProps<T>,
): ModalControlType<T> => {
  const [modalProps, setModalProps] = useState<{ visible: boolean } & T>({
    visible: false,
    ...initialModalProps,
  });

  const openModal = (props: T = {} as TInitialModalProps<T>) => {
    setModalProps({ visible: true, ...props });
  };

  const closeModal = () => {
    setModalProps({ ...modalProps, visible: false });
  };

  const updateProps = (props: T) => {
    setModalProps({ ...modalProps, ...props });
  };

  const resetModal = () => {
    setModalProps({ visible: false, ...initialModalProps });
  };

  return {
    modalProps,
    openModal,
    closeModal,
    updateProps,
    resetModal,
  };
};
