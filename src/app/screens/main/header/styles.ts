import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  header: {
    position: "relative",
    zIndex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 24px 8px 16px",
    height: "64px",
    lineHeight: "normal",
    background: "none",
  },
  headerLeftSide: {
    display: "flex",
    alignItems: "center",
  },
  headerRightSide: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    columnGap: 16,
  },
  openWebCash: {},
  managerNameWrapper: {
    width: "248px",
    height: "48px",
    boxShadow: "0px 1px 2px rgba(29, 27, 51, 0.05)",
    background: "#fff",
    borderRadius: "8px",
    padding: "5px 14px",
  },
  managerNameLabel: {
    marginBottom: 0,
  },
  branchNameWrapper: {
    display: "flex",
    alignItems: "center",
    width: "248px",
    height: "48px",
    boxShadow: "0px 1px 2px rgba(29, 27, 51, 0.05)",
    background: "#fff",
    borderRadius: "8px",
    padding: "0 14px",
  },
  branchName: {
    fontSize: "14px",
  },

  burgerButton: {
    background: "transparent",
    border: "none",
    width: "42px",
    height: "40px",
    padding: 0,

    "&:focus": {
      background: "transparent",
    },
    "&:hover": {
      background: "rgba(255, 255, 255, .15)",
    },
    "&:active": {
      background: "rgba(255, 255, 255, .15)",
    },
  },

  "@media (max-width: 1100px)": {
    openWebCash: {
      display: "none",
    },
  },
});
