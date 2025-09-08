import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  "@global": {
    ".ant-select-dropdown": {
      zIndex: 3001,
    },
    ".custom-select": {
      "& .ant-select-arrow": {
        // width: 15,
        // height: 15,
        // right: 14,
        // marginTop: "-7px",
        color: $colors.primary,
      },

      "& .ant-select-selection-item": {
        whiteSpace: "normal !important",
      },

      "&.custom-select-readOnly": {
        "&.ant-select-multiple.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector": {
          background: $colors.readOnlyBg,
        },
        "&.ant-select-disabled.ant-select-multiple .ant-select-selection-item": {
          color: $colors.textColor,
          background: "#FDFDFD",
        },

        "&.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector": {
          background: $colors.readOnlyBg,
          color: $colors.textColor,
        },
      },
      "&.custom-select-auth": {
        // '&.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-selector': {
        //   borderColor: 'red !important'
        // }
      },
    },
  },
});
