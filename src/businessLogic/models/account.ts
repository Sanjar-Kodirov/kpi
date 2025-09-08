import { TCodeNameModel, TIdNameModel } from "#businessLogic/models";

export enum CHECK_USER_STATUSES {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export enum E_USER_ROLES {
  ROLE_APAY_INTEGRATION = "ROLE_APAY_INTEGRATION",
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN",
  BUSINESS_OWNER = "BUSINESS_OWNER",
  ROLE_OWNER = "ROLE_OWNER",
}

export interface CurrentUserModel {
  birthDate: string;
  joiningDate: string;
  branch: TIdNameModel;
  id: number;
  firstName: string;
  lastName: string;
  patronymic: any;

  company: {
    id: string;
    name: string;
    tin: string;
  };
  phone: string;
  stage: any;
  companyId: string;
  profileImage: {
    id: string;
    name: string;
    url: string;
  };
  department: {
    id: string;
    name: string;
  };
  stages: any;
  role: TCodeNameModel<E_USER_ROLES>;
  pinfl: any;
  terminals: string[] | null;
}

export interface IUpdateUserModelProfile {
  firstName: string;
  lastName: string;
  patronymic: string;
  smartposId?: number;
}

export interface ICurrentUser extends CurrentUserModel {
  isOwner?: boolean;
  isCashier?: boolean;
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
