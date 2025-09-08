import { HandlerType } from "#core/store/types/handler";
import { PaginationListModel } from "#types/api";
import { httpGet } from "#core/httpClient";
import { IUsersListItemModel, TUsersListParams } from "#businessLogic/models/user";

export const getAdminEmployeesList: HandlerType<TUsersListParams, PaginationListModel<IUsersListItemModel>> = (
  params,
) =>
  httpGet({
    url: `/api/admin/v1/employees`,
    params,
  });
