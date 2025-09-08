import { i18n } from "#src/localization/i18n";

export const validatePassword = ({ getFieldValue }: { getFieldValue: (v: string) => string }) => ({
  validator(rule: string | RegExp, value: string) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(i18n.t("fields.passwordsDoNotMatch"));
  },
});
