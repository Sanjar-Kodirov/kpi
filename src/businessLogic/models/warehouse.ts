import { TListQueryParams } from "#businessLogic/models";
export type TWarehousesListParams = {
  userId?: number;
  parentId?: string;
  role?: string;
  id?: number;
  companyId?: string;
  branchId?: string;
  regionId?: string;
  categoryId?: string;
  to?: string;
  from?: string;
  warehouseId?: string;
  status?: string;
  tin?: string;
  type?: string;
  search?: string;
  roles?: string;
  departmentId?: string;
} & TListQueryParams;

export interface IWarehousesListItemModel {
  id: number;
  name: string;
  branch: Branch;
  manager: Manager;
  status: {
    name: string;
    code: string;
  };
  department: {
    id: number;
    name: string;
  };
}

export interface IWarehouseDetailsModel extends IWarehousesListItemModel {}

export interface Branch {
  id: number;
  name: string;
}

export interface Manager {
  id: number;
  name: string;
}

export interface ICreateWarehouseModel {
  name: string;
  managerId: number;
  branchId: number;
  departmentId: number;
}

export interface IUpdateWarehouseModel extends ICreateWarehouseModel {
  id: number;
}
