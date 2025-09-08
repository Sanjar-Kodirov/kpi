import React, { FC } from "react";

import { MinusSvg, PlusSvg } from "#svgIcons/index";
import { ButtonUI } from "#ui/button";
import { InputUI } from "#ui/input";
import { formatWeight, inputFormatNumber } from "#utils/formatters";

import { useStyles } from "./styles";
import cn from "classnames";

interface PropsTypes {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  unit?: string;
  amountText?: string;
  onDecrementValue?: () => void;
  inIncrementValue?: () => void;
  onInputClick?: () => void;
  onPackageClick?: () => void;
  countable?: boolean;
}

export const Amount: FC<PropsTypes> = (props) => {
  const {
    className,
    value = 0,
    min = 0,
    max,
    disabled,
    unit,
    amountText,

    onChange,
    onDecrementValue,
    inIncrementValue,
    onInputClick,
    onPackageClick,
    countable,
  } = props;
  const classes = useStyles();

  let classesCompose = classes.amount;

  if (className) {
    classesCompose = `${classesCompose} ${className}`;
  }

  const decrementValue = () => {
    const newVal = value - 1;

    if (newVal >= min) {
      onChange(newVal);
    }

    onDecrementValue && onDecrementValue();
  };

  const incrementValue = () => {
    const newVal = value + 1;

    if (!max || newVal <= max) {
      onChange(newVal);
    }

    inIncrementValue && inIncrementValue();
  };

  return (
    <div className={classesCompose}>
      {!countable && (
        <ButtonUI
          className={classes.minusBtn}
          icon={<MinusSvg />}
          onClick={decrementValue}
          disabled={disabled || value <= min}
        />
      )}
      <InputUI.Number
        className={classes.input}
        placeholder={""}
        formatter={(value) =>
          countable ? formatWeight(value as number, true, false) : inputFormatNumber(value as number)
        }
        precision={0}
        value={value}
        onChange={(value) => {
          if (value) {
            onChange(value as number);
          }
        }}
        min={min}
        max={max}
        disabled={disabled}
        readOnly={countable}
        onClick={countable ? onInputClick : undefined}
      />
      {amountText && <div className={classes.amountText}>{amountText}</div>}
      {unit && (
        <div className={cn(classes.unit, { [classes.unitClickable]: !!onPackageClick })} onClick={onPackageClick}>
          <div>{unit}</div>
        </div>
      )}
      {!countable && (
        <ButtonUI className={classes.plusBtn} icon={<PlusSvg />} onClick={incrementValue} disabled={disabled} />
      )}
    </div>
  );
};
