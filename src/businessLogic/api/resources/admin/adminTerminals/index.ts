import { HandlerType } from "#core/store/types/handler";
import { PaginationListModel } from "#types/api";
import { httpGet } from "#core/httpClient";
import { IAdminTerminalsListItemModel, TAdminTerminalListParams } from "#businessLogic/models/admin/adminTerminals";

export const getAdminTerminalsList: HandlerType<
  TAdminTerminalListParams,
  PaginationListModel<IAdminTerminalsListItemModel>
> = (params) =>
  httpGet({
    url: `/api/admin/v1/terminals`,
    params,
  });
