import { createAdvancedFilterStore } from "#core/store";
import {
  TPendingEvaluationsListAdditionalParams,
  TPendingEvaluationsListParams,
} from "#businessLogic/models/evaluations";

export const evaluationsFilterPropsDefault = {
  queryParams: {
    size: 20,
    page: 0,
  },
};

export const $evaluationsFilterProps = createAdvancedFilterStore<
  TPendingEvaluationsListParams,
  TPendingEvaluationsListAdditionalParams
>(evaluationsFilterPropsDefault);
