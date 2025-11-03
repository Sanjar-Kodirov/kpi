import { validatePassword, validateTrimStr } from "#src/app/screens/auth/utils";
import { i18n } from "#src/localization/i18n";
import * as process from "process";

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

export const REQUIRED_DATA = i18n.t("fields.enterData");
export const WRONG_FORMAT = i18n.t("fields.incorrectFormat");

export const E_APP_TYPE = {
  CABINET: "CABINET",
  ADMIN: "ADMIN",
} as const;

// Environment variable access through webpack DefinePlugin

const MAIN = "/",
  SETTINGS = "/settings",
  COMPANY = "/company",
  USER = "/user",
  SIGN_IN = "/sign-in",
  EVALUATIONS = "/evaluation",
  STATISTICS = "/statistics",
  MANAGE_MODERATOR = "/manage-moderator";
export const ROUTES = {
  USER,
  USER_SIGN_IN: USER + SIGN_IN,

  MAIN,

  EVALUATIONS: EVALUATIONS,

  STATISTICS: STATISTICS,

  MANAGE_MODERATOR: MANAGE_MODERATOR,

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
    message: "Maydon to'ldirilishi shart",
  },
  {
    pattern: /^[0-9]*$/,
    message: "Parolda faqat raqamlar bo'lishi kerak",
  },
  {
    validator: (_, value) =>
      value && value.length >= 6
        ? Promise.resolve()
        : Promise.reject(new Error("Parol kamida 6 ta belgidan iborat bo'lishi kerak")),
  },
];

export const validateForNumbers = [
  {
    required: true,
    message: "Maydon to'ldirilishi shart",
  },
  {
    pattern: /^[0-9]*$/,
    message: "Maydonda faqat raqamlar bo'lishi kerak",
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
