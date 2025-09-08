import React, { FC } from "react";

import { TDepartmentsListParams } from "#businessLogic/models/department";
import { FilterOnChangeType } from "#types/common";
import { InputUI } from "#ui/input";
import { EFieldType, EForwardPropsCastType, FilterBlockUI } from "#ui/filterBlock";
import { useTranslation } from "react-i18next";
import { handleChangeSearchFilter } from "#utils/filter";
import { CompanyBranchSelect } from "#pickers/branchSelect";
import { isAppTypeAdmin } from "#constants/index";
import { useParams } from "react-router-dom";
import { DepartmentStatusSelect } from "#pickers/departmentStatusSelect/index";

type PropsType = {
  queryParams: TDepartmentsListParams;
  updateQueryParams: FilterOnChangeType<TDepartmentsListParams>;
  clearQueryParams: () => void;
  onFilterChange: FilterOnChangeType<TDepartmentsListParams>;
  deferred?: boolean;
};

export const DepartmentsListFilter: FC<PropsType> = (props) => {
  const { queryParams, updateQueryParams, clearQueryParams, onFilterChange } = props;

  const { t } = useTranslation();
  const { companyId } = useParams<{ companyId: string }>();

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
          value: "status",
        }}
        label={t("statuses.status")}
        getFilterParams={(e: string | undefined) => {
          return [{ status: e }];
        }}
      >
        <DepartmentStatusSelect />
      </FilterBlockUI.Item>
      {isAppTypeAdmin && (
        <FilterBlockUI.Item
          forwardProps={{
            value: [EForwardPropsCastType.NUMBER, "branchId"],
          }}
          getFilterParams={(e: string | undefined) => {
            return [{ branchId: e }];
          }}
        >
          <CompanyBranchSelect
            companyId={Number(companyId)}
            value={queryParams.branchId}
            onChange={(branchId) => {
              updateQueryParams({ branchId });
            }}
          />
        </FilterBlockUI.Item>
      )}
    </FilterBlockUI>
  );
};
