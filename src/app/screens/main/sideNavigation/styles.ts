import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  navigation: {
    position: "relative",

    "&.ant-menu": {
      background: "none",
      color: "#fff",
      fontSize: "16px",
      fontWeight: 600,
      border: "none",

      "& a": {
        color: "#fff",
      },

      "& .ant-menu-submenu-arrow, & .ant-menu-submenu-expand-icon": {
        color: "#fff",
      },
      "& .ant-menu-item, .ant-menu-submenu-title": {
        height: "48px",
        margin: 0,
        padding: "0 0 !important",
        color: "#fff",

        "&:not(.ant-menu-item-selected)": {
          "&:hover": {
            background: "#333147",
            color: $colors.primary,

            "& a": {
              color: $colors.primary,
            },
          },
        },

        "&-selected": {
          background: "#474559",

          "&:after": {
            display: "none",
          },
        },

        "& .ant-menu-title-content": {
          marginLeft: "-8px !important",
        },
      },

      "& .ant-menu-submenu": {
        "&-selected": {
          background: "#0f0e1a",
          color: "#fff",
        },
      },

      "& $item": {},

      "& .ant-menu-inline.ant-menu-sub": {
        background: "#3a3756",
        color: "#fff",

        "& .ant-menu-item, .ant-menu-submenu-title": {
          height: "40px",
          padding: "0 15px 0 22px !important",

          "& .ant-menu-title-content": {
            marginLeft: "0 !important",
          },
        },
      },

      "& .ant-menu-item .ant-menu-item-icon + span, & .ant-menu-submenu-title .ant-menu-item-icon + span, & .ant-menu-item .anticon + span, & .ant-menu-submenu-title .anticon + span":
        {
          marginLeft: "14px",
        },
    },

    "&.ant-menu.ant-menu-inline-collapsed": {
      "&>.ant-menu-item, &>.ant-menu-item-group >.ant-menu-item-group-list>.ant-menu-item, &>.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-submenu>.ant-menu-submenu-title, &>.ant-menu-submenu>.ant-menu-submenu-title":
        {
          padding: "0 calc(50% - 10px)",
        },
    },
  },

  popupMenu: {
    "&.ant-menu-dark .ant-menu-sub, &.ant-menu.ant-menu-dark, &.ant-menu.ant-menu-dark .ant-menu-sub": {
      background: $colors.dark,
      color: "#fff",
    },

    "& a": {
      color: "#fff",

      "&:hover": {
        color: "#fff",
      },
    },

    "& .ant-menu-item": {
      margin: "0 !important",

      "&:hover": {
        background: "#333147",

        "& $menuItemSpan": {
          // borderColor: "#fff",
        },
      },

      "&-selected": {
        background: "#353A63 !important",

        "& $menuItemSpan": {
          // borderColor: "#fff",
        },
      },
    },

    "& .ant-menu-submenu-title": {
      "&:hover": {
        "& $menuItemSpan": {
          // borderColor: "#fff",
        },
      },
    },
  },

  item: {},
  subItem: {},

  menuItemIcon: {
    display: "flex !important",
    justifyContent: "center",
    alignItems: "center",
    width: "64px",
    height: "48px",
  },
  menuItemSpan: {
    display: "inline-block",
    lineHeight: 1.4,
    // borderBottom: "1px solid transparent",
  },
});
