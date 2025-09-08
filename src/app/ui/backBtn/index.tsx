import React from "react";

import { ArrowBackSvgIcon } from "#src/assets/svg";
import { Button } from "antd";

import { useStyles } from "./styles";
import { NavigateFunction } from "react-router-dom";

type BackBtnTypes = {
  navigate?: NavigateFunction;
  backPath?: string;
  onBackClick?: () => void;
};

export const BackBtn: React.FC<BackBtnTypes> = (props) => {
  const { navigate, backPath, onBackClick } = props;
  const classes = useStyles();

  if (!navigate) {
    return null;
  }

  const onClick = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      className={classes.backBtn}
      // type="ghost"
      shape="circle"
      icon={<ArrowBackSvgIcon />}
      onClick={onBackClick || onClick}
    />
  );
};
