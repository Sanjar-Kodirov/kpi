import { TListQueryParams } from "#businessLogic/models";

export type TUsersModeratorsAdminsListParams = {} & TListQueryParams;

export type TUsersModeratorsAdminsListAdditionalParams = {};

export interface IUsersModeratorsAdminsList {
  users: IUsersModeratorsAdminsUser[];
  count: number;
}

export interface IUsersModeratorsAdminsUser {
  id: string;
  telegram_id: number;
  full_name: string;
  phone_number: string;
  role: string;
  membership_type: string;
  assigned_region_name: string;
  is_active: boolean;
  created_at: string;
}
