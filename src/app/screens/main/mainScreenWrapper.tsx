import React from "react";
import { useAccessToMainScreen } from "./useAccessToMainScreen";
import { Outlet } from "react-router-dom";

export const MainScreenWrapper = () => {
  const blockerView = useAccessToMainScreen();

  if (blockerView) {
    return blockerView;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
