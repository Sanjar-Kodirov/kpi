import {
  ICreateDepartmentModel,
  IUpdateDepartmentModel,
  IDepartmentDetailsModel,
  IDepartmentsListItemModel,
  TDepartmentsListParams,
  IUpdateDepartmentStatusModel,
  IDepartmentTypeModel,
} from "#businessLogic/models/department";
import { PaginationList } from "#constructors/data";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { XHRDataStoreType, XHRSuccessStoreType } from "#core/store/types/store";
import { api } from "#src/businessLogic/api";
import { PaginationListModel } from "#types/api";

export const $departmentsList = createXHRStore<
  TDepartmentsListParams,
  PaginationListModel<IDepartmentsListItemModel[]>,
  XHRDataStoreType<PaginationListModel<IDepartmentsListItemModel[]>>
>(api.department.getDepartmentsList, new XHRDataStoreState(new PaginationList()));

export const $departmentDetails = createXHRStore(
  api.department.getDepartmentDetails,
  new XHRDataStoreState<IDepartmentDetailsModel | null>(null),
);
export const $createDepartment = createXHRStore<ICreateDepartmentModel, IDepartmentDetailsModel, XHRSuccessStoreType>(
  api.department.createDepartment,
  new XHRSuccessStoreState(),
);
export const $updateDepartment = createXHRStore<IUpdateDepartmentModel, IDepartmentDetailsModel, XHRSuccessStoreType>(
  api.department.updateDepartment,
  new XHRSuccessStoreState(),
);
export const $deleteDepartment = createXHRStore<number | string, any, XHRSuccessStoreType>(
  api.department.deleteDepartment,
  new XHRSuccessStoreState(),
);
export const $updateDepartmentStatus = createXHRStore<IUpdateDepartmentStatusModel, any, XHRSuccessStoreType>(
  api.department.updateDepartmentStatus,
  new XHRSuccessStoreState(),
);

export const $departmentTypes = createXHRStore(
  api.department.getDepartmentTypes,
  new XHRDataStoreState<IDepartmentTypeModel[]>([]),
);
