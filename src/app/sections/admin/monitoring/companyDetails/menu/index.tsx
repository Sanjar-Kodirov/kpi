import React, { useEffect, useMemo, useState } from "react";
import { Menu, MenuProps } from "antd";
import { Link, useLocation, useParams } from "react-router-dom";
import { ROUTES } from "#constants/index";
import { i18n } from "#src/localization/i18n";

export const AdminCompanyDetailsMenuList = () => {
  const location = useLocation();
  const { companyId } = useParams<{ companyId: string }>();

  const getCurrentPath = (): string => {
    return location.pathname;
  };

  const [current, setCurrent] = useState(getCurrentPath());

  useEffect(() => {
    setCurrent(getCurrentPath());
  }, [location.pathname]);

  const getPath = (path: string, endPath?: string) => path + "/" + companyId + (endPath ? endPath : "");

  const menuList: MenuProps["items"] = useMemo(
    () => [
      {
        label: <Link to={getPath(ROUTES.MONITORING_COMPANIES)}>Информация</Link>,
        key: getPath(ROUTES.MONITORING_COMPANIES),
      },
      {
        label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/branches")}>Филиалы</Link>,
        key: getPath(ROUTES.MONITORING_COMPANIES, "/branches"),
      },
      {
        label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/employees")}>Сотрудники</Link>,
        key: getPath(ROUTES.MONITORING_COMPANIES, "/employees"),
      },
      {
        label: "Каталог",
        key: getPath(ROUTES.MONITORING_COMPANIES, "/catalog"),
        children: [
          {
            label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/catalog/menu")}>Меню</Link>,
            key: getPath(ROUTES.MONITORING_COMPANIES, "/catalog/menu"),
          },
          {
            label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/catalog/food")}>Блюда</Link>,
            key: getPath(ROUTES.MONITORING_COMPANIES, "/catalog/food"),
          },
          {
            label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/catalog/bar")}>Товары</Link>,
            key: getPath(ROUTES.MONITORING_COMPANIES, "/catalog/bar"),
          },
          {
            label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/catalog/others")}>Прочее</Link>,
            key: getPath(ROUTES.MONITORING_COMPANIES, "/catalog/others"),
          },
          {
            label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/catalog/ingredients")}>Ингредиенты</Link>,
            key: getPath(ROUTES.MONITORING_COMPANIES, "/catalog/ingredients"),
          },
          {
            label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/catalog/semi-finished")}>Заготовки</Link>,
            key: getPath(ROUTES.MONITORING_COMPANIES, "/catalog/semi-finished"),
          },
        ],
      },
      {
        label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/receipts")}>Чеки</Link>,
        key: getPath(ROUTES.MONITORING_COMPANIES, "/receipts"),
      },
      {
        label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/logs")}>Логи</Link>,
        key: getPath(ROUTES.MONITORING_COMPANIES, "/logs"),
      },
      {
        label: "Управление",
        key: getPath(ROUTES.MONITORING_COMPANIES, "/management"),
        children: [
          {
            label: (
              <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/management/departments")}>
                {i18n.t("fields.departments")}
              </Link>
            ),
            key: getPath(ROUTES.MONITORING_COMPANIES, "/management/departments"),
          },
          {
            label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/management/halls/settings")}>Залы и столы</Link>,
            key: getPath(ROUTES.MONITORING_COMPANIES, "/management/halls/settings"),
          },
        ],
      },
      {
        label: "Кухня",
        key: getPath(ROUTES.MONITORING_COMPANIES, "/kitchen"),
        children: [
          {
            label: (
              <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/kitchen/orders-management")}>Управление заказами</Link>
            ),
            key: getPath(ROUTES.MONITORING_COMPANIES, "/kitchen/orders-management"),
          },
        ],
      },
      {
        label: "Посадка",
        key: getPath(ROUTES.MONITORING_COMPANIES, "/seating"),
        children: [
          {
            label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/seating/halls")}>Залы и столы</Link>,
            key: getPath(ROUTES.MONITORING_COMPANIES, "/seating/halls"),
          },
          {
            label: <Link to={getPath(ROUTES.MONITORING_COMPANIES, "/seating/reservation")}>Брони</Link>,
            key: getPath(ROUTES.MONITORING_COMPANIES, "/seating/reservation"),
          },
        ],
      },
    ],
    [companyId],
  );

  return <Menu selectedKeys={[current]} mode="horizontal" items={menuList} />;
};
