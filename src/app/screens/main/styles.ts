import { $colors } from "#styles/variables";
import { ASIDE_SETTINGS } from "#constants/index";
import { createUseStyles } from "react-jss";

type TStyles = {
  [key: string]: string;
};

export const useStyles = createUseStyles((props: TStyles) => {
  console.log("props from styles", props);
  return {
    siteWrapper: {
      position: "relative",
      height: "100%",
      overflow: "hidden",

      "& .ant-layout": {
        background: "none",
      },
    },
    siteLayoutWrap: {
      height: "100%",
    },
    contentLayout: {},
    contentInner: {
      position: "relative",
      height: "100%",
      overflow: "auto",
    },
    "@media (max-width: 1200px)": {
      siteLayoutWrap: {
        padding: `0 0 0 ${ASIDE_SETTINGS.COLLAPSED}px`,
      },
    },
    center: {
      alignItems: "center",
    },
    asideInner: {
      padding: "0 5px",
    },
    addCustomer: {
      display: "flex",
      alignItems: "center",
      padding: "5px 22px",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
    },
    addCustomerIcon: {
      zIndex: 20,
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      marginRight: 10,
      minWidth: 24,
      height: 24,
    },
    addCustomerText: {
      zIndex: 10,
      fontSize: 15,
      fontWeight: 700,
      lineHeight: 1.4,
      color: $colors.primary,
      whiteSpace: "nowrap",
      overflow: "hidden",
      transition: ".2s",
    },

    addCustomerCollapsed: {
      "& $addCustomerText": {
        opacity: 0,
        // transform: "translateX(-200px)",
      },
    },
  };
});
