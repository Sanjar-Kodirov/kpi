import { $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  branchSelect: {
    minWidth: "248px",

    "& .custom-select": {
      width: "100%",

      "& .ant-select-selector": {
        borderRadius: $variables.borderRadius,
        background: "#fff",
        boxShadow: "0px 1px 2px rgba(29, 27, 51, 0.05)",
        border: "none",
      },
    },
  },
  info: {
    minWidth: "248px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 1px 2px rgba(29, 27, 51, 0.05)",
    height: "48px",
    padding: "4px 12px",
    borderRadius: $variables.borderRadius,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "14px",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  title: {
    color: "#667085",
    fontWeight: "bold",
    marginBottom: "2px",
  },
  infoRow: {
    display: "inline-block",
    whiteSpace: "nowrap",
    "&:first-child": {
      marginBottom: "4px",
    },
    "@media(max-width: 900px)": {
      maxWidth: "200px",
    },
  },
});
