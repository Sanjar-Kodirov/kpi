import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  toggleButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  toggleButton: {
    padding: "10px 14px",
    fontSize: "16px",
    background: "none",
    border: "none",
    color: "#667085",
    "&:focus": {},
  },
  activeButton: {
    cursor: "auto",
    background: "#FF721F",
    color: "#fff",
  },
});
