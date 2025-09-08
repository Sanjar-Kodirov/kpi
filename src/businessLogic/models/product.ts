import { TCodeNameModel, TIdNameModel, TListQueryParams, TWithCodeModel } from "#businessLogic/models";
import { E_CATEGORY_TYPES } from "#businessLogic/models/category";
import { IVatListType } from "#businessLogic/models/vat";
import { E_PRODUCT_ORIGIN, IProductOriginItem } from "#businessLogic/models/public/common";

export enum EModerationStatus {
  STATUS_MODERATED = "STATUS_MODERATED",
  STATUS_PENDING = "STATUS_PENDING",
  STATUS_DELETED = "STATUS_DELETED",
  STATUS_DELETION_PENDING = "STATUS_DELETION_PENDING",
}

export interface IProductUnitModel {
  id: string;
  name: string;
  nameRu: string;
  nameUz: string;
  description: string;
  code: number;
  countable: boolean;
}

interface ICreditSettings {
  month: number;
  // percent: number;
  price: number;
}

interface IAdvanceSettings {
  // month: number;
  percent: number;
  // price: number;
}

export interface IProductsListItemModelCategory {
  id: string;
  name: string;
  catalog: {
    name: string;
    code: string;
    barcode: string | null;
  } | null;
}

export interface IProductsListItemModelDepartment {
  id: string;
  name: string;
}

export interface IProductsListItemModelBranch {
  id: string;
  name: string;
}

export interface IProductsListItemModelPhoto {
  id: string;
  name: string;
  url: string;
}

export interface IProductsListItemModelUnit {
  id: string;
  name: string;
  code: string;
  measureId: number;
}

export interface IProductsListItemModel {
  id: number;
  name: string;
  barcode: string;
  category: IProductsListItemModelCategory;
  department: IProductsListItemModelDepartment;
  branch: IProductsListItemModelBranch;
  type: string;
  vat: string;
  hasMark: boolean;
  price: number;
  catalogCode: string;
  catalogName: string;
  photo: IProductsListItemModelPhoto;
  unit: IProductsListItemModelUnit;
  status: TCodeNameModel;
  weight: number | null;
}

export type TProductDetailsParams = {
  branchId?: string;
  productId: number;
};

export interface IProductDetailsModelCategory {
  id: string;
  name: string;
  catalog: {
    code: string;
    name: string;
    barcode: string | null;
  };
  type: TCodeNameModel<E_CATEGORY_TYPES>;
}

export interface IProductDetailsModelDepartment {
  id: string;
  name: string;
}

export interface IProductDetailsModelBranch {
  id: string;
  name: string;
}

export interface IProductDetailsModelPhoto {
  id: string;
  name: string;
  url: string;
}

export interface IProductDetailsModelUnit {
  id: number;
  name: string;
  code: string;
  measureId: number;
}

export interface IProductDetailsModelType {
  name: string;
  code: string;
  codeNumber: number;
  templateId: number;
  productGroup: string;
}

export interface IProductDetailsModel {
  id: number;
  name: string;
  barcode: string;
  category: IProductDetailsModelCategory;
  catalogName: string;
  catalogCode: string;
  packageName: string;
  packageCode: string;
  vat: IVatListType;
  description: string;
  type: IProductDetailsModelType;
  department: IProductDetailsModelDepartment;
  branch: IProductDetailsModelBranch;
  status: TCodeNameModel;
  unit?: TIdNameModel;
  origin: IProductOriginItem;
  hasMark: boolean;
  hasTechCard: boolean;
  price: number;
}

export type TProductDetailsFromTasnifParams = {
  barcode?: string;
  mxikCode?: string;
  searchKey?: string;
};

export type TProductListFromTasnifParams = {
  text?: string;
  lang?: string;
  page?: number;
  size?: number;
  mxikCode?: string;
  gtin?: string;
  tnvedCode?: string;
  brandName?: string;
};

export interface IProductDetailsByCode {
  mxik: string;
  internalCode: string;
  name: string;
}

export interface IUpdateProductPriceModel {
  productId: number;
  salesPrice: number;
}

export interface IUpdateProductStatusModel {
  ids: string[];
  status: { code: string };
}

export type TProductsListParams = {
  branchId?: string;
  menuIncluded?: boolean;
  status?: string;
  categoryId?: string;
  onlyFavorites?: string;
  search?: string;
  type?: E_CATEGORY_TYPES;
  categoryTypes?: E_CATEGORY_TYPES | E_CATEGORY_TYPES[];
} & TListQueryParams;

export type TProductsListAdditional = {
  categoryName?: string;
};

export type TProductsUnitsByProductParams = {
  productId: string;
  branchId: string;
};

export type TProductPriceHistoryParams = {
  productId: string;
  branchId: string;
};

export interface IProductPriceHistoryItemModel {
  newPrice: number;
  oldPrice: number;
  updatedBy?: string;
  updatedDateTime: string;
}

export interface ICreateProductUnitModel {
  coefficient: number;
  count: number;
  sorder: number;
  unitId: string;
  base: boolean;
}

