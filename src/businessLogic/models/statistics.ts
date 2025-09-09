import { TListQueryParams } from "#businessLogic/models";

export type TStatisticsListParams = {
  start_date?: string;
  end_date?: string;
} & TListQueryParams;

export type TStatisticsListAdditionalParams = {};

export interface IStatisticsList {
  users: [
    {
      user_id: string;
      full_name: string;
      role: string;
      region: string;
      total_score: number;
      approved_count: number;
      average_score: number;
    },
  ];
  total_users: number;
  overall_total_score: number;
  overall_average_score: number;
}
