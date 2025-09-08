import { $colors, $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  input: {
    // padding: "12px 16px",
    "&.ant-input-affix-wrapper": {
      // borderColor: $colors.inputBg,

      "& .ant-input": {
        borderRadius: 0,
        // background: "none",
        // borderColor: "transparent",
      },
    },
    color: $colors.textColor,
  },
  hideArrows: {
    "& .ant-input-number-handler-wrap": {
      display: "none",
    },
  },
  auth: {
    "&:-internal-autofill-selected": {
      backgroundColor: [["red"], "!important"],
    },
    "&.ant-input-affix-wrapper": {
      // backgroundColor: 'rgba(232, 240, 254)'
    },
    border: "1px solid #D0D5DD",
    color: $colors.textColor,
    "&:focus": {
      color: $colors.textColor,
      borderColor: "#D0D5DD",
      outline: "none",
    },
    "&:hover": {
      color: $colors.textColor,
      borderColor: "#D0D5DD",
      outline: "none",
    },

    "&:active": {
      color: $colors.textColor,
      borderColor: "#D0D5DD",
      outlineColor: "#D0D5DD",
      outline: "none",
    },
  },
  readOnly: {
    "&.ant-input-disabled": {
      // background: $colors.readOnlyBg,
      // color: $colors.textColor,
    },
  },

  search: {
    position: "relative",

    "& .ant-input-prefix": {
      marginRight: "12px",
    },

    "& .ant-input-clear-icon": {
      margin: "0",

      "&:not(.ant-input-clear-icon-hidden)": {
        "& + $searchIcon": {
          display: "none",
        },
      },
    },
  },
  searchIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    color: $colors.grey,
    fontSize: 0,
    lineHeight: 0,
  },
  inputNumber: {
    position: "relative",

    "& .ant-input-number": {
      width: "100%",
    },
  },
  inputNumber__suffix: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: "10px",
    top: "0",
    bottom: "0",
    lineHeight: "1",
  },
  inputNumberDisabled: {
    // color: $disableColor,
  },
  "split-input": {
    width: 52,
    height: 52,
    margin: "0 5px",
    padding: 19,
  },
  splitCont: {
    display: "flex",
  },
  inputUploadCont: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "ease-in",
    transitionDuration: "0.3s",
    borderRadius: $variables.borderRadius,
    cursor: "pointer",
  },
  inputCont: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputUploadTitle: {
    color: $colors.textColor,
    padding: "7px 15px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "260px",
    textTransform: "uppercase",
  },
  errorTitle: {
    color: "red",
  },
  inputNone: {
    display: "none",
  },
  fileName: {
    display: "inline-block",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "260px",
    whiteSpace: "nowrap",
    color: "blue",
  },
  errorInput: {
    border: "none",
  },
  error: {
    borderTop: "2px solid red",
    paddingTop: "0.4em",
    color: "red",
    width: "100%",
    justifyContent: "start",
    fontSize: "0.8em",
  },
  disabledCont: {
    borderBottom: "1px solid #69696950",
  },
  uploadLabel: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  uploadButton: {
    height: "48px",
    background: $colors.inputBorderColor,
    border: "none",
    outline: "none",
    padding: "0 10px",
    cursor: "pointer",
    borderRadius: $variables.borderRadius,
  },
});
