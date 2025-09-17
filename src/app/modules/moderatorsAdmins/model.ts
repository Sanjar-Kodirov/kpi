import { createAdvancedFilterStore } from "#core/store";
import {
  TUsersModeratorsAdminsListAdditionalParams,
  TUsersModeratorsAdminsListParams,
} from "#businessLogic/models/users";

export const usersModeratorsAdminsFilterPropsDefault = {
  queryParams: {},
};

export const $usersModeratorsAdminsFilterProps = createAdvancedFilterStore<
  TUsersModeratorsAdminsListParams,
  TUsersModeratorsAdminsListAdditionalParams
>(usersModeratorsAdminsFilterPropsDefault);
