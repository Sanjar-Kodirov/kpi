import { $colors, $variables } from "#styles/variables";
import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  loader: {
    display: "flex",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderRadius: $variables.borderRadius,
    background: "#fff",
  },
  headerButtons: {
    display: "flex",
    margin: "0 0 0 24px",

    "& .custom-btn + .custom-btn": {
      margin: "0 0 0 16px",
    },
  },
  company: {
    display: "flex",
    alignItems: "center",
  },
  companyLogo: {
    display: "flex",
    justifyContent: "center",
    border: "5px solid #FCFCFD",
    alignItems: "center",
    maxWidth: 168,
    marginRight: 16,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "50%",
    padding: 0.5,
    outline: "2px solid #00BFDA",
    "& img": {
      borderRadius: "50%",
      width: "100%",
      height: "100%",
    },
  },
  companyEditLogo: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  companyInfo: {
    "& h3, h4": {
      color: "#000",
      marginBottom: 0,
    },
  },
  companyTitle: {
    fontSize: 24,
    lineHeight: "32px",
    wordBreak: "break-word",
  },
  companySubTitle: {
    fontSize: 16,
    lineHeight: "24px",
  },
  info: {
    display: "flex",
    backgroundColor: "#F2F4F7",
    padding: "16px 32px",
    marginTop: 20,
    borderRadius: $variables.borderRadius,
  },
  infoItem: {
    marginRight: 48,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 500,

    "&:last-child": {
      marginRight: 32,
    },
  },
  infoItemTitle: {
    color: "#98A2B3",
  },
  infoItemValue: {},
  cards: {
    display: "flex",
    marginTop: 20,
  },
  card: {
    position: "relative",
    width: "33.33333%",
    backgroundColor: "#fff",
    padding: 16,
    marginRight: 16,
    borderRadius: $variables.borderRadius,

    "&:last-child": {
      marginRight: 0,
    },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 12,
  },
  cardItemValue: {
    marginBottom: 12,
    fontWeight: 500,
    fontSize: 18,
  },
  edit: {
    cursor: "pointer",
    position: "absolute",
    right: "10px",
    top: "10px",
    transition: "all 0.3s ease",
    "&:hover": {
      color: $colors.primary,
    },
  },
  detailsPage: {
    display: "flex",
    height: "100%",
  },
  detailsPageLeftSide: {
    width: "25%",
    background: "#ffffff",
    borderRadius: $variables.borderRadius,
    padding: "20px 12px 20px 20px",
  },
  detailsPageRightSide: {
    width: "75%",
    margin: "0 0 0 16px",
    flexGrow: 1,
    background: "#ffffff",
    borderRadius: $variables.borderRadius,
    padding: "20px 12px 20px 20px",
    overflowY: "auto",
  },
  detailsPageRightSideInner: {
    height: "100%",
    overflowY: "auto",
    padding: "0 8px 0 0",
  },
  detailsPageRightSideContent: {
    maxWidth: 832,
    width: "100%",
  },
  form: {
    height: "100%",
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: "32px",
  },
  editActivityTypesRow: {
    margin: "0 0 24px",

    "& .custom-btn": {
      marginTop: "16px",
    },
  },
  editCompanyButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 24,

    "& .custom-btn": {
      minWidth: "200px",
    },
  },
  clearWarehouseButton: {
    display: "flex",
    justifyContent: "right",
    alignItems: "end",
    marginBottom: 16,

    "& button": {
      width: "100%",
    },
  },
  buttonCont: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    columnGap: 20,
  },

  "@media (max-width: 1300px)": {
    headerButtons: {
      flexDirection: "column-reverse",

      "& .custom-btn, .custom-btn + .custom-btn": {
        margin: "4px 0",
      },
    },
  },
});
