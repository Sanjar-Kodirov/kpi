import { createXHRStore } from "#core/store";
import { api } from "#businessLogic/api";
import { XHRDataStoreState } from "#core/store/constructors";
import { PaginationListModel } from "#types/api";
import { PaginationList } from "#constructors/data";
import { IUsersListItemModel } from "#businessLogic/models/user";

export const $adminEmployeesList = createXHRStore(
  api.adminEmployees.getAdminEmployeesList,
  new XHRDataStoreState<PaginationListModel<IUsersListItemModel>>(new PaginationList()),
);
