import React from "react";

import { TrashSvgIcon } from "#svgIcons/index";
import cn from "classnames";

import { useStyles } from "./styles";

type TProps<T> = {
  className?: string;
  items: T[];
  setItems?: (items: T[]) => void;
};

export const RemovableItems = <T extends { name?: string }>(props: TProps<T>) => {
  const { className, items = [], setItems } = props;

  useStyles();

  const onRemoveSkillClick = (index: number) => {
    const itemsCone = [...items];
    itemsCone.splice(index, 1);
    if (setItems) {
      setItems(itemsCone);
    }
  };

  if (!items.length) {
    return null;
  }

  return (
    <div className={cn("listRemovableItems", className)}>
      {items.map((item, index) => (
        <div key={index} className={"itemRemovableItems"}>
          <span className={"itemNameRemovableItems"}>{item.name}</span>
          {setItems && (
            <div className={"itemDeleteRemovableItems"} onClick={() => onRemoveSkillClick(index)}>
              <TrashSvgIcon />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
