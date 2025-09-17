import { HandlerType } from "#core/store/types/handler";
import { httpGet } from "#core/httpClient";
import { TUsersModeratorsAdminsListParams, IUsersModeratorsAdminsList } from "#businessLogic/models/users";

export const getUsersModeratorsAdmins: HandlerType<TUsersModeratorsAdminsListParams, IUsersModeratorsAdminsList> = (
  params,
) => {
  return httpGet({
    url: `/api/users/moderators-admins`,
    params,
  });
};
