import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  groupContaienr: {
    display: "flex",
    flexDirection: "column",
    ["& > div"]: {
      marginBottom: "10px",
    },
    ["& .filterBlock__item"]: {
      width: "100%",
    },
  },
  modalFooterButtons: {
    display: "flex",
    alignItems: "center",
    columnGap: "15px",
  },
});
