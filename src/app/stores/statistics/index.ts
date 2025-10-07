import { TStatisticsListParams, IStatisticsList } from "#businessLogic/models/statistics";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState } from "#core/store/constructors";
import { XHRDataStoreType } from "#core/store/types/store";
import { api } from "#businessLogic/api";

export const $statisticsList = createXHRStore<
  TStatisticsListParams,
  IStatisticsList,
  XHRDataStoreType<IStatisticsList | null>
>(api.statistics.getStatistics, new XHRDataStoreState(null));

export const $exportStatistics = createXHRStore<TStatisticsListParams, Blob, any>(
  api.statistics.exportStatistics,
  new XHRDataStoreState(null) as any,
);
