import { TListQueryParams } from "#businessLogic/models";

export type TUsersModeratorsAdminsListParams = {} & TListQueryParams;

export type TUsersModeratorsAdminsListAdditionalParams = {};

export interface IUsersModeratorsAdminsList {
  users: IUsersModeratorsAdminsUser[];
  count: number;
}

export interface IUserDeleteRequest {
  user_id: string;
}

export interface IUserDeleteResponse {
  success: boolean;
  message: string;
}

export interface IUsersModeratorsAdminsUser {
  id: string;
  telegram_id: string;
  full_name: string;
  phone_number: string;
  role: string;
  membership_type: string | null;
  is_active: boolean;
  created_at: string;
  assigned_region_name: string;
}
