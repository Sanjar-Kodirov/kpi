import React, { FC } from "react";

import { $runtime } from "#stores/index";

import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

type PropsType = {
  showPlug?: boolean;
  children: JSX.Element;
};

export const WithBranch: FC<PropsType> = (props) => {
  const { showPlug } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const runtimeState = $runtime();

  if (!runtimeState.branchId) {
    if (showPlug) {
      return (
        <div className={classes.cont}>
          <h2>{t("placeholders.selectBranch")}</h2>
        </div>
      );
    }

    return null;
  }

  return props.children;
};
