import { createXHRStore } from "#core/store";
import { api } from "#businessLogic/api";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { PaginationListModel } from "#types/api";
import { IUpdateUserModel, IUserDetailsModel, IUsersListItemModel } from "#businessLogic/models/user";
import { PaginationList } from "#constructors/data";
import { XHRSuccessStoreType } from "#core/store/types/store";
import { IAdminUserDetailsModel } from "#businessLogic/models/admin/adminUsers";

export const $adminUsersList = createXHRStore(
  api.adminUsers.getAdminUsersList,
  new XHRDataStoreState<PaginationListModel<IUsersListItemModel>>(new PaginationList()),
);

export const $adminUserDetails = createXHRStore(
  api.adminUsers.getAdminUserDetails,
  new XHRDataStoreState<IAdminUserDetailsModel | null>(null),
);
export const $adminCreateUser = createXHRStore(api.adminUsers.createAdminUser, new XHRSuccessStoreState());
export const $adminUpdateUser = createXHRStore<IUpdateUserModel, IUserDetailsModel, XHRSuccessStoreType>(
  api.adminUsers.updateAdminUser,
  new XHRSuccessStoreState(),
);

export const $adminDeleteUser = createXHRStore(api.adminUsers.deleteAdminUser, new XHRSuccessStoreState());
