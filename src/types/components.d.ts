import { SelectProps } from "antd";

interface Variants {
  variant?: "auth";
}

export interface SelectUIPropTypes extends SelectProps, Variants {
  readOnly?: boolean;
}
