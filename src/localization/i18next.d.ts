import { ELanguages } from "#src/localization/i18n.constants";
import "i18next";

import { defaultNS, resources } from "./i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)[ELanguages.RU];
  }
}
