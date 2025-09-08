import React, { FC } from "react";
import { FilterOnChangeType } from "#types/common";
import { DatepickerPeriodUI } from "#ui/datePickerPeriod";
import { InputUI } from "#ui/input";
import { TAdminTerminalListParams } from "#businessLogic/models/admin/adminTerminals";
import { EFieldType, FilterBlockUI } from "#ui/filterBlock";
import { handleChangeDatePeriodFilter, handleChangeSearchFilter } from "#utils/filter";
import { useTranslation } from "react-i18next";

type PropsType = {
  queryParams: TAdminTerminalListParams;
  updateQueryParams: FilterOnChangeType<TAdminTerminalListParams>;
  clearQueryParams: () => void;
  onFilterChange: FilterOnChangeType<TAdminTerminalListParams>;
};

export const AdminTerminalsListFilter: FC<PropsType> = (props) => {
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
        getFilterParams={handleChangeSearchFilter}
        forwardProps={{
          value: "search",
        }}
        fieldType={EFieldType.SEARCH}
      >
        <InputUI.Search
          value={queryParams?.search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>, search: string) => {
            onFilterChange({ search });
          }}
        />
      </FilterBlockUI.Item>
      <FilterBlockUI.Item
        forwardProps={{
          fromValue: "from",
          toValue: "to",
        }}
        label={t("fields.date")}
        getFilterParams={handleChangeDatePeriodFilter}
      >
        <DatepickerPeriodUI onChange={onFilterChange} fromValue={queryParams.from} toValue={queryParams.to} />
      </FilterBlockUI.Item>
    </FilterBlockUI>
  );
};
