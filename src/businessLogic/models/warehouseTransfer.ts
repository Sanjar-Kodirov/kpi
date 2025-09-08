import { TCodeNameModel, TIdNameModel, TListQueryParams } from ".";

export enum EWarehouseTransferStatuses {
  APPROVED = "APPROVED",
  REQUESTED = "REQUESTED",
  SENT = "SENT",
  CANCELLED = "CANCELLED",
}

export type TStockTransferListParams = {
  fromWarehouseId?: string;
  toWarehouseId?: string;
  toBranchId?: string;
  id?: string;
  userId?: number;
  parentId?: number;
  companyId?: number;
  branchId?: number;
  departmentId?: number;
  warehouseId?: number;
  regionId?: number;
  districtId?: number;
  categoryId?: number;
  status?: number;
  statuses?: string[];
  tin?: number;
  type?: number;
  types?: string[];
  productId?: number;
  search?: string;
} & TListQueryParams;

export interface IStockTransferListModel {
  id: number;
  transferType: TCodeNameModel;
  transferDate: string;
  transferNumber: string;
  status: TCodeNameModel;
  description: string;
  fromBranch: TIdNameModel;
  toBranch: TIdNameModel;
  fromWarehouse: TIdNameModel;
  toWarehouse: TIdNameModel;
  totalPrice: number;
  totalQty: number;
  createdBy: TIdNameModel;
}

export interface IStockTransferDetailsModel {
  id: number;
  transferType: TCodeNameModel;
  transferNumber: string;
  transferDate: string;
  status: TCodeNameModel;
  description: string;
  fromBranch: TIdNameModel;
  fromWarehouse: TIdNameModel;
  toBranch: TIdNameModel;
  toWarehouse: TIdNameModel;
  totalPrice: number;
  totalQty: number;
  items: IStockTransferDetailsItemModel[];
}

export interface IStockTransferDetailsItemModel {
  id: number;
  fromProduct: FromProduct;
  toProduct: ToProduct;
  fromWarehouse: TIdNameModel;
  toWarehouse: TIdNameModel;
  unit: TIdNameModel;
  qty: number;
  description: string;
}

export interface FromProduct {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  packageCode: string;
  packageName: string;
  catalogCode: string;
  catalogName: string;
  vat: TCodeNameModel;
  price: number;
  unit: TIdNameModel;
  origin: TCodeNameModel;
  category: TIdNameModel;
  productType: TCodeNameModel;
  hasTechCard: boolean;
  hasMark: boolean;
}

export interface ToProduct extends FromProduct {}

export interface ICreateStockTransferModel {
  stockTransferType: {
    code: string;
  };
  transferNumber?: string;
  fromWarehouseId: number;
  toWarehouseId: number;
  fromBranchId: number;
  toBranchId: number;
  transferDate: string;
  description: string;
  items: IStockTransferItem[];
}

export interface IStockTransferItem {
  id?: number;
  productId: number;
  qty: number;
  unitId: number;
  fromWarehouseId: number;
  toWarehouseId: number;
  price: number;
}
