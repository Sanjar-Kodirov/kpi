import { httpDelete, httpGet, httpPost, httpPut } from "#core/httpClient";
import { HandlerType } from "#core/store/types/handler";
import { PaginationListModel } from "#types/api";
import { appType } from "#constants/index";
import {
  TCompensationsListParams,
  ICompensationsListItemModel,
  ICompensationDetailsModel,
  ICreateCompensationModel,
  IUpdateCompensationModel,
} from "#businessLogic/models/compensation";

const apiTypePrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];

export const getCompensations: HandlerType<
  TCompensationsListParams,
  PaginationListModel<ICompensationsListItemModel>
> = (params) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/compensations`,
    params,
  });
};

export const getCompensationDetails: HandlerType<TCompensationsListParams, ICompensationDetailsModel> = ({
  compensationId,
  ...params
}) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/compensations/${compensationId}`,
    params,
  });
};

export const createCompensation: HandlerType<ICreateCompensationModel, number> = (data) => {
  return httpPost({
    url: `/api/${apiTypePrefix}/v1/compensations`,
    data,
  });
};

export const updateCompensation: HandlerType<IUpdateCompensationModel, number> = ({ id, ...data }) => {
  return httpPut({
    url: `/api/${apiTypePrefix}/v1/compensations/${id}`,
    data,
  });
};

export const deleteCompensation: HandlerType<number, void> = (id) => {
  return httpDelete({
    url: `/api/${apiTypePrefix}/v1/compensations/${id}`,
  });
};
