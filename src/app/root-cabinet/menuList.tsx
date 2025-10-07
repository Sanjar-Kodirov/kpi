import { ROUTES } from "#constants/index";
import { CatalogMenuSvgIcon, ReportsMenuSvgIcon, ServicesMenuSvgIcon } from "#svgIcons/navigation";
import { ProfileSvgIcon } from "#src/assets/svg";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TMenuList } from "#src/app/screens/main/sideNavigation";
import { E_USER_ROLES } from "#businessLogic/models/account";

export const useCabinetMenuList = () => {
  const { t, i18n } = useTranslation();

  return useMemo(() => {
    return [
      // {
      //   name: t("sideNavigation.home"),
      //   path: ROUTES.MAIN,
      //   icon: <HomeMenuSvgIcon />,
      // },
      // {
      //   name: t("sideNavigation.company.company"),
      //   key: ROUTES.COMPANY,
      //   icon: <CompanyMenuSvgIcon />,
      //   annotations: {
      //     [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.COMPANY,
      //   },
      //   sub: [
      //     {
      //       name: t("sideNavigation.company.companyDetails"),
      //       path: ROUTES.COMPANY_SETTINGS,
      //       annotations: {
      //         [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.COMPANY_SETTINGS,
      //       },
      //     },
      //   ],
      // },

      {
        name: "Мои оценки",
        icon: <ServicesMenuSvgIcon />,
        path: ROUTES.EVALUATIONS,
        rolesWithAccess: [E_USER_ROLES.regional_moderator, E_USER_ROLES.admin, E_USER_ROLES.super_admin],
      },
      {
        name: "Статистика",
        icon: <ReportsMenuSvgIcon />,
        path: ROUTES.STATISTICS,
        rolesWithAccess: [E_USER_ROLES.regional_moderator, E_USER_ROLES.admin, E_USER_ROLES.super_admin],
      },
      {
        name: "Пользователи для оценки",
        icon: <CatalogMenuSvgIcon />,
        path: "/supervisor-evaluations/users-to-evalute",
        rolesWithAccess: [E_USER_ROLES.admin, E_USER_ROLES.super_admin, E_USER_ROLES.regional_moderator],
      },
      {
        name: "Модераторы",
        icon: <CatalogMenuSvgIcon />,
        path: ROUTES.MANAGE_MODERATOR,
        rolesWithAccess: [E_USER_ROLES.admin, E_USER_ROLES.super_admin],
      },
      {
        name: t("sideNavigation.settings.profile"),
        icon: <ProfileSvgIcon />,
        path: ROUTES.SETTINGS_PROFILE,
        rolesWithAccess: [E_USER_ROLES.regional_moderator, E_USER_ROLES.admin, E_USER_ROLES.super_admin],
      },
    ] as TMenuList[];
  }, [i18n.language]);
};
