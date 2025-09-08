import { createUseStyles } from "react-jss";
import { $colors } from "#styles/variables";

export const useStyles = createUseStyles({
  viewButtons: {
    display: "flex",
    marginLeft: "auto",
    padding: "2px",
    background: "#fff",
    borderRadius: "10px",
  },
  viewButton: {
    fontSize: "24px",
    padding: "12px",
    borderRadius: "10px",
    color: $colors.primary,
    background: "#fff",
    border: "none",
  },

  viewButtonActive: {
    cursor: "default",
    background: "#FFF4ED",
    color: "#E62E05",

    "&:hover": {
      background: "#FFF4ED",
      color: "#E62E05",
    },
  },
});
