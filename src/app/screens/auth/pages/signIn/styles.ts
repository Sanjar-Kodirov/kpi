import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  infoCont: {
    display: "flex",
    alignSelf: "baseline",
    width: "100%",
    justifyContent: "center",
    marginTop: 24,

    "& span": {
      marginRight: 8,
      color: $colors.grey,
      fontSize: 14,
    },

    "& a": {
      color: $colors.primaryBlue,
      borderBottom: "1px solid #155EEF",

      "&:hover": {
        borderColor: "transparent",
      },
    },
  },
  rememberMe: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",

    "& .ant-form-item-control-input": {
      minHeight: "min-content",
    },
    "& span": {
      color: $colors.grey,
      fontSize: 14,
      cursor: "pointer",
    },
    "& .ant-form-item": {
      margin: 0,
    },
  },
  forgotPassword: {
    "&:hover": {
      color: $colors.primaryBlue,
    },
  },
  checkbox: {
    padding: 0,
    minHeight: "min-content",
  },
});
