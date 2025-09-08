import React, { useEffect } from "react";

import { isAppTypeCabinet, ROUTES, RUNTIME_STATE } from "#constants/index";
import { $currentUser } from "#stores/account";
import { updateRuntimeState } from "#stores/index";

import { useNavigate } from "react-router-dom";

import { $currentCompany } from "#stores/cabinetCompany";
import { $cabinetPermissionUsers } from "#stores/permissions/index";
import { Spinner } from "#ui/spinner";

export const useAccessToMainScreen = () => {
  const navigate = useNavigate();
  const { data: authorities } = $cabinetPermissionUsers.store();
  const currentUserState = $currentUser.store();
  const { data: currentUser } = currentUserState;

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      navigate(ROUTES.USER_SIGN_IN, { replace: true });
    }

    $currentUser.request();
    isAppTypeCabinet && $cabinetPermissionUsers.request();

    const runtimeStateFromLocalStorage = localStorage.getItem(RUNTIME_STATE);
    if (runtimeStateFromLocalStorage) {
      updateRuntimeState(JSON.parse(runtimeStateFromLocalStorage));
    }

    return () => {
      $currentUser.reset();
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (isAppTypeCabinet) {
        isAppTypeCabinet && $currentCompany.request();
      }
    }
  }, [currentUser]);

  if (!currentUser || isAppTypeCabinet) {
    return (
      <div className="abs-loader main-loader">
        <Spinner />
      </div>
    );
  }

  if (!currentUser.companyId) {
    return null;
  }
};
