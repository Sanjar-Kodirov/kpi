import { TCodeNameModel, TIdNameModel, TListQueryParams, TNumberIdNameModel } from "#businessLogic/models";

export interface IAdminCompanyDetailsModel {
  id: number;
  name: string;
  tin: string;
  pinfl: string;
  businessType: TCodeNameModel;
  activityType: IAdminCompanyDetailsModelActivityType;
  owner: TIdNameModel;
  director: TNumberIdNameModel;
  phone: string;
  oked: string;
}
export interface IAdminCompanyDetailsModelLogo {
  id: number;
  name: string;
  url: string;
}
export interface IAdminCompanyDetailsModelBackgroundPhoto {
  id: number;
  name: string;
  url: string;
}
export interface IAdminCompanyDetailsModelActivityType {
  id: number;
  name: string;
  parentId: number;
  code: number;
  parent: string;
}

export type TAdminCompaniesListParams = {
  activityTypeId?: number;
  businessType?: string;
  regionId?: number;
  districtId?: number;
  from?: string;
  to?: string;
  tin?: string;
  search?: string;
} & TListQueryParams;

export interface IAdminCompaniesListItemModel {
  id: number;
  name: string;
  tin: string;
  registrationDate: string;
  owner: TNumberIdNameModel;
  phone: string;
  status: TCodeNameModel;
}

export interface IAdminCompanyLookupModel {
  id: number;
  name: string;
  tin: string;
  pinfl: string;
}
