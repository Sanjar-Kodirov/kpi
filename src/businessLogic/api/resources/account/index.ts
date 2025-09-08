import { httpDelete, httpGet, httpPost, httpPut } from "#core/httpClient";
import { HandlerType } from "#core/store/types/handler";

import { ICurrentUserResponse, ILoginPayloadType, ILoginResponseType } from "#businessLogic/models/account";
import { CurrentUserModel, IUploadImageModel } from "../../../models/account";

export const logInWithCode: HandlerType<ILoginPayloadType, ILoginResponseType> = (authCode) =>
  httpPost({
    url: `/api/auth/login-with-code`,
    data: authCode,
    headers: { stopReaction: "true" },
  });

export const getCurrentUser: HandlerType<ICurrentUserResponse, CurrentUserModel> = (data) =>
  httpPost({
    url: `/api/auth/get-user`,
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

// @ts-ignore
export const logOut: HandlerType<any, any> = () => {
  sessionStorage.remove(`refresh-token`);
  sessionStorage.remove(`new-access-token`);
  httpGet({
    url: `/api/cabinet/v1/account/logout`,
  });
};
