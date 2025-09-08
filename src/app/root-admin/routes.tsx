import React from "react";

import { ROUTES } from "#constants/index";
import { UserAuthScreen } from "#src/app/screens/auth";
import { SignIn } from "#src/app/screens/auth/pages/signIn";
import { MainScreen } from "#src/app/screens/main";
import { MainScreenWrapper } from "#src/app/screens/main/mainScreenWrapper";
import { createBrowserRouter } from "react-router-dom";
import { useAdminMenuList } from "#src/app/root-admin/menuList";
import { CompanyDetails } from "#src/app/sections/admin/monitoring/companyDetails";
import { CompanyDetailsInfo } from "#src/app/sections/admin/monitoring/companyDetails/companyInfo";
import { AdminUsers } from "#src/app/sections/admin/management/users";
import { WithHttpInterceptor } from "#components/withHttpInterceptor";
import { AdminDepartmentsList } from "../sections/admin/monitoring/companyDetails/departments/list";
import { AdminSystemUpgradeList } from "../sections/admin/management/systemUpgrade";
import { PermissionAdmin } from "#src/app/sections/admin/permissionAdmin/index";

export const adminRoutes = createBrowserRouter([
  {
    element: <WithHttpInterceptor />,
    children: [
      {
        path: ROUTES.USER,
        element: <UserAuthScreen />,
        children: [
          {
            path: ROUTES.USER_SIGN_IN,
            element: <SignIn />,
          },
        ],
      },
      {
        path: "/",
        element: <MainScreenWrapper />,
        children: [
          {
            path: "/",
            element: <MainScreen useMenuList={useAdminMenuList} />,
            children: [
              {
                path: "",
                element: <div></div>,
              },

              {
                path: `${ROUTES.MONITORING_COMPANIES}/:companyId`,
                element: <CompanyDetails />,
                children: [
                  {
                    path: ``,
                    element: <CompanyDetailsInfo />,
                  },

                  {
                    path: `management`,
                    children: [
                      {
                        path: `departments`,
                        element: <AdminDepartmentsList />,
                      },
                    ],
                  },
                ],
              },
              {
                path: ROUTES.MANAGEMENT,
                children: [
                  {
                    path: "users",
                    element: <AdminUsers />,
                  },
                  {
                    path: "system-upgrade",
                    element: <AdminSystemUpgradeList />,
                  },
                  {
                    path: "control-admin",
                    element: <PermissionAdmin permissionType="ADMIN" />,
                  },
                  {
                    path: "control-cabinet",
                    element: <PermissionAdmin permissionType="CABINET" />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
