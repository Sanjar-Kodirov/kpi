import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  datePickerPeriod: {
    display: "flex",
  },
  datePickerPeriodItem: {
    margin: "0 0 0 16px",
    minWidth: "180px",

    "&:first-child": {
      marginLeft: 0,
    },
  },
  datePickerPeriodRangeItem: {
    minWidth: "280px",
  },
});
