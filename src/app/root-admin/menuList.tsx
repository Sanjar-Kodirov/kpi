import { ROUTES } from "#constants/index";
import { CompanyMenuSvgIcon, ControlMenuSvgIcon } from "#svgIcons/navigation";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TMenuList } from "#src/app/screens/main/sideNavigation";

export const useAdminMenuList = () => {
  const { i18n } = useTranslation();

  return useMemo(() => {
    return [
      {
        name: "Мониторинг",
        key: ROUTES.MONITORING,
        icon: <CompanyMenuSvgIcon />,
        sub: [
          {
            name: "Компании",
            path: ROUTES.MONITORING_COMPANIES,
          },
        ],
      },
      {
        name: "Управление",
        key: ROUTES.MANAGEMENT,
        icon: <ControlMenuSvgIcon />,
        sub: [],
      },
    ] as TMenuList[];
  }, [i18n.language]);
};
