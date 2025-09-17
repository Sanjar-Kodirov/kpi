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

const PAGE_TYPE = "page";

export const WithPermission: FC<TypeProps> = (props) => {
  const { annotations, type, authorities, children } = props;
  const { data: currentUser } = $currentUser.store();

  // Check if the user has the required role or authority
  if (!currentUser) {
    return null;
  }

  const hasAccess =
    currentUser.role === E_USER_ROLES.deputy_member ||
    currentUser.role === E_USER_ROLES.regional_moderator ||
    (annotations.CABINET && !!authorities && authorities[annotations.CABINET]);

  if (!hasAccess) {
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

  return <>{children}</>;
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
