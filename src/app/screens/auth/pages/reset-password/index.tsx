import React, { useEffect, useState } from "react";

import { Form, Input } from "antd";
import InputMask from "react-input-mask";
import { Link, useNavigate } from "react-router-dom";

import { SmsCodeField } from "#components/smsCodeField";
import { ROUTES, SMS_CODE_SIZE, UZ_COUNTRY_CODE, requiredRules } from "#constants/index";
import {
  $resetPasswordCheck,
  $resetPasswordFinish,
  $resetPasswordInit,
  $resetPasswordResendActivationKey,
  resetResetPassword,
} from "#stores/account";
import { checkPassword } from "#styles/utils/passwordValidation";
import { ButtonUI } from "#ui/button";
import { ContentUI } from "#ui/content";
import { FormUI } from "#ui/form";
import { InputUI } from "#ui/input";
import { notificationSuccess } from "#ui/notifications";
import { getDigitsNums } from "#utils/formatters";
import { validatePhoneNumber } from "#utils/validators";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";
import { namespaces } from "#src/localization/i18n.constants";
import { RegisterLayout } from "./registerLayout";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [form] = Form.useForm();

  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  const [smsCode, setSmsCode] = useState<string | null>(null);
  const [countDownActive, setCountDownActive] = useState(false);

  const resetPasswordInitState = $resetPasswordInit.store();
  const resetPasswordResendActivationKeyState = $resetPasswordResendActivationKey.store();
  const resetPasswordCheckState = $resetPasswordCheck.store();
  const resetPasswordFinishState = $resetPasswordFinish.store();

  useEffect(() => {
    return () => {
      resetResetPassword();
    };
  }, []);

  useEffect(() => {
    if (resetPasswordInitState.success) {
      setStep(2);
      setCountDownActive(true);
    }
  }, [resetPasswordInitState.success]);

  useEffect(() => {
    if (resetPasswordResendActivationKeyState.success) {
      setCountDownActive(true);
      $resetPasswordResendActivationKey.reset();
    }
  }, [resetPasswordResendActivationKeyState.success]);

  useEffect(() => {
    if (resetPasswordCheckState.data) {
      setStep(3);
      setCountDownActive(false);
    }
  }, [resetPasswordCheckState.data]);

  useEffect(() => {
    if (resetPasswordFinishState.success) {
      resetResetPassword();

      notificationSuccess("", "Пароль обновлен");

      navigate("/user/sign-in");
    }
  }, [resetPasswordFinishState.success]);

  const onResendActivationKeyClick = () => {
    const phone = getDigitsNums(form.getFieldValue("phone"));

    $resetPasswordResendActivationKey.request({ phone });
  };

  const renderByStep = () => {
    if (step === 1) {
      return (
        <Form.Item label={t("fields.phoneNumber")} name="phone" rules={requiredRules}>
          <InputMask mask="+\9\9\8 99 999 99 99" placeholder={`+${UZ_COUNTRY_CODE} -- --- -- --`} maskChar="-">
            {/* @ts-ignore */}
            {(inputProps) => <Input {...inputProps} />}
          </InputMask>
        </Form.Item>
      );
    } else if (step === 2) {
      return (
        <>
          <Form.Item label={t("fields.phoneNumber")} name="phone">
            <InputUI readOnly />
          </Form.Item>
          <Form.Item label="Код из CMC" name="smsCode" rules={requiredRules}>
            <SmsCodeField
              codeSize={SMS_CODE_SIZE}
              onChange={setSmsCode}
              error={form.getFieldError("smsCode").length}
              countDownActive={countDownActive}
              onTimerFinish={() => setCountDownActive(false)}
              onResendClick={onResendActivationKeyClick}
            />
          </Form.Item>
        </>
      );
    } else if (step === 3) {
      return (
        <>
          <Form.Item label="Номер телефона" name="phone" hasFeedback validateStatus="success">
            <InputUI readOnly />
          </Form.Item>
          <Form.Item label={t("fields.newPassword")} name="password" rules={requiredRules}>
            <InputUI.Password placeholder={t("placeholders.enterPassword")} autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            label={t("modal.reEnterNewPassword", { ns: namespaces.settings })}
            name="confirmPassword"
            rules={requiredRules}
          >
            <InputUI.Password placeholder={t("placeholders.reEnterPassword")} autoComplete="new-password" />
          </Form.Item>
        </>
      );
    }
  };

  const onFinish = (formData) => {
    const phone = getDigitsNums(formData.phone);

    if (!validatePhoneNumber(phone)) {
      form.setFields([
        {
          name: "phone",
          errors: ["Неверный формат"],
        },
      ]);

      return;
    }

    if (step === 1) {
      $resetPasswordInit.request({ phone });
    } else if (step === 2) {
      if (!smsCode || smsCode.length !== SMS_CODE_SIZE) {
        form.setFields([
          {
            name: "smsCode",
            errors: ["Пожалуйста, заполните поле"],
          },
        ]);

        return;
      }

      $resetPasswordCheck.request({
        activationKey: smsCode,
        phone,
      });
    } else if (step === 3) {
      const errorsDescriptions = {
        notMach: "Пароль не совпадает",
        maxLength: "Слишком длинный пароль",
        passwordRule:
          "Пароль должен состоять минимум из восьми символов, иметь хотя бы одну цифру, строчные и заглавные буквы",
      };

      const isPasswordValid = checkPassword(form, formData, errorsDescriptions);

      if (isPasswordValid) {
        $resetPasswordFinish.request({
          phone,
          password: formData.password,
          passwordConfirmation: formData.confirmPassword,
          // eslint-disable-next-line
          secretKey: resetPasswordCheckState?.data?.secretKey!,
        });
      }
    }
  };

  return (
    <RegisterLayout large={false}>
      <RegisterLayout.Title>Восстановление пароля</RegisterLayout.Title>
      {step !== 3 && (
        <RegisterLayout.TitleDesc>
          Пожалуйста, укажите телефон, который вы использовали для входа на сайт.
        </RegisterLayout.TitleDesc>
      )}

      <ContentUI.Error error={resetPasswordInitState.error} />
      <ContentUI.Error error={resetPasswordCheckState.error} />
      <ContentUI.Error error={resetPasswordFinishState.error} />
      <ContentUI.Loading show={resetPasswordCheckState.loading} fixed />
      <ContentUI.Loading show={resetPasswordInitState.loading} fixed />

      <FormUI
        form={form}
        layout={"vertical"}
        onFinish={onFinish}
        requiredMark={false}
        autoComplete="off"
        noValidate={true}
      >
        <RegisterLayout.Inner>
          {renderByStep()}
          <RegisterLayout.BottomButtons>
            <ButtonUI type="primary" htmlType="submit">
              {step === 3 ? "Подтвердить" : "Сбросить пароль"}
            </ButtonUI>
          </RegisterLayout.BottomButtons>
        </RegisterLayout.Inner>
      </FormUI>
      <div className={classes.isHasAccount}>
        <Link to={ROUTES.USER_SIGN_IN}>Авторизация</Link>
      </div>
    </RegisterLayout>
  );
};
