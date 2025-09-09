import { CurrentUserModel } from "#businessLogic/models/account";
import { $currentUser } from "#stores/account";
export const useCurrentUser: () => CurrentUserModel = () => {
  const currentUserState = $currentUser.store();

  if (!currentUserState.data) {
    throw new Error("current user не найден!");
  }

  return currentUserState.data;
};
