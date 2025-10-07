import {
  IEvaluationDetailsModel,
  IEvaluationItemModel,
  TPendingEvaluationsListParams,
  IAcceptEvaluationModel,
  IRejectEvaluationModel,
  IExportEvaluationsModel,
} from "#businessLogic/models/evaluations";
import { HandlerType } from "#core/store/types/handler";
import { httpGet, httpPost } from "#core/httpClient";

export const getPendingEvaluations: HandlerType<TPendingEvaluationsListParams, IEvaluationItemModel> = (params) => {
  return httpGet({
    url: `/api/pending-evaluations`,
    params,
  });
};

export const getEvaluationDetails: HandlerType<number | string, IEvaluationDetailsModel> = (id) => {
  return httpGet({
    url: `/api/public/departments/${id}`,
  });
};
export const acceptEvaluation: HandlerType<IAcceptEvaluationModel, IEvaluationDetailsModel> = (data) =>
  httpPost({
    url: `/api/accept-evaluation`,
    data,
  });

export const rejectEvaluation: HandlerType<IRejectEvaluationModel, IEvaluationDetailsModel> = (data) =>
  httpPost({
    url: `/api/reject-evaluation`,
    data,
  });

export const exportEvaluations: HandlerType<IExportEvaluationsModel, Blob> = (params) =>
  httpGet({
    url: `/api/export/evaluations`,
    params,
    responseType: "blob",
    headers: { Accept: "*/*" },
  });
