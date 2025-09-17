import React, { FC, ReactNode } from "react";

import { StringMapI } from "#businessLogic/models";
import { E_USER_ROLES } from "#businessLogic/models/account";
import { $currentUser } from "#stores/account";
import { LockUnlockIconSvg } from "#svgIcons/halls";

import "./styles.scss";
import { cn } from "#utils/index";

import { useCurrentUser } from "#hooks/useCurrentUser";

type TypeProps = {
  className?: string;
  annotations: StringMapI;
  type?: string | any;
  authorities?: StringMapI;
  render?: any;
  placement?: string | any;
  children?: ReactNode;
};

const mainCN = cn("with-permission");

// export const withPermission = (annotations: StringMapI): boolean => {
//   const authorities = usePermissions();
//   const currentUserState = $currentUser.store.getState();
//   const { data: currentUser } = currentUserState;

//   const currentAppType = process.env.appType || 'CABINET';
//   const annotation = annotations[currentAppType as keyof typeof annotations];

//   if (!currentUser || !annotation) {
//     return false;
//   }

//   return (
//     currentUser.role === E_USER_ROLES.deputy_member ||
//     currentUser.role === E_USER_ROLES.regional_moderator ||
//     (annotation && !!authorities && authorities[annotation])
//   );
// };

const PAGE_TYPE = "page";

export const WithPermission: FC<TypeProps> = (props) => {
  const { annotations, type, authorities } = props;

  const currentUserState = $currentUser.store();

  // const permissionsModeState = useStore($permissionsMode);
  // const permissionUsersState = useStore($permissionUsers.store());

  // const { user, authorities } = permissionsModeState;
  const { data: currentUser } = currentUserState;

  // const isPermissionMode = !!appRoutes.length && !!permissionUsersState.data;

  if (currentUser) {
    if (currentUser.role === E_USER_ROLES.deputy_member || currentUser.role === E_USER_ROLES.regional_moderator) {
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

  const adminRoles = new Set([E_USER_ROLES.regional_moderator]);

  if (adminRoles.has(currentUser.role)) {
    return children;
  }

  if (comparator && comparator(currentUser.role)) {
    return children;
  }

  if (!rolesWithAccess) {
    return null;
  }

  if (rolesWithAccess?.some((role) => role === currentUser.role)) {
    return children;
  }

  return null;
};
