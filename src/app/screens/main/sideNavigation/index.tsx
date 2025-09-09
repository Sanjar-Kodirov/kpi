import React, { ReactNode, useEffect, useState } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

import { useStyles } from "./styles";
import { E_USER_ROLES } from "#businessLogic/models/account";
import { useCurrentUser } from "#hooks/useCurrentUser";

const findOpenKeysInTree = (tree: any, path: string, parents: any) => {
  if (!tree || !tree.length) {
    return null;
  }

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    const newParents = [...parents];

    newParents.push(item.path || item.key);

    if (item.path === path || item.key === path) {
      return newParents;
    }

    const subParents: any = findOpenKeysInTree(item.sub, path, newParents);

    if (subParents) {
      return subParents;
    }
  }

  return null;
};

export type TMenuList = {
  name: string;
  path?: string;
  key?: string;
  icon?: ReactNode;
  rolesWithAccess?: E_USER_ROLES[];
  annotations?: Record<string, any>; // For permission-based access control
  sub?: TMenuList[];
};

type SideNavigationPropsType = {
  collapsed: boolean;
  menuList: TMenuList[];
};

export const SideNavigation = (props: SideNavigationPropsType) => {
  const { collapsed, menuList } = props;

  const location = useLocation();

  const classes = useStyles();

  const findOpenKeysInSubPath: any = (pathname: string) => {
    const arrayPath = pathname.split("/");
    arrayPath.splice(-1, 1);

    if (arrayPath.length <= 1) {
      return null;
    }

    const newPath = arrayPath.join("/");

    const openKeys = findOpenKeysInTree(menuList, newPath, []);

    if (openKeys) {
      return openKeys;
    }

    return findOpenKeysInSubPath(newPath);
  };

  const getOpenKeys = (location: any) => {
    let openKeys = findOpenKeysInTree(menuList, location.pathname, []);

    if (!openKeys) {
      openKeys = findOpenKeysInSubPath(location.pathname);
    }

    return openKeys || [];
  };

  const [openKeys, setOpenKeys] = useState(getOpenKeys(location));
  const [menuProps, setMenuProps] = useState({ selectedKeys: openKeys, openKeys: !collapsed ? openKeys : undefined });

  useEffect(() => {
    const menuProps: any = {
      selectedKeys: openKeys,
    };

    if (!collapsed) {
      menuProps.openKeys = openKeys;
    }

    setMenuProps(menuProps);
  }, [openKeys, collapsed]);

  useEffect(() => {
    setOpenKeys(getOpenKeys(location));
  }, [location, menuList]);

  const onParentClick = ({ key }: { key: string }) => {
    let newOpenKeys = [...openKeys];
    const findIndex = openKeys.findIndex((item: any) => item === key);

    if (findIndex > -1) {
      newOpenKeys = newOpenKeys.filter((item) => !item.includes(key));
    } else {
      if (openKeys.find((item: any) => key.includes(item))) {
        newOpenKeys.push(key);
      } else {
        newOpenKeys = [key];
      }
    }

    setOpenKeys(newOpenKeys);
  };

  const getMenu = (menu: any, level = 1) => {
    const className = level === 1 ? classes.item : classes.subItem;

    const currentUser = useCurrentUser();

    return menu
      .filter((item: any) => {
        const hasPermission =
          !item.rolesWithAccess || item.rolesWithAccess.some((role: E_USER_ROLES) => currentUser.role === role);
        return hasPermission;
      })
      .map((item: any) => {
        const menuItem = (
          <div>
            {item.path ? (
              <NavLink to={item.path} {...item.linkProps}>
                <span className={classes.menuItemSpan}>{item.name}</span>
              </NavLink>
            ) : (
              <span className={classes.menuItemSpan}>{item.name}</span>
            )}
          </div>
        );

        const icon = item.icon ? <span className={classes.menuItemIcon}>{item.icon}</span> : null;

        const itemObj = {
          key: item.path || item.key,
          label: menuItem,
          icon: icon,
          className: className,
        };

        if (item.sub && item.sub.length) {
          return {
            ...itemObj,
            children: getMenu(item.sub, level + 1),
            popupClassName: classes.popupMenu,
            onTitleClick: onParentClick,
          };
        } else {
          return itemObj;
        }
      });
  };

  return <Menu theme="dark" mode="inline" className={classes.navigation} items={getMenu(menuList)} {...menuProps} />;
};
