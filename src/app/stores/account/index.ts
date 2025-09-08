import { ICurrentUser } from "#businessLogic/models/account";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { api } from "src/businessLogic/api";

import { ACCESS_TOKEN_KEY_FOR_COOKIE } from "#constants/index";
const resetRegistration1StepList: Array<() => void> = [];
export const resetRegistration1Step = () => {
  resetRegistration1StepList.forEach((reset) => {
    reset();
  });
};

const resetRegistrationList: Array<() => void> = [];
export const resetRegistration = () => {
  resetRegistrationList.forEach((reset) => {
    reset();
  });
};

const resetResetPasswordList: Array<() => void> = [];

export const resetResetPassword = () => {
  resetResetPasswordList.forEach((reset) => {
    reset();
  });
};

const resetChangePasswordList: Array<() => void> = [];
export const resetChangePassword = () => {
  resetChangePasswordList.forEach((reset) => {
    reset();
  });
};

export const $currentUser = createXHRStore(
  api.account.getCurrentUser,
  new XHRDataStoreState<any | ICurrentUser>(null),
  {},
);

export const $updateUserProfile = createXHRStore(api.account.updateUserProfile, new XHRSuccessStoreState());

// export const $employeeStats = createXHRStore(api.user.getUserStats, new XHRDataStoreState<any | null>(null));

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
