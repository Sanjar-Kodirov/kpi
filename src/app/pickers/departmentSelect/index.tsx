// import React, { FC, useEffect, useMemo, useState } from "react";

// import { api } from "#businessLogic/api";
// import { TIdNameModel } from "#businessLogic/models";
// import { createXHRStore } from "#core/store";
// import { XHRDataStoreState } from "#core/store/constructors";
// import { XHRDataStoreType } from "#core/store/types/store";
// import { SelectUIPropTypes } from "#types/components";
// import { SelectUI } from "#ui/select";
// import { $runtime } from "#stores/index";
// import { useTranslation } from "react-i18next";

// type TProductItem = {
//   branchId?: string;
//   defaultOption?: {
//     id: string;
//     name: string;
//   };
// } & SelectUIPropTypes;

// export const DepartmentItemSelect: FC<TProductItem> = (props) => {
//   const { defaultOption, branchId, ...restProps } = props;

//   const [searchValue, setSearchValue] = useState("");

//   const { branchId: globalBranchId } = $runtime();

//   const { t } = useTranslation();

//   const chosenBranchId = branchId || globalBranchId;

//   const $departmentItems = useMemo(() => {
//     return createXHRStore<any, TIdNameModel[], XHRDataStoreType<TIdNameModel[]>>(
//       api.department.getDepartmentsLookup,
//       new XHRDataStoreState([]),
//     );
//   }, []);

//   const departmentItemsState = $departmentItems.store();

//   const queryParams = useMemo(() => {
//     return { branchId: chosenBranchId, search: searchValue };
//   }, [chosenBranchId]);

//   useEffect(() => {
//     if (chosenBranchId) {
//       $departmentItems.request(queryParams);
//     }
//   }, [queryParams, chosenBranchId]);

//   const onSearch = (search: string) => {
//     setSearchValue(search);

//     // if (search.length >= 3 || search.length === 0) {
//     //   withDebounce(() => {
//     //     $departmentItems.request({ ...queryParams, search });
//     //   });
//     // }
//   };

//   return (
//     <SelectUI.Lookup
//       items={departmentItemsState.data}
//       defaultOption={defaultOption}
//       isSearched={!!searchValue}
//       searchValue={searchValue}
//       onSearch={onSearch}
//       loading={departmentItemsState.loading}
//       placeholder={t("pickers.selectDepartment")}
//       allowClear={true}
//       {...restProps}
//     />
//   );
// };
