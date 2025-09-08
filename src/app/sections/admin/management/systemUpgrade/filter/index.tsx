import React, { FC } from "react";
import { FilterOnChangeType } from "#types/common";
import { DatepickerPeriodUI } from "#ui/datePickerPeriod";
import { InputUI } from "#ui/input";
import { TAdminLogsListParams } from "#businessLogic/models/admin/adminLogs";
import { EFieldType, FilterBlockUI } from "#ui/filterBlock";
import { useTranslation } from "react-i18next";
import { handleChangeDatePeriodFilter, handleChangeSearchFilter } from "#utils/filter";

type PropsType = {
  queryParams: TAdminLogsListParams;
  updateQueryParams: FilterOnChangeType<TAdminLogsListParams>;
  clearQueryParams: () => void;
  onFilterChange: FilterOnChangeType<TAdminLogsListParams>;
};

export const AdminSystemUpgradeListFilter: FC<PropsType> = (props) => {
  const { queryParams, updateQueryParams, clearQueryParams, onFilterChange } = props;

  const { t } = useTranslation();

  return (
    <FilterBlockUI
      queryParams={queryParams}
      onFilterChange={onFilterChange}
      updateQueryParams={updateQueryParams}
      clearQueryParams={clearQueryParams}
    >
      <FilterBlockUI.Item
        fieldType={EFieldType.SEARCH}
        label={t("fields.search")}
        forwardProps={{
          value: "search",
        }}
        getFilterParams={handleChangeSearchFilter}
      >
        <InputUI.Search />
      </FilterBlockUI.Item>
      <FilterBlockUI.Item
        forwardProps={{
          fromValue: "from",
          toValue: "to",
        }}
        label={t("fields.date")}
        getFilterParams={handleChangeDatePeriodFilter}
      >
        <DatepickerPeriodUI />
      </FilterBlockUI.Item>
    </FilterBlockUI>
  );
};
