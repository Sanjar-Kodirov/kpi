import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  header: {
    fontSize: "2rem",
    fontWeight: 500,
  },
  tabs: {
    "&>.ant-tabs-nav": {
      background: " #fff",
      boxShadow: " 0 0 4px rgba(0,0,0,.04), 0 2px 6px rgba(0,0,0,.1)",
      borderRadius: " 6px",
      flexGrow: " 0",
      marginBottom: " 15px",
      padding: "0 1rem",
    },
  },
});
