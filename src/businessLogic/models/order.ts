import { TCodeNameModel, TIdNameModel, TListQueryParams, TNumberIdNameModel } from "#businessLogic/models";
import { IProductOriginItem } from "#businessLogic/models/public/common";

export type TOrderCreateParamsItems = {
  id?: number;
  menuItemId: number;
  multiUnitId?: number;
  qty: number;
  price: number;
  totalPrice: number;
  comment: string;
  orderId?: string;
  status?: TCodeNameModel;
};

export interface IOrderStatusesModel {
  status: string;
  reason: string;
  otherReason: string;
  withOrder: boolean;
  numberOfGuest: number;
  guestName: string;
  guestPhone: string;
}

export type TOrderCreateParams = {
  totalQty: number;
  totalPrice: number;
  feePercent?: number;
  feeAmount?: number;
  discountPercent?: number;
  discountAmount?: number;
  id?: string;
  clientId?: string;
  branchId: string;
  waiterId: string;
  paymentStatus?: string;
  paymentType?: string;
  comment: string;
  tableId: string;
  numberOfGuest: number;
  items: TOrderCreateParamsItems[];
  reservationId?: string;
};

export type TOrderUpdateParams = {
  id: string;
} & TOrderCreateParams;

export interface IOrderDetailsModelClient {
  id: 625;
  name: string;
  phone: string;
  gender: null;
  ageGroup: null;
}

export interface IOrderDetailsModelWaiter {
  id: string;
  name: string;
}

export interface IOrderDetailsModelBranch {
  id: string;
  name: string;
}

export interface IOrderDetailsModelTable {
  id: string;
  name: string;
  code: string;
}

export interface IOrderDetailsItemMenuItemModel {
  id: number;
  name: string;
  product: {
    id: number;
    name: string;
    barcode: string;
    catalogCode: string;
    vat: {
      name: string;
      code: string;
      amount: number;
    };
    origin: IProductOriginItem;
    hasMark: boolean;
    packageCode: string;
    packageName: string;
    category: TIdNameModel<number>;
  };
}

export interface IOrderDetailsItemMultiUnitModel {
  id: number;
  price: number;
  techCard?: TNumberIdNameModel;
  unit: TNumberIdNameModel;
  weight: number;
}

export interface IOrderDetailsItemModel {
  lastModifiedDate: string;
  id: number;
  menuItem: IOrderDetailsItemMenuItemModel;
  multiUnit: IOrderDetailsItemMultiUnitModel;
  qty: number;
  price: number;
  totalPrice: number;
  comment: string;
  status: TCodeNameModel;
  marks?: string[];
  hasMark: boolean;
  hall: TNumberIdNameModel;
  creator: TNumberIdNameModel;
  order: TNumberIdNameModel;
  orderDate: string;
  updater: TNumberIdNameModel;
  table: TNumberIdNameModel;
  vatPrice: number;
  vatRate: number;
}

export interface IOrderDetailsModel {
  lastModifiedDate: string;
  totalQty: number;
  totalPrice: number;
  totalPaid: number;
  feePercent: number;
  feeAmount: number;
  discountPercent: number;
  discountAmount: number;
  id: string;
  uid: string;
  client: IOrderDetailsModelClient;
  waiter: TNumberIdNameModel;
  branch: IOrderDetailsModelBranch;
  orderDate: string;
  status: TCodeNameModel;
  orderNumber: string;
  paymentStatus: string;
  comment: string;
  numberOfGuest: number;
  table: IOrderDetailsModelTable;
  shift: TNumberIdNameModel;
  items: IOrderDetailsItemModel[];
  receipt: IReceiptModel;
  bills: null | IOrderDetailsModelBills[];
  totalVat: number;
  hall: TNumberIdNameModel;
}

export interface IReceiptModel {
  id: number;
  name: string;
  status: {
    name: string;
    code: string;
    fiscalized: boolean;
  };
}

export enum E_ORDER_BILL_STATUS {
  PAID = "PAID",
  PENDING = "PENDING",
}

export interface IOrderDetailsModelBills {
  id: number;
  billId: string;
  status: TCodeNameModel<E_ORDER_BILL_STATUS>;
  time: string;
  epsQrCode: string;
  amount: number;
}

export interface ITableOrdersModelStatus {
  name: string;
  code: string;
}

export interface ITableOrdersModel {
  id: number;
  name: string;
  status: ITableOrdersModelStatus;
}

export type TOrderDiscountUpdateParams = {
  amount: number;
  percent: number;
  id: string;
};

export const enum E_ORDER_STATUS {
  ACTIVE = "ACTIVE",
  NEW = "NEW",
  CANCELLED = "CANCELLED",
  CLOSED = "CLOSED",
  READY = "READY",
  PREPARING = "PREPARING",
  RETURN = "RETURN",
  GIVEN = "GIVEN",
}

/**
 * Order list start
 */

