import { httpDelete, httpGet, httpPost, httpPut } from "#core/httpClient";
import { HandlerType } from "#core/store/types/handler";
import { PaginationListModel } from "#types/api";
import { appType } from "#constants/index";
import {
  TAdminPermissionsListParams,
  IAdminPermissionsListItemModel,
  IAdminPermissionDetailsModel,
  ICreateAdminPermissionModel,
  IUpdateAdminPermissionModel,
  ICreateAdminUserPermissionsModel,
  ICreateAdminRolePermissionsModel,
} from "#businessLogic/models/permissions";
import { XHRSuccessStoreType } from "#core/store/types/store";

const apiTypePrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];

// permissions
export const getAdminPermissions: HandlerType<
  TAdminPermissionsListParams,
  PaginationListModel<IAdminPermissionsListItemModel>
> = (params) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/permissions`,
    params,
  });
};

export const getAdminPermissionDetails: HandlerType<TAdminPermissionsListParams, IAdminPermissionDetailsModel> = ({
  permissionId,
  ...params
}) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/permissions/${permissionId}`,
    params,
  });
};

export const createAdminPermission: HandlerType<ICreateAdminPermissionModel, number> = (data) => {
  return httpPost({
    url: `/api/${apiTypePrefix}/v1/permissions`,
    data,
  });
};

export const updateAdminPermission: HandlerType<IUpdateAdminPermissionModel, number> = ({ id, ...data }) => {
  return httpPut({
    url: `/api/${apiTypePrefix}/v1/permissions/${id}`,
    data,
  });
};

export const deleteAdminPermission: HandlerType<number, void> = (id) => {
  return httpDelete({
    url: `/api/${apiTypePrefix}/v1/permissions/${id}`,
  });
};

// permissions/users
export const getCabinetPermissionUsers: HandlerType<void, string[]> = () => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/permissions/users`,
  });
};

export const getAdminPermissionUsersByUserId: HandlerType<number, string[]> = (userId) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/permissions/users/${userId}`,
  });
};

export const createAdminPermissionUser: HandlerType<ICreateAdminUserPermissionsModel, XHRSuccessStoreType> = ({
  userId,
  ...data
}) => {
  return httpPost({
    url: `/api/${apiTypePrefix}/v1/permissions/users/${userId}`,
    data,
  });
};

// permissions/roles
export const getAdminPermissionRolesByRoleId: HandlerType<string, string[]> = (role) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/permissions/roles/${role}`,
  });
};

export const createAdminPermissionRole: HandlerType<ICreateAdminRolePermissionsModel, XHRSuccessStoreType> = ({
  role,
  ...data
}) => {
  return httpPost({
    url: `/api/${apiTypePrefix}/v1/permissions/roles/${role}`,
    data,
  });
};

export const getAdminPermissionRoles: HandlerType<
  TAdminPermissionsListParams,
  IAdminPermissionsListItemModel[]
> = () => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/permissions/roles`,
  });
};

export const getAllPermissions: HandlerType<void, IAdminPermissionsListItemModel[]> = () => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/permissions/all`,
  });
};
