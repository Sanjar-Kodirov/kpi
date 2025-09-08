import { createUseStyles } from "react-jss";
import { $colors } from "#styles/variables";

export const useStyles = createUseStyles({
  "@global": {
    ".ui-tabs": {
      "& .ant-tabs-nav": {
        "&:before": {
          display: "none",
        },

        "& .ant-tabs-nav-list": {
          gap: 8,
        },

        "& .ant-tabs-nav-wrap": {
          "& .ant-tabs-tab-active": {
            border: "none",

            "& .ant-tabs-tab-btn": {
              padding: "10px 14px",
              background: $colors.primary,
              color: $colors.bodyColor,
            },
          },
          "& .ant-tabs-tab": {
            margin: 0,
            padding: 0,

            "& .ant-tabs-tab-btn": {
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "16px",
              color: $colors.textColor,
            },
          },

          "& .ant-tabs-ink-bar": {
            display: "none",
          },
        },
      },
      "& .rc-tabs-0-tab-1": {
        display: "none",
      },
    },
  },
});
