import { TIdNameModel, TListQueryParams } from "#businessLogic/models";

export enum DEPARTMENT_TYPE {
  KITCHEN = "KITCHEN",
  BAR = "BAR",
}

export interface IDepartmentTypeModel {
  code: DEPARTMENT_TYPE;
  name: string;
}

export type TDepartmentsListParams = {
  branchId?: string | number;
  search?: string;
  from?: string;
  to?: string;
  status?: string;
} & TListQueryParams;

export type TDepartmentsListAdditionalParams = {};

export interface IDepartmentsListItemModel {
  id: string;
  name: string;
  type: IDepartmentTypeModel;
  branch: TIdNameModel;
  status: {
    code: string;
    name: string;
  };
}

export type IDepartmentDetailsModel = IDepartmentsListItemModel;

export interface ICreateDepartmentModel {
  branchId: string;
  name: string;
}

export interface IUpdateDepartmentModel extends ICreateDepartmentModel {
  id: string;
}

export enum DEPARTMENT_STATUS {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE",
}

export interface IUpdateDepartmentStatusModel {
  id: string;
  status: DEPARTMENT_STATUS;
}

export type IDepartmentItemModel = TIdNameModel;
