import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  odd_child: {
    background: "#f7f7f7",
  },
  custom_checkbox: {
    top: 0,
  },
  item_title: {
    width: " 600px",
    padding: " 5px 0",
  },
  section: {
    fontWeight: "bold",
  },
  tree: {
    width: "100%",
  },
  item: {
    display: " flex",
    alignItems: " center",
    padding: " 0 10px",
  },
  p_r_1: {
    paddingRight: "1rem",
  },
  m_t_1: {
    marginTop: "1rem !important",
  },
  m_r_1: {
    marginRight: "1rem",
  },
  subMenu: {
    "&>div>i": {
      right: 0,
      left: 16,
    },
  },
  subMenuTitle: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "1rem",
  },
  header: {
    marginBottom: " 1rem",
    display: " flex",
    justifyContent: " space-between",
    padding: " 1rem",
    background: " #fff",
    boxShadow: " 0 0 4px rgba(0,0,0,.04), 0 2px 6px rgba(0,0,0,.1)",
    borderRadius: " 6px",
  },
  permissions__tree__menu: {
    background: " #f1f5f9",
    border: "none",
    borderRadius: "5px",
    "& .empty_child": {
      "& i": {
        display: "none",
      },
    },
  },
  site_content: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    background: "white",
    boxShadow: "0 0 4px rgba(0,0,0,.04), 0 2px 6px rgba(0,0,0,.1)",
    borderRadius: "6px",
    marginBottom: "1rem",
    padding: " 1rem",
  },
  in: {
    position: "relative",
    background: " #fff",
    boxShadow: " 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: " 6px",
    padding: "1rem",
    flexGrow: " 1",
    "&>div": {
      margin: ".5rem",
    },
  },
  title: {
    margin: 0,
  },
  custom_button: {
    marginRight: "-10px",
  },
  onlyicon: {
    background: "initial",
    padding: " 0",
    height: " 40px",
    width: " 40px",
    lineHeight: " 0",
  },
  b_r_30: {
    border: "none",
    "&:focus , &:hover , &:active ": {
      background: "none",
    },
  },
  custom__popover__item: {
    "&>.ant-btn": {
      display: "block",
      width: "100%",
      height: "auto",
      padding: "11px 15px 10px",

      border: "none",
      boxShadow: "none",
      borderRadius: 0,
      background: "none",

      fontSize: "14px",
      lineHeight: 1,
      color: "#696974",
      textAlign: "left",

      "&:hover, &:focus": {
        background: "#f5f5f5",
        color: "darken(#696974, 30)",
      },

      "&[disabled]": {
        opacity: "0.5",
      },

      "&.ant-btn-danger": {
        color: "#ff4d4f",
        background: "none",

        "&:hover ": {
          color: "darken(#ff4d4f, 20)",
          background: "rgba(255, 77, 79, .1)",
        },
      },
    },
  },
  custom__popover: {
    "& .ant-popover-inner-content": {
      padding: 0,
    },
    padding: 0,
    zIndex: 999,

    "ant-popover-arrow": {
      display: "none",
    },

    "ant-popover-inner": {
      minWidth: "218px",

      background: "#FFFFFF",
      border: "1px solid #F1F1F5",
      boxShadow: " 0px 5px 15px rgba(68, 68, 79, 0.05)",
      borderRadius: "8px",

      "&-content": {
        padding: "5px 0",
      },
    },

    "&-btn": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      boxChadow: "none",
      background: "transparent",
      height: "24px",
      padding: "0 4px",

      "&:hover, &:focus": {
        background: "transparent",
      },

      svg: {
        fill: "#A9A9B5",
      },
    },

    "&-btn-2 ": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      boxShadow: "none",
      background: "transparent",
      width: "28px",
      height: "24px",
      padding: "0 4px",

      "&:hover, &:focus": {
        background: "transparent",
      },

      svg: {
        fill: "#A9A9B5",
      },
    },
  },
});
