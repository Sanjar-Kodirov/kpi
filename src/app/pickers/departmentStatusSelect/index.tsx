import React, { FC, useEffect } from "react";
import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";
import { useTranslation } from "react-i18next";
import { $departmentStatuses } from "#stores/common";

export const DepartmentStatusSelect: FC<SelectUIPropTypes> = (props) => {
  const { t } = useTranslation();

  const departmentStatusesState = $departmentStatuses.store();

  useEffect(() => {
    if (!departmentStatusesState.data.length) {
      $departmentStatuses.request();
    }
  }, []);

  return (
    <SelectUI
      allowClear={true}
      loading={departmentStatusesState.loading}
      placeholder={t("placeholders.selectDepartmentStatus")}
      {...props}
    >
      {departmentStatusesState.data.map((item) => (
        <SelectUI.Option key={item.code} value={item.code}>
          {item.name}
        </SelectUI.Option>
      ))}
    </SelectUI>
  );
};
