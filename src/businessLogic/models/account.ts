import { TCodeNameModel, TIdNameModel } from "#businessLogic/models";

export enum CHECK_USER_STATUSES {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export enum E_USER_ROLES {
  deputy_member = "deputy_member",
  regional_moderator = "regional_moderator",
}

export interface ICurrentUserResponse {
  token: string;
}
export interface CurrentUserModel {
  id: string;
  full_name: string;
  membership_type: string;
  phone_number: string;
  region_name: string;
  role: E_USER_ROLES;
}

export interface IUpdateUserModelProfile {
  firstName: string;
  lastName: string;
  patronymic: string;
  smartposId?: number;
}

export interface ILoginPayloadType {
  auth_code: string;
}

export interface ILoginResponseType {
  success: true;
  token: string;
  user: IUser;
  message: string;
}

export interface IUser {
  id: string;
  full_name: string;
  phone_number: string;
  role: string;
  membership_type: string;
  region_name: string;
}

export interface IRemoveImageModel {
  userId: any;
}

export interface IUploadImageModel {
  data: FormData;
}
