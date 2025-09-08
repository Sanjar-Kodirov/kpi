import React, { useEffect, useMemo, useState } from "react";

import { api } from "#businessLogic/api";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState } from "#core/store/constructors";
import { XHRDataStoreType } from "#core/store/types/store";
import { SelectUIPropTypes } from "#types/components";
import { SelectUI } from "#ui/select";
import { debounce } from "#utils/debounceLodash";

import { IAdminCompanyLookupModel, TAdminCompaniesListParams } from "#businessLogic/models/admin/adminCompany";

export const withDebounce = debounce(
  (action: () => void) => {
    action();
  },
  300,
  false,
);

type TUserItem = {} & SelectUIPropTypes;

export const CompanySelect: React.FC<TUserItem> = (props) => {
  const { ...restProps } = props;
  const [searchValue, setSearchValue] = useState("");
  const $items = useMemo(() => {
    return createXHRStore<
      TAdminCompaniesListParams,
      IAdminCompanyLookupModel[],
      XHRDataStoreType<IAdminCompanyLookupModel[]>
    >(api.adminCompany.getAdminCompaniesLookup, new XHRDataStoreState([]));
  }, []);

  const itemsState = $items.store();

  useEffect(() => {
    $items.request({});
  }, []);

  const onSearch = (search: string) => {
    setSearchValue(search);

    if (search.length >= 3 || search.length === 0) {
      withDebounce(() => {
        $items.request({ search });
      });
    }
  };

  return (
    <SelectUI.Lookup
      showSearch
      searchValue={searchValue}
      onSearch={onSearch}
      filterOption={false}
      defaultActiveFirstOption={false}
      loading={itemsState.loading}
      placeholder="Выберите компанию"
      allowClear={true}
      items={itemsState.data}
      isSearched={!!searchValue}
      {...restProps}
    />
  );
};
