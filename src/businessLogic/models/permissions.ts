import { TCodeNameModel, TListQueryParams } from "#businessLogic/models";
import { E_CATEGORY_TYPES } from "#businessLogic/models/category";

// permissions
export type TAdminPermissionsListParams = {
  permissionId?: number;
  branchId?: string;
  categoryId?: string;
  search?: string;
  type?: string;
  categoryTypes?: E_CATEGORY_TYPES | E_CATEGORY_TYPES[];
} & TListQueryParams;

export interface IAdminPermissionsListItemModel {
  name: string;
  code: string;
  position: number;
  section: boolean;
  parentId: number;
  permissionType: TCodeNameModel;
  id: number;
}

export interface IAdminPermissionDetailsModel {
  id: number;
  name: string;
  code: string;
  position: number;
  section: boolean;
  parentId: number;
  permissionType: TCodeNameModel;
}

export interface ICreateAdminPermissionModel {
  name: string;
  code: string;
  position: number;
  section: boolean;
  parentId: number;
  permissionType: TCodeNameModel;
}

export interface IUpdateAdminPermissionModel extends ICreateAdminPermissionModel {
  id: number;
}

// permissions/users
export interface ICreateAdminUserPermissionsModel {
  userId: number;
  permissions: string[];
  permissionType: string;
}

// permissions/roles

export interface ICreateAdminRolePermissionsModel {
  role: string;
  permissions: string[];
  permissionType: string;
}

export interface IAdminPermissionsListItemModel {
  id: number;
  name: string;
  code: string;
}
