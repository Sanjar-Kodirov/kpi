import React, { FC, useEffect } from "react";

import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";

import { $vats } from "#stores/common";
import { DefaultOptionType } from "antd/lib/select";
import { E_VAT_CODE, IVatListType } from "#businessLogic/models/vat";
import { useTranslation } from "react-i18next";

type TVatSelectProps = SelectUIPropTypes & {
  getSelectedItem?: (
    value: E_VAT_CODE,
    option: DefaultOptionType | DefaultOptionType[],
    selectedItem: IVatListType,
  ) => void;
};

export const VatSelect: FC<TVatSelectProps> = (props) => {
  const { getSelectedItem, onChange, ...rest } = props;

  const vatsState = $vats.store();

  useEffect(() => {
    if (!vatsState.data.length) {
      $vats.request({});
    }
  }, []);

  const { t } = useTranslation();

  const handleChange = (value: E_VAT_CODE, option: DefaultOptionType | DefaultOptionType[]) => {
    onChange?.(value, option);
    if (getSelectedItem) {
      const selectedItem = vatsState.data.find((d) => d.code === value);
      if (selectedItem) {
        getSelectedItem(value, option, selectedItem);
      }
    }
  };

  return (
    <SelectUI
      onChange={handleChange}
      allowClear={true}
      loading={vatsState.loading}
      placeholder={t("fields.vat")}
      {...rest}
    >
      {vatsState.data.map((item) => (
        <SelectUI.Option key={item.code} value={item.code}>
          {item.name}
        </SelectUI.Option>
      ))}
    </SelectUI>
  );
};
