import React from "react";

import { ROUTES, E_APP_TYPE } from "#constants/index";
import { DepartmentsList } from "#src/app/modules/departments/list";
import { UserAuthScreen } from "#src/app/screens/auth";
import { SignIn } from "#src/app/screens/auth/pages/signIn";
import { MainScreen } from "#src/app/screens/main";
import { MainScreenWrapper } from "#src/app/screens/main/mainScreenWrapper";
import { createBrowserRouter } from "react-router-dom";
import { ResetPassword } from "#src/app/screens/auth/pages/reset-password";
import { useCabinetMenuList } from "#src/app/root-cabinet/menuList";
import { WithHttpInterceptor } from "#components/withHttpInterceptor";
import { WithPermission } from "#src/hocs/withPermission";
import { PERMISSIONS } from "#src/hocs/withPermission/constants";

export const cabinetRoutes = createBrowserRouter([
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
          // {
          //   path: ROUTES.USER_SIGN_UP,
          //   element: <Registration />,
          // },
          {
            path: ROUTES.USER_RESET_PASSWORD,
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "/",
        element: <MainScreenWrapper />,
        children: [
          {
            path: "/",
            element: <MainScreen useMenuList={useCabinetMenuList} />,
            children: [
              {
                path: ROUTES.MANAGEMENT_CABINET_DEPARTMENTS,
                element: (
                  <WithPermission
                    annotations={{
                      [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.MANAGEMENT_DEPARTMENTS,
                    }}
                  >
                    <DepartmentsList />
                  </WithPermission>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);
