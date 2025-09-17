import { TUsersModeratorsAdminsListParams, IUsersModeratorsAdminsList } from "#businessLogic/models/users";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState } from "#core/store/constructors";
import { XHRDataStoreType } from "#core/store/types/store";
import { api } from "#businessLogic/api";

export const $usersModeratorsAdminsList = createXHRStore<
  TUsersModeratorsAdminsListParams,
  IUsersModeratorsAdminsList,
  XHRDataStoreType<IUsersModeratorsAdminsList | null>
>(api.users.getUsersModeratorsAdmins, new XHRDataStoreState(null));
