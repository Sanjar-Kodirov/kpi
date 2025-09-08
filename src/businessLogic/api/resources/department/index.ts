import {
  ICreateDepartmentModel,
  IUpdateDepartmentModel,
  IDepartmentDetailsModel,
  IDepartmentsListItemModel,
  TDepartmentsListParams,
  IUpdateDepartmentStatusModel,
  IDepartmentTypeModel,
  IDepartmentItemModel,
} from "#businessLogic/models/department";
import { HandlerType } from "#core/store/types/handler";
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "#core/httpClient";
import { PaginationListModel } from "#types/api";
import { appType } from "#constants/index";

const apiTypePrefix = {
  ADMIN: "admin",
  CABINET: "cabinet",
}[appType];
export const getDepartmentsList: HandlerType<
  TDepartmentsListParams,
  PaginationListModel<IDepartmentsListItemModel[]>
> = (params) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/departments`,
    params,
  });
};

export const getDepartmentsLookup: HandlerType<TDepartmentsListParams, IDepartmentItemModel[]> = (params) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/departments/lookup`,
    params,
  });
};

export const getDepartmentDetails: HandlerType<number | string, IDepartmentDetailsModel> = (id) => {
  return httpGet({
    url: `/api/${apiTypePrefix}/v1/departments/${id}`,
  });
};
export const createDepartment: HandlerType<ICreateDepartmentModel, IDepartmentDetailsModel> = (data) =>
  httpPost({
    url: `/api/${apiTypePrefix}/v1/departments`,
    data,
  });
export const updateDepartment: HandlerType<IUpdateDepartmentModel, IDepartmentDetailsModel> = ({ id, ...data }) =>
  httpPut({
    url: `/api/${apiTypePrefix}/v1/departments/${id}`,
    data,
  });
export const deleteDepartment: HandlerType<number | string, any> = (id) => {
  return httpDelete({
    url: `/api/${apiTypePrefix}/v1/departments/${id}`,
  });
};
export const updateDepartmentStatus: HandlerType<IUpdateDepartmentStatusModel, any> = ({ id, ...params }) =>
  httpPatch({
    url: `/api/${apiTypePrefix}/v1/departments/${id}/status`,
    params,
  });

export const getDepartmentTypes: HandlerType<void, IDepartmentTypeModel[]> = () => {
  return httpGet({
    url: "/api/public/v1/commons/department/types",
  });
};
