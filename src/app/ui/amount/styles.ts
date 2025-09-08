import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  amount: {
    display: "flex",
    // width: "max-content",
    height: "32px",

    "& .custom-btn.ant-btn-icon-only": {
      flexShrink: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "32px",
      height: "100%",
      padding: "0",

      border: "1px solid #F2F4F7",
      background: "none",
      color: `${$colors.grey} !important`,
      borderRadius: "4px",
      fontSize: 0,
      lineHeight: 0,

      "&:after": {
        "--antd-wave-shadow-color": $colors.primary,
      },
    },
  },
  input: {
    flexShrink: 0,
    height: "100%",
    width: 70,

    "& .ant-input-number": {
      flexGrow: 1,
      height: "100%",
      borderRadius: "4px",
      border: "1px solid #F2F4F7",
      background: "none",

      "& .ant-input-number-input-wrap": {
        height: "100%",
      },

      "& .ant-input-number-input": {
        height: "100%",
        padding: "0 5px",
        textAlign: "center",
      },

      "& .ant-input-number-handler-wrap": {
        display: "none !important",
      },
    },
  },
  amountText: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 0 0 8px",
    fontSize: "18px",
    lineHeight: 1,
    color: "#667085",
    fontWeight: 500,
  },
  unit: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 0 0 8px",
    padding: "0 14px",

    backgroundColor: "#2970FF",
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 700,
    color: "#fff",
    overflow: "hidden",

    "& > div": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  unitClickable: {
    cursor: "pointer",
  },
  minusBtn: {
    margin: "0 8px 0 0",
  },
  plusBtn: {
    margin: "0 0 0 8px",
  },
});
