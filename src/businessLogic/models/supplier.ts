import { TListQueryParams } from "#businessLogic/models";
export type TSuppliersListParams = {
  activityTypeId?: string;
  businessType?: string;
  userId?: number;
  parentId?: string;
  role?: string;
  id?: string;
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
  districtId?: string;
} & TListQueryParams;

export interface ISupplierListItemModel {
  id: string;
  name: string;
  tin: string;
  contactName: string;
  contactPhone: string;
}

export interface ISupplierDetailsModel extends ISupplierListItemModel {}

export interface ICreateSupplierModel {
  name: string;
  tin: string;
  contactName: string;
  contactPhone: string;
}

export interface IUpdateSupplierModel extends ICreateSupplierModel {
  id: string;
}

export interface ISuppliersLookupModel {
  id: string;
  name: string;
  tin: string;
}
