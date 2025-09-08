import { ICheckUserResponse, IConfirmPasswordPayload, ICurrentUser } from "#businessLogic/models/account";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { api } from "src/businessLogic/api";

import { ACCESS_TOKEN_KEY_FOR_COOKIE, REFRESH_TOKEN_KEY_FOR_COOKIE } from "#constants/index";
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

export const $checkAccount = createXHRStore(
  api.account.checkAccount,
  new XHRDataStoreState<ICheckUserResponse | null>(null),
  {
    zeroReducer: (state, params) => {
      return {
        ...state,
        loading: true,
        phone: params.phone,
      };
    },
  },
  [resetRegistration1StepList, resetRegistrationList],
);

export const $verifyAccount = createXHRStore(
  api.account.verifyAccount,
  new XHRDataStoreState<{ secretKey: string } | null>(null),
);

export const $resendActivationKey = createXHRStore(api.account.resendActivationKey, new XHRSuccessStoreState());

export const $registerAccount = createXHRStore(api.account.registerAccount, new XHRSuccessStoreState());

export const $logIn = createXHRStore(api.account.logIn, new XHRSuccessStoreState(), {
  doneReducer: (state, response) => {
    sessionStorage.setItem(ACCESS_TOKEN_KEY_FOR_COOKIE, response.result.data.access_token);
    sessionStorage.setItem(REFRESH_TOKEN_KEY_FOR_COOKIE, response.result.data.refresh_token);

    return {
      ...state,
      fulfilled: true,
      loading: false,
      success: true,
      error: undefined,
    };
  },
});

export const $resetPasswordInit = createXHRStore(api.account.resetPasswordInit, new XHRSuccessStoreState(), {}, [
  resetResetPasswordList,
]);

export const $resetPasswordResendActivationKey = createXHRStore(
  api.account.resetPasswordResendActivationKey,
  new XHRSuccessStoreState(),
  {},
  [resetResetPasswordList],
);

export const $resetPasswordCheck = createXHRStore<
  any,
  { secretKey: string },
  XHRDataStoreState<{ secretKey: string } | null>
>(api.account.resetPasswordCheck, new XHRDataStoreState(null), {}, [resetResetPasswordList]);

export const $resetPasswordFinish = createXHRStore(api.account.resetPasswordFinish, new XHRSuccessStoreState(), {}, [
  resetResetPasswordList,
]);

export const $uploadUserAvatar = createXHRStore(api.account.uploadUserAvatar, new XHRSuccessStoreState());
export const $deleteUserAvatar = createXHRStore(api.account.deleteUserAvatar, new XHRSuccessStoreState());

export const $changePasswordInit = createXHRStore<any, any, XHRDataStoreState<{ secretKey: string } | null>>(
  api.account.changePasswordInit,
  new XHRDataStoreState(null),
  {},
  [resetChangePasswordList],
);

export const $changePasswordConfirm = createXHRStore<IConfirmPasswordPayload, any, any>(
  api.account.changePasswordConfirm,
  new XHRSuccessStoreState(),
  {},
  [resetChangePasswordList],
);

export const $completeRegistration = createXHRStore(api.account.completeRegistration, new XHRSuccessStoreState());

export const $logOut = createXHRStore(api.account.logOut, new XHRSuccessStoreState());
