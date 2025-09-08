import { TCodeNameModel, TListQueryParams, TNumberIdNameModel } from "#businessLogic/models";

export type TAdminUsersListParams = {
  role?: string;
  regionId?: number;
  districtId?: number;
  from?: string;
  to?: string;
  search?: string;
} & TListQueryParams;

export interface IAdminUsersListItemModel {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  role: TCodeNameModel;
  department: TNumberIdNameModel;
  login: string;
  branch: TNumberIdNameModel;
}

export interface TAdminUsersCreateParams {
  tin?: string;
  pinfl?: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  login: string;
  password: string;
  phone?: string;
  // branchId: number;
  companyId?: number;
  role: string;
  joiningDate?: string;
  birthDate?: string;
}

export interface IUpdateAdminUserModel {
  firstName: string;
  lastName: string;
  role: string;
  login: string;
  phone: string;
  joiningDate?: string;
  birthDate?: string;
}

export type TTAdminUsersUpdateParams = {
  id: number;
} & TAdminUsersCreateParams;

export interface IAdminUserDetailsModel {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  photo: {
    id: string;
    name: string;
    url: string;
  };
  role: TCodeNameModel;
  department: TNumberIdNameModel;
  branch: TNumberIdNameModel;
  login: string;
  phone: string;
  status: TCodeNameModel;
  tin: string | null;
  pinfl: string | null;
  joiningDate: string;
  birthDate: string;
}
