import { TListQueryParams, TNumberIdNameModel, TWithCodeModel, TWithIdModel } from "#businessLogic/models";

export const enum E_RECEIPT_STATUSES {
  DRAFT = "DRAFT",
}

export enum PAYMENT_TYPES {
  OTHER = "OTHER",
  APAY = "APAY",
  UZCARD = "UZCARD",
  CASH = "CASH",
  NDS = "NDS",
  HUMO = "HUMO",
  EXCISE = "EXCISE",
  LOYALTY_CARD = "LOYALTY_CARD",
  CARD = "CARD",
  DISCOUNT = "DISCOUNT",
  EPAYMENT = "EPAYMENT",
}

export type ReceiptPaymentsType = { [key in keyof typeof PAYMENT_TYPES]?: number };

export enum RECEIPT_STATUSES {
  DRAFT = "DRAFT",
  PAID = "PAID",
  RETURNED = "RETURNED",
}

export type CreateReceiptIReceiptDetailsModel = {
  productId: string;
  productName: string;
  categoryId: string;

  qty: number;
  price: number;
  amount: number;
  unitId: string;
  unitName: string;
  // packageCode: number;
  marks?: string[];

  nds?: number;
  ndsPercent?: number;

  discount?: number;
  discountPercent?: number;
  excise?: number;
  exciseRate?: number;

  productBarcode: string;
  vatBarcode: string;

  committentTin?: string;

  extraDetail?: {
    packageCode: number;
    packageName: string;
  };
};

export type CreateReceiptModel = {
  referenceType: TWithCodeModel;
  billId?: string;

  additional?: {
    transactionId?: string;
  };

  forceToPrint: boolean;
  branchId: string;

  receiptDateTime: string;
  totalCost: number;
  totalPaid: number;
  totalNds?: number;

  user: TWithIdModel;
  receiptDetails: CreateReceiptIReceiptDetailsModel[];
  payments: ReceiptPaymentsType;
  source: string;

  sendSms?: boolean;
  status?: TWithCodeModel<RECEIPT_STATUSES>;
  originUid?: string;
  id?: number;
};

export interface IReceiptPaymentTypesModel {
  id: number;
  nameUz: string;
  nameCyrillic: string;
  nameRu: string;
  code: string;
}

// export type ReceiptDetailsProductExtraDetailModel = {
//   packageCode: number;
//   packageName: string;
// };

// export type ReceiptDetailsIProductsListItemModel = {
//   amount: number;
//   branchId: string;
//   categoryId: string;
//   categoryName: string;
//   committentTin: string;
//   discount: number;
//   discountAmountForPromotion: number;
//   discountByPromotionPercent: number;
//   discountPercent: number;
//   excise: number;
//   exciseRate: number;
//   extraDetail?: ReceiptDetailsProductExtraDetailModel;
//   hitCount: number;
//   marks: string[];
//   nds: number;
//   ndsPercent: number;
//   price: number;
//   productBarcode: string;
//   productId?: number;
//   productName: string;
//   promotionId: number;
//   qty: number;
//   receiptId: number;
//   salesPrice: number;
//   unitId: string;
//   unitName: string;
//   vatBarcode: string;
// };

// export interface IReceiptDetailsModel {
//   additional?: {
//     fiscalCreatedDate: string;
//     numberInShift: number;
//     providerId: number;
//     receiptSeq: string;
//     samModuleSerialNumber: string;
//     transactionId: string;
//   };
//   billId?: string;
//   branchAddress?: string;
//   branchId: string;
//   branchName: string;
//   companyINN?: string;
//   companyId?: number;
//   companyName: string;
//   createdDateTime: string;
//   customerId?: number;
//   customerName?: string;
//   customerPhone?: string;
//   discountByPromotionPercent?: number;
//   discountPercent?: number;
//   fiscalSign: string;
//   fiscalUrl: string;
//   forceToPrint: boolean;
//   id: number;
//   lat?: number;
//   lon?: number;
//   loyaltyCardId?: number;
//   originUid?: string;
//   payments: ReceiptPaymentsType;
//   promotionId?: number;
//   readOnly: boolean;
//   receiptDateTime: string;
//   receiptDetails: ReceiptDetailsIProductsListItemModel[];
//   shiftNo?: number;
//   source?: string;
//   status: {
//     code: RECEIPT_STATUSES;
//     nameRu: string;
//   };
//   terminalId?: number;
//   terminalModel: string;
//   terminalSN: string;
//   totalBasketPromotionBonuses?: number;
//   totalCard: number;
//   totalCash: number;
//   totalCost: number;
//   totalDiscount: number;
//   totalExcise: number;
//   totalLoyaltyCard?: number;
//   totalNds: number;
//   totalPaid: number;
//   totalProductPromotionBonuses?: number;
//   totalPromotionBonus?: number;
//   uid: string;
//   user?: {
//     activated: boolean;
//     activationKey: string;
//     agreementId: number;
//     authorities: [string];
//     branchId: string;
//     branchName: string;
//     companyId: number;
//     companyInn: string;
//     companyName: string;
//     createdBy: string;
//     createdDate: string;
//     dismissed: boolean;
//     fullName: {
//       firstName: string;
//       lastName: string;
//       name: string;
//       patronymic: string;
//       phone: string;
//     };
//     id: number;
//     langKey: string;
//     lastModifiedBy: string;
//     lastModifiedDate: string;
//     login: string;
//     owner: boolean;
//     password: string;
//     permissions: [string];
//     resetKey: string;
//     started: boolean;
//     superAdmin: boolean;
//     telegramLogin: string;
//     telegramName: string;
//   };
//   userId?: number;
// }

