import React from "react";

import { Empty } from "antd";

type EmptyCustomProps = {
  show?: boolean;
};

export const EmptyCustom = (props: EmptyCustomProps) => {
  const { show = true } = props;

  if (!show) {
    return null;
  }

  return <Empty />;
};
