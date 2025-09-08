import { E_APP_TYPE, ROUTES } from "#constants/index";
import { CompanyMenuSvgIcon, ControlMenuSvgIcon, SettingsMenuSvgIcon } from "#svgIcons/navigation";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TMenuList } from "#src/app/screens/main/sideNavigation";
import { PERMISSIONS } from "#src/hocs/withPermission/constants";

export const useCabinetMenuList = () => {
  const { t, i18n } = useTranslation();

  return useMemo(() => {
    return [
      // {
      //   name: t("sideNavigation.home"),
      //   path: ROUTES.MAIN,
      //   icon: <HomeMenuSvgIcon />,
      // },
      {
        name: t("sideNavigation.company.company"),
        key: ROUTES.COMPANY,
        icon: <CompanyMenuSvgIcon />,
        annotations: {
          [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.COMPANY,
        },
        sub: [
          {
            name: t("sideNavigation.company.companyDetails"),
            path: ROUTES.COMPANY_SETTINGS,
            annotations: {
              [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.COMPANY_SETTINGS,
            },
          },
          {
            name: t("sideNavigation.company.branches"),
            path: ROUTES.COMPANY_BRANCHES,
            annotations: {
              [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.COMPANY_BRANCHES,
            },
          },
          {
            name: t("sideNavigation.company.employees"),
            path: ROUTES.COMPANY_EMPLOYEES,
            annotations: {
              [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.COMPANY_EMPLOYEES,
            },
          },
        ],
      },

      {
        name: t("sideNavigation.management.management"),
        key: ROUTES.MANAGEMENT,
        icon: <ControlMenuSvgIcon />,
        annotations: {
          [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.MANAGEMENT,
        },
        sub: [
          {
            name: t("sideNavigation.management.departments"),
            path: ROUTES.MANAGEMENT_CABINET_DEPARTMENTS,
            annotations: {
              [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.MANAGEMENT_DEPARTMENTS,
            },
          },
          // {
          //   name: "Склады",
          //   path: ROUTES.MANAGEMENT_CABINET_WAREHOUSE,
          //   roles: [E_USER_ROLES.ROLE_BRANCH_ADMIN, E_USER_ROLES.ROLE_WAREHOUSE_MANAGER],
          // },
        ],
      },

      {
        name: t("sideNavigation.settings.settings"),
        key: ROUTES.SETTINGS,
        icon: <SettingsMenuSvgIcon />,
        annotations: {
          [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.SETTINGS,
        },
        sub: [
          {
            name: t("sideNavigation.settings.profile"),
            path: ROUTES.SETTINGS_PROFILE,
            annotations: {
              [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.SETTINGS_PROFILE,
            },
          },
          {
            name: t("sideNavigation.settings.security"),
            path: ROUTES.SETTINGS_SECURITY,
            annotations: {
              [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.SETTINGS_SECURITY_CHANGE_PASSWORD,
            },
          },
        ],
      },
    ] as TMenuList[];
  }, [i18n.language]);
};
