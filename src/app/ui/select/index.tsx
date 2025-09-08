import React, { Key, ReactNode, useState } from "react";

import { SelectUIPropTypes } from "#types/components";
import { Select } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import cn from "classnames";

import { useStyles } from "./styles";

const getOptions = <T extends {}>(items: T[], defaultOption: T, optionValue: keyof T) => {
  const newArr: Array<T> = [];
  let isExist = false;

  items.forEach((item) => {
    newArr.push(item);

    if (String(item[optionValue]) === String(defaultOption[optionValue])) {
      isExist = true;
    }
  });

  if (!isExist) {
    newArr.push(defaultOption);
  }

  return newArr;
};

// type TPropTypes<T> = {
//   items: Array<T>;
//   defaultOption?: T;
//   isSearched: boolean;
//   optionValue?: string;
//   optionName?: string;
//   loading: boolean;
//   renderOption?: (item: T) => ReactNode;
//   returnItem?: boolean;
// } & SelectUIPropTypes;

type TSelectLookupPropTypes<T> = Omit<SelectUIPropTypes, "onChange"> & {
  onChange?: (value: any, option: DefaultOptionType | DefaultOptionType[], item?: T) => void;
  items: Array<T>;
  defaultOption?: any;
  isSearched: boolean;
  optionValue?: string;
  optionName?: string;
  loading: boolean;
  renderOption?: (item: T) => ReactNode;
  returnItem?: boolean;
  getSelectedItem?: (value: any, option: DefaultOptionType | DefaultOptionType[], selectedItem: T) => void;
};

const SelectLookup = <T extends {}>(props: TSelectLookupPropTypes<T>) => {
  const {
    items,
    defaultOption,
    isSearched,
    optionValue = "id",
    optionName = "name",
    loading,
    renderOption,
    onChange,
    returnItem,
    getSelectedItem,
    ...restProps
  } = props;

  const [defaultOptionCancel, setDefaultOptionCancel] = useState<boolean>(false);
  const customOnChange = (val: unknown, option: DefaultOptionType | DefaultOptionType[]) => {
    if (onChange) {
      const selectedItem = items.find((item) => item[optionValue] === val);
      if (returnItem) {
        onChange(val, option, selectedItem);
      } else {
        onChange(val, option);
      }

      if (selectedItem) {
        getSelectedItem?.(val, option, selectedItem);
      }
      setDefaultOptionCancel(true);
    }
  };

  return (
    <SelectUI onChange={customOnChange} showSearch filterOption={false} defaultActiveFirstOption={false} {...restProps}>
      {(!defaultOption || isSearched || defaultOptionCancel
        ? items
        : getOptions(items, defaultOption, optionValue as keyof T)
      ).map((item) => (
        <SelectUI.Option
          key={item[optionValue as keyof T] as Key}
          value={item[optionValue as keyof T]}
          disabled={loading}
        >
          {renderOption ? renderOption(item) : (item[optionName as keyof T] as ReactNode)}
        </SelectUI.Option>
      ))}
    </SelectUI>
  );
};

export type SelectUIType = React.FC<SelectUIPropTypes> & {
  Option: typeof Select.Option;
  Lookup: typeof SelectLookup;
};

const SelectUI: SelectUIType = (props) => {
  const { disabled, readOnly, variant, ...restProps } = props;
  useStyles();

  return (
    <Select
      className={cn("custom-select", {
        ["custom-select-" + variant]: !!variant,
        "custom-select-readOnly": readOnly,
      })}
      disabled={disabled || !!readOnly}
      {...restProps}
      // suffixIcon={<SelectArrowSvg />}
    />
  );
};

SelectUI.Option = Select.Option;
SelectUI.Lookup = SelectLookup;

export { SelectUI };
