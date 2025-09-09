import React, { useEffect } from "react";

import { ROUTES, RUNTIME_STATE } from "#constants/index";
import { $currentUser } from "#stores/account";
import { updateRuntimeState } from "#stores/index";

import { useNavigate } from "react-router-dom";

import { Spinner } from "#ui/spinner";

export const useAccessToMainScreen = () => {
  const navigate = useNavigate();
  const currentUserState = $currentUser.store();
  const { data: currentUser } = currentUserState;

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      navigate(ROUTES.USER_SIGN_IN, { replace: true });
    }

    $currentUser.request({ token: token || "" });

    const runtimeStateFromLocalStorage = localStorage.getItem(RUNTIME_STATE);
    if (runtimeStateFromLocalStorage) {
      updateRuntimeState(JSON.parse(runtimeStateFromLocalStorage));
    }

    return () => {
      $currentUser.reset();
    };
  }, []);

  if (!currentUser) {
    return (
      <div className="abs-loader main-loader">
        <Spinner />
      </div>
    );
  }
};
