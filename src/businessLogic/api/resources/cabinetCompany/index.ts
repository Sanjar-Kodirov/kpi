import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { HandlerType } from "#core/store/types/handler";

import {
  ICompanyAddressModel,
  ICompanyBankModel,
  ICompanyDetailsByTinResponse,
  ICreateCompany,
  ICreateCompanyBankModel,
  ICreateCompanyFromCts,
  ICurrentCompanyResponse,
  IRegisterCompanyBankModel,
  IUpdateCompanyAddressModel,
  IUpdateCompanyBankModel,
  TCompanyUpdatePayload,
  TCompanyUploadLogoPayload,
} from "#businessLogic/models/cabinetCompany";
import { XHRSuccessStoreType } from "#core/store/types/store";
import { appType } from "#constants/index";
import { TCodeNameModel } from "#businessLogic/models";

const apiTypePrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];
export const getCompanyDetailsByTin: HandlerType<string, ICompanyDetailsByTinResponse> = (tin: string) =>
  httpGet({
    url: `/api/${apiTypePrefix}/v1/companies/check/${tin}`,
  });

export const getCurrentCompany: HandlerType<void, ICurrentCompanyResponse> = () =>
  httpGet({
    url: `/api/${apiTypePrefix}/v1/companies`,
  });

export const createCompany: HandlerType<ICreateCompany | ICreateCompanyFromCts, ICompanyDetailsByTinResponse> = (
  data,
) =>
  httpPost({
    url: `/api/${apiTypePrefix}/v1/companies/register`,
    data,
  });

export const updateCompany: HandlerType<TCompanyUpdatePayload, void> = (data) =>
  httpPut({
    url: `/api/${apiTypePrefix}/v1/companies`,
    data,
  });

export const getCurrentCompanyBank: HandlerType<void, ICompanyBankModel> = () =>
  httpGet({
    url: `/api/${apiTypePrefix}/v1/company-banks`,
  });

export const getCabinetCompanyAddress: HandlerType<void, ICompanyAddressModel> = () =>
  httpGet({
    url: `/api/${apiTypePrefix}/v1/company-address`,
  });

export const registerCabinetCompanyBank: HandlerType<IRegisterCompanyBankModel, ICompanyAddressModel> = (data) =>
  httpPost({
    url: `/api/${apiTypePrefix}/v1/company-banks/register`,
    data,
  });

export const updateCabinetCompanyAddress: HandlerType<IUpdateCompanyAddressModel, XHRSuccessStoreType> = (data) =>
  httpPut({
    url: `/api/${apiTypePrefix}/v1/company-address`,
    data,
  });

export const createCompanyBank: HandlerType<ICreateCompanyBankModel, XHRSuccessStoreType> = (data) =>
  httpPost({
    url: `/api/${apiTypePrefix}/v1/company-banks`,
    data,
  });

export const updateCompanyBank: HandlerType<IUpdateCompanyBankModel, XHRSuccessStoreType> = ({ id, ...data }) =>
  httpPut({
    url: `/api/${apiTypePrefix}/v1/company-banks/${id}`,
    data,
  });

export const uploadCompanyAvatar: HandlerType<TCompanyUploadLogoPayload, void> = ({ data, companyId }) =>
  httpPost({
    url: `/api/${apiTypePrefix}/v1/companies/upload/logo`,
    data,
    params: { companyId },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob",
  });

export const deleteCompanyAvatar: HandlerType<string, void> = () =>
  httpDelete({
    url: `/api/${apiTypePrefix}/v1/companies/logo`,
  });
0;
export const syncCompanyWithSmartpos: HandlerType<{ tin: string }, XHRSuccessStoreType> = (params) =>
  httpPost({
    url: `/api/${apiTypePrefix}/v1/companies/sync/smartpos`,
    params,
  });

export const getCompanyStatuses: HandlerType<void, TCodeNameModel[]> = () =>
  httpGet({
    url: `/api/${apiTypePrefix}/v1/companies/statuses`,
  });

export const updateCompanyStatus: HandlerType<{ id: number; status: string }, XHRSuccessStoreType> = ({ id, status }) =>
  httpPatch({
    url: `/api/${apiTypePrefix}/v1/companies/${id}/status`,
    params: {
      status,
    },
  });
