import {
  ICreateEvaluationModel,
  IUpdateEvaluationModel,
  IEvaluationDetailsModel,
  IUpdateEvaluationStatusModel,
  IEvaluationTypeModel,
  IEvaluationItemModel,
  IPendingEvaluationsList,
  TPendingEvaluationsListParams,
} from "#businessLogic/models/evaluations";
import { HandlerType } from "#core/store/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/api";
import { appType } from "#constants/index";

export const getPendingEvaluations: HandlerType<
  TPendingEvaluationsListParams,
  PaginationListModel<IPendingEvaluationsList[]>
> = (params) => {
  return httpGet({
    url: `/api/pending-evaluations`,
    params,
  });
};

export const getEvaluationsLookup: HandlerType<TPendingEvaluationsListParams, IEvaluationItemModel[]> = (params) => {
  return httpGet({
    url: `/api/public/departments/lookup`,
    params,
  });
};

export const getEvaluationDetails: HandlerType<number | string, IEvaluationDetailsModel> = (id) => {
  return httpGet({
    url: `/api/public/departments/${id}`,
  });
};
export const createEvaluation: HandlerType<ICreateEvaluationModel, IEvaluationDetailsModel> = (data) =>
  httpPost({
    url: `/api/public/departments`,
    data,
  });
export const updateEvaluation: HandlerType<IUpdateEvaluationModel, IEvaluationDetailsModel> = ({ id, ...data }) =>
  httpPut({
    url: `/api/public/departments/${id}`,
    data,
  });
export const deleteEvaluation: HandlerType<number | string, any> = (id) => {
  return httpDelete({
    url: `/api/public/departments/${id}`,
  });
};
export const updateEvaluationStatus: HandlerType<IUpdateEvaluationStatusModel, any> = ({ id, ...params }) =>
  httpPatch({
    url: `/api/public/departments/${id}/status`,
    params,
  });

export const getEvaluationTypes: HandlerType<void, IEvaluationTypeModel[]> = () => {
  return httpGet({
    url: "/api/public/v1/commons/department/types",
  });
};
