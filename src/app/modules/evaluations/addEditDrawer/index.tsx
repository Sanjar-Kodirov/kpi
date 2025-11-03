import React, { FC, useEffect } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { requiredRules } from "#constants/index";
import { $acceptEvaluation } from "#stores/evaluations";
import { notificationSuccess } from "#ui/notifications";

export type AddEditEvaluationDrawerModalProps = {
  evaluationId: string;
};

type TProps = {
  modalControl: ModalControlType<AddEditEvaluationDrawerModalProps>;
  callBack?: () => void;
};

type TFormValues = {
  score: number;
};

export const AddEditEvaluationDrawer: FC<TProps> = (props) => {
  const { modalControl, callBack } = props;
  const { modalProps } = modalControl;

  const [form] = Form.useForm<TFormValues>();
  const { t } = useTranslation();

  const acceptEvaluationState = $acceptEvaluation.store();

  useEffect(() => {
    return () => {
      $acceptEvaluation.reset();
    };
  }, []);

  useEffect(() => {
    if (acceptEvaluationState.success) {
      callBack && callBack();

      notificationSuccess(t("notifications.success"), "Baholash qabul qilindi");
      modalControl.closeModal();
      $acceptEvaluation.reset();
    }
  }, [acceptEvaluationState.success]);

  const onSubmit = (values: TFormValues) => {
    if (!modalProps.evaluationId) {
      return;
    }

    const data = {
      score: values.score,
      evaluation_id: modalProps.evaluationId,
    };

    $acceptEvaluation.request(data);
  };

  return (
    <>
      <ModalUI.Loading show={acceptEvaluationState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Baholash ma'lumotlarini kiriting</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Error error={acceptEvaluationState.error} />
      <ModalUI.Middle>
        <FormUI form={form} onFinish={onSubmit} phantomSubmit>
          <FormUI.Item label="Baholashni ko'rsating" name="score" rules={requiredRules}>
            <InputNumber style={{ width: "100%" }} min={1} max={10} placeholder="1 dan 10 gacha baho" />
          </FormUI.Item>
        </FormUI>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={() => modalControl.closeModal()} fullWidth>
              Bekor qilish
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={() => form.submit()} fullWidth>
              Saqlash
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
