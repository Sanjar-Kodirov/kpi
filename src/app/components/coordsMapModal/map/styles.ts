import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".mapContainer": {
      position: "relative",
      height: 600,
      "& iframe": {
        border: "none",
      },
    },
    ".buttonRowMap": {
      textAlign: "right",
      margin: "15px 0 0",
    },
  },
});
