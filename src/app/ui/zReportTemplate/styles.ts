import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  reportOuter: {
    maxWidth: "360px",
    margin: "0 auto",
    boxShadow: "0px 4px 8px -2px rgba(0, 53, 158, 0.1), 0px 2px 4px -2px rgba(0, 53, 158, 0.06)",
  },
  reportWrapper: {},
  report: {
    color: "#000",
    padding: "24px 1.14em",
    fontSize: "1em",
    backgroundColor: "#fff",

    "& strong": {
      fontWeight: 500,
    },
  },
  company: {
    margin: "0 0 0.714em",
    textAlign: "center",

    "& strong": {
      fontSize: "1.14em",
      fontWeight: "600",
    },
  },
  row: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",

    "& span": {
      "&:nth-child(1)": {
        marginRight: 8,
      },
    },
  },
  rowHead: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    fontSize: "1.14em",
  },
  rowInner: {
    padding: "0 0 0 1.14em",
  },
  divider: {
    margin: "0.714em 0",
    borderStyle: "dashed",
    borderWidth: "0 0 1px",
    borderColor: "#98A2B3",
  },
  midHead: {
    margin: "0.714em 0",
    textAlign: "center",
    fontSize: "1.14em",
    textTransform: "uppercase",
  },
  "@media print": {
    reportWrapper: {
      padding: "0 20px 0 0",
      fontSize: "10px",
      fontWeight: "500",
    },
    report: {
      "& strong": {
        fontWeight: "600",
      },
    },
    divider: {
      borderColor: "#000",
    },
  },
});
