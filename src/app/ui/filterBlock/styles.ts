import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".filterBlock": {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 15,
      marginBottom: 20,

      "&__item": {
        minWidth: "230px",

        "& .ant-select": {
          width: "100%",
        },

        "& .ant-input-number-affix-wrapper": {
          width: "100%",
        },

        "& .ant-picker": {
          width: "100%",
        },
      },

      "&__buttons": {
        display: "flex",
        gap: 10,
      },
    },
  },
  filterBlock_item_label: {
    fontSize: "12px",
    color: "#344054",
    lineHeight: 1.5715,
    marginBottom: 2,
  },
  drawerOpener: {
    width: "46px",
    height: "46px",
    display: "flex",
    alignItems: "center",
    padding: 0,
    justifyContent: "center",
    ["& > svg"]: {
      width: "30px",
      height: "30px",
      fill: "#fff",
    },
  },
  search: {
    flexGrow: 1,
  },
  "@media (max-width: 1200px)": {
    search: {
      flexGrow: 0,
    },
  },
});
