import { TListQueryParams } from "#businessLogic/models";

export type TSupervisorUsersToEvaluateParams = {} & TListQueryParams;

export type TSupervisorUsersToEvaluateAdditionalParams = {};

export interface ISupervisorUsersToEvaluateList {
  users: ISupervisorUser[];
  count: number;
}

export interface ISupervisorUser {
  id: string;
  full_name: string;
  role?: string;
  region?: string;
  phone_number?: string;
  created_at?: string;
}
