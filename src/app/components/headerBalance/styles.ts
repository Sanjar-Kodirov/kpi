import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  balanceWrapper: {
    position: "relative",
    padding: "8px 12px",
    minWidth: "160px",
    height: "48px",
    background: "#fff",
    boxShadow: "0px 1px 2px rgba(29, 27, 51, 0.05)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    // marginRight: "16px",
  },
  balanceIcon: {
    margin: "0 10px 0 0",
    fontSize: 0,
    color: $colors.primary,
  },
  balanceLabel: {
    fontSize: "12px",
    lineHeight: "18px",
    color: "#667085",
  },
  balanceSum: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1D2939",

    "& span": {
      fontWeight: 400,
      color: $colors.grey,
    },
  },
});
