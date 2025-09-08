import { createUseStyles } from "react-jss";
import { $colors } from "#styles/variables";

export const useStyles = createUseStyles({
  "@global": {
    ".custom-step": {
      marginBottom: 46,
      display: "flex",
      alignItems: "center",
      maxWidth: 800,
      "& .ant-steps-item-title": {
        lineHeight: 1.1,
        fontSize: 14,
        width: "max-content",
        fontWeight: 500,
        color: `${$colors.textColor} !important`,
      },
      "& .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title": {
        color: `${$colors.primary} !important`,
      },
      "& .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-tail:after": {
        backgroundColor: $colors.primary,
      },
    },
  },
});
