import React, { FC, useEffect, useState } from "react";

import {
  ACCESS_TOKEN_KEY_FOR_COOKIE,
  REFRESH_TOKEN_KEY_FOR_COOKIE,
  requiredRules,
  ROUTES,
  SMS_CODE_SIZE,
} from "#constants/index";
import { namespaces } from "#src/localization/i18n.constants";
import { $loginWithCode } from "#stores/account";
import { ButtonUI } from "#ui/button";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { initialValuesSignIn } from "../../constants";

import { ContentUI } from "#ui/content";
import { FormUI } from "#ui/form";
import { RegisterLayout } from "../reset-password/registerLayout";
import { SmsCodeField } from "#components/smsCodeField";

type TValues = {
  smsCode: string;
};

export const SignIn: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const logInState = $loginWithCode.store();
  const [form] = Form.useForm();

  useEffect(() => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY_FOR_COOKIE);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY_FOR_COOKIE);
    window.sessionStorage.clear();
  }, []);

  useEffect(() => {
    if (logInState.success) {
      const lastPathName = new URLSearchParams(location.search).get("from");
      if (lastPathName) {
        navigate(lastPathName === ROUTES.USER_SIGN_IN ? "/" : lastPathName);
      } else {
        navigate("/");
      }
      $loginWithCode.reset();
    }
  }, [logInState.success, location.search]);

  const onFinish = (values: TValues) => {
    $loginWithCode.request({ auth_code: values.smsCode });
  };

  return (
    <RegisterLayout>
      <RegisterLayout.Inner>
        <RegisterLayout.Title>Kodni Kiriting</RegisterLayout.Title>

        <ContentUI.Error error={logInState.error?.message} />

        <FormUI
          name="basic"
          layout="vertical"
          initialValues={initialValuesSignIn}
          onFinish={onFinish}
          requiredMark={false}
          form={form}
          autoComplete="on"
        >
          <Form.Item name="smsCode" rules={requiredRules}>
            <SmsCodeField codeSize={SMS_CODE_SIZE} error={form.getFieldError("smsCode").length} />
          </Form.Item>
          <RegisterLayout.BottomButtons>
            <ButtonUI loading={logInState.loading} htmlType="submit" type="auth">
              {t("auth.logIn", { ns: namespaces.auth })}
            </ButtonUI>
          </RegisterLayout.BottomButtons>
        </FormUI>
      </RegisterLayout.Inner>
    </RegisterLayout>
  );
};
