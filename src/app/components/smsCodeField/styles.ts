import { createUseStyles } from "react-jss";
import Color from "color";
import { $colors } from "#styles/variables";
import { $variables } from "#styles/antModifyVars";

const primaryColor = new Color($colors.primary);
const primaryColorHover = primaryColor.darken(0.05).toString();

export const useStyles = createUseStyles({
  pinCode: {
    margin: "0 -20px 0 0",

    "& .pincode-input-text": {
      borderRadius: $variables.borderRadius,
    },

    "&$pinCodeComplete": {
      "& .pincode-input-text": {
        borderColor: `${$colors.success} !important`,
      },
    },

    "&$pinCodeError": {
      "& .pincode-input-text": {
        borderColor: `${$colors.danger} !important`,
      },
    },
  },
  pinCodeTime: {
    display: "flex",
    color: "inherit",
    fontSize: "inherit",

    "& .ant-statistic-title": {
      color: "inherit",
      fontSize: "inherit",
    },

    "& .ant-statistic-content": {
      color: "inherit",
      fontSize: "inherit",
      paddingLeft: "5px",
    },
  },
  pinCodeComplete: {},
  pinCodeError: {},
  alert: {
    margin: "16px 0 0",
  },
  resendBtn: {
    display: "inline-block",
    borderBottom: `1px solid ${$colors.primary}`,
    lineHeight: 1.3,
    cursor: "pointer",

    "&:hover, &:focus": {
      color: primaryColorHover,
    },
  },
  resendBtnLoading: {
    margin: "0 0 0 10px",
  },
});
