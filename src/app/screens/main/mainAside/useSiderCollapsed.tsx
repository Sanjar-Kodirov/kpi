// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react";

import { ASIDE_SETTINGS } from "#constants/index";
import { useWindowResize } from "#hooks/useWindowResize";

export const useSiderCollapsed = () => {
  const windowWidth = useWindowResize();
  const [siderCollapsed, setSiderCollapsed] = useState(
    windowWidth <= ASIDE_SETTINGS.BREAK ? true : localStorage.getItem(ASIDE_SETTINGS.LOCAL_COLLAPSED_NAME) === "1",
  );

  return {
    siderCollapsed,
    setSiderCollapsed,
    windowWidth,
  };
};