export type TOrdersListParams = TListQueryParams & {
  clientId?: string;
  tableId?: string;
  waiterId?: string;
  id?: string;
  userId?: string;
  parentId?: string;
  companyId?: number;
  branchId?: string;
  departmentId?: string;
  warehouseId?: string;
  regionId?: string;
  districtId?: string;
  categoryId?: string;
  from?: string;
  to?: string;
  status?: E_ORDER_STATUS;
  excludeStatus?: E_ORDER_STATUS;
  excludeStatuses?: string;
  statuses?: string;
  tin?: string;
  type?: string;
  search?: string;
  orderId?: number;
  itemStatus?: E_ORDER_STATUS;
  isMine?: boolean;
  mine?: boolean | null;
};

export type TOrderListAdditionalParams = {
  departmentName?: string;
};

export interface IOrdersListItemModel {
  totalQty: number;
  totalPrice: number;
  feePercent: number;
  feeAmount: number;
  id: number;
  orderNumber: string;
  orderDate: string;
  closedDate: string;
  numberOfGuest: number;
  totalVat: number;
  client: TNumberIdNameModel;
  status: TCodeNameModel;
  waiter: TNumberIdNameModel;
  table: {
    id: number;
    name: string;
    code: string;
  };
  hall: TNumberIdNameModel;
  shift: TNumberIdNameModel;
}

export interface IOrderListItemModelClient {
  id: string;
  name: string;
}

export interface IOrderListItemModelWaiter {
  id: string;
  name: string;
}

export interface IOrderListItemModelTable {
  id: string;
  name: string;
  code: string;
}

export interface IOrderKanbanListItemModel {
  id: number;
  hall: {
    id: number;
    name: string;
  };
  orderNumber: string;
  orderDate: string;
  table: {
    id: string;
    name: string;
  };
  comment: string;
  items: IOrderItemsListItemModel[];
  status: TCodeNameModel;
}

/**
 * Order list end
 */

export type TOrderItemsListParams = TOrdersListParams;

export interface IOrderItemsListItemModelProduct {
  id: string;
  name: string;
  catalogCode: string;
  catalogName: string;
}

export interface IOrderItemsListItemModelUnit {
  id: string;
  name: string;
  code: string;
  measureId: number;
}

// export interface IOrderItemsListItemModel {
//   orderDate(orderDate: any, arg1: string): import("react").ReactNode;
//   id: string;
//   product: IOrderItemsListItemModelProduct;
//   unit: IOrderItemsListItemModelUnit;
//   qty: number;
//   price: number;
//   totalPrice: number;
//   comment: string;
//   status: E_ORDER_STATUS;
// }

export interface IOrderItemsListItemModel {
  lastModifiedDate: string;
  id: number;
  chef: {
    id: number;
    name: string;
  };
  menuItem: {
    id: number;
    name: string;
    product: {
      id: string;
      name: string;
      barcode: string;
      vatBarCode: string;
      vat: {
        name: string;
        code: string;
        amount: number;
      };
    };
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
  hasMark: boolean;
  marks: string[] | null;
  unit: TNumberIdNameModel | null;
}

export interface IKanbanBoardListItemModel {
  id: number;
  orderNumber: string;
  orderDate: string;
  table: {
    id: string;
    name: string;
  };
  totalCount: number;
  completedCount: number;
}

export interface IOrderItemsStatisticsModel {
  preparingCount: number;
  readyCount: number;
  cancelledCount: number;
  newCount: number;
}

export type TOrderItemsUpdateStatusParams = {
  id: number;
  status: E_ORDER_STATUS;
  lastModifiedDate: string;
};

export type TOrderTransferParams = {
  tableId: number;
  orders: number[] | undefined;
};

export type TOrderUpdateStatusParams = {
  id: number;
  status: string;
  reason?: string;
  otherReason?: string;
  numberOfGuests?: number;
};

export type TOrderItemsUpdateParamsItems = {
  id?: number;
  menuItemId: number;
  multiUnitId?: number;
  qty: number;
  price: number;
  totalPrice: number;
  comment: string;
  orderId: string;
  marks?: string[];
};

export type TOrderItemsUpdateParams = {
  id: number;
  items: TOrderItemsUpdateParamsItems[];
};

export type TUpdateOneOrderItemParams = {
  id: number;
  menuItemId: number;
  multiUnitId: number;
  price: number;
  qty: number;
  totalPrice: number;
  comment: string;
  orderId: number;
  lastModifiedDate: string;
};

export type TOrderStatisticsParams = {
  clientId?: number;
  tableId?: number;
  waiterId?: number;
  statuses?: string;
  chefId?: number;
  itemStatus?: string;
  mine?: boolean;
  withItems?: boolean;
  id?: number;
  userId?: number;
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
  tin?: string;
  type?: string;
  productId?: number;
  page?: number;
  size?: number;
  search?: string;
  orderBy?: string;
  sortOrder?: "asc" | "desc";
};

export interface IOrderStatisticsModel {
  activeCount: number;
  readyCount: number;
  cancelledCount: 0;
}
