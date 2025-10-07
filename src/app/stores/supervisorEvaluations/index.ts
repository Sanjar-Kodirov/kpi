import { createXHRStore } from "#core/store";
import { XHRDataStoreState } from "#core/store/constructors";
import { XHRDataStoreType } from "#core/store/types/store";
import { api } from "#businessLogic/api";
import {
  ISupervisorUsersToEvaluateList,
  TSupervisorUsersToEvaluateParams,
} from "#businessLogic/models/supervisorEvaluations";

export const $supervisorUsersToEvaluateList = createXHRStore<
  TSupervisorUsersToEvaluateParams,
  ISupervisorUsersToEvaluateList,
  XHRDataStoreType<ISupervisorUsersToEvaluateList | null>
>(api.supervisorEvaluations.getSupervisorUsersToEvaluate, new XHRDataStoreState(null));
