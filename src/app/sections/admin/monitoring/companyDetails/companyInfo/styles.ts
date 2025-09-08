import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  card: {
    display: "flex",
    background: "#FFFFFF",
    justifyContent: "space-around",
    minHeight: "200px",
    padding: "20px 0",
  },
  infoCardsParent: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
});
