import React, { useMemo } from "react";
import { E_MOMENT_TYPES } from "#types/common";
import { SelectUI } from "#ui/select";
import { safeParseDate } from "#utils/formatters";
import { DatePicker } from "antd";
import { TFunction } from "i18next";
import moment, { Moment } from "moment";
import { useTranslation } from "react-i18next";

import { useStyles } from "./styles";

export enum PICKER_TYPES {
  ALL = "all",
  TODAY = "today",
  YESTERDAY = "yesterday",
  MONTH = "month",
  WEEK = "week",
}

function transformLocale(t: TFunction, item: PICKER_TYPES) {
  const pickerLocalization = {
    [PICKER_TYPES.ALL]: t("pickers.all"),
    [PICKER_TYPES.TODAY]: t("pickers.today"),
    [PICKER_TYPES.YESTERDAY]: t("pickers.yesterday"),
    [PICKER_TYPES.MONTH]: t("pickers.month"),
    [PICKER_TYPES.WEEK]: t("pickers.week"),
  };

  return pickerLocalization[item as PICKER_TYPES];
}

const defaultOptions = [PICKER_TYPES.TODAY, PICKER_TYPES.YESTERDAY, PICKER_TYPES.WEEK, PICKER_TYPES.MONTH];

const getDataOption = (fromValue: string, toValue?: string) => {
  if (!toValue) {
    return null;
  }

  const todayEnd = moment().endOf(E_MOMENT_TYPES.DAY).format(dateFormatWithTime);

  if (fromValue === moment().startOf(E_MOMENT_TYPES.DAY).format(dateFormatWithTime) && toValue === todayEnd) {
    return PICKER_TYPES.TODAY;
  } else if (
    fromValue === moment().subtract(1, E_MOMENT_TYPES.DAY).startOf(E_MOMENT_TYPES.DAY).format(dateFormatWithTime) &&
    toValue === moment().subtract(1, E_MOMENT_TYPES.DAY).endOf(E_MOMENT_TYPES.DAY).format(dateFormatWithTime)
  ) {
    return PICKER_TYPES.YESTERDAY;
  } else if (
    fromValue === moment().subtract(1, E_MOMENT_TYPES.WEEK).startOf(E_MOMENT_TYPES.DAY).format(dateFormatWithTime) &&
    toValue === todayEnd
  ) {
    return PICKER_TYPES.WEEK;
  } else if (
    fromValue === moment().subtract(1, E_MOMENT_TYPES.MONTH).startOf(E_MOMENT_TYPES.DAY).format(dateFormatWithTime) &&
    toValue === todayEnd
  ) {
    return PICKER_TYPES.MONTH;
  }
  return null;
};

type TProps = {
  onChange?: ({ from, to }: { from?: string; to?: string }) => void;
  fromValue?: string;
  toValue?: string;
  withoutTime?: boolean;
  options?: PICKER_TYPES[];
  allowClear?: boolean;
};

export const dateFormatWithTime = "YYYY-MM-DDTHH:mm:ss";
export const dateFormatWithoutTime = "YYYY-MM-DD";

export const DatepickerPeriodUI = (props: TProps) => {
  const { fromValue, toValue, onChange, withoutTime = false, options, allowClear = true } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const customOptions = useMemo(() => {
    if (options) {
      return options.map((v) => ({
        name: transformLocale(t, v),
        value: v,
      }));
    } else {
      return defaultOptions.map((v) => ({
        name: transformLocale(t, v),
        value: v,
      }));
    }
  }, [options, i18n.language]);

  type TOnDateChangePayload = {
    start?: Moment;
    end: Moment;
  };
  const onDateChange = (values?: TOnDateChangePayload | null) => {
    if (onChange) {
      const dateFormat = withoutTime ? dateFormatWithoutTime : dateFormatWithTime;
      if (values) {
        onChange({
          from: values.start?.format(dateFormat),
          to: values.end?.format(dateFormat),
        });
      } else {
        const todayStart = moment().startOf(E_MOMENT_TYPES.DAY);
        const todayEnd = moment().endOf(E_MOMENT_TYPES.DAY);

        onChange({
          from: todayStart.format(dateFormat),
          to: todayEnd.format(dateFormat),
        });
      }
    }
  };

  const onDataOptionChange = (value: string) => {
    const todayStart = moment().startOf(E_MOMENT_TYPES.DAY);
    const todayEnd = moment().endOf(E_MOMENT_TYPES.DAY);
    switch (value) {
      case PICKER_TYPES.TODAY:
        onDateChange({ start: todayStart, end: todayEnd });
        break;
      case PICKER_TYPES.YESTERDAY:
        onDateChange({
          start: todayStart.subtract(1, E_MOMENT_TYPES.DAY),
          end: todayEnd.subtract(1, E_MOMENT_TYPES.DAY),
        });
        break;
      case PICKER_TYPES.WEEK:
        onDateChange({
          start: todayStart.subtract(1, E_MOMENT_TYPES.WEEK),
          end: todayEnd,
        });
        break;
      case PICKER_TYPES.MONTH:
        onDateChange({
          start: todayStart.subtract(1, E_MOMENT_TYPES.MONTH),
          end: todayEnd,
        });
        break;
      default:
        onDateChange(null);
    }
  };

  return (
    <div className={classes.datePickerPeriod}>
      <div className={classes.datePickerPeriodItem}>
        <SelectUI
          allowClear={allowClear}
          placeholder="Vaqt oralig'ini tanlang"
          value={fromValue && getDataOption(fromValue, toValue)}
          onChange={onDataOptionChange}
        >
          {customOptions.map((item) => (
            <SelectUI.Option value={item.value} key={item.value}>
              {item.name}
            </SelectUI.Option>
          ))}
        </SelectUI>
      </div>
      <div className={`${classes.datePickerPeriodItem} ${classes.datePickerPeriodRangeItem}`}>
        <DatePicker.RangePicker
          allowClear={allowClear}
          onChange={(values) => {
            console.log("RangePicker", values);

            if (values && values.length > 1) {
              onDateChange({
                start: values[0]?.startOf("day"),
                end: values[1]?.endOf("day") as Moment,
              });
            } else {
              onDateChange(undefined);
            }
          }}
          placeholder={[t("placeholders.startDate"), t("placeholders.endDate")]}
          value={fromValue && toValue ? [safeParseDate(fromValue)!, safeParseDate(toValue)!] : undefined}
        />
      </div>
    </div>
  );
};
