import React, { FC } from "react";

import { Radio, RadioChangeEvent } from "antd";
import cn from "classnames";

import { useStyles } from "./styles";

type TRadioButtonsUIProps = {
  onChange: (value: string) => void;
  radioItems: Array<{ value: string; title: string }>;
  value: string;
  variant?: "default" | "auth";
};

export const RadioButtonsUI: FC<TRadioButtonsUIProps> = (props) => {
  const { onChange, radioItems, value, variant = "default" } = props;

  useStyles();

  const onChangeValue = ({ target: { value } }: RadioChangeEvent) => {
    onChange(value);
  };
  return (
    <Radio.Group
      className={cn("radioButtonsCustom", variant)}
      defaultValue={radioItems[0].value}
      value={value}
      buttonStyle="solid"
      onChange={onChangeValue}
    >
      {radioItems.map(({ value, title }) => (
        <Radio.Button key={value} value={value}>
          {title}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
