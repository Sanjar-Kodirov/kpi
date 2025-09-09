import { Header } from "antd/lib/layout/layout";
import React, { FC } from "react";
import { CurrentUserDropdown } from "./currentUserDropdown";
import { useStyles } from "./styles";
import { $currentUser } from "#stores/account";
import { useTranslation } from "react-i18next";

export const HeaderUI: FC = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  const { data: currentUser } = $currentUser.store();

  return (
    <Header className={classes.header}>
      <div className={classes.headerLeftSide}></div>
      <div className={classes.headerRightSide}>
        {/* {isAppTypeCabinet && (
          <div className={classes.managerNameWrapper}>
            <h4 className={classes.managerNameLabel}></h4>
            <div className={classes.branchName}>{currentCompanyState.data?.manager?.name || "-"}</div>
          </div>
        )} */}

        {/* {(currentUser.role.code === E_USER_ROLES.BUSINESS_OWNER || currentUser.role.code === E_USER_ROLES.ROLE_OWNER) &&
        isAppTypeCabinet ? (
          <GeneralBranchSelect />
        ) : isAppTypeAdmin ? null : (
          <div className={classes.branchNameWrapper}>
            <div className={classes.branchName}>{currentUser.branch?.name}</div>
          </div>
        )} */}

        <CurrentUserDropdown />
      </div>
    </Header>
  );
};
