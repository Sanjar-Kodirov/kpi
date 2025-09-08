import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  drawer: {
    display: "flex",

    "& .ant-drawer-content-wrapper": {
      // top: "70px",
    },

    "& .ant-drawer-body": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "0",
    },

    "& .ant-drawer-content": {
      padding: "0 16px",
      background: $colors.bodyColor,
    },

    "& .ant-drawer-header": {
      display: "none",
    },
  },
  drawerInner: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "24px 16px",
    background: "#fff",
  },
  drawerContentMiddle: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    padding: "10px 10px 0 0",
    overflowY: "auto",
  },
  drawerContentBottom: {
    margin: "24px 0 0",
    flexShrink: 0,
  },
});
