import React, { FC, useEffect, useState } from "react";

import { ModalControlType } from "#hooks/useModalControl";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { ModalUI } from "#ui/modal";
import { Form, Upload } from "antd";
import { useTranslation } from "react-i18next";
import { requiredRules } from "#constants/index";
import { notificationError, notificationSuccess } from "#ui/notifications";
import { $createSuperVisorEvaluation, $supervisorUsersToEvaluateCriteria } from "#stores/supervisorEvaluations";
import { InputUI } from "#ui/input";
import { SelectUI } from "#ui/select";
import { UploadFile } from "antd/lib/upload/interface";
import { InboxOutlined } from "@ant-design/icons";

export type AcceptUsersDrawer = {
  userId: string;
};

type TProps = {
  modalControl: ModalControlType<AcceptUsersDrawer>;
  callBack?: () => void;
};

type TFormValues = {
  criteria: string;
  evaluation_text: string;
};

type TSubmitFormData = {
  user_id: string;
  criteria_id: string;
  evaluation_text: string;
  files?: File[];
};

export const AcceptUsersDrawer: FC<TProps> = (props) => {
  const { modalControl, callBack } = props;
  const { modalProps } = modalControl;

  const [form] = Form.useForm<TFormValues>();
  const { t } = useTranslation();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const MAX_FILE_SIZE_MB = 10;

  const supervisorUsersToEvaluateCriteriaState = $supervisorUsersToEvaluateCriteria.store();
  const createSuperVisorEvaluationState = $createSuperVisorEvaluation.store();

  useEffect(() => {
    console.log("modalProps", modalProps);
    if (modalProps.userId) {
      $supervisorUsersToEvaluateCriteria.request(modalProps.userId);
    }
    return () => {
      resetState();
    };
  }, []);

  const resetState = () => {
    $supervisorUsersToEvaluateCriteria.reset();
    $createSuperVisorEvaluation.reset();
    setFileList([]);
  };

  useEffect(() => {
    if (createSuperVisorEvaluationState.success) {
      callBack && callBack();

      notificationSuccess(t("notifications.success"), "Критерий оценки принят");
      modalControl.closeModal();
      resetState();
    }
  }, [createSuperVisorEvaluationState.success]);

  const onSubmit = (values: TFormValues) => {
    if (!modalProps.userId) {
      return;
    }

    const data: TSubmitFormData = {
      user_id: modalProps.userId,
      criteria_id: values.criteria,
      evaluation_text: values.evaluation_text,
    };

    if (fileList.length > 0) {
      const rawFiles = fileList.map((f) => (f as any).originFileObj as File).filter(Boolean);
      if (rawFiles.length > 0) {
        data.files = rawFiles;
      }
    }

    $createSuperVisorEvaluation.request(data);
  };

  return (
    <>
      <ModalUI.Loading show={supervisorUsersToEvaluateCriteriaState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>Укажите данные оценки</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Error error={supervisorUsersToEvaluateCriteriaState.error} />
      <ModalUI.Middle>
        <FormUI form={form} onFinish={onSubmit} phantomSubmit>
          <FormUI.Item name="criteria" label="Критерий оценки">
            <SelectUI
              style={{ width: "100%" }}
              allowClear={true}
              loading={supervisorUsersToEvaluateCriteriaState.loading}
              placeholder="Выберите критерию"
            >
              {supervisorUsersToEvaluateCriteriaState.data?.criteria.map((item) => {
                return (
                  <SelectUI.Option key={item.id} value={item.id}>
                    {item.title}
                  </SelectUI.Option>
                );
              })}
            </SelectUI>
          </FormUI.Item>

          <FormUI.Item name="evaluation_text" label="Комментарий" rules={requiredRules}>
            <InputUI style={{ width: "100%" }} placeholder="Введите оценку" />
          </FormUI.Item>

          <FormUI.Item label="Файлы (опционально)">
            <Upload.Dragger
              multiple
              fileList={fileList}
              accept="image/*,.pdf,.doc,.docx,.xlsx,.xls,.txt"
              beforeUpload={(file) => {
                const isTooLarge = file.size / 1024 / 1024 > MAX_FILE_SIZE_MB;
                if (isTooLarge) {
                  notificationError(t("notifications.error"), `${file.name} > ${MAX_FILE_SIZE_MB} MB`);
                  return Upload.LIST_IGNORE;
                }
                return false;
              }}
              onChange={({ fileList: newList }) => setFileList(newList)}
              showUploadList={{ showRemoveIcon: true, showPreviewIcon: false }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Перетащите файлы сюда или кликните для выбора</p>
              <p className="ant-upload-hint">
                Допустимые типы: изображения, PDF, DOC/X, XLS/X, TXT. До {MAX_FILE_SIZE_MB}MB каждый.
              </p>
            </Upload.Dragger>
          </FormUI.Item>
        </FormUI>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={() => modalControl.closeModal()} fullWidth>
              Отмена
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={() => form.submit()} fullWidth>
              Сохранить
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
