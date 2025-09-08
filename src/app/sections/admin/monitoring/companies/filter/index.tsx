import React, { FC } from "react";
import { FilterOnChangeType } from "#types/common";
import { DatepickerPeriodUI } from "#ui/datePickerPeriod";
import { InputUI } from "#ui/input";
import { TAdminCompaniesListParams } from "#businessLogic/models/admin/adminCompany";
import { EFieldType, FilterBlockUI } from "#ui/filterBlock";
import { useTranslation } from "react-i18next";
import { handleChangeDatePeriodFilter, handleChangeSearchFilter } from "#utils/filter";

type PropsType = {
  queryParams: TAdminCompaniesListParams;
  updateQueryParams: FilterOnChangeType<TAdminCompaniesListParams>;
  clearQueryParams: () => void;
  onFilterChange: FilterOnChangeType<TAdminCompaniesListParams>;
};

export const AdminCompaniesListFilter: FC<PropsType> = (props) => {
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
        forwardProps={{
          value: "search",
        }}
        label={t("fields.search")}
        fieldType={EFieldType.SEARCH}
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
