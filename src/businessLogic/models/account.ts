import { TCodeNameModel, TIdNameModel } from "#businessLogic/models";

export enum CHECK_USER_STATUSES {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export enum E_USER_ROLES {
  BUSINESS_OWNER = "ROLE_BUSINESS_OWNER",
  ROLE_OWNER = "ROLE_OWNER",
  ROLE_CHEF = "ROLE_CHEF",
  ROLE_BRANCH_ADMIN = "ROLE_BRANCH_ADMIN",
  ROLE_CASHIER = "ROLE_CASHIER",
  ROLE_WAITER = "ROLE_WAITER",
  ROLE_WAREHOUSE_MANAGER = "ROLE_WAREHOUSE_MANAGER",
  ROLE_BARMEN = "ROLE_BARMEN",
  ROLE_ACCOUNTANT = "ROLE_ACCOUNTANT",
  ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN",
  ROLE_APAY_INTEGRATION = "ROLE_APAY_INTEGRATION",
  ROLE_ADMIN = "ROLE_ADMIN",
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

export interface ICheckUserResponse {
  userExist: boolean;
  userStatus?: {
    name: string;
    code: CHECK_USER_STATUSES;
  };
}

export interface IVerifyUserPayload {
  phone: string;
  activationKey: string;
}

export interface IVerifyUserResponse {
  phone: string;
  activationKey: string;
}

export interface IVerifyUserResponse {
  type: string;
  title: string;
  status: number;
  instance: string;
  message: string;
  path: string;
}

export interface IRegisterUserPayload {
  phone: string;
  password: string;
  passwordConfirmation: string;
  secretKey: string | undefined;
  language: string;
}

export interface ILoginPayloadType {
  phone: string;
  password: string;
  rememberMe?: boolean;
}

export interface ILoginResponseType {
  refresh_token: string;
  access_token: string;
}

// reset password
export interface IResetPasswordInitPayload {
  phone: string;
}

export interface IResetPasswordCheckPayload {
  activationKey: string;
  phone: string;
}

export interface IResetPasswordCheckResponse {
  secretKey: string;
}

export interface IResetPasswordFinishPayload {
  password: string;
  passwordConfirmation: string;
  phone: string;
  secretKey: string;
}

export interface IChangePasswordModel {
  currentPassword: string;
  newPassword: string;
}

export interface IRemoveImageModel {
  userId: any;
}

export interface IUploadImageModel {
  data: FormData;
}

export interface IConfirmPasswordPayload {
  password: string;
  passwordConfirmation: string;
  activationKey: string;
  secretKey: string;
}
