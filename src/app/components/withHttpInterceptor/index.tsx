import React, { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { registerHttpInterceptors } from "#core/httpClient";

export const WithHttpInterceptor = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    registerHttpInterceptors(navigate);
  }, []);

  return <Outlet />;
};
