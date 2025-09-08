import React from "react";
import { ButtonUI } from "..";
import cn from "classnames";
import { useStyles } from "#ui/toggleButtons/styles";

export type TToggleButtonItems<T = string> = {
  key: T;
  label: string;
  feePercent?: number;
};

type TToggleButtonsProps<T> = {
  items: TToggleButtonItems<T>[];
  activeKey?: T | undefined;
  onChange: (item: TToggleButtonItems<T>) => void;
  className?: string;
};
export const ToggleButtons = <T = string,>(props: TToggleButtonsProps<T>) => {
  const { items, activeKey, onChange, className } = props;

  const classes = useStyles();

  const handleClick = (item: TToggleButtonItems<T>) => {
    onChange(item);
  };

  return (
    <div className={cn(classes.toggleButtons, className)}>
      {items.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <ButtonUI
            key={item.key as string}
            type={isActive ? "primary" : undefined}
            onClick={isActive ? undefined : () => handleClick(item)}
            className={cn(classes.toggleButton, { [classes.activeButton]: item.key === activeKey })}
          >
            {item.label}
          </ButtonUI>
        );
      })}
    </div>
  );
};