export interface ICreateProductModel {
  name: string;
  barcode: string;
  categoryId: string;
  catalogName: string;
  catalogCode: string;
  vat: string;
  description: string;
  departmentId: string;
  branchId: string;
  packageName: string;
  packageCode: string;
  unitId?: number | undefined;
  productType?: string;
  origin: TWithCodeModel<E_PRODUCT_ORIGIN>;
  hasMark?: boolean;
  hasTechCard: boolean;
  price?: number;
}

export interface IDeleteIProductsListItemModel {
  id: number;
  branchId?: string;
}

export interface TImportProducts {
  params: {
    branchId: string;
    categoryId?: string;
  };
  data: FormData;
}

export interface ISetVatBatchModel {
  branchId: string;
  categoryId?: string;
  vatRate: number | null;
}

export interface ISetMarkBatchModel {
  branchId: string;
  categoryId?: string;
  hasMark: boolean;
}

export interface IProductUnitById {
  balance?: null;
  base: boolean;
  coefficient?: null;
  description?: null;
  id: string;
  name: string;
  price: number;
  selected?: null;
}

export type TProductUnitByIdPayload = {
  productId: string;
  branchId: string;
};

export interface IUpdateCategoryPricesModel {
  branchId: string;
  categoryId: string;
  coefficient: number;
  decrease: boolean;
}

export type TProductSearchListPayload = {
  branchId: number;
  searchText: string;
};

export type TProductLookupParams = {
  queryParams?: TListQueryParams;
  categoryType?: string;
  branchId?: number;
  search?: string;
};

export interface IProductLookupModel {
  id: number;
  name: string;
  barcode: string;
  packageCode: string;
  packageName: string;
  catalogCode: string;
  catalogName: string;
  hasTechCard: boolean;
  vat: {
    name: string;
    code: string;
    amount: number;
  };
  price: number;
  unit: {
    id: string;
    name: string;
  };
}

export type TProductSearchListFullModel = {
  id: string;
  createdBy: string | null;
  createdDate: string | number;
  lastModifiedBy: string | null;
  lastModifiedDate: string;
  name: string;
  barcode: string;
  vatBarcode: string;
  model: string;
  measurement: string;
  description: string;
  committentTin: string;
  vatRate: number;
  hasMark: boolean;
  hasExcise: boolean;
  hasDelivery: boolean;
  selfPickup: boolean;
  favorite: boolean;
  noVat: boolean;
  service: boolean;
  exciseAmount: number;
  unit: TProductSearchListFullModelUnit;
  packageType: string;
  categoryDTO: string;
  custom: boolean;
  salesPrice: string;
  branchId: string;
  deleted: boolean;
  manufacturerId: string;
  manufacturingCountry: string;
  productNameUz: string;
  updateImage: boolean;
  units: string[];
  dataEntryStatus: string;
  agreementId: string;
  amount: string;
  creditEnabled: boolean;
  creditSettings: string;
  advanceEnabled: boolean;
  advanceSettings: string;
  defaultPackage: string;
};

export type TProductSearchListFullModelUnit = {
  id: string;
  name: string;
  nameRu: string;
  nameUz: string;
  description: string;
  code: number;
  countable: boolean;
};

export type TProductMarkingIsValidPayload = {
  code: string;
  ikpu: string;
  branchId: string;
};

export interface ICreditAdvanceSettingsModel {
  advanceEnabled?: boolean;
  advanceSettings?: IAdvanceSettings;
  branchId: string;
  creditEnabled?: boolean;
  creditSettings?: ICreditSettings;
  productId: string;
}

export interface IMarkingBindPayloadModel {
  branchId: string;
  productId: string;
}

export interface IProductTypesModel {
  name: string;
  code: string;
  codeNumber: number;
  templateId: number;
  productGroup: string;
}

export interface IUpdateProductModel extends ICreateProductModel {
  id: number;
}

export type TProductUploadPhotoParams = {
  id: number;
  data: FormData;
};

export interface IProductUploadPhotoModel {
  id: number;
  name: string;
  url: string;
}

export interface IProductLookupModel {
  id: number;
  name: string;
  barcode: string;
  packageCode: string;
  packageName: string;
  catalogCode: string;
  catalogName: string;
}

export type TProductCateringServiceParams = {
  branchId: number;
};

export interface IProductCateringServiceHallsModel {
  id: number;
  name: string;
  feePercent: number;
}

export interface IProductCateringServiceModel {
  id: number;
  name: string;
  packageCode: string;
  packageName: string;
  catalogCode: string;
  catalogName: string;
  category: TIdNameModel<number>;
  unit: TIdNameModel<number>;
  feePercent: number | null;
  vat: {
    amount: number;
    code: string;
    name: string;
  };
}

export interface ICreateProductCateringServiceModel {
  hallId?: number;
  feePercent?: number;
  tables?: Array<{
    feePercent: number;
    tableId: number;
  }>;
}

export interface IProductListFromTansif {
  pkey: string;
  tin: string;
  mxikCode: string;
  mxikFullName: any;
  groupName: string;
  className: string;
  positionName: string;
  subPositionName: string;
  brandName: string;
  attributeName: string;
  internationalCode: string;
  packageNames: PackageName;
  name: string;
}

export interface PackageName {
  code: string;
  mxikCode: string;
  nameUz: string;
  packageType: string;
  nameRu: string;
  nameLat: string;
  name: string;
}
