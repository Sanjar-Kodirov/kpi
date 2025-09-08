import { httpDelete, httpGet, httpPost, httpPut } from "#core/httpClient";
import { HandlerType } from "#core/store/types/handler";
import { TBranchesRegisterParams } from "./../../../models/cabinetBranch";

import {
  IBranchDetailResponseModel,
  IBranchesListItemResponseModel,
  ICreateBranchModel,
  IUpdateBranchModel,
  TBranchesListParams,
} from "#businessLogic/models/cabinetBranch";
import { PaginationListModel } from "#types/api";
import { appType } from "#constants/index";

const apiTypePrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];

export const getBranchesList: HandlerType<
  TBranchesListParams,
  PaginationListModel<IBranchesListItemResponseModel[]>
> = (params) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/branches`,
    params,
  });
};

export const deleteBranch: HandlerType<number | string, any> = (id) => {
  return httpDelete({
    url: `/api/${apiTypePrefix}/v1/branches/${id}`,
  });
};

export const createBranch: HandlerType<ICreateBranchModel, IBranchDetailResponseModel> = (data) => {
  return httpPost({
    url: `/api/${apiTypePrefix}/v1/branches`,
    data,
  });
};

export const updateBranch: HandlerType<IUpdateBranchModel, IBranchDetailResponseModel> = ({ id, ...data }) => {
  return httpPut({
    url: `/api/${apiTypePrefix}/v1/branches/${id}`,
    data,
  });
};

export const branchesRegister: HandlerType<TBranchesRegisterParams[], void> = (data) => {
  return httpPost({
    url: `/api/${apiTypePrefix}/v1/branches/register`,
    data,
  });
};

export const getBranchDetails: HandlerType<string | undefined, IBranchDetailResponseModel> = (id) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/branches/${id}`,
  });
};
