import { TUsersListAdditionalParams, TUsersListParams } from "#businessLogic/models/user";
import { createAdvancedFilterStore } from "#core/store";

export const adminUsersFilterPropsDefault = {
  queryParams: {
    size: 20,
  },
  additionalParams: {},
};
export const $adminUsersFilterProps = createAdvancedFilterStore<TUsersListParams, TUsersListAdditionalParams>(
  adminUsersFilterPropsDefault,
);
