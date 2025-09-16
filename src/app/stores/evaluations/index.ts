import {
  TPendingEvaluationsListParams,
  IEvaluationItemModel,
  IEvaluationDetailsModel,
  IRejectEvaluationModel,
  IAcceptEvaluationModel,
} from "#businessLogic/models/evaluations";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { XHRDataStoreType, XHRSuccessStoreType } from "#core/store/types/store";
import { api } from "#src/businessLogic/api";

export const $evaluationsList = createXHRStore<
  TPendingEvaluationsListParams,
  IEvaluationItemModel,
  XHRDataStoreType<IEvaluationItemModel | null>
>(api.evaluations.getPendingEvaluations, new XHRDataStoreState(null));

export const $evaluationDetails = createXHRStore(
  api.evaluations.getEvaluationDetails,
  new XHRDataStoreState<IEvaluationDetailsModel | null>(null),
);
export const $acceptEvaluation = createXHRStore<IAcceptEvaluationModel, IEvaluationDetailsModel, XHRSuccessStoreType>(
  api.evaluations.acceptEvaluation,
  new XHRSuccessStoreState(),
);
export const $rejectEvaluation = createXHRStore<IRejectEvaluationModel, IEvaluationDetailsModel, XHRSuccessStoreType>(
  api.evaluations.rejectEvaluation,
  new XHRSuccessStoreState(),
);
