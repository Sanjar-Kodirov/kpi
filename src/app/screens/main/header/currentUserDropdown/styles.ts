import { $colors, $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  userBlockWr: {
    display: "flex",
    alignItems: "center",
    minWidth: "240px",
    height: "100%",
  },
  userRow: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 12px",
    cursor: "pointer",
    transition: "all 150ms ease-in-out",
    borderRadius: $variables.borderRadius,
    background: "#fff",
    boxShadow: "0px 1px 2px rgba(29, 27, 51, 0.05)",

    "&.ant-popover-open": {
      boxShadow: "0px 0 0 2px rgba(22, 179, 100, 0.2)",
    },
  },
  userPhoto: {
    width: "40px",
    height: "40px",
    marginRight: 12,
  },
  userPhotoPlaceholder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    border: "1px solid #fff",
    borderRadius: "50%",
    color: $colors.primary,

    "& svg": {
      width: "20px",
    },
  },
  userDetails: {
    flexGrow: 1,
  },
  userRight: {
    margin: "0 0 0 8px",
    flexShrink: 0,
    color: "#667085",
  },

  userImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  },
  noUserImg: {
    color: $colors.grey,
    fontSize: 0,

    "& svg": {
      width: "22px",
      height: "22px",
    },
  },

  userName: {
    fontSize: 14,
    lineHeight: 1,
    color: "#344054",
  },
  branch: {
    fontSize: 14,
    color: "#667085",
    marginTop: 3,
  },

  popoverWrap: {
    "& .ant-popover-inner-content": {
      padding: "8px 0",
    },

    "& ..ant-popover-inner": {
      boxShadow: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
    },
  },

  firstBlock: {
    transition: "all 150ms ease",
    minWidth: 240,
  },
  inactiveFirstBlock: {
    marginLeft: "-240px",
  },
  dropdown: {
    maxWidth: 240,
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  secondBlock: {
    minWidth: 240,
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    color: "#101828",
    fontSize: 16,
    lineHeight: 1.2,
    width: "100%",
    padding: "10px 14px",
    cursor: "pointer",
    transition: "all 150ms ease-in-out",

    "&:hover": {
      background: "rgba(22, 179, 100, .1)",
    },

    "& > svg": {
      width: 20,
      height: 20,
      margin: "0 8px 0 0",
      color: "#667085",
    },
  },
  dropdownItemActive: {
    cursor: "default",

    "&:hover": {
      background: "none",
    },
  },
  dropdownItemInner: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "& svg": {
      color: $colors.primaryBlue,
    },
  },
  dropdownItemBack: {
    padding: "10px 14px",
    fontSize: 0,
    cursor: "pointer",

    "&:hover": {
      color: $colors.primaryBlue,
    },
  },
});
