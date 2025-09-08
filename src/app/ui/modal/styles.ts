import { $colors, $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".ant-modal-mask": {
      zIndex: "2000",
      background: "rgba(13, 13, 13, 0.7)",
    },
    ".custom-modal-wrap": {
      zIndex: "2010",
      maxHeight: "100%",
      padding: "20px 0 40px",
    },
    ".custom-modal": {
      top: 0,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0",
      "& .ant-modal-content": {
        flexGrow: 1,
        maxHeight: "100%",
        maxWidth: "100%",
        padding: "24px 14px 24px",
        boxShadow: "0px 15px 30px rgb(0 0 0 / 16%)",

        display: "flex",
        flexDirection: "column",
      },

      "& .ant-modal-body": {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowX: "auto",
        padding: "0 10px 0 10px",
      },

      "& .ant-modal-close": {
        right: "10px",
        top: "10px",

        "& .ant-modal-close-x": {
          width: "40px",
          height: "40px",
          lineHeight: "47px",
          color: $colors.primary,
        },
      },

      "&__header": {
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0 0 20px",

        "& .custom-modal__title": {
          marginBottom: 0,
          wordBreak: "break-all",
        },

        "&__cancelBtnWr": {
          fontSize: 0,
          lineHeight: 0,

          "& .custom-btn": {
            fontSize: 0,
            lineHeight: 0,
            border: "none",
            width: "20px",
            height: "20px",
            padding: "0",
            background: "none",
          },
        },
      },
      "&__footer": {
        flexShrink: 0,
        margin: "40px 0 0",
        overflow: "hidden",
      },

      "&__title": {
        fontSize: 18,
        fontWeight: 600,
        lineHeight: "normal",
        margin: "0 0 24px",

        "& .borderBottom": {
          borderBottom: `1px solid ${$colors.textColor}`,
        },
      },

      "&__middle": {
        flexGrow: 1,
        position: "relative",
        overflowY: "auto",
        padding: "4px 10px 0 10px",
        margin: "0 -10px 0 -10px",
      },

      "&__buttons": {
        display: "flex",
        justifyContent: "center",
        margin: "0 -8px",

        "&__col": {
          width: "50%",
          padding: "0 8px",
        },

        "& .custom-btn": {
          width: "100%",
          paddingLeft: "34px",
          paddingRight: "34px",
        },

        "&-right": {
          justifyContent: "flex-end",
        },
      },

      "&__error": {
        margin: "0 0 20px",
      },

      "& .ant-form-item": {
        marginBottom: "14px",
      },

      "& .abs-loader": {
        borderRadius: $variables.borderRadius,
      },

      "& iframe": {
        border: "none",
      },
    },
  },
  successNote: {
    textAlign: "center",
  },
  successNoteIcon: {
    fontSize: 0,
    lineHeight: 0,
    margin: "0 0 24px",
  },
  successNoteTitle: {
    margin: "0 0 8px",
    fontSize: "20px",
    fontWeight: 600,
  },
  successNoteSubTitle: {
    fontSize: "14px",
    fontWeight: 500,
    // color: $colors.formGray
  },
  successNoteCloseBtn: {
    margin: "32px 0 0",
  },
});
