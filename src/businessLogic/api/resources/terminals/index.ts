import { HandlerType } from "#core/store/types/handler";
import { httpGet } from "#core/httpClient";
import { TNumberIdNameModel } from "#businessLogic/models";
import { TTerminalsItemsParams } from "#businessLogic/models/terminals";
import { appType } from "#constants/index";

const apiTypePrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];

export const getTerminalsItems: HandlerType<TTerminalsItemsParams, TNumberIdNameModel> = (params) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/terminals/items`,
    params,
  });
};
