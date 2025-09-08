import React, { FC, useEffect, useMemo } from "react";
import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";
import { createXHRStore } from "#core/store";
import { api } from "#businessLogic/api";
import { XHRDataStoreState } from "#core/store/constructors";
import { IUnitsModel } from "#businessLogic/models/units";
import { useTranslation } from "react-i18next";
import { namespaces } from "#src/localization/i18n.constants";

type TProps = {
  excludedItems?: string[];
} & SelectUIPropTypes;
export const UnitsSelect: FC<TProps> = (props) => {
  const $unitsList = useMemo(() => {
    return createXHRStore(api.units.getUnits, new XHRDataStoreState<IUnitsModel[]>([]));
  }, []);

  const { t } = useTranslation();

  const unitsListState = $unitsList.store();

  useEffect(() => {
    if (!unitsListState.data.length) {
      $unitsList.request();
    }
  }, []);

  return (
    <SelectUI
      allowClear={true}
      loading={unitsListState.loading}
      placeholder={t("placeholders.selectUnitsMeasure", { ns: namespaces.catalog })}
      {...props}
    >
      {unitsListState.data.map((item) => {
        if (props.excludedItems?.includes(item.code)) return null;
        return (
          <SelectUI.Option key={item.id} value={item.id}>
            {item.name}
          </SelectUI.Option>
        );
      })}
    </SelectUI>
  );
};
