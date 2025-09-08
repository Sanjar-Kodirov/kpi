import React, { FC, useEffect } from "react";
import { confirmPasswordRules, isAppTypeCabinet, passwordRules, requiredRules } from "#constants/index";
import { ModalControlType } from "#hooks/useModalControl";
import { initialValuesResetPasswordFinish } from "#src/app/screens/auth/constants";
import { namespaces } from "#src/localization/i18n.constants";
import { ButtonUI } from "#ui/button";
import { FormUI } from "#ui/form";
import { InputUI } from "#ui/input";
import { ModalUI } from "#ui/modal";
import { notificationSuccess } from "#ui/notifications";
import { getDigitsNums } from "#utils/formatters";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { $adminCreateUser, $adminUpdateUser, $adminUserDetails } from "#stores/admin/adminUsers";
import { TAdminUsersCreateParams } from "#businessLogic/models/admin/adminUsers";
import moment, { Moment } from "moment";
export type TAddEditAdminUserDrawerModalProps = {
  userId: number;
};

type TProps = {
  modalControl: ModalControlType<TAddEditAdminUserDrawerModalProps>;
  callBack?: () => void;
};

type TInitialValues = {
  firstName: string;
  lastName: string;
  middleName: string;
  authorities: string;
  phoneNumber: string;
  login: string;
  birthDate: Moment | null;
  joiningDate: Moment | null;
};

export const AddEditAdminUserDrawer: FC<TProps> = (props) => {
  const { modalControl, callBack } = props;
  const { modalProps } = modalControl;

  const [form] = Form.useForm<TInitialValues>();
  const [formPassword] = Form.useForm();

  const { t } = useTranslation();

  const { success: isCreateSuccess, loading: createLoading } = $adminCreateUser.store();
  const { success: isUpdateSuccess, loading: updateLoading } = $adminUpdateUser.store();
  const userDetailsState = $adminUserDetails.store();
  const { data: userDetailsData } = userDetailsState;

  useEffect(() => {
    if (modalProps.userId) {
      $adminUserDetails.request(modalProps.userId);
    }

    return () => {
      $adminUserDetails.reset();
    };
  }, [modalProps.userId]);

  useEffect(() => {
    if (isCreateSuccess) {
      callBack && callBack();

      notificationSuccess(t("notifications.success"), t("employeeEdit.employeeAdded", { ns: namespaces.company }));
      modalControl.closeModal();
      $adminCreateUser.reset();
    }

    return () => $adminCreateUser.reset();
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      callBack && callBack();

      notificationSuccess(t("notifications.success"), t("employeeEdit.employeeChanged", { ns: namespaces.company }));
      modalControl.closeModal();
      $adminUpdateUser.reset();
    }

    return () => $adminUpdateUser.reset();
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (userDetailsData) {
      form.setFieldsValue({
        firstName: userDetailsData.firstName,
        lastName: userDetailsData.lastName,
        authorities: userDetailsData.role?.code,
        login: userDetailsData.login,
        phoneNumber: userDetailsData.phone,
        birthDate: userDetailsData.birthDate ? moment(userDetailsData.birthDate) : null,
        joiningDate: userDetailsData.joiningDate ? moment(userDetailsData.joiningDate) : null,
      });
    }
  }, [userDetailsData]);

  const onSubmit = async (values: TInitialValues) => {
    const phoneNumber = getDigitsNums(values.phoneNumber);
    const res = await formPassword.validateFields();
    if (!res.errorFields) {
      const data: TAdminUsersCreateParams = {
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.authorities,
        login: values.login,
        password: formPassword.getFieldValue("password"),
      };

      const updateData: any = {
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.authorities,
        login: values.login,
        phone: phoneNumber,
      };

      if (userDetailsData) {
        $adminUpdateUser.request({ id: userDetailsData.id, ...updateData });
      } else {
        $adminCreateUser.request(data);
      }
    }
  };

  return (
    <>
      <ModalUI.Loading show={createLoading || updateLoading || userDetailsState.loading} />
      <ModalUI.Header>
        <ModalUI.Title>
          {userDetailsData ? t("employeeEdit.changeEmployee", { ns: namespaces.company }) : "Добавление сотрудника"}
        </ModalUI.Title>
      </ModalUI.Header>
      <ModalUI.Middle>
        <FormUI onFinish={onSubmit} form={form} phantomSubmit>
          <FormUI.Item label={t("fields.lastName")} name="lastName" rules={requiredRules}>
            <InputUI placeholder={t("fields.lastName")} />
          </FormUI.Item>
          <FormUI.Item label={t("fields.name")} name="firstName" rules={requiredRules}>
            <InputUI placeholder={t("fields.name")} />
          </FormUI.Item>

          <Form.Item label="Логин" name="login" rules={requiredRules}>
            <InputUI autoComplete="off" placeholder="Введите логин" />
          </Form.Item>

          {!userDetailsData && (
            <Form
              name="basic"
              layout="vertical"
              initialValues={initialValuesResetPasswordFinish}
              requiredMark={false}
              autoComplete="off"
              form={formPassword}
            >
              <Form.Item label={t("placeholders.createPassword")} name="password" rules={passwordRules}>
                <InputUI.Password
                  placeholder={t("placeholders.enterPassword")}
                  autoComplete="new-password"
                  variant="auth"
                />
              </Form.Item>
              {isAppTypeCabinet && (
                <Form.Item
                  label={t("placeholders.repeatPassword")}
                  name="confirm_password"
                  rules={confirmPasswordRules}
                >
                  <InputUI.Password placeholder={t("placeholders.reEnterPassword")} variant="auth" />
                </Form.Item>
              )}
            </Form>
          )}
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
              {userDetailsData ? t("buttons.save") : t("buttons.add")}
            </ButtonUI>
          </ModalUI.Buttons.Col>
        </ModalUI.Buttons>
      </ModalUI.Footer>
    </>
  );
};
