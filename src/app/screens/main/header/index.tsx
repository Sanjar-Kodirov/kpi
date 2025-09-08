import { Header } from "antd/lib/layout/layout";
import React, { FC, useEffect } from "react";
import { GeneralBranchSelect } from "./branchSelect";
// import { CurrentUserDropdown } from "./currentUserDropdown";
import { useStyles } from "./styles";
import { $currentUser } from "#stores/account";
import { E_USER_ROLES } from "#businessLogic/models/account";
import { updateRuntimeState } from "#stores/index";
import { isAppTypeAdmin, isAppTypeCabinet } from "#constants/index";
import { $currentCompany } from "#stores/cabinetCompany";
import { useTranslation } from "react-i18next";
import { namespaces } from "#src/localization/i18n.constants";

export const HeaderUI: FC = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const { data: currentUser } = $currentUser.store();
  const currentCompanyState = $currentCompany.store();

  useEffect(() => {
    if (currentUser?.branch) {
      updateRuntimeState({ branchId: currentUser.branch.id });
    }
  }, [currentUser]);

  return (
    <Header className={classes.header}>
      <div className={classes.headerLeftSide}></div>
      <div className={classes.headerRightSide}>
        {isAppTypeCabinet && (
          <div className={classes.managerNameWrapper}>
            <h4 className={classes.managerNameLabel}>{t("settings.yourManager", { ns: namespaces.company })}</h4>
            <div className={classes.branchName}>{currentCompanyState.data?.manager?.name || "-"}</div>
          </div>
        )}

        {/* {(currentUser.role.code === E_USER_ROLES.BUSINESS_OWNER || currentUser.role.code === E_USER_ROLES.ROLE_OWNER) &&
        isAppTypeCabinet ? (
          <GeneralBranchSelect />
        ) : isAppTypeAdmin ? null : (
          <div className={classes.branchNameWrapper}>
            <div className={classes.branchName}>{currentUser.branch?.name}</div>
          </div>
        )} */}

        {/* <CurrentUserDropdown /> */}
      </div>
    </Header>
  );
};
