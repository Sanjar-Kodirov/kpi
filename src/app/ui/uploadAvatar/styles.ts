import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  avatar: {
    position: "relative",
    fontSize: 0,
  },
  avatarInner: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    overflow: "hidden",
    border: `2px solid #00BFDA`,
    padding: "4px",

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%",
    },
  },
  avatarBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&.ant-btn-icon-only.ant-btn-sm": {
      minWidth: 32,
      width: 32,
      height: 32,
    },
  },
  avatarUploadBtn: {
    position: "absolute",
    right: 10,
    bottom: 5,
    zIndex: 10,
  },
  avatarDeleteBtn: {
    position: "absolute",
    right: -10,
    bottom: 40,
    zIndex: 10,

    "& svg": {
      width: "17px",
    },
  },
  avatarPlaceholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "128px",
    height: "128px",
    borderRadius: "50%",
    backgroundColor: "#fafafa",
    border: "1px dashed #d9d9d9",
    cursor: "pointer",
    transition: "border-color .3s",
  },
  avatarLoading: {
    position: "absolute",
    left: "6px",
    top: "6px",
    right: "6px",
    bottom: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",

    "&:before": {
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, .3)",
      borderRadius: "50%",
    },
  },
});
