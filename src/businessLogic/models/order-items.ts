import { TCodeNameModel, TNumberIdNameModel } from "#businessLogic/models/index";

export type TMarksCheckParams = {
  id: number;
  code: string;
  barcode: string;
};

export type IMarksCheckModel = {
  errorMessage: string | null;
  success: boolean;
};

export type TOrderItemsMarkCheckParams = {
  code: string;
  id: number;
};

export type TOrderItemsAddMarkParams = {
  code: string;
  id: number;
};

export type TOrderItemsDeleteMarkParams = {
  code: string;
  id: number;
};

export type TOrderItemsReplaceMarkParams = {
  id: number;
  code: string;
  replaceableCode: string;
};

export interface IUpdateOrderItemsStatusModel {
  success: boolean;
  errorCode: number;
}

export interface IOrderItemDetailsModel {
  id: number;
  order: {
    id: number;
    name: string;
  };
  creator: {
    id: number;
    name: string;
  };
  table: {
    id: number;
    name: string;
  };
  hall: {
    id: number;
    name: string;
  };
  menuItem: {
    id: number;
    department: {
      id: number;
      name: string;
    };
    name: string;
    product: IOrderItemsDetailsModelMenuItemProduct;
    menu: TNumberIdNameModel;
  };
  multiUnit: {
    id: number;
    weight: number;
    price: number;
    unit: TNumberIdNameModel;
    techCard: TNumberIdNameModel;
  };
  qty: number;
  price: number;
  totalPrice: number;
  comment: string;
  status: TCodeNameModel;
  orderDate: string;
  lastModifiedDate: string;
  hasMark: boolean;
  marks: string[];
}
export interface IOrderItemsDetailsModelMenuItemProduct {
  id: number;
  name: string;
  barcode: string;
  catalogCode: string;
  vat: TNumberIdNameModel;
  origin: TNumberIdNameModel;
  hasMark: boolean;
  packageCode: string;
  packageName: string;
  category: TNumberIdNameModel;
}
