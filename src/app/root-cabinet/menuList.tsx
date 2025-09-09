import { E_APP_TYPE, ROUTES } from "#constants/index";
import { CompanyMenuSvgIcon, HomeMenuSvgIcon, ServicesMenuSvgIcon } from "#svgIcons/navigation";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TMenuList } from "#src/app/screens/main/sideNavigation";
import { PERMISSIONS } from "#src/hocs/withPermission/constants";
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
        name: "My evaluations",
        icon: <ServicesMenuSvgIcon />,
        path: ROUTES.EVALUATIONS,
        rolesWithAccess: [E_USER_ROLES.deputy_member, E_USER_ROLES.regional_moderator],
      },
    ] as TMenuList[];
  }, [i18n.language]);
};
