import { createXHRStore } from "#core/store";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { api } from "src/businessLogic/api";

import { ACCESS_TOKEN_KEY_FOR_COOKIE } from "#constants/index";
import { CurrentUserModel } from "#businessLogic/models/account";
export const $currentUser = createXHRStore(
  api.account.getCurrentUser,
  new XHRDataStoreState<any | CurrentUserModel>(null),
  {},
);

export const $loginWithCode = createXHRStore(api.account.logInWithCode, new XHRSuccessStoreState(), {
  doneReducer: (state, response) => {
    sessionStorage.setItem(ACCESS_TOKEN_KEY_FOR_COOKIE, response.result.data.token);

    return {
      ...state,
      fulfilled: true,
      loading: false,
      success: true,
      error: undefined,
    };
  },
});

export const $uploadUserAvatar = createXHRStore(api.account.uploadUserAvatar, new XHRSuccessStoreState());
export const $deleteUserAvatar = createXHRStore(api.account.deleteUserAvatar, new XHRSuccessStoreState());

export const $logOut = createXHRStore(api.account.logOut, new XHRSuccessStoreState());
