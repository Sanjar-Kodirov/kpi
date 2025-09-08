import { $colors, $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".listRemovableItems": {
      display: "flex",
      flexWrap: "wrap",
    },
    ".itemRemovableItems": {
      display: "inline-flex",
      alignItems: "center",
      padding: "0 16px",
      margin: "0 8px 8px 0",
      height: "40px",
      borderRadius: $variables.borderRadius,
      background: "#F2FBF6",
      fontSize: "14px",
      fontWeight: 600,
      color: $colors.primary,
    },
    ".itemNameRemovableItems": {},
    ".itemDeleteRemovableItems": {
      cursor: "pointer",
      margin: "0 0 0 24px",
      fontSize: 0,
      lineHeight: 0,
    },
  },
});
