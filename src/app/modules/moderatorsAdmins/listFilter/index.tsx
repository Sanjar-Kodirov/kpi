import React, { FC } from "react";

import { FilterOnChangeType } from "#types/common";
import { InputUI } from "#ui/input";
import { EFieldType, FilterBlockUI } from "#ui/filterBlock";
import { useTranslation } from "react-i18next";
import { handleChangeSearchFilter } from "#utils/filter";
import { TUsersModeratorsAdminsListParams } from "#businessLogic/models/users";

type PropsType = {
  queryParams: TUsersModeratorsAdminsListParams;
  updateQueryParams: FilterOnChangeType<TUsersModeratorsAdminsListParams>;
  clearQueryParams: () => void;
  onFilterChange: FilterOnChangeType<TUsersModeratorsAdminsListParams>;
  deferred?: boolean;
};

export const UsersModeratorsAdminsListFilter: FC<PropsType> = (props) => {
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
    </FilterBlockUI>
  );
};
