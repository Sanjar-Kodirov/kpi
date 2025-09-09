import {
  ICreateEvaluationModel,
  IUpdateEvaluationModel,
  IEvaluationDetailsModel,
  IUpdateEvaluationStatusModel,
  IEvaluationTypeModel,
  TPendingEvaluationsListParams,
  IEvaluationItemModel,
} from "#businessLogic/models/evaluations";
import { PaginationList } from "#constructors/data";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { XHRDataStoreType, XHRSuccessStoreType } from "#core/store/types/store";
import { api } from "#src/businessLogic/api";
import { PaginationListModel } from "#types/api";

export const $evaluationsList = createXHRStore<
  TPendingEvaluationsListParams,
  PaginationListModel<IEvaluationItemModel[]>,
  XHRDataStoreType<PaginationListModel<IEvaluationItemModel[]>>
>(api.evaluations.getPendingEvaluations, new XHRDataStoreState(new PaginationList()));

export const $evaluationDetails = createXHRStore(
  api.evaluations.getEvaluationDetails,
  new XHRDataStoreState<IEvaluationDetailsModel | null>(null),
);
export const $createEvaluation = createXHRStore<ICreateEvaluationModel, IEvaluationDetailsModel, XHRSuccessStoreType>(
  api.evaluations.createEvaluation,
  new XHRSuccessStoreState(),
);
export const $updateEvaluation = createXHRStore<IUpdateEvaluationModel, IEvaluationDetailsModel, XHRSuccessStoreType>(
  api.evaluations.updateEvaluation,
  new XHRSuccessStoreState(),
);
export const $deleteEvaluation = createXHRStore<number | string, any, XHRSuccessStoreType>(
  api.evaluations.deleteEvaluation,
  new XHRSuccessStoreState(),
);
export const $updateEvaluationStatus = createXHRStore<IUpdateEvaluationStatusModel, any, XHRSuccessStoreType>(
  api.evaluations.updateEvaluationStatus,
  new XHRSuccessStoreState(),
);

export const $evaluationsTypes = createXHRStore(
  api.evaluations.getEvaluationTypes,
  new XHRDataStoreState<IEvaluationTypeModel[]>([]),
);
