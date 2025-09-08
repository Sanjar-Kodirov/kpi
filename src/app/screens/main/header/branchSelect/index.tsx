import React, { FC } from "react";

import { $runtime, updateRuntimeState } from "#stores/index";

import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";
import { ALL_BRANCHES, BranchSelect } from "#pickers/branchSelect";
import { useCurrentUser } from "#hooks/useCurrentUser";

export const GeneralBranchSelect: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const runtimeState = $runtime();
  const currentUser = useCurrentUser();

  const onBranchChange = (branchId?: string) => {
    updateRuntimeState({ branchId: branchId?.toString() === ALL_BRANCHES ? undefined : branchId });
  };

  if (currentUser.branch) {
    return (
      <div className={classes.info}>
        <span className={classes.title}>Филиал</span>
        <span>{currentUser.branch.name}</span>
      </div>
    );
  }

  return (
    <div className={classes.branchSelect}>
      <BranchSelect placeholder={t("fields.allBranches")} value={runtimeState.branchId} onChange={onBranchChange} />
    </div>
  );
};
