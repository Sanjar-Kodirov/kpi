import { HandlerType } from "#core/store/types/handler";
import { httpGet } from "#core/httpClient";
import { PaginationListModel } from "#types/api";
import { TStatisticsListParams, IStatisticsList } from "#businessLogic/models/statistics";

export const getStatistics: HandlerType<TStatisticsListParams, PaginationListModel<IStatisticsList[]>> = (params) => {
  return httpGet({
    url: `/api/statistics`,
    params,
  });
};
