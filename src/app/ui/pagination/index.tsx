import React, { FC } from "react";

import { Pagination, PaginationProps } from "antd";
import { useStyles } from "./styles";
import cn from "classnames";

type TProps = PaginationProps;
export const PaginationUI: FC<TProps> = (props) => {
  const { className, ...restProps } = props;
  const classes = useStyles();

  return (
    <Pagination
      className={cn(classes.customTablePagination, className)}
      pageSizeOptions={["20", "50", "100", "150", "250", "500"]}
      size="small"
      {...restProps}
    />
  );
};
