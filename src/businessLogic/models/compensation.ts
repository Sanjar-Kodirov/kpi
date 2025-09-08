import { TIdNameModel, TListQueryParams } from "#businessLogic/models";
import { E_CATEGORY_TYPES } from "#businessLogic/models/category";
export type TCompensationsListParams = {
  compensationId?: number;
  branchId?: string;
  categoryId?: string;
  onlyFavorites?: string;
  search?: string;
  type?: E_CATEGORY_TYPES;
  categoryTypes?: E_CATEGORY_TYPES | E_CATEGORY_TYPES[];
} & TListQueryParams;

export interface ICompensationsListItemModel {
  id: number;
  description: string;
  product: Product;
  price: number;
  percent: number;
}
export interface ICompensationDetailsModel {
  id: number;
  description: string;
  product: Product;
  price: number;
  percent: number;
  branch: TIdNameModel;
  category: {
    id: number;
    name: string;
  };
}

export interface ICreateCompensationModel {
  description: string;
  productId: number;
  price: number;
  percent: number;
  branchId: number;
  categoryId: number;
}

export interface IUpdateCompensationModel extends ICreateCompensationModel {
  id: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
