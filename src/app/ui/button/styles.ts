import { $colors } from "#styles/variables";
import Color from "color";
import { createUseStyles } from "react-jss";

const secondaryColor = new Color($colors.secondary);
const secondaryColorHover = secondaryColor.darken(0.05).toString();
const secondaryColorActive = secondaryColor.darken(0.1).toString();

const aPayColor = new Color($colors.aPay);
const aPayColorHover = aPayColor.lighten(0.1).toString();
const aPayColorActive = aPayColor.darken(0.1).toString();

const numpadColor = new Color("#EFF4FF");
const numpadColorHover = numpadColor.darken(0.02).toString();
const numpadColorActive = numpadColor.lighten(0.01).toString();

export const useStyles = createUseStyles({
  "@global": {
    ".custom-btn": {
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "none",
      fontSize: "16px",
      lineHeight: 1.1,
      paddingLeft: "32px",
      paddingRight: "32px",
      // minWidth: (props: IStylesProps) => props?.minW || "initial",

      "&.ant-btn-sm": {
        fontSize: "14px",
        lineHeight: 1,
        // padding: "5px 14px",
        paddingTop: "5px",
        paddingBottom: "5px",
      },
      "&.ant-btn-icon-only": {
        padding: "5px",

        "&.ant-btn-sm": {
          padding: "3px 0",
        },
        // "&.ant-btn-default:not(.ant-btn-dangerous):not(.ant-btn-primary)": {
        //   color: "#8F92A8",
        //
        //   "&:hover": {
        //     color: $colors.primary,
        //   },
        // },
      },
    },

    "a.ant-btn": {
      paddingTop: "0 !important",
      paddingBottom: "0 !important",
    },
  },
  btn: {},
  bordered: {
    background: "#fff",
    border: `2px solid ${$colors.primary}`,
    color: "#E62E05",
    lineHeight: 1,

    "&:hover": {
      borderColor: "#FF692E",
      background: "#FFF4ED",
      color: $colors.primary,
      boxShadow: "0px 1px 2px 0px #1D1B330F, 0px 1px 3px 0px #1D1B331A",
    },

    "&:focus": {
      borderColor: $colors.primary,
      background: "#FFF4ED",
      color: $colors.primary,
    },

    "&:active": {
      borderColor: $colors.primary,
      background: "#FFF4ED",
      color: $colors.primary,
    },

    "&.ant-btn-dangerous": {
      borderColor: $colors.danger,
      color: $colors.danger,
    },
  },
  danger: {
    background: "#F23C34",
    color: "#fff",
    border: "none",

    "&:hover": {
      background: "#f8655d",
      color: "#fff",
    },
  },
  secondary: {
    background: secondaryColor.toString(),
    border: "none",
    boxShadow: "none",
    color: "#3E4784",

    "&:focus": {
      background: secondaryColor.toString(),
      color: "#3E4784",
    },

    "&:hover": {
      background: secondaryColorHover,
      color: "#3E4784",
    },

    "&:active": {
      background: secondaryColorActive,
    },
  },
  "green-filled": {
    backgroundColor: "#16B364",
    color: "#fff",
    border: "none",

    "&:hover": {
      background: "rgba(22,179,100,0.8)".toString(),
      color: "#fff",
    },
  },
  green: {
    background: "#EDFCF2",
    border: "none",
    boxShadow: "none",
    color: "#16B364".toString(),

    "&:focus": {
      color: "#16B364".toString(),
      background: "#D5E2D9".toString(),
    },

    "&:hover": {
      color: "#16B364".toString(),
      background: "#D5E2D9".toString(),
    },

    "&:active": {
      color: "#16B364".toString(),
      background: "#D5E2D9".toString(),
    },
  },
  "primary-light": {
    background: $colors.primaryLight,
    border: "2px solid transparent",
    boxShadow: "none",
    color: $colors.primary,

    "&:hover": {
      borderColor: "#FFA879",
      background: $colors.primaryLight,
      color: $colors.primary,
    },

    "&:focus": {
      borderColor: "#FF692E",
      background: $colors.primaryLight,
      color: $colors.primary,
    },

    "&:active": {
      // background: primaryLightColorActive,
    },
  },

  light: {
    color: "#E62E05",

    "&:hover": {
      color: "#BC1B06",
    },

    "&:focus": {
      background: "#FFF4ED",
      color: "#E62E05",
    },
  },

  "light-blue": {
    background: numpadColor.toString(),
    border: "none",
    boxShadow: "none",
    color: $colors.textColor,

    "&:focus": {
      background: numpadColorHover,
      color: $colors.textColor,
    },

    "&:hover": {
      background: numpadColorHover,
      color: $colors.textColor,
    },

    "&:active": {
      background: numpadColorActive,
    },
  },
  aPay: {
    background: aPayColor.toString(),
    border: "none",
    boxShadow: "none",
    color: "#fff",

    "&:focus": {
      background: aPayColor.toString(),
      color: "#fff",
    },

    "&:hover": {
      background: aPayColorHover,
      color: "#fff",
    },

    "&:active": {
      background: aPayColorActive,
    },
  },
  auth: {
    background: $colors.gradientAuth,
    border: "none",
    boxShadow: "none",
    color: "#fff",
    minWidth: "200px !important",

    "&:focus": {
      background: $colors.gradientAuth,
      color: "#fff",
    },

    "&:hover": {
      opacity: 0.8,
      background: $colors.gradientAuth,
      color: "#fff",
    },

    "&:active": {
      opacity: 0.6,
      background: $colors.gradientAuth,
    },
  },
  "aPay-bordered": {
    background: "#fff",
    border: `2px solid ${aPayColorHover}`,
    color: "#00BFDA",
    lineHeight: 1,
    boxShadow: "none",
    "&.ant-btn-dangerous": {
      borderColor: `${aPayColor}`,
      color: `${aPayColor}`,
    },
    "&:focus": {
      background: "transparent",
      color: "#00BFDA",
      borderColor: aPayColorHover,
    },

    "&:hover": {
      background: aPayColorHover,
      color: "#fff",
      borderColor: aPayColorHover,
    },

    "&:active": {
      background: aPayColorActive,
      borderColor: aPayColorHover,
    },
  },
  noBorder: {
    border: "none",
  },
  btnWithIcon: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",

    "& span + svg": {
      margin: "0 0 0 12px",
    },

    "& svg + span": {
      margin: "0 0 0 12px",
    },
  },
  orange: {
    background: "#fff",
    border: "none",
    boxShadow: "none",
    color: $colors.orange,
    minWidth: "200px !important",

    "&:hover": {
      opacity: 0.8,
      background: $colors.orange,
      color: "#fff",
    },
  },
  fullWidth: {
    width: "100%",
  },
});
