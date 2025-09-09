import { TStatisticsListParams, IStatisticsList } from "#businessLogic/models/statistics";
import { PaginationList } from "#constructors/data";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState } from "#core/store/constructors";
import { XHRDataStoreType } from "#core/store/types/store";
import { api } from "#businessLogic/api";
import { PaginationListModel } from "#types/api";

export const $statisticsList = createXHRStore<
  TStatisticsListParams,
  PaginationListModel<IStatisticsList[]>,
  XHRDataStoreType<PaginationListModel<IStatisticsList[]>>
>(api.statistics.getStatistics, new XHRDataStoreState(new PaginationList()));
