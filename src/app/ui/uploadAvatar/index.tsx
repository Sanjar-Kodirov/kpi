import React from "react";

import { notificationError } from "#src/app/ui";
import { namespaces } from "#src/localization/i18n.constants";
import { DeleteSvg, PencilSvg } from "#svgIcons/index";
import { ButtonUI } from "#ui/button";
import { ImgCrop } from "#ui/imgCrop";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Upload } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

type UploadAvatarProps = {
  uploadLoading?: boolean;
  deleteLoading?: boolean;
  onDeleteAvatarClick: (e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => void;
  onUploadSubmit: (file: RcFile) => void;
  imageUrl?: string;
};

export const UploadAvatar = (props: UploadAvatarProps) => {
  const { uploadLoading, deleteLoading, onDeleteAvatarClick, onUploadSubmit, imageUrl } = props;

  const { t } = useTranslation();
  const classes = useStyles();

  const picture = (
    <>
      {imageUrl ? (
        <>
          <div className={classes.avatarInner}>
            <img src={imageUrl} alt="" />
            {(uploadLoading || deleteLoading) && (
              <div className={classes.avatarLoading}>
                <LoadingOutlined />
              </div>
            )}
          </div>
          {imageUrl && (
            <ButtonUI
              className={`${classes.avatarUploadBtn} ${classes.avatarBtn}`}
              type="primary"
              size="small"
              shape="circle"
              icon={<PencilSvg />}
            />
          )}
        </>
      ) : (
        <div className={classes.avatarPlaceholder}>{uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}</div>
      )}
    </>
  );

  const beforeUpload = (file: RcFile) => {
    if (file.size < 100000) {
      onUploadSubmit(file);
    } else {
      notificationError(t("notifications.error"), t("notifications.imgSizeError", { size: 100 }));
    }
    return false;
  };

  return (
    <div className={classes.avatar}>
      <ImgCrop>
        <Upload fileList={[]} maxCount={1} beforeUpload={beforeUpload}>
          {picture}
        </Upload>
      </ImgCrop>
      {imageUrl && onDeleteAvatarClick && (
        <Popconfirm
          placement="topLeft"
          title={t("settings.deleteAvatar", { ns: namespaces.company })}
          onConfirm={onDeleteAvatarClick}
        >
          <Button
            className={`${classes.avatarDeleteBtn} ${classes.avatarBtn}`}
            danger
            type="primary"
            size="small"
            shape="circle"
            icon={<DeleteSvg />}
          />
        </Popconfirm>
      )}
    </div>
  );
};
