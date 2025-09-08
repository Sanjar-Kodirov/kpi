import { ACCESS_TOKEN_KEY_FOR_COOKIE, ROUTES } from "#constants/index";
import { i18n } from "#src/localization/i18n";
import { notificationError } from "#ui/notifications";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { NavigateFunction } from "react-router-dom";

export const getAccessToken = () => sessionStorage.getItem(ACCESS_TOKEN_KEY_FOR_COOKIE);

let lastPathName = "";

const httpClient = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json", "Accept-Language": i18n.language },
});

export const registerHttpInterceptors = (navigate: NavigateFunction) => {
  httpClient.interceptors.response.use(
    (response) => {
      lastPathName && (lastPathName = "");
      return response;
    },
    (error) => {
      const stopReaction = error.response.config.headers?.stopReaction;

      if (!stopReaction) {
        const status = (error.response && error.response.status) || 0;

        const pathname = window.location.pathname;

        if (status === 401) {
          !lastPathName && (lastPathName = pathname);
          navigate(ROUTES.USER_SIGN_IN + `?from=${lastPathName}`, { replace: true });
          // location.replace(ROUTES.USER_SIGN_IN);
        } else if (status === 403) {
          notificationError(
            i18n.t("notifications.error"),
            i18n.t("fields.youDoNotHaveNecessaryPermissionPleaseContactYourAdministrator"),
          );
        } else if (status >= 400) {
          if (error.response) {
            notificationError(i18n.t("notifications.error"), error.response.data.detail || error.response.data.title);
          }
        }
      }

      return Promise.reject(error);
    },
  );

  httpClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY_FOR_COOKIE);

    if (token) {
      config.headers = Object.assign(config.headers, { Authorization: "Bearer " + token });
      return config;
    } else {
      return config;
    }
  });
};

type HttpRequestType = <R>(params: AxiosRequestConfig) => AxiosPromise<R>;

export const httpGet: HttpRequestType = (params) =>
  httpClient({
    method: "get",
    ...params,
  });

export const httpPost: HttpRequestType = (params) =>
  httpClient({
    method: "post",
    ...params,
  });

export const httpPut = (params: any) =>
  httpClient({
    method: "put",
    ...params,
  });

export const httpPatch = (params: any) =>
  httpClient({
    method: "patch",
    ...params,
  });

export const httpDelete = (params: any) =>
  httpClient({
    method: "delete",
    ...params,
  });
