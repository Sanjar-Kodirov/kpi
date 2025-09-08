import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".customContextPopover": {
      "& .ant-popover-inner-content": {
        padding: "5px 0",
      },

      "&__item": {
        minWidth: "200px",

        "& .ant-btn, &-link": {
          display: "block",
          width: "100%",
          height: "auto",
          padding: "11px 15px 10px !important",
          border: "none",
          boxShadow: "none",
          borderRadius: "0",
          background: "none",
          fontSize: "14px",
          lineHeight: 1,
          color: "#696974",
          textAlign: "left",

          "&:hover, &:focus": {
            background: "#f5f5f5",
            color: "darken(#696974, 30)",
          },

          "&[disabled]": { opacity: 0.5 },

          "&.ant-btn-dangerous": {
            color: $colors.danger,
            background: "none",

            "&:hover": {
              color: "darken(#ff4d4f, 20)",
              background: "rgba(255, 77, 79, .1)",
            },
          },
        },

        "& .ant-upload.ant-upload-select": {
          display: "block",
        },
      },

      "&__contextBtn": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        boxShadow: "none",
        background: "transparent",
        width: "26px",
        height: "26px",
        minWidth: 0,
        padding: "0 4px",
        color: $colors.primary,

        "&:hover, &:focus": {
          background: "transparent",
        },

        "&[disabled]": {
          background: "transparent",

          "&:hover, &:focus": {
            background: "transparent",
          },
        },

        "& svg": {
          fill: "#A9A9B5",
        },
      },
    },
  },
});
