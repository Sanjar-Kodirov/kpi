import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  ldsDualRing: {
    display: "inline-block",
    width: "80px",
    height: "80px",

    "&:after": {
      content: '" "',
      display: "block",
      width: "64px",
      height: "64px",
      margin: "8px",
      borderRadius: "50%",
      border: "6px solid #353A63",
      borderColor: "#353A63 transparent #353A63 transparent",
      animation: "$ldsDualRing 1.2s linear infinite",
    },
  },
  "@keyframes ldsDualRing": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
});
