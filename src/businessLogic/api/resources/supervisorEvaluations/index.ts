import { HandlerType } from "#core/store/types/handler";
import { httpGet, httpPost } from "#core/httpClient";
import {
  TSupervisorUsersToEvaluateParams,
  ISupervisorUsersToEvaluateList,
  ISupervisorUsersToEvaluateCriteria,
  ICreateSuperVisorEvaluations,
} from "#businessLogic/models/supervisorEvaluations";
import { XHRSuccessStoreType } from "#core/store/types/store";

export const getSupervisorUsersToEvaluate: HandlerType<
  TSupervisorUsersToEvaluateParams,
  ISupervisorUsersToEvaluateList
> = (params) => {
  return httpGet({
    url: `/api/supervisor-evaluations/users-to-evaluate`,
    params,
  });
};

export const getSupervisorUsersToEvaluateCriteria: HandlerType<string, ISupervisorUsersToEvaluateCriteria> = (
  userId,
) => {
  return httpGet({
    url: `/api/supervisor-evaluations/supervisor-criteria/${userId}`,
  });
};

export const createSuperVisorEvaluation: HandlerType<ICreateSuperVisorEvaluations, XHRSuccessStoreType> = (data) => {
  const hasFiles = Array.isArray(data.files) && data.files.length > 0;

  if (hasFiles) {
    const formData = new FormData();
    formData.append("user_id", data.user_id);
    formData.append("criteria_id", data.criteria_id);
    formData.append("evaluation_text", data.evaluation_text);

    data.files!.forEach((file) => {
      formData.append("files", file);
    });

    return httpPost({
      url: "/api/supervisor-evaluations/supervisor-evaluation",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  return httpPost({
    url: "/api/supervisor-evaluations/supervisor-evaluation",
    data,
  });
};
