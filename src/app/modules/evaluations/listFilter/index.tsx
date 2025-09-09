import React, { FC } from "react";

import { TPendingEvaluationsListParams } from "#businessLogic/models/evaluations";
import { FilterOnChangeType } from "#types/common";
import { InputUI } from "#ui/input";
import { EFieldType, FilterBlockUI } from "#ui/filterBlock";
import { useTranslation } from "react-i18next";
import { handleChangeSearchFilter } from "#utils/filter";

type PropsType = {
  queryParams: TPendingEvaluationsListParams;
  updateQueryParams: FilterOnChangeType<TPendingEvaluationsListParams>;
  clearQueryParams: () => void;
  onFilterChange: FilterOnChangeType<TPendingEvaluationsListParams>;
  deferred?: boolean;
};

export const EvaluationsListFilter: FC<PropsType> = (props) => {
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
