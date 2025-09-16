import { createAdvancedFilterStore } from "#core/store";
import { TStatisticsListAdditionalParams, TStatisticsListParams } from "#businessLogic/models/statistics";
import moment from "moment";

export const statisticsFilterPropsDefault = {
  queryParams: {
    start_date: moment().subtract(1, "month").startOf("day").format("YYYY-MM-DD"),
    end_date: moment().endOf("day").format("YYYY-MM-DD"),
  },
};

export const $statisticsFilterProps = createAdvancedFilterStore<TStatisticsListParams, TStatisticsListAdditionalParams>(
  statisticsFilterPropsDefault,
);
