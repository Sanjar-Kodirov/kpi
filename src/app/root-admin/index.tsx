import React from "react";
import { useStyles } from "#styles/global";
import { adminRoutes } from "./routes";
import { RouterProvider } from "react-router-dom";

export const RootAdmin = () => {
  useStyles();

  return (
    <>
      <RouterProvider router={adminRoutes} />
    </>
  );
};
