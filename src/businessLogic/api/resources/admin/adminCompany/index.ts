import { HandlerType } from "#core/store/types/handler";
import { httpGet } from "#core/httpClient";
import {
  IAdminCompaniesListItemModel,
  IAdminCompanyDetailsModel,
  TAdminCompaniesListParams,
  IAdminCompanyLookupModel,
} from "#businessLogic/models/admin/adminCompany";
import { PaginationListModel } from "#types/api";

export const getAdminCompaniesList: HandlerType<
  TAdminCompaniesListParams,
  PaginationListModel<IAdminCompaniesListItemModel>
> = (params) =>
  httpGet({
    url: `/api/admin/v1/companies`,
    params,
  });

export const getAdminCompanyDetails: HandlerType<number, IAdminCompanyDetailsModel> = (id) =>
  httpGet({
    url: `/api/admin/v1/companies/${id}`,
  });

export const getAdminCompaniesLookup: HandlerType<TAdminCompaniesListParams, IAdminCompanyLookupModel[]> = () =>
  httpGet({
    url: `/api/admin/v1/companies/lookup`,
  });
