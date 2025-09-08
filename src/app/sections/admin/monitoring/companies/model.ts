import { createAdvancedFilterStore } from "#core/store";
import { TAdminCompaniesListParams } from "#businessLogic/models/admin/adminCompany";

export const adminCompaniesFilterPropsDefault = {
  queryParams: {
    size: 20,
    page: 0,
  },
};

export const $adminCompaniesFilterProps = createAdvancedFilterStore<TAdminCompaniesListParams>(
  adminCompaniesFilterPropsDefault,
);
