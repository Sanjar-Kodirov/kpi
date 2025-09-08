import { httpDelete, httpGet, httpPost, httpPut } from "#core/httpClient";
import { HandlerType } from "#core/store/types/handler";

import {
  ICheckUserResponse,
  IConfirmPasswordPayload,
  IRegisterUserPayload,
  IResetPasswordCheckPayload,
  IResetPasswordCheckResponse,
  IResetPasswordFinishPayload,
  IResetPasswordInitPayload,
  IUpdateUserModelProfile,
  IVerifyUserResponse,
} from "#businessLogic/models/account";
import {
  CurrentUserModel,
  ILoginPayloadType,
  ILoginResponseType,
  IUploadImageModel,
  IVerifyUserPayload,
} from "../../../models/account";
import { isAppTypeAdmin, appType } from "#constants/index";

const apiPrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];

export const getCurrentUser: HandlerType<void, CurrentUserModel> = () =>
  httpGet({
    url: `/api/${apiPrefix}/v1/account/profile`,
  });

export const updateUserProfile: HandlerType<IUpdateUserModelProfile, CurrentUserModel> = (data) =>
  httpPut({
    url: `/api/${apiPrefix}/v1/account/profile`,
    data,
  });

export const checkAccount: HandlerType<{ phone: string }, ICheckUserResponse> = (data) =>
  httpPost({
    url: "/api/public/v1/account/check",
    data,
  });

export const verifyAccount: HandlerType<IVerifyUserPayload, IVerifyUserResponse> = (data) =>
  httpPost({
    url: "/api/public/v1/account/verify",
    data,
  });

export const resendActivationKey: HandlerType<{ phone: string }, void> = (data) =>
  httpPost({
    url: "/api/public/v1/account/resend-activation-key",
    data,
  });

export const registerAccount: HandlerType<IRegisterUserPayload, void> = (data) =>
  httpPost({
    url: `/api/public/v1/account/register`,
    data,
  });

const appTypeApi = isAppTypeAdmin ? "admin" : "public";
export const logIn: HandlerType<ILoginPayloadType, ILoginResponseType> = (data) =>
  httpPost({
    url: `/api/${appTypeApi}/v1/account/login`,
    data: !isAppTypeAdmin
      ? data
      : {
          username: data.phone,
          password: data.password,
          rememberMe: data.rememberMe,
        },
    headers: { stopReaction: "true" },
  });

export const resetPasswordInit: HandlerType<IResetPasswordInitPayload, any> = (data) =>
  httpPost({
    url: "/api/public/v1/account/reset-password/init",
    data,
  });

export const resetPasswordCheck: HandlerType<IResetPasswordCheckPayload, IResetPasswordCheckResponse> = (data) =>
  httpPost({
    url: "/api/public/v1/account/reset-password/check",
    data,
  });

export const resetPasswordFinish: HandlerType<IResetPasswordFinishPayload, any> = (data) =>
  httpPost({
    url: "/api/public/v1/account/reset-password/finish",
    data,
  });

export const resetPasswordResendActivationKey = (data) =>
  httpPost({
    url: "/api/public/v1/account/resend-reset-password-key",
    data,
  });

export const uploadUserAvatar: HandlerType<IUploadImageModel, void> = ({ data }) =>
  httpPost({
    url: `/api/cabinet/v1/account/upload/profile-photo`,
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob",
  });

export const deleteUserAvatar: HandlerType<void, void> = () =>
  httpDelete({
    url: `/api/cabinet/v1/account/profile-photo`,
  });

export const changePasswordInit: HandlerType<any, any> = () =>
  httpGet({
    url: `/api/cabinet/v1/account/change-password/init`,
  });

export const changePasswordConfirm: HandlerType<IConfirmPasswordPayload, void> = (data) =>
  httpPost({
    url: `/api/cabinet/v1/account/change-password-confirm`,
    data,
  });
// @ts-ignore
export const logOut: HandlerType<any, any> = () => {
  sessionStorage.remove(`refresh-token`);
  sessionStorage.remove(`new-access-token`);
  httpGet({
    url: `/api/cabinet/v1/account/logout`,
  });
};

export const completeRegistration: HandlerType<void, void> = () =>
  httpPut({
    url: `/api/cabinet/v1/account/complete-registration`,
  });
