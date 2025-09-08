import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const fancyScrollStyles = {
  "&::-webkit-scrollbar": { height: "8px", width: "8px" },
  "&::-webkit-scrollbar-button:end:increment, &::-webkit-scrollbar-button:start:decrement": {
    background: "transparent",
    display: "none",
  },
  "&::-webkit-scrollbar-track-piece": {
    background: "#cfd8e3",
  },
  "&::-webkit-scrollbar-track-piece:vertical:start": {
    borderRadius: "4px 4px 0 0",
  },
  "&::-webkit-scrollbar-track-piece:vertical:end": {
    borderRadius: "0 0 4px 4px",
  },
  "&::-webkit-scrollbar-track-piece:horizontal:start": {
    borderRadius: "4px 0 0 4px",
  },
  "&::-webkit-scrollbar-track-piece:horizontal:end": {
    borderRadius: "0 4px 4px 0",
  },
  "&::-webkit-scrollbar-thumb:horizontal,&::-webkit-scrollbar-thumb:vertical": {
    background: "#97a6ba",
    borderRadius: "4px",
    display: "block",
    height: "48px",
  },
};

export const useStyles = createUseStyles({
  "@global": {
    body: {
      fontFamily: "Mulish, sans-serif",
      background: $colors.bodyColor,

      "& .ant-form-vertical": {
        "& .ant-form-item-label": {
          padding: "0 0 3px",
        },
      },

      "& .ant-modal-wrap": {
        zIndex: 3000,
      },

      "& .ant-notification-notice-message": {
        lineHeight: "22px",
      },
    },
    "#root": {
      height: "100%",
    },
    ".content-inner": {
      padding: "20px",
    },

    ".w-s-n": {
      whiteSpace: "nowrap",
    },
    ".t-a-c": {
      textAlign: "center",
    },

    ".u-fancy-scrollbar": fancyScrollStyles,

    input: {
      "&:-webkit-autofill": {
        backgroundColor: "#fff !important",
        WebkitBoxShadow: "0 0 0 50px white inset",
        WebkitTextFillColor: "#333",
      },
      "&:-webkit-autofill:focus": {
        backgroundColor: "#fff !important",
        WebkitBoxShadow: "0 0 0 50px white inset",
        WebkitTextFillColor: "#333",
      },
    },

    ".abs-loader": {
      position: "absolute",
      zIndex: 11,
      left: "0",
      top: "0",
      right: "0",
      bottom: "0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4px",
      background: "rgba(255, 255, 255, .5)",

      "&.bodyBg": {
        background: "rgba(249, 250, 251, .5)",
      },

      "&-fixed": {
        position: "fixed",
      },
    },

    ".primaryColor": {
      color: $colors.primary,
    },
  },
});
