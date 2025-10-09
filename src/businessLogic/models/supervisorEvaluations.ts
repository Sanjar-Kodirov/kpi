import { TListQueryParams } from "#businessLogic/models";

export type TSupervisorUsersToEvaluateParams = {} & TListQueryParams;

export type TSupervisorUsersToEvaluateAdditionalParams = {};

export interface ISupervisorUsersToEvaluateList {
  users: ISupervisorUser[];
}

export interface ISupervisorUser {
  id: string;
  full_name: string;
  role: string;
  membership_type: string;
  assigned_region: IAssignedRegion;
  pending_criteria_count: number;
  total_criteria_count: number;
}

export interface IAssignedRegion {
  id: string;
  name: string;
  type: string;
}

export interface ISupervisorUsersToEvaluateCriteria {
  criteria: ISupervisorUsersToEvaluateCriteriaList[];
  user: ISupervisorUsersToEvaluateCriteriaUser;
}
export interface ISupervisorUsersToEvaluateCriteriaList {
  id: string;
  title: string;
  description: string;
  score: number;
  is_evaluated_today: boolean;
}

export interface ISupervisorUsersToEvaluateCriteriaUser {
  id: string;
  full_name: string;
  role: string;
  membership_type: string;
}

export interface ICreateSuperVisorEvaluations {
  user_id: string;
  criteria_id: string;
  evaluation_text: string;
  files?: File[];
}
