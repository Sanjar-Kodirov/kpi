import React from "react";

import AntImgCrop, { ImgCropProps } from "antd-img-crop";
import { useTranslation } from "react-i18next";

type TImgCrop = React.FC<ImgCropProps>;
export const ImgCrop: TImgCrop = (props) => {
  const { t } = useTranslation();

  return (
    <AntImgCrop
      modalTitle={t("modals.imageCrop")}
      modalOk={t("buttons.save")}
      modalCancel={t("buttons.cancellation")}
      {...props}
    >
      {props.children}
    </AntImgCrop>
  );
};
