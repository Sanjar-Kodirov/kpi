import { TCodeNameModel, TIdNameModel, TListQueryParams, TNumberIdNameModel } from "#businessLogic/models";

export interface IStockOutListItemModel {
  totalSellingPrice: number;
  totalPurchasePrice: number;
  totalQty: number;
  totalVatPrice: number;
  id: number;
  stockNumber: string;
  stockDate: string;
  department: TIdNameModel;
  warehouse: TIdNameModel;
  customer: TIdNameModel;
  status: TCodeNameModel;
}

export type TStockOutListParams = {
  customerId?: number;
  supplierId?: number;
  transferType?: string;
  userId?: string;
  parentId?: number;
  companyId?: number;
  branchId?: number;
  departmentId?: number;
  warehouseId?: number;
  regionId?: number;
  districtId?: number;
  categoryId?: number;
  from?: string;
  to?: string;
  status?: string;
  search?: string;
} & TListQueryParams;

export type TCreateStockOutParams = {
  id?: number;
  branchId: number;
  customerId?: number;
  warehouseId?: number;
  description: string;
  stockDate: string;
  items: TCreateStockOutParamsItems[];
};
export type TCreateStockOutParamsItems = {
  id?: number;
  qty: number;
  totalPrice: number;
  vatRate?: number;
  productId: number;
  unitId: number;
  warehouseId: number;
  markCodes: string[] | null;
  aggregationCodes: string[] | null;
  blockCodes: string[] | null;
};

export type TUpdateStockOutParams = {
  id: number;
} & TCreateStockOutParams;

export interface IStockOutDetailsModel {
  totalPrice: number;
  totalQty: number;
  totalVatPrice: number;
  id: number;
  stockNumber: string;
  stockDate: string;
  branch: TIdNameModel;
  department: TIdNameModel;
  warehouse: TIdNameModel;
  customer: {
    id: number;
    name: string;
    tin: string;
  };
  description: string;
  status: TCodeNameModel;
  items: IStockOutDetailsModelItems[];
}

export interface IStockOutDetailsModelItems {
  id: number;
  qty: number;
  totalPrice: number;
  vatRate: number;
  totalVatPrice: number;
  product: TNumberIdNameModel;
  unit: TNumberIdNameModel;
  warehouse: TNumberIdNameModel;
  hasMarking: boolean;
}
