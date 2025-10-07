import { HandlerType } from "#core/store/types/handler";
import { httpGet } from "#core/httpClient";
import {
  TSupervisorUsersToEvaluateParams,
  ISupervisorUsersToEvaluateList,
} from "#businessLogic/models/supervisorEvaluations";

export const getSupervisorUsersToEvaluate: HandlerType<
  TSupervisorUsersToEvaluateParams,
  ISupervisorUsersToEvaluateList
> = (params) => {
  return httpGet({
    url: `/api/supervisor-evaluations/users-to-evaluate`,
    params,
  });
};
