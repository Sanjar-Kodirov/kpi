import {
  ICreateCustomerModel,
  IUpdateCustomerModel,
  ICustomerDetailsModel,
  ICustomersListItemModel,
  TCustomersListParams,
  IUpdateAssignCustomerModel,
} from "#businessLogic/models/customer";
import { HandlerType } from "#core/store/types/handler";
import { httpDelete, httpGet, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/api";
import { appType } from "#constants/index";
import { TCodeNameModel } from "#businessLogic/models";

const apiTypePrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];
export const getCustomersList: HandlerType<TCustomersListParams, PaginationListModel<ICustomersListItemModel[]>> = (
  params,
) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/customers`,
    params,
  });
};

export const getCustomersLookup: HandlerType<TCustomersListParams, TCodeNameModel[]> = (params) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/customers/lookup`,
    params,
  });
};

export const getCustomerDetails: HandlerType<number | string, ICustomerDetailsModel> = (id) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/customers/${id}`,
  });
};
export const createCustomer: HandlerType<ICreateCustomerModel, number> = (data) =>
  httpPost({
    url: `/api/${apiTypePrefix}/v1/customers`,
    data,
  });
export const updateCustomer: HandlerType<IUpdateCustomerModel, ICustomerDetailsModel> = ({ id, ...data }) =>
  httpPut({
    url: `/api/${apiTypePrefix}/v1/customers/${id}`,
    data,
  });
export const deleteCustomer: HandlerType<number | string, any> = (id) => {
  return httpDelete({
    url: `/api/${apiTypePrefix}/v1/customers/${id}`,
  });
};

export const updateAssignCustomer: HandlerType<IUpdateAssignCustomerModel, ICustomerDetailsModel> = ({
  orderId,
  ...data
}) =>
  httpPut({
    url: `/api/${apiTypePrefix}/v1/customers/assign/${orderId}`,
    data,
  });