export type TReceiptByBranchDetailsModel = {
  activityType: string;
  branchName: string;
  cityName: string;
  companyName: string;
  id: number;
  receipts: number;
  regionName: string;
  revenue: number;
};

export type TReceiptByCompaniesDetailsModel = {} & TReceiptByBranchDetailsModel;

export type TReceiptsListParams = {
  companyId?: number;
  regionId?: string;
  branchId?: string;
  search?: string;
  position?: string;
  from?: string;
  to?: string;
  status?: string;
  terminalId?: string;
  paymentTypes?: string;
  userId?: string;
  totalCostFrom?: string;
  totalCostTo?: string;
  isFiscal?: boolean;
} & TListQueryParams;

export type TReceiptsByBranchListParams = {
  to?: string;
  from?: string;
  search?: string;
  companyId?: string;
  regionId?: string;
  cityId?: string;
  activityTypeId?: string;
} & TListQueryParams;

export type TReceiptsByCompaniesListParams = {
  to?: string;
  from?: string;
  search?: string;
  regionId?: string;
  cityId?: string;
} & TListQueryParams;

export type TReceiptsListAdditionalParams = {
  companyName?: string;
  userName?: string;
  branchName?: string;
};

export type TReceiptsByBranchListAdditionalParams = {
  companyName?: string;
  regionName?: string;
  cityName?: string;
  activityType?: string;
};

export type TReceiptsByCompaniesListAdditionalParams = {
  regionName?: string;
  cityName?: string;
};

export interface IReceiptsStatsModel {
  card: number;
  cardHumo: number;
  cardLoyalty: number;
  cardOther: number;
  cardUzCard: number;
  cash: number;
  discount: number;
  nds: number;
  positionsInReceipts: number;
  receipts: number;
  returnedCard: number;
  returnedCash: number;
  returnedDiscount: number;
  returnedHUMO: number;
  returnedLoyalty: number;
  returnedNDS: number;
  returnedOther: number;
  returnedReceipts: number;
  returnedUZCARD: number;
  revenue: number;
  shiftCount: number;
  totalReturnedRevenue: number;
}

export type TReceiptsByBranchesStats = Partial<TReceiptByBranchDetailsModel>;
export type TReceiptsByCompaniesStats = Partial<TReceiptByBranchDetailsModel>;

export type TCashBoxOperationsListParams = {
  branchId?: number;
  search?: string;
  from?: string;
  to?: string;
  status?: string;
  userId?: number;
} & TListQueryParams;

export type TCashBoxOperationsListAdditionalParams = {};

export type ICashBoxOperationsListItemModel = IReceiptDetailsModel;
export type IReceiptsByBranchListItemModel = TReceiptByBranchDetailsModel;

export interface ICashBoxOperationsStatsModel {
  cashBox: number;
  flow: number;
  incassation: number;
  income: number;
  paidCard: number;
  paidCash: number;
  returnFlow: number;
  returnedCard: number;
  returnedCash: number;
  withdraw: number;
}

export interface IReceiptsListItemModel {
  hall: {
    id: number;
    name: string;
  };
  id: number;
  receiptDate: string;
  totalCost: number;
  totalVat: number;
  totalCash: number;
  status: {
    name: string;
    code: string;
    fiscalized: boolean;
  };
  terminalSerialNumber: string;
  shiftNumber: number;
  payments: {
    [key: string]: number;
  };
}

export interface IReceiptDetailsModel {
  receiptSeq: any;
  id: number;
  originUid: string;
  fiscalSign: string;
  fiscalUrl: string;
  payments: {
    [key: string]: number;
  };
  totalCash: number;
  totalCard: number;
  totalCost: number;
  totalDiscount: number;
  discountPercent: number;
  totalPaid: number;
  totalVat: number;
  branch: TNumberIdNameModel;
  terminal: {
    id: number;
    name: string;
    code: string;
  };
  company: {
    id: number;
    name: string;
    tin: string;
  };
  shiftNo: number;
  numberInShift: number;
  items: IReceiptDetailsModelItems[];
  user: TNumberIdNameModel;
  status: {
    name: string;
    code: RECEIPT_STATUSES;
    fiscalized: boolean;
  };
  source: string;
  customer: {
    id: number;
    name: string;
    phone: string;
  };
  uid: string;
  receiptDateTime: string;
  positionCount: number;
  table: TNumberIdNameModel;
  order: TNumberIdNameModel;
}

export interface IReceiptDetailsModelItemsProduct {
  id: number;
  name: string;
  barcode: string;
  catalogCode: string;
  vat: {
    name: string;
    code: string;
    amount: number;
  };
  origin: {
    id: number;
    name: string;
    code: string;
  };
  hasMark: boolean;
  packageCode: string;
  packageName: string;
  category: TNumberIdNameModel;
}

export interface IReceiptDetailsModelItems {
  id: number;
  product: IReceiptDetailsModelItemsProduct;
  unit: TNumberIdNameModel;
  category: TNumberIdNameModel;
  price: number;
  salesPrice: number;
  qty: number;
  discountPercent: number;
  discount: number;
  vatPrice: number;
  vatRate: number;
  marks: string[];
  origin: number;
}

export interface IReceiptStatusModel {
  name: string;
  code: string;
  fiscalized: boolean;
}
