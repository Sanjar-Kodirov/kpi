import { REQUIRED_DATA } from "#constants/index";
import { i18n } from "#src/localization/i18n";

export const validatePassword = ({ getFieldValue }: { getFieldValue: (p: string) => string }) => ({
  validator(rule: unknown, value: string) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(i18n.t("fields.passwordsDoNotMatch"));
  },
});

export const validateTrimStr = () => ({
  validator(rule: unknown, value?: string) {
    if (!value || value.trim()) {
      return Promise.resolve();
    }
    return Promise.reject(REQUIRED_DATA);
  },
});
