import { createXHRStore } from "#core/store";
import { api } from "#businessLogic/api";
import { XHRDataStoreState } from "#core/store/constructors";
import { IAdminCompaniesListItemModel, IAdminCompanyDetailsModel } from "#businessLogic/models/admin/adminCompany";
import { PaginationListModel } from "#types/api";
import { PaginationList } from "#constructors/data";

export const $adminCompaniesList = createXHRStore(
  api.adminCompany.getAdminCompaniesList,
  new XHRDataStoreState<PaginationListModel<IAdminCompaniesListItemModel>>(new PaginationList()),
);

export const $adminCompanyDetails = createXHRStore(
  api.adminCompany.getAdminCompanyDetails,
  new XHRDataStoreState<IAdminCompanyDetailsModel | undefined>(undefined),
);
