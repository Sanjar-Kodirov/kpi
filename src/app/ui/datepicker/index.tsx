import React, { FC } from "react";

import { InputUI, TInputUIProps } from "#ui/input";
import { DatePicker } from "antd";
import { PickerProps } from "antd/lib/date-picker/generatePicker";
import moment, { Moment } from "moment";

import { useStyles } from "./styles";

type DatepickerUIProps = {
  readOnly?: boolean;
  format?: string;
} & TInputUIProps;
export const DatepickerUI: FC<DatepickerUIProps> = (props) => {
  const { readOnly, ...restProps } = props;

  const classes = useStyles();

  if (readOnly) {
    return (
      <InputUI
        readOnly
        placeholder={props.placeholder}
        value={props.value && moment(props.value as string).format(props.format)}
      />
    );
  }

  return (
    <DatePicker
      className={classes.datePicker}
      value={props.value ? moment(props.value as string) : null}
      {...(restProps as PickerProps<Moment>)}
    />
  );
};
