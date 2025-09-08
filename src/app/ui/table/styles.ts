import { fancyScrollStyles } from "#styles/global";
import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".customTableContainer": {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    ".customTableOuter": {
      overflow: "auto",
    },
    ".customTableExpandedIcon": {
      width: 22,
      height: 22,
      cursor: "pointer",
    },
    ".customTable": {
      width: "100%",

      "& .ant-table-body": fancyScrollStyles,

      "& .ant-table": {
        background: "transparent",

        "& .ant-table-container": {
          "& table": {
            "& tr": {
              "& th:first-child, & td:first-child": {
                borderRadius: "0",
              },
              "& th:last-child, & td:last-child": {
                borderRadius: "0",
              },
            },
          },
        },
      },
      "& .ant-table-thead": {
        position: "sticky",
        zIndex: 10,
        top: 0,
        "& .ant-table-column-has-sorters": {
          "&:hover": {
            background: "#efefef",
          },
        },
        "& .ant-table-cell": {
          backgroundColor: "#F1F5F9",
          fontWeight: 600,
          fontSize: 14,
          color: "#64748B",

          "&::before": {
            display: "none",
          },
        },
      },

      "& .ant-table-cell": {
        borderBottom: `2px solid ${$colors.bodyColor}`,
        color: "#64748B",
        fontWeight: 400,
        padding: "12px",
      },
      "& .ant-table-row": {
        backgroundColor: "#fff",

        "&:hover": {
          "& .ant-table-cell": {
            background: "#fbfbfb",
          },
        },
      },

      "& .ant-table-sticky-scroll": {
        display: "none",
      },
    },

    ".customTablePagination": {
      flexShrink: 0,
      display: "flex",
      justifyContent: "flex-end",
      padding: "16px 0 2px",
    },
  },

  cont: {
    display: "flex",
    alignItems: "center",
    "& .custom-btn": {
      border: "none",
      margin: "0 5px",
      width: 40,
      height: 40,
      borderRadius: "100%",
      padding: "0px 10px",
    },
    "& .ant-input": {
      border: "none",
      backgroundColor: "#f7f7f7",
      padding: "0 5px",
      width: 100,
    },
  },
  editActionsCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 10,
  },
  title: {
    marginRight: 10,
  },
  editableItemCont: {
    "& .ant-input": {
      border: "none",
      backgroundColor: "#f7f7f7",
      padding: "0 5px",
      width: 100,
    },
  },
});
