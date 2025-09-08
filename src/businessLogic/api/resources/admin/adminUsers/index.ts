import { HandlerType } from "#core/store/types/handler";
import {
  IUpdateUserLogin,
  IUpdateUserModel,
  IUpdateUserPassword,
  IUserDetailsModel,
  IUsersListItemModel,
  TUserRoleModel,
  TUsersListParams,
} from "#businessLogic/models/user";
import { PaginationListModel } from "#types/api";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { appType } from "#constants/index";
import { TIdNameModel } from "#businessLogic/models";
import { TAdminUsersCreateParams } from "#businessLogic/models/admin/adminUsers";

const apiPrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];

export const getAdminUsersLookup: HandlerType<TUsersListParams, TIdNameModel[]> = (params) => {
  return httpGet({
    url: `/api/${apiPrefix}/v1/users/lookup`,
    params,
  });
};

export const getAdminUsersList: HandlerType<TUsersListParams, PaginationListModel<IUsersListItemModel>> = (params) => {
  return httpGet({
    url: `/api/${apiPrefix}/v1/users`,
    params,
  });
};

export const createAdminUser: HandlerType<TAdminUsersCreateParams, IUserDetailsModel> = (data) =>
  httpPost({
    url: `/api/${apiPrefix}/v1/users`,
    data,
  });

export const updateAdminUser: HandlerType<IUpdateUserModel, IUserDetailsModel> = ({ id, ...data }) =>
  httpPut({
    url: `/api/${apiPrefix}/v1/users/${id}`,
    data,
  });

export const updateAdminUserLogin: HandlerType<IUpdateUserLogin, IUserDetailsModel> = ({ id, ...data }) =>
  httpPatch({
    url: `/api/${apiPrefix}/v1/users/${id}/login`,
    data,
  });

export const updateAdminUserPassword: HandlerType<IUpdateUserPassword, IUserDetailsModel> = ({ id, ...data }) =>
  httpPatch({
    url: `/api/${apiPrefix}/v1/users/${id}/password`,
    data,
  });

export const getAdminUserDetails: HandlerType<number | string, IUserDetailsModel> = (id) => {
  return httpGet({
    url: `/api/${apiPrefix}/v1/users/${id}`,
  });
};

export const getAdminUserStats: HandlerType<number | string, any> = (userId) => {
  return httpGet({
    url: `/api/${apiPrefix}/v1/users/${userId}/status`,
  });
};

export const deleteAdminUser: HandlerType<number | string, IUserDetailsModel> = (id) => {
  return httpDelete({
    url: `/api/users/${id}`,
  });
};

export const getAdminUserRoles: HandlerType<void, TUserRoleModel[]> = () =>
  httpGet({
    url: `/api/${apiPrefix}/v1/users/roles`,
  });
