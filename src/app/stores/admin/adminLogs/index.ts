import { createXHRStore } from "#core/store";
import { api } from "#businessLogic/api";
import { XHRDataStoreState } from "#core/store/constructors";
import { PaginationListModel } from "#types/api";
import { PaginationList } from "#constructors/data";
import { IAdminLogsListItemModel } from "#businessLogic/models/admin/adminLogs";

export const $adminLogsList = createXHRStore(
  api.adminLogs.getAdminLogsList,
  new XHRDataStoreState<PaginationListModel<IAdminLogsListItemModel>>(new PaginationList()),
);
