import React, { useEffect } from "react";

import { ROUTES } from "#constants/index";
import { $currentUser } from "#stores/account";

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

    if (token) {
      $currentUser.request({ token });
    }

    if (window.location.pathname === "/") {
      navigate(ROUTES.EVALUATIONS, { replace: true });
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
