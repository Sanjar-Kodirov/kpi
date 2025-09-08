import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  registerLayout: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  registerLayoutInner: {
    position: "relative",
    minWidth: "448px",
    padding: "20px",
  },

  title: {
    alignSelf: "center",
    textAlign: "center",
    margin: "0 0 24px",
    fontSize: 36,
    lineHeight: "48px",
    fontWeight: 700,
  },
  titleDesc: {
    margin: "12px 0 0",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: "1",
    textAlign: "center",
  },

  backBtnWr: {
    position: "absolute",
    left: 0,
    top: "50%",
    margin: "-12px 0 0",
    fontSize: 0,
  },

  bottomButtons: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    margin: "32px 0 0",
    padding: "0 5px",

    "& > *": {
      flexGrow: 1,
    },

    "& * + *": {
      margin: "0 0 0 16px",
    },
  },
});
