import { TCodeNameModel, TListQueryParams } from "#businessLogic/models";

export type TCustomersListParams = {
  branchId?: string | number;
  search?: string;
  from?: string;
  to?: string;
  status?: string;
} & TListQueryParams;

export type TCustomersListAdditionalParams = {};

export interface ICustomersListItemModel {
  id: number;
  name: string;
  phone: string;
  totalSpent: number;
  gender: TCodeNameModel;
  ageGroup: TCodeNameModel;
  firstVisitDate: string;
}

export type ICustomerDetailsModel = ICustomersListItemModel;

export interface ICreateCustomerModel {
  name: string;
  phone: string;
  gender: {
    code: string;
  };
  ageGroup: {
    code: string;
  };
  branchId: number;
}

export interface IUpdateCustomerModel extends ICreateCustomerModel {
  id: number;
}

export interface IUpdateAssignCustomerModel extends ICreateCustomerModel {
  orderId: number;
}
