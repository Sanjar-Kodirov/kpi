import React, { FC } from "react";

export const CatalogMenuItem: FC<{ name: string }> = ({ name }) => {
  return <div>{name}</div>;
};
