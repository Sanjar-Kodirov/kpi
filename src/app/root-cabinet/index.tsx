import React from "react";
import { useStyles } from "#styles/global";
import { cabinetRoutes } from "./routes";
import { RouterProvider } from "react-router-dom";

export const RootCabinet = () => {
  useStyles();

  return (
    <>
      <RouterProvider router={cabinetRoutes} />
    </>
  );
};
