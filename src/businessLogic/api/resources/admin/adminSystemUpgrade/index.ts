import { HandlerType } from "#core/store/types/handler";
import { PaginationListModel } from "#types/api";
import { httpGet, httpPut, httpPost } from "#core/httpClient";
import { TAdminLogsListParams } from "#businessLogic/models/admin/adminLogs";
import {
  IAdminSystemUpgradeListItemModel,
  ICreateAdminSystemUpgradeModel,
  IUpdateAdminSystemUpgradeModel,
  ISystemUpgradeDetailsModel,
} from "#businessLogic/models/admin/adminSystemUpgrade";
import { XHRSuccessStoreType } from "#core/store/types/store";

export const getAdminSystemUpgradeList: HandlerType<
  TAdminLogsListParams,
  PaginationListModel<IAdminSystemUpgradeListItemModel>
> = (params) =>
  httpGet({
    url: `/api/admin/v1/system-upgrade`,
    params,
  });

export const getUserDetails: HandlerType<number, ISystemUpgradeDetailsModel> = (id) => {
  return httpGet({
    url: `/api/admin/v1/system-upgrade/${id}`,
  });
};

export const createSystemUpgrade: HandlerType<ICreateAdminSystemUpgradeModel, XHRSuccessStoreType> = (data) =>
  httpPost({
    url: `/api/admin/v1/system-upgrade`,
    data,
  });

export const updateSystemUpgrade: HandlerType<IUpdateAdminSystemUpgradeModel, XHRSuccessStoreType> = ({
  id,
  ...data
}) =>
  httpPut({
    url: `/api/admin/v1/system-upgrade/${id}`,
    data,
  });
