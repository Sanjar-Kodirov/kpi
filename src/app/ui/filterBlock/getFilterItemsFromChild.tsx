import { ReactElement } from "react";

export const getFilterItemsFromChild = (child: ReactElement) => {
  if (Array.isArray(child)) {
    return child;
  } else if (child?.props.forwardProps) {
    return [child];
  }

  return getFilterItemsFromChild(child?.props.children);
};
