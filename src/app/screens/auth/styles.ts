import bg from "#images/bg.png";
import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    alignItems: "center",
    justifyContent: "space-between",
    overflowY: "auto",
    // backgroundImage: `url(${bg})`,
    backgroundPosition: "fixed",
    backgroundSize: "cover",

    "& .ant-form-item-label": {
      "& > label": {
        fontSize: "14px",
        color: $colors.textColor,
        fontWeight: 500,
      },
    },
  },
  content: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  compInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 14,
    color: "#101828",
    fontWeight: 300,
    marginTop: 24,
    marginBottom: 24,
  },
});
