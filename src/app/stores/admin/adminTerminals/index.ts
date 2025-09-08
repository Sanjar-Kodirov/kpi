import { createXHRStore } from "#core/store";
import { api } from "#businessLogic/api";
import { XHRDataStoreState } from "#core/store/constructors";
import { PaginationListModel } from "#types/api";
import { PaginationList } from "#constructors/data";
import { IAdminTerminalsListItemModel } from "#businessLogic/models/admin/adminTerminals";

export const $adminTerminalsList = createXHRStore(
  api.adminTerminals.getAdminTerminalsList,
  new XHRDataStoreState<PaginationListModel<IAdminTerminalsListItemModel>>(new PaginationList()),
);
