import React from "react";

import { ROUTES, E_APP_TYPE } from "#constants/index";
import { UserAuthScreen } from "#src/app/screens/auth";
import { SignIn } from "#src/app/screens/auth/pages/signIn";
import { MainScreen } from "#src/app/screens/main";
import { MainScreenWrapper } from "#src/app/screens/main/mainScreenWrapper";
import { createBrowserRouter } from "react-router-dom";
import { useCabinetMenuList } from "#src/app/root-cabinet/menuList";
import { WithHttpInterceptor } from "#components/withHttpInterceptor";
import { WithPermissionLocal } from "#src/hocs/withPermission";
import { EvaluationsList } from "../modules/evaluations/list";
import { E_USER_ROLES } from "#businessLogic/models/account";
import { StatisticsList } from "../modules/statistics/list";
import { EvaluationDetails } from "../modules/evaluations/details";
import { UsersModeratorsAdminsList } from "../modules/moderatorsAdmins/list";
import { ProfilePage } from "../screens/settings";

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
                path: ROUTES.EVALUATIONS,
                element: (
                  <WithPermissionLocal
                    rolesWithAccess={[E_USER_ROLES.regional_moderator, E_USER_ROLES.admin, E_USER_ROLES.super_admin]}
                  >
                    <EvaluationsList />
                  </WithPermissionLocal>
                ),
              },
              {
                path: `${ROUTES.EVALUATIONS}/:id`,
                element: (
                  <WithPermissionLocal
                    rolesWithAccess={[E_USER_ROLES.regional_moderator, E_USER_ROLES.admin, E_USER_ROLES.super_admin]}
                  >
                    <EvaluationDetails />
                  </WithPermissionLocal>
                ),
              },
              {
                path: ROUTES.STATISTICS,
                element: (
                  <WithPermissionLocal
                    rolesWithAccess={[E_USER_ROLES.regional_moderator, E_USER_ROLES.admin, E_USER_ROLES.super_admin]}
                  >
                    <StatisticsList />
                  </WithPermissionLocal>
                ),
              },
              {
                path: ROUTES.MANAGE_MODERATOR,
                element: (
                  <WithPermissionLocal
                    rolesWithAccess={[E_USER_ROLES.regional_moderator, E_USER_ROLES.admin, E_USER_ROLES.super_admin]}
                  >
                    <UsersModeratorsAdminsList />
                  </WithPermissionLocal>
                ),
              },
              {
                path: ROUTES.SETTINGS_PROFILE,
                element: <ProfilePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
