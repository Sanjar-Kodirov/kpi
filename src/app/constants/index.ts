import { validatePassword, validateTrimStr } from "#src/app/screens/auth/utils";
import { MONITORING } from "#src/hocs/withPermission/constants/admin";
import { MANAGEMENT } from "#src/hocs/withPermission/constants/cabinet";
import { i18n } from "#src/localization/i18n";
import * as process from "process";

export const APP_VERSION = "1.0.0";

export const ASIDE_SETTINGS = {
  LOCAL_COLLAPSED_NAME: "siderCollapsed",
  EXPANDED: 260,
  COLLAPSED: 64,
  BREAK: 1200,
};

export const DEVICES_WIDTH = {
  MOBILE: 500,
  TABLET: 900,
};

export const MEDIA_WIDTH = {
  MOBILE: `@media (max-width: ${DEVICES_WIDTH.MOBILE}px)`,
  TABLET: `@media (max-width: ${DEVICES_WIDTH.TABLET}px)`,
};

export const RUNTIME_STATE = "RUNTIME_STATE";
export const REQUIRED_DATA = i18n.t("fields.enterData");
export const WRONG_FORMAT = i18n.t("fields.incorrectFormat");

export const E_APP_TYPE = {
  CABINET: "CABINET",
  ADMIN: "ADMIN",
} as const;

export const appType = process.env.appType as keyof typeof E_APP_TYPE;
export const getAppType = () => process.env.appType as keyof typeof E_APP_TYPE;
export const isAppTypeCabinet = (process.env.appType as keyof typeof E_APP_TYPE) === E_APP_TYPE.CABINET;
export const isAppTypeAdmin = (process.env.appType as keyof typeof E_APP_TYPE) === E_APP_TYPE.ADMIN;

const MAIN = "/",
  SETTINGS = "/settings",
  COMPANY = "/company",
  USER = "/user",
  SIGN_IN = "/sign-in",
  EVALUATIONS = "/evaluation";
export const ROUTES = {
  USER,
  USER_SIGN_IN: USER + SIGN_IN,

  MAIN,

  EVALUATIONS: EVALUATIONS,

  MANAGEMENT: MAIN + MANAGEMENT,
  MANAGEMENT_CABINET_DEPARTMENTS: MAIN + "/management/departments",

  COMPANY,
  COMPANY_SETTINGS: COMPANY + "/settings",
  COMPANY_SETTINGS_EDIT_COMPANY: COMPANY + "/settings/edit",

  SETTINGS,
  SETTINGS_PROFILE: SETTINGS + "/profile",
  SETTINGS_SECURITY: SETTINGS + "/security",
  SETTINGS_SECURITY_CHANGE_PASSWORD: SETTINGS + "/security/change-password",
};

export const ACCESS_TOKEN_KEY_FOR_COOKIE = "access_token";
export const REFRESH_TOKEN_KEY_FOR_COOKIE = "refresh_token";

export const requiredRules = [{ required: true, message: REQUIRED_DATA }];
export const passwordRules = [{ required: true, message: i18n.t("notifications.pleaseEnterYourPassword") }];

export const validatePasswordForOnlyNumbers = [
  {
    required: true,
    message: "Поле обязательно для заполнения",
  },
  {
    pattern: /^[0-9]*$/,
    message: "Пароль должен содержать только цифры",
  },
  {
    validator: (_, value) =>
      value && value.length >= 6
        ? Promise.resolve()
        : Promise.reject(new Error("Пароль должен содержать минимум 6 символов")),
  },
];

export const validateForNumbers = [
  {
    required: true,
    message: "Поле обязательно для заполнения",
  },
  {
    pattern: /^[0-9]*$/,
    message: "Поле должно содержать только цифры",
  },
];

export const confirmPasswordRules = [
  { required: true, message: i18n.t("notifications.pleaseConfirmYourPassword") },
  validatePassword,
];

export const requiredRulesCheckStrIsEmpty = [{ required: true, message: REQUIRED_DATA }, validateTrimStr];

export enum SCAN_CODE_TYPES {
  AGGREGATION = "AGGREGATION",
  MARKING = "MARKING",
}

export const STOCK_STATUSES = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  PAUSED: "PAUSED",
};

export const DATE_FORMAT_WITH_TIME = "DD.MM.YYYY, HH:mm";

export const PINFL_SIZE = 14;
export const SMS_CODE_SIZE = 6;
export const UZB_PHONE_LENGTH = 12;
export const UZS_CURRENCY = "UZS";
export const UZ_COUNTRY_CODE = "998";
