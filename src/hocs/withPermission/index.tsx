import React, { FC, ReactNode } from "react";

import { StringMapI } from "#businessLogic/models";
import { E_USER_ROLES } from "#businessLogic/models/account";
import { $currentUser } from "#stores/account";
import { PAGE_TYPE } from "./constants";
import { LockUnlockIconSvg } from "#svgIcons/halls";

import "./styles.scss";
import { cn } from "#utils/index";
import { usePermissions } from "#hooks/usePermissions";
import { useCurrentUser } from "#hooks/useCurrentUser";

type TypeProps = {
  className?: string;
  annotations: StringMapI;
  type?: string | any;
  render?: any;
  placement?: string | any;
  children?: ReactNode;
};

const mainCN = cn("with-permission");

export const withPermission = (annotations: StringMapI): boolean => {
  const authorities = usePermissions();
  const currentUserState = $currentUser.store.getState();
  const { data: currentUser } = currentUserState;

  const annotation = process.env.appType && annotations[process.env.appType];

  if (!currentUser || !annotation) {
    return false;
  }

  return (
    currentUser.role.code === E_USER_ROLES.BUSINESS_OWNER ||
    currentUser.role.code === E_USER_ROLES.ROLE_OWNER ||
    (annotation && !!authorities && authorities[annotation])
  );
};

export const WithPermission: FC<TypeProps> = (props) => {
  const { annotations, type } = props;

  const currentUserState = $currentUser.store();
  const authorities = usePermissions();

  // const permissionsModeState = useStore($permissionsMode);
  // const permissionUsersState = useStore($permissionUsers.store());

  // const { user, authorities } = permissionsModeState;
  const { data: currentUser } = currentUserState;

  // const isPermissionMode = !!appRoutes.length && !!permissionUsersState.data;

  const annotation = process.env.appType && annotations[process.env.appType];

  if (currentUser) {
    if (
      currentUser.role.code === E_USER_ROLES.BUSINESS_OWNER ||
      currentUser.role.code === E_USER_ROLES.ROLE_OWNER ||
      currentUser.role.code === E_USER_ROLES.ROLE_SUPER_ADMIN ||
      (annotation && !!authorities && authorities[annotation])
    ) {
      // return <div className={mainCN("", { [type]: type }, className)}>{render ? render() : props.children}</div>;
      return props.children;
    } else {
      if (type === PAGE_TYPE) {
        return (
          <div>
            <div className={mainCN("no-access")}>
              <LockUnlockIconSvg />
              <div>Доступ ограничен</div>
            </div>
          </div>
        );
      }
      return null;
    }
  } else {
    return null;
  }
  // }
};

type TProps = {
  children: React.ReactNode;
  rolesWithAccess?: string[];
  comparator?: (currentUserRole: E_USER_ROLES) => boolean;
};

export const WithPermissionLocal: FC<TProps> = (props) => {
  const { rolesWithAccess, children, comparator } = props;
  const currentUser = useCurrentUser();

  const adminRoles = new Set([
    E_USER_ROLES.ROLE_APAY_INTEGRATION,
    E_USER_ROLES.ROLE_ADMIN,
    E_USER_ROLES.ROLE_SUPER_ADMIN,
    E_USER_ROLES.BUSINESS_OWNER,
    E_USER_ROLES.ROLE_OWNER,
  ]);

  if (adminRoles.has(currentUser.role?.code)) {
    return children;
  }

  if (comparator && comparator(currentUser.role?.code)) {
    return children;
  }

  if (!rolesWithAccess) {
    return null;
  }

  if (rolesWithAccess?.some((role) => role === currentUser.role?.code)) {
    return children;
  }

  return null;
};
