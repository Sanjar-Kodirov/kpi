import React, { FC, useEffect } from "react";

import { IUserDetailsModel } from "#businessLogic/models/user";
import { requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { InputUI } from "#ui/input";
import { ModalUI } from "#ui/modal";
import { notificationSuccess } from "#ui/notifications";
import { DatePicker, Form } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useStyles } from "./styles";
import moment, { Moment } from "moment";
import { dateFormatWithTime } from "#ui/datePickerPeriod/index";
import { $createSystemUpgrade, $systemUpgradeDetails, $updateSystemUpgrade } from "#stores/admin/adminSystemUpgrade";
import {
  ICreateAdminSystemUpgradeModel,
  IAdminSystemUpgradeListItemModel,
} from "#businessLogic/models/admin/adminSystemUpgrade";
import TextArea from "antd/lib/input/TextArea";
export type AddEditUserDrawerModalProps = {
  systemUpgradeDetails?: IAdminSystemUpgradeListItemModel;
};

type TProps = {
  modalControl: ModalControlType<AddEditUserDrawerModalProps>;
  userDetails?: IUserDetailsModel;
  callBack?: () => void;
};

type TInitialValues = {
  releaseDate: Moment;
  appVersion: string;
  description: string;
  platformType: string;
};

export const AddEditSystemUpgradeDrawer: FC<TProps> = (props) => {
  const { modalControl, callBack } = props;
  const { modalProps } = modalControl;

  const { systemUpgradeDetails } = modalProps;

  const classes = useStyles();

  const [form] = Form.useForm<TInitialValues>();
  const [formPassword] = Form.useForm();

  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { companyId } = useParams<{ companyId: string }>(); // Note: Это будет работать в админке

  const { success: isCreateSystemUpgradeSuccess, loading: createSystemUpgradeLoading } = $createSystemUpgrade.store();
  const { success: isUpdateSystemUpgradeSuccess, loading: updateSystemUpgradeLoading } = $updateSystemUpgrade.store();
  const userDetailsState = $systemUpgradeDetails.store();

  useEffect(() => {
    if (isCreateSystemUpgradeSuccess) {
      callBack && callBack();

      notificationSuccess(t("notifications.success"), "Версия добавлена");
      modalControl.closeModal();
      $createSystemUpgrade.reset();
    }
  }, [isCreateSystemUpgradeSuccess]);

  useEffect(() => {
    if (isUpdateSystemUpgradeSuccess) {
      callBack && callBack();

      notificationSuccess(t("notifications.success"), "Версия обновлена");
      modalControl.closeModal();
      $updateSystemUpgrade.reset();
    }
  }, [isUpdateSystemUpgradeSuccess]);

  useEffect(() => {
    if (systemUpgradeDetails) {
      form.setFieldsValue({
        releaseDate: moment(systemUpgradeDetails.releaseDate),
        appVersion: systemUpgradeDetails.name,
        description: systemUpgradeDetails.description,
        platformType: systemUpgradeDetails.platformType,
      });
    }
  }, [systemUpgradeDetails]);

  const onSubmit = async (values: TInitialValues) => {
    console.log("values", values);

    const res = await formPassword.validateFields();
    if (!res.errorFields) {
      const data: ICreateAdminSystemUpgradeModel = {
        available: true,
        description: values.description,
        forceUpdate: false,
        name: values.appVersion,
        platformType: values.platformType,
        releaseDate: moment(values.releaseDate).format(dateFormatWithTime),
      };

      if (systemUpgradeDetails) {
        $updateSystemUpgrade.request({ id: systemUpgradeDetails.id, ...data });
      } else {
        $createSystemUpgrade.request(data);
      }
    }
  };

  return (
    <>
      <ModalUI.Loading show={createSystemUpgradeLoading || updateSystemUpgradeLoading || userDetailsState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>{systemUpgradeDetails ? "Редактировать релиз" : "Добавить релиз"}</ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI onFinish={onSubmit} form={form} phantomSubmit>
          <FormUI.Item label="Версия" name="appVersion" rules={requiredRules}>
            <InputUI placeholder="Введите версию" />
          </FormUI.Item>

          <FormUI.Item label="Дата выпуска" name="releaseDate">
            <DatePicker className={classes.datePicker} placeholder="Дата выпуска" />
          </FormUI.Item>

          <FormUI.Item label="Опсание" name="description" rules={requiredRules}>
            <TextArea placeholder="Введите опсание" />
          </FormUI.Item>
        </FormUI>
      </ModalUI.Middle>
      <ModalUI.Footer>
        <ModalUI.Buttons>
          <ModalUI.Buttons.Col>
            <ButtonUI type="secondary" onClick={() => modalControl.closeModal()} fullWidth>
              {t("buttons.cancel")}
            </ButtonUI>
          </ModalUI.Buttons.Col>
          <ModalUI.Buttons.Col>
            <ButtonUI type="primary" onClick={() => form.submit()} fullWidth>
              {systemUpgradeDetails ? t("buttons.save") : t("buttons.add")}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
