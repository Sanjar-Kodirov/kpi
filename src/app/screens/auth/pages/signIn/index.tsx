import React, { FC, useEffect } from "react";

import {
  ACCESS_TOKEN_KEY_FOR_COOKIE,
  isAppTypeAdmin,
  REFRESH_TOKEN_KEY_FOR_COOKIE,
  requiredRules,
  ROUTES,
} from "#constants/index";
import { namespaces } from "#src/localization/i18n.constants";
import { $currentUser, $logIn } from "#stores/account";
import { ErrorResponseModel } from "#types/api";
import { ButtonUI } from "#ui/button";
import { CheckboxUI } from "#ui/checkbox";
import { InputUI } from "#ui/input";
import { notificationWarning } from "#ui/notifications";
import { getDigitsNums } from "#utils/formatters";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { initialValuesSignIn } from "../../constants";

import { ContentUI } from "#ui/content";
import { FormUI } from "#ui/form";
import { useStyles } from "./styles";
import { RegisterLayout } from "../reset-password/registerLayout";

type TValues = {
  eSign: {
    data: string;
  };
  username: string;
  password: string;
  rememberMe?: boolean;
};

export const SignIn: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const logInState = $logIn.store();
  const currentUserState = $currentUser.store();

  const { data: currentUser } = currentUserState;

  const classes = useStyles();

  const [form] = Form.useForm();

  useEffect(() => {
    if (currentUser?.isCashier) {
      notificationWarning(t("auth.youTryingEnterCashier", { ns: namespaces.auth }), "");
    }
  }, [currentUser]);

  const onFinish = (values: TValues) => {
    const username = isAppTypeAdmin ? values.username : getDigitsNums(values.username);

    const data = { phone: username, password: values.password, rememberMe: values.rememberMe };
    $logIn.request(data);
  };

  const handleForgetPassword = () => {
    navigate(ROUTES.USER_RESET_PASSWORD);
  };

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
      $logIn.reset();
    }
  }, [logInState.success, location.search]);

  const showError = (error: ErrorResponseModel) => {
    if (!error) return null;

    if (error.status === 401) {
      return <ContentUI.Error error={"Введен неверный логин или пароль"} />;
    } else if (error) {
      return <ContentUI.Error error={"Сбой в работе сервера, попробуйте еще раз позже"} />;
    }
  };

  return (
    <RegisterLayout>
      <RegisterLayout.Inner>
        <RegisterLayout.Title>{t("auth.authorization", { ns: namespaces.auth })}</RegisterLayout.Title>

        {logInState.error && showError(logInState.error)}

        <FormUI
          name="basic"
          layout="vertical"
          initialValues={initialValuesSignIn}
          onFinish={onFinish}
          requiredMark={false}
          form={form}
          autoComplete="on"
        >
          <Form.Item label={isAppTypeAdmin ? "Логин" : t("fields.phoneNumber")} name="username" rules={requiredRules}>
            {isAppTypeAdmin ? <InputUI variant="auth" /> : <InputUI.Phone variant="auth" />}
          </Form.Item>
          <Form.Item label={t("fields.password")} name="password" rules={requiredRules}>
            <InputUI.Password placeholder={t("placeholders.enterPassword")} variant="auth" />
          </Form.Item>

          <div className={classes.rememberMe}>
            <Form.Item name="rememberMe" valuePropName="checked">
              <CheckboxUI className={classes.checkbox}>{t("auth.rememberMe", { ns: namespaces.auth })}</CheckboxUI>
            </Form.Item>
            <span onClick={handleForgetPassword} className={classes.forgotPassword}>
              {t("auth.forgotPassword", { ns: namespaces.auth })}
            </span>
          </div>

          <RegisterLayout.BottomButtons>
            <ButtonUI loading={logInState.loading} htmlType="submit" type="auth">
              {t("auth.logIn", { ns: namespaces.auth })}
            </ButtonUI>
          </RegisterLayout.BottomButtons>
        </FormUI>

        {/* <div className={classes.infoCont}>
          <span>{t("auth.dontHaveAnAccount", { ns: namespaces.auth })}</span>
          <Link state={{ currentStep: 0 }} to={ROUTES.USER_SIGN_UP}>
            {t("auth.registerNow", { ns: namespaces.auth })}
          </Link>
        </div> */}
      </RegisterLayout.Inner>
    </RegisterLayout>
  );
};
