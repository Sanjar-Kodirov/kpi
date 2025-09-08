import { $colors } from "#styles/variables";
import { createUseStyles } from "react-jss";

type Props = {
  status?: string;
  color?: string;
};
const getColorByStatus = (status?: string) => {
  switch (status) {
    case "NEW":
      return $colors.info;
    case "DRAFT":
      return $colors.info;
    case "READY":
      return $colors.success;
    case "IN_PROGRESS":
      return $colors.orange;
    case "PENDING":
      return $colors.orange;
    case "RETURNED":
      return $colors.orange;
    case "PREPARING":
      return $colors.orange;
    case "ACCEPTED":
      return $colors.success;
    case "CLOSED":
      return $colors.success;
    case "CREATED":
      return $colors.success;
    case "OPEN":
      return $colors.success;
    case "CANCELLED":
      return $colors.danger;
    case "REJECTED":
      return $colors.danger;
    case "INACTIVE":
      return $colors.danger;
    case "FREE":
      return $colors.darkBlue;
    case "BOOKED":
      return $colors.danger;
    case "BLOCKED":
      return $colors.danger;
    case "ACTIVE":
      return $colors.success;
    default:
      return $colors.textColor;
  }
};

const colorByStatus = {
  READY: {
    color: "#16B364",
    background: "#EDFCF2",
  },
  PREPARING: {
    color: "#EAAA08",
    background: "#FEFBE8",
  },
};

export const useStyles = createUseStyles({
  cont: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  dot: {
    width: 10,
    minWidth: 10,
    height: 10,
    borderRadius: "100%",
    backgroundColor: (props: Props) => {
      return props.color || getColorByStatus(props.status);
    },
  },
  status: {
    whiteSpace: "nowrap",
    fontWeight: 500,
    fontSize: 14,

    color: (props: Props) => {
      return props.color ? props.color : getColorByStatus(props.status);
    },
  },

  statusBigCont: {
    textAlign: "center",
    borderRadius: "6px",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0px 1px 2px 0px rgba(29, 27, 51, 0.05)",
    background: (props: Props) => {
      return props.status ? colorByStatus[props.status]?.background : "#f4f4f4";
    },
  },

  statusBig: {
    whiteSpace: "nowrap",
    fontWeight: 500,
    fontSize: 14,
    color: (props: Props) => {
      return props.status ? colorByStatus[props.status]?.color : $colors.textColor;
    },
  },

  fullWidth: {
    width: "100%",
  },
});
