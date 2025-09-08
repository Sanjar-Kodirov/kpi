import { TListQueryParams, TNumberIdNameModel } from "#businessLogic/models";

export interface IAdminEmployeesListItemModel {
  id: number;
  tin: string;
  pinfl: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  login: string;
  role: string;
  status: string;
  branch: TNumberIdNameModel;
  company: TNumberIdNameModel;
}

export type TAdminEmployeesListParams = {
  role?: string;
  userId?: number;
  branchId?: number;
  regionId?: number;
  from?: string;
  status?: string;
  tin?: string;
  type?: string;
  search?: string;
  roles?: string;
  companyId?: number;
} & TListQueryParams;
