import { $colors } from "#styles/antModifyVars";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".radioButtonsCustom": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 6,
      padding: 6,
      backgroundColor: "#F9FAFB",
      height: "max-content",
      alignSelf: "center",
      borderRadius: 8,
      "& .ant-radio-button-wrapper-checked": {
        fontWeight: "600 !important",
      },
      "& .ant-radio-button-wrapper": {
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        fontWeight: "600 !important",
        background: "transparent",
        color: $colors.grey,
        padding: "10px 22px",
        cursor: "pointer",
        transition: "ease-in 0.1s",
        border: "none",
        "&:before": {
          display: "none",
        },
      },

      "&.default": {
        border: "1px solid #F2F4F7",
      },
      "&.auth": {
        "& .ant-radio-button-wrapper-checked": {
          color: "#344054 !important",
          backgroundColor: "#fff !important",
          boxShadow: "0px 1px 2px rgba(29, 27, 51, 0.05) !important",
        },
        "& .ant-radio-button-wrapper": {
          "&:hover": {
            color: "#344054",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px rgba(29, 27, 51, 0.05)",
          },
        },
      },
    },
  },
});
