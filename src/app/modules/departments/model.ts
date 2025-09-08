import { createAdvancedFilterStore } from "#core/store";
import { TDepartmentsListAdditionalParams, TDepartmentsListParams } from "#businessLogic/models/department";

export const departmentsFilterPropsDefault = {
  queryParams: {
    size: 20,
    page: 0,
  },
};

export const $departmentsFilterProps = createAdvancedFilterStore<
  TDepartmentsListParams,
  TDepartmentsListAdditionalParams
>(departmentsFilterPropsDefault);
