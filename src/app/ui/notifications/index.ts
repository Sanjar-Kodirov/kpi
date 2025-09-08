import { ReactNode } from "react";

import { notification } from "antd";

export const notificationInfo = (title: ReactNode, text: ReactNode) => {
  notification.info({
    message: title,
    description: text,
    placement: "topRight",
  });
};

export const notificationSuccess = (title: ReactNode, text: ReactNode, duration = 2) => {
  notification.success({
    message: title,
    description: text,
    placement: "topRight",
    duration: duration,
  });
};

export const notificationWarning = (title: ReactNode, text: ReactNode, duration = 3) => {
  notification.warning({
    message: title,
    description: text,
    placement: "topRight",
    duration: duration,
  });
};

export const notificationError = (title: ReactNode, text?: ReactNode, duration = 3) => {
  notification.error({
    message: title,
    description: text,
    placement: "topRight",
    duration: duration,
  });
};
