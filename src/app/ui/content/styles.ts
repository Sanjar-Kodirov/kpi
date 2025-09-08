import { $colors, $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".custom-content": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      padding: "12px 20px 24px",

      "&-fixed": {
        height: "100%",
      },

      "&-full-height": {
        height: "100%",
      },

      "& .abs-loader": {
        borderRadius: $variables.borderRadius,
      },

      "&__outer": {
        display: "flex",
        height: "100%",
        padding: "12px 0 0",

        "& .custom-content": {
          paddingTop: "0",
          paddingRight: "6px",
        },

        "& .ant-table-row": {
          cursor: "pointer",
        },

        "& .selectedRow": {
          "& .ant-table-cell": {
            background: "#EFF4FF",
          },

          "&:hover": {
            "& .ant-table-cell": {
              background: "#EFF4FF !important",
            },
          },
        },

        "&Left": {
          flexGrow: 1,
          height: "100%",
          overflow: "hidden",
        },
        "&Right": {
          position: "relative",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          width: "380px",
          height: "100%",
          margin: "0 0 0 10px",

          "&WithButtons": {
            "& .custom-content__outerRightInner": {
              borderRadius: `${$variables.borderRadius} 0 ${$variables.borderRadius} ${$variables.borderRadius}`,
            },
          },
        },
        "&RightInner": {
          flexGrow: 1,
          overflow: "hidden",
          padding: "16px 12px",

          background: "#fff",
          boxShadow: "0px 4px 8px -2px rgba(29, 27, 51, 0.1), 0px 2px 4px -2px rgba(29, 27, 51, 0.06)",
          borderRadius: `${$variables.borderRadius} 0px 0px 0px`,
        },
        "&RightInnerScroll": {
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflowY: "auto",
          padding: "0 6px",
        },

        "&Buttons": {
          display: "flex",
          flexShrink: 0,
          margin: "16px 0 0",
          padding: "16px 12px",
          borderRadius: `${$variables.borderRadius} ${$variables.borderRadius} 0 0`,
          boxShadow: "0px 4px 8px -2px rgba(29, 27, 51, 0.1), 0px 2px 4px -2px rgba(29, 27, 51, 0.06)",
          background: "#fff",

          "& .custom-btn + .custom-btn": {
            margin: "0 0 0 8px",
          },
        },
      },

      "&__middle": {
        flexGrow: 1,
        overflowY: "auto",
        padding: "4px 10px 0 10px",
        margin: "0 -10px 0 -10px",
      },

      "&__middle-content": {
        position: "relative",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflowX: "auto",
        padding: "24px 16px 24px 24px",

        "&__inner": {
          overflowY: "auto",
          padding: "0 8px 0 0",
        },
      },

      "&__navigation": {
        flexShrink: 0,
        margin: "0 0 15px",
      },

      "&__footer": {
        flexShrink: 0,
        overflow: "hidden",
      },

      "&__buttons": {
        display: "flex",
        justifyContent: "space-between",
        margin: "24px -8px 0",

        "& .custom-btn": {
          minWidth: "220px",
          margin: "0 8px",
          paddingLeft: "34px",
          paddingRight: "34px",
        },

        "&-right": {
          justifyContent: "flex-end",
        },

        "&-space-between": {
          justifyContent: "space-between",
        },
      },

      "&__error": {
        margin: "0 0 20px",
      },

      "&__filter-row": {
        display: "flex",
        justifyContent: "space-between",

        "&__right": {
          display: "flex",

          "& .ant-btn + .ant-btn": {
            margin: "0 0 0 16px",
          },
        },
      },

      "&__stats-row": {
        display: "flex",
        justifyContent: "space-between",

        "&__right": {
          display: "flex",

          "& .ant-btn + .ant-btn": {
            margin: "0 0 0 16px",
          },
        },
      },

      "&__stats": {
        display: "flex",
        flexWrap: "wrap",

        "&-right": {
          margin: "0 0 0 20px",
        },

        "&__item": {
          textAlign: "center",
          margin: "0 20px 20px 0",
          padding: "20px 20px 17px",
          minWidth: "200px",

          "&__title": {
            fontSize: 16,
            lineHeight: 1,
            fontWeight: 600,
          },
          "&__amount": {
            marginTop: 6,
            fontSize: 26,
            lineHeight: "30px",
            fontWeight: 600,
          },
          "&__unit": {
            color: "#8F92A8",
            fontSize: 14,
            fontWeight: 400,
            margin: "0 0 0 5px",
          },
        },
      },

      "&__table": {
        overflowY: "auto",
      },

      "&__header": {
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: "20px",
        minHeight: "48px",

        "&__title": {
          display: "flex",
          fontSize: "24px",
          fontWeight: 700,
          alignItems: "center",
          textAlign: "center",

          "& &-withTotal": {
            display: "flex",
            alignItems: "baseline",
          },

          "& > .s1": {
            display: "flex",
            alignItems: "center",
            marginRight: "16px",

            "& a": {
              color: $colors.textColor,

              "&:hover": {
                textDecoration: "underline",
              },
            },
          },
        },
        "&__total": {
          fontSize: "18px",
          marginLeft: 16,
          fontWeight: "normal",
          "& strong": {
            fontSize: "22px",
            fontWeight: "900",
          },
        },
        "&__totalWithBackPath": {},
        "&__backBtn": {
          fontSize: 0,
          lineHeight: 0,
        },
        "&__separator": {
          margin: "0 16px 0 7px",
          display: "flex",
          height: "100%",
        },
        "&__contentHeaderActions": {
          display: "flex",
          alignItems: "center",

          "& > * + *": {
            marginLeft: "15px",
          },
        },
      },
    },
    ".content-card": {
      background: "#FFFFFF",
      minHeight: "200px",
      height: "100%",
      padding: "24px",
      borderRadius: "8px",
      display: "flex",
      "& > *": {
        width: "100%",
      },
    },
    ".content-card-row": {
      width: "40%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
  },
  statsContainer: {
    display: "flex",
    marginBottom: "16px",
    flexWrap: "wrap",
    gap: 16,
  },
  infoCard: {
    display: " flex",
    flexDirection: "row",
    alignItems: " center",
    padding: "16px",
    gap: " 12px",
    background: " #FFFFFF",
    borderRadius: "8px",
  },
  infoCardLabel: {
    padding: "2px 0 0",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    color: $colors.grey,
  },
  infoCardValueRow: {
    display: " flex",
    alignItems: "baseline",
  },
  infoCardValue: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 28,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    color: $colors.primary,
  },
  infoCardUnit: {
    margin: "0 0 0 6px",
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 1,
    color: "#808080",
  },
  "@media (max-width: 1200px)": {
    infoCard: {
      padding: "12px",
      gap: 6,
    },
    infoCardLabel: {
      fontWeight: "500",
      fontSize: 16,
    },
    infoCardValue: {
      fontWeight: "500",
      fontSize: 22,
    },
    infoCardUnit: {
      fontSize: "16px",
      marginLeft: "4px",
    },
  },
});
