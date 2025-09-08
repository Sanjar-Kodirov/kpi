import React, { FC, useEffect } from "react";

import { $departmentTypes } from "#stores/department";
import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";

import { useTranslation } from "react-i18next";

export const DepartmentTypeSelect: FC<SelectUIPropTypes> = (props) => {
  const departmentTypesState = $departmentTypes.store();
  const { t } = useTranslation();

  useEffect(() => {
    if (!departmentTypesState.data.length) {
      $departmentTypes.request();
    }
  }, []);

  return (
    <SelectUI loading={departmentTypesState.loading} placeholder={t("pickers.selectDepartment")} {...props}>
      {departmentTypesState.data.map((item) => (
        <SelectUI.Option key={item.code} value={item.code}>
          {item.name}
        </SelectUI.Option>
      ))}
    </SelectUI>
  );
};
