import React, { FC } from "react";

import { FilterOnChangeType } from "#types/common";
import { InputUI } from "#ui/input";
import { EFieldType, FilterBlockUI } from "#ui/filterBlock";
import { useTranslation } from "react-i18next";
import { handleChangeSearchFilter } from "#utils/filter";
import { TStatisticsListParams } from "#businessLogic/models/statistics";

type PropsType = {
  queryParams: TStatisticsListParams;
  updateQueryParams: FilterOnChangeType<TStatisticsListParams>;
  clearQueryParams: () => void;
  onFilterChange: FilterOnChangeType<TStatisticsListParams>;
  deferred?: boolean;
};

export const StatisticsListFilter: FC<PropsType> = (props) => {
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
      {/* <FilterBlockUI.Item
        forwardProps={{
          value: "status",
        }}
        label={t("statuses.status")}
        getFilterParams={(e: string | undefined) => {
          return [{ status: e }];
        }}
      >
        <EvaluationStatusSelect />
      </FilterBlockUI.Item> */}
    </FilterBlockUI>
  );
};
