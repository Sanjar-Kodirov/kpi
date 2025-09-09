import { TIdNameModel, TListQueryParams } from "#businessLogic/models";

export enum DEPARTMENT_TYPE {
  KITCHEN = "KITCHEN",
  BAR = "BAR",
}

export interface IEvaluationTypeModel {
  code: DEPARTMENT_TYPE;
  name: string;
}

export type TPendingEvaluationsListParams = {
  search?: string;
  from?: string;
  to?: string;
  status?: string;
} & TListQueryParams;

export type TPendingEvaluationsListAdditionalParams = {};

export interface IPendingEvaluationsList {
  id: string;
  name: string;
  type: IEvaluationTypeModel;
  branch: TIdNameModel;
  status: {
    code: string;
    name: string;
  };
}

export type IEvaluationDetailsModel = IPendingEvaluationsList;

export interface ICreateEvaluationModel {
  branchId: string;
  name: string;
}

export interface IUpdateEvaluationModel extends ICreateEvaluationModel {
  id: string;
}

export enum DEPARTMENT_STATUS {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE",
}

export interface IUpdateEvaluationStatusModel {
  id: string;
  status: DEPARTMENT_STATUS;
}

export type IEvaluationItemModel = TIdNameModel;
