import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  codesCont: {
    display: "flex",
    padding: 10,
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
  },
  blockTitle: {
    margin: "10px 0",
    fontSize: 18,
    fontWeight: 600,
  },
  collapse: {
    backgroundColor: "#fff",
  },
  codeCont: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  index: {
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  },
  code: {
    margin: "0 10px",
    fontWeight: 500,
  },
  highlightedCode: {
    color: $colors.danger,
  },
  clearButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.5,
    },
  },
  cont: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%",
    width: "100%",
    overflowY: "auto",
  },
  title: {
    fontWeight: 500,
    padding: "15px 10px",
    fontSize: 18,
  },
  inValid: {
    textDecoration: "underline",
    cursor: "alias",
    color: "red",
  },
  noData: {
    position: "absolute",
    zIndex: 0,
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCont: {
    display: "flex",
    width: "100%",
    padding: 15,
    justifyContent: "center",
  },
});
