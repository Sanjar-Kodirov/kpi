import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".sideStatistics": {
      position: "relative",
      padding: "20px 8px 20px 4px",
      minHeight: "200px",

      "&__block": {
        margin: "0 0 8px",

        "& h2": {
          margin: "0 0 10px",
          fontSize: "16px",
          fontWeight: "600",
        },
      },
      "&__row": {
        display: "flex",
        justifyContent: "space-between",
        margin: "0 0 7px",
        fontSize: "14px",
      },
      "&__rowName": {
        color: $colors.grey,
      },
      "&__rowValue": {
        fontWeight: "500",
        color: $colors.success,
      },
    },
  },
});
