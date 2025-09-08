import React, { FC } from "react";

import { Popconfirm, PopconfirmProps } from "antd";
import { useTranslation } from "react-i18next";

type TPopconfirmUIProps = PopconfirmProps;

export const PopconfirmUI: FC<TPopconfirmUIProps> = (props) => {
  const { t } = useTranslation();
  return <Popconfirm okText={t("notifications.yes")} cancelText={t("notifications.no")} {...props} />;
};
