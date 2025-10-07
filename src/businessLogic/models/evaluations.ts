import { TListQueryParams } from "#businessLogic/models";

export type TPendingEvaluationsListParams = {
  search?: string;
  from?: string;
  to?: string;
  status?: string;
} & TListQueryParams;

export type TPendingEvaluationsListAdditionalParams = {};

export interface IAcceptEvaluationModel {
  evaluation_id: string;
  score: number;
}

export interface IRejectEvaluationModel {
  evaluation_id: string;
}

export interface IEvaluationDetailsModel {
  success: boolean;
  message: string;
  evaluation: IEvaluationItem;
}

export interface IEvaluationItemModel {
  evaluations: IEvaluationItem[];
  count: number;
}

export interface IEvaluationItem {
  id: string;
  user_id: string;
  criteria_id: string;
  evaluation_text: string;
  photo_file_id: string | null;
  photo_file_unique_id: string | null;
  status: string;
  evaluated_date: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  score: number;
  user_name: string;
  user_role: string;
  criteria_title: string;
  region_name: string;
}

export interface IExportEvaluationsModel {
  from_date?: string;
  to_date?: string;
  role?: string;
  evaluation_type?: string;
  region_id?: string;
}
