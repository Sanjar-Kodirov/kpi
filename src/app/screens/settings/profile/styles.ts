import { $colors, $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  container: {
    padding: "24px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    textAlign: "center",

    "& h2": {
      color: $colors.error,
      marginBottom: "16px",
    },

    "& p": {
      color: $colors.grey,
      fontSize: "16px",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "32px",
    gap: "16px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#344054",
    margin: 0,
  },
  content: {
    background: "#FFFFFF",
    borderRadius: $variables.borderRadius,
    padding: "32px",
    boxShadow: "0px 1px 2px rgba(29, 27, 51, 0.05)",
  },
  avatarSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "32px",
    paddingBottom: "32px",
    borderBottom: "1px solid #E4E7EC",
  },
  avatarContainer: {
    marginRight: "24px",
  },
  avatarPlaceholder: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#F2F4F7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#667085",

    "& svg": {
      width: "40px",
      height: "40px",
    },
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#344054",
    margin: "0 0 8px 0",
  },
  userRole: {
    fontSize: "16px",
    color: "#667085",
    margin: 0,
  },
  infoSection: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#344054",
    margin: "0 0 16px 0",
  },
  infoCards: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
});
