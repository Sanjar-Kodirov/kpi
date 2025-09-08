import { TCodeNameModel, TListQueryParams } from "#businessLogic/models";

// temp
export type TUsersListParams = {
  role?: string;
  id?: string;
  userId?: number;
  branchId?: string;
  regionId?: string;
  from?: string;
  warehouseId?: string;
  status?: string;
  tin?: string;
  type?: string;
  search?: string;
  roles?: string;
  departmentId?: string;
  companyId?: number;
} & TListQueryParams;

export type TUsersListAdditionalParams = {
  branchIds?: string;
  roles?: string;
};

export interface FullName {
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  name: string;
}

export interface IUsersListItemModel {
  id: string;
  tin: string;
  pinfl: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  role: {
    name: string;
    code: string;
  };
  status: string;
  branch: Branches;
  company: Company;
  department: {
    id: string;
    name: string;
  };
}

export interface IUserDetailsModel {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  photo: {
    id: string;
    name: string;
    url: string;
  };
  role: {
    name: string;
    code: string;
  };
  department: {
    id: string;
    name: string;
  };
  branch: Branches;
  birthDate: string;
  joiningDate: string;
}

export interface Branches {
  id: string;
  name: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface UserStatsModel {
  firstDayAtWork: string;
  totalSales: number;
  totalRevenue: number;
  averageCheckAmount: number;
}

export interface ICreateUserModel {
  firstName: string;
  lastName: string;
  patronymic?: string;
  login: string;
  password: string;
  departmentId: string;
  role: string;
  branchId: string;
  companyId?: number;
  joiningDate: string;
  birthDate: string;
}

export interface IUpdateUserModel {
  id?: string;
  firstName: string;
  lastName: string;
  departmentId?: string;
  role?: string;
  joiningDate: string;
  birthDate: string;
  branchId?: string;
  login: string;
}

export interface IUpdateUserLogin {
  id: string;
  phone: string;
}

export interface IUpdateUserPassword {
  id?: string;
  password: string;
  passwordConfirmation: string;
}

// temp

export interface UpdateUserModel extends ICreateUserModel {
  id: string;
  langKey?: string;
}

export type TUserRoleModel = TCodeNameModel;
