import { HandlerType } from "#core/store/types/handler";
import { PaginationListModel } from "#types/api";
import { httpGet } from "#core/httpClient";
import { IAdminLogsListItemModel, TAdminLogsListParams } from "#businessLogic/models/admin/adminLogs";

export const getAdminLogsList: HandlerType<TAdminLogsListParams, PaginationListModel<IAdminLogsListItemModel>> = (
  params,
) =>
  httpGet({
    url: `/api/admin/v1/log-history`,
    params,
  });
