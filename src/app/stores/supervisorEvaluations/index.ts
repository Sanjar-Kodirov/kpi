import { createXHRStore } from "#core/store";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { XHRDataStoreType, XHRSuccessStoreType } from "#core/store/types/store";
import { api } from "#businessLogic/api";
import {
  ICreateSuperVisorEvaluations,
  ISupervisorUsersToEvaluateCriteria,
  ISupervisorUsersToEvaluateList,
  TSupervisorUsersToEvaluateParams,
} from "#businessLogic/models/supervisorEvaluations";

export const $supervisorUsersToEvaluateList = createXHRStore<
  TSupervisorUsersToEvaluateParams,
  ISupervisorUsersToEvaluateList,
  XHRDataStoreType<ISupervisorUsersToEvaluateList | null>
>(api.supervisorEvaluations.getSupervisorUsersToEvaluate, new XHRDataStoreState(null));

export const $supervisorUsersToEvaluateCriteria = createXHRStore<
  string,
  ISupervisorUsersToEvaluateCriteria,
  XHRDataStoreType<ISupervisorUsersToEvaluateCriteria | null>
>(api.supervisorEvaluations.getSupervisorUsersToEvaluateCriteria, new XHRDataStoreState(null));

export const $createSuperVisorEvaluation = createXHRStore<
  ICreateSuperVisorEvaluations,
  XHRSuccessStoreType,
  XHRSuccessStoreType
>(api.supervisorEvaluations.createSuperVisorEvaluation, new XHRSuccessStoreState());
