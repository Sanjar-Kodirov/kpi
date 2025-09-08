import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  collapse: {
    width: "max-content",
    "& .ant-collapse-item": {
      "& .ant-collapse-content-box": {
        padding: 0,
      },
      "& .ant-collapse-header": {
        padding: "0 40px 0 0",
      },
    },
  },
});
