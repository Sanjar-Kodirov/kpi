import { createAdvancedFilterStore } from "#core/store";
import { TStatisticsListAdditionalParams, TStatisticsListParams } from "#businessLogic/models/statistics";

export const statisticsFilterPropsDefault = {
  queryParams: {
    size: 20,
    page: 0,
  },
};

export const $statisticsFilterProps = createAdvancedFilterStore<TStatisticsListParams, TStatisticsListAdditionalParams>(
  statisticsFilterPropsDefault,
);
