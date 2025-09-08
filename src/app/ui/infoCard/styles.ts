import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  infoCardListCont: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    background: "#FFFFFF",
    justifyContent: "space-around",
    padding: "0",
  },
  infoCardTitle: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#8A94A6",
  },
  infoCardValue: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "28px",
    color: "#344054",
  },
});
