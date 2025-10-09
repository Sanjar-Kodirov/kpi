import { $colors, $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

type Props = {
  sideInnerBg: "light" | "dark";
};

export const useStyles = createUseStyles<string, Props>(() => ({
  aside: {
    backgroundColor: "#fff",
    borderRadius: "0px 12px 0px 0px",
    boxShadow: "0px 1px 2px rgba(29, 27, 51, 0.05)",
    zIndex: 10,

    "&.ant-layout-sider-collapsed": {
      "& $layoutAsideTriggerWr": {
        alignItems: "center",
        flexDirection: "column-reverse",
      },
      "& $layoutAsideTrigger": {
        "& svg": {
          transform: "rotate(180deg)",
        },
      },
      "& $layoutAsideTriggerText": {
        display: "none",
      },
      "& $logoIcon": {
        fontSize: "16px",
        fontWeight: "800",
        letterSpacing: "1px",
        textTransform: "uppercase",
        background: "#344054",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transform: "scale(0.9)",
      },
      "& $logoLabel": {
        fontSize: "14px",
        letterSpacing: "0.5px",
        background: "#344054",
        fontWeight: "800",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "0 1px 3px rgba(0,0,0,0.1)",
        padding: "10px 20px",
      },

      "& $asideBottom": {
        paddingLeft: "8px",
        paddingRight: "8px",
      },

      "& $versionBlock": {
        textAlign: "center",

        "& span": {
          display: "none",
        },
      },
    },

    "& .ant-layout-sider-children": {
      display: "flex",
      flexDirection: "column",
    },
  },
  asideInner: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    background: (props) => (props.sideInnerBg === "light" ? "#ffffff" : $colors.dark),
    borderRadius: "0 12px 0 0",
  },
  logoIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    transition: "transform 150ms cubic-bezier(.645,.045,.355,1)",
    fontSize: "18px",
    fontWeight: "700",
    color: "#1f2937",
    letterSpacing: "1px",
    textTransform: "uppercase",
    background: "#344054",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logoLabel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "width 150ms cubic-bezier(.645,.045,.355,1), opacity 300ms ease-in-out",
    width: 164,
    height: 40,
    padding: "0 0 0 3px",
    overflow: "hidden",
    opacity: 1,
    animation: "$fadeInText 300ms ease-in-out",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1f2937",
    letterSpacing: "0.5px",
    background: "#344054",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 1px 3px rgba(0,0,0,0.1)",
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logoWrapper: {
    // padding: "16px 0 16px",
    // fontSize: 16,
    // lineHeight: 0,
    // textAlign: "center",
    // "& a": {
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   color: $colors.dark,
    // },
  },

  navigation: {
    margin: "20px 0 0",
    overflowY: "auto",
    overflowX: "hidden",
  },
  asideBottom: {
    padding: "16px 16px",
    margin: "auto 0 0",
    display: "flex",
    flexDirection: "column",
    transition: "padding 150ms ease-in-out",
  },
  registrationApayButtonCollapsed: {
    "& $registrationApayButtonText": {
      width: 0,
      padding: 0,
    },
  },
  registrationApayButtonText: {
    width: "166px",
    padding: "0 0 0 12px",
    transition: "all 150ms",
    overflow: "hidden",
    whiteSpace: "pre-line",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "20px",
    textAlign: "left",

    "& div": {
      width: "166px",
    },
  },
  companyRegisteredInApay: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: $variables.borderRadius,
    background: "#344054",
  },
  companyRegisteredInApayCollapsed: {
    "& $companyRegisteredInApayText": {
      width: 0,
      padding: 0,
    },
  },
  companyRegisteredInApayText: {
    width: "166px",
    padding: "0 0 0 14px",
    transition: "all 150ms",
    overflow: "hidden",
    whiteSpace: "pre-line",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "20px",
    color: "#fff",

    "& div": {
      width: "166px",
    },
  },
  layoutAsideTriggerWr: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "100%",
    justifyContent: "space-between",
    alignItems: "baseline",
    margin: "16px 0 0",
    overflow: "hidden",
  },
  layoutAsideTrigger: {
    display: "flex",
    alignItems: "center",
    padding: "6px 0",
    cursor: "pointer",
    color: "#98A2B3",
    fontSize: 0,
    transition: "color 150ms ease-in-out",

    "&:hover": {
      color: "#fff",
    },
  },
  layoutAsideTriggerText: {
    padding: "0 16px 0 0",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "1",
  },
  versionBlock: {
    color: "#98A2B3",
    fontSize: "12px",
  },
  "@media (max-width: 1200px)": {
    aside: {
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 100000,
    },
  },
  "@keyframes fadeInText": {
    "0%": {
      opacity: 0,
      transform: "translateX(-15px) scale(0.95)",
      filter: "blur(2px)",
    },
    "50%": {
      opacity: 0.7,
      transform: "translateX(-5px) scale(0.98)",
      filter: "blur(1px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0) scale(1)",
      filter: "blur(0px)",
    },
  },
}));
