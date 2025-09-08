import React, { FC, useEffect, useMemo } from "react";

import { api } from "#businessLogic/api";
import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";
import { useTranslation } from "react-i18next";
import { DistrictListType } from "#businessLogic/models/public/common";
import { XHRDataStoreType } from "#core/store/types/store";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState } from "#core/store/constructors";

interface PropTypes extends SelectUIPropTypes {
  region?: string;
  placeholder?: string;
}

export const DistrictSelect: FC<PropTypes> = (props) => {
  const { region, placeholder, ...restProps } = props;
  const { t } = useTranslation();

  const $districts = useMemo(() => {
    return createXHRStore<string, DistrictListType, XHRDataStoreType<DistrictListType>>(
      api.common.getDistricts,
      new XHRDataStoreState([]),
    );
  }, []);

  const districtsState = $districts.store();

  useEffect(() => {
    if (region) {
      $districts.request(region);
    } else {
      $districts.reset();
    }
  }, [region]);

  return (
    <SelectUI
      loading={districtsState.loading}
      placeholder={placeholder || t("placeholders.district")}
      disabled={!region}
      allowClear
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.children?.toString().toLowerCase().includes(input.toLowerCase()) ?? false) as boolean
      }
      {...restProps}
    >
      {districtsState.data.map((item) => (
        <SelectUI.Option value={item.id} key={item.id}>
          {item.name}
        </SelectUI.Option>
      ))}
    </SelectUI>
  );
};
