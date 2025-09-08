import React, { FC } from "react";

import { i18n } from "#src/localization/i18n";
import { ConfigProvider } from "antd";
import "antd/dist/antd.less";
import locale from "antd/es/locale/ru_RU";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { RootAdmin } from "#src/app/root-admin";

const AdminRoot: FC = () => {
  return (
    <ConfigProvider locale={locale}>
      <I18nextProvider i18n={i18n}>
        <RootAdmin />
      </I18nextProvider>
    </ConfigProvider>
  );
};
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<AdminRoot />);
}
