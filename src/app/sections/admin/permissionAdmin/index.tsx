import React, { useMemo } from "react";

import { AdminEndpoints } from "./components/endpoints";
import { AdminPermissions } from "./components/permission";
import { useStyles } from "./styles";
import { $currentUser } from "#stores/account";
import { E_USER_ROLES } from "#businessLogic/models/account";
import { ContentUI } from "#ui/content";
import { TabsUI } from "#ui/tabs";

type TProps = {
  permissionType: string;
};
export const PermissionAdmin: React.FC<TProps> = (props) => {
  const { permissionType } = props;
  const classes = useStyles();

  const currentUserState = $currentUser.store();
  const { data: currentUser } = currentUserState;

  const isAdmin = currentUser?.role === E_USER_ROLES.ROLE_ADMIN;

  const viewEndPoints = useMemo(() => {
    return true
      ? [
          {
            key: "ENDPOINTS",
            label: "Эндпоинты",
            children: <AdminEndpoints permissionType={permissionType} />,
          },
        ]
      : [];
  }, [isAdmin, permissionType]);

  return (
    <ContentUI>
      <ContentUI.Header className={classes.header} title={permissionType === "ADMIN" ? "Админ" : "Кабинет"} />
      <TabsUI
        defaultActiveKey="ENDPOINTS"
        className={classes.tabs}
        items={[
          ...viewEndPoints,
          {
            key: "PERMISSIONS",
            label: "Установка прав",
            children: <AdminPermissions permissionType={permissionType} />,
          },
        ]}
      />
    </ContentUI>
  );
};
