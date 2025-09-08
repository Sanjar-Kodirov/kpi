import { createUseStyles } from "react-jss";
import { $colors } from "#styles/variables";

export const useStyles = createUseStyles({
  formItemExtra: {
    margin: "5px 0 0",
  },

  isHasAccount: {
    display: "flex",
    alignSelf: "baseline",
    width: "100%",
    justifyContent: "center",
    marginTop: 24,

    "& span": {
      marginRight: 8,
      color: $colors.grey,
      fontSize: 14,
    },

    "& a": {
      color: $colors.primaryBlue,
      borderBottom: "1px solid #155EEF",

      "&:hover": {
        borderColor: "transparent",
      },
    },
  },
});
