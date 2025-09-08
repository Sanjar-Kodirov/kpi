export const enum E_CATEGORY_TYPES {
  FOOD = "FOOD",
  PRODUCT = "PRODUCT",
  OTHER = "OTHER",
  INGREDIENT = "INGREDIENT",
  SEMI_FINISHED_PRODUCT = "SEMI_FINISHED_PRODUCT",
  COMPENSATION = "COMPENSATION",
  CATERING_SERVICE = "CATERING_SERVICE",
}

export type TCategoryListParams = {
  branchId?: string;
  type?: E_CATEGORY_TYPES;
};

export interface ICategoryListItemModel {
  children: ICategoryListItemModel[];
  id: string;
  name: string;
  parentId?: number;
  status: {
    name: string;
    code: string;
  };
}

export interface ICreateCategoryModel {
  branchId: string;
  parentId?: string;
  name: string;
  type: E_CATEGORY_TYPES;
  catalog?: {
    code: string;
    name: string;
    barcode: string;
  };
  packageName?: string;
  packageCode?: string;
}

export type TUpdateCategoryParams = {
  packageName?: string;
  packageCode?: string;
  id: string;
  name: string;
  branchId: string;
  parentId?: string;
  catalog?: {
    code: string;
    name: string;
    barcode: string;
  };
  type: E_CATEGORY_TYPES;
};

export interface IDeleteCategoryModel {
  categoryId: string;
  branchId: string;
}

export interface ITransferCatalogModel {
  fromBranchId: string;
  toBranchIds: string[];
}

export interface ICategoriesCompanyCatalogModelPackageNames {
  code: string;
  mxikCode: string;
  nameUz: string;
  packageType: string;
  nameRu: string;
  nameLat: string;
  name: string;
}

export type TCategoriesCompanyCatalogParams = {
  companyId?: number;
};

export interface ICategoriesCompanyCatalogModel {
  id: string;
  catalogCode: string;
  catalogName: string;
  barcode: string;
  packageCode: string;
  packageName: string;
}

export interface ICategoryDetailsModelBranch {
  id: string;
  name: string;
}

export interface ICategoryDetailsModelParent {
  id: string;
  name: string;
}

export interface ICategoryDetailsModel {
  id: number;
  name: string;
  catalog: {
    code: string;
    name: string;
    barcode: string | null;
  };
  status: {
    name: string;
    code: string;
  };
  type: {
    name: string;
    code: string;
  };
  origin: {
    id: number;
    name: string;
    code: string;
  };
  vat: {
    id: number;
    name: string;
    code: string;
  };
  branch: ICategoryDetailsModelBranch;
  parent: ICategoryDetailsModelParent | null;
  packageName: string;
  packageCode: string;
}

export type TCategoryPackagesParams = {
  catalogCode: string;
};

export interface ICategoryPackageItemModel {
  nameRu: string;
  code: number;
  mxikCode: string;
  nameLat: string;
  packageType: string;
  nameUz: string;
}
