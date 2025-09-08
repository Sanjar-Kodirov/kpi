import { TCodeNameModel, TIdNameModel, TListQueryParams, TNumberIdNameModel } from "#businessLogic/models";

export type TMenuCreateParams = {
  name: string;
  branchId: string;
  parentId?: string;
  status?: string;
};

export type TMenuUpdateParams = {
  id: string;
  name: string;
  branchId: string;
  parentId?: string;
  status?: string;
};
export type TMenuUpdateStatusParams = {
  id: string;
  status: string;
};
export type TMenuUpdateParamsItems = {
  id: string;
  productId: string;
  price: number;
  unitId: string;
  qty: number;
};

export enum E_MENU_STATUS {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE",
}

export interface IMenuTreeModel {
  id: string;
  name: string;
  parentId: string | null;
  children: IMenuTreeModel[];
  status?: TCodeNameModel<E_MENU_STATUS>;
}

export type TMenuTreeParams = {
  branchId?: string;
  parentId?: string;
  companyId?: string;
  search?: string;
};

export interface IMenuDetailsModel {
  id: string;
  name: string;
  parent: IMenuDetailsModelParent;
  status: TCodeNameModel<E_MENU_STATUS>;
  items: IMenuDetailsModelItems[];
}

export interface IMenuDetailsModelParent {
  id: string;
  name: string;
}

export interface IMenuDetailsModelItemsProduct {
  id: string;
  name: string;
}

export interface IMenuDetailsModelItemsUnit {
  id: string;
  name: string;
  code: string;
}

export interface IMenuDetailsModelItems {
  id: string;
  product: IMenuDetailsModelItemsProduct;
  price: number;
  unit: IMenuDetailsModelItemsUnit;
  qty: number;
}

export type TMenuItemCreateParams = {
  name: string;
  menuId: number | string;
  productId: number;
  units: IUnit[];
  categoryType: string;
};

export interface IUnit {
  id: number;
  weight: number;
  price: number;
  menuItemId: number;
  techCardId: string;
}

export type TMenuItemsUpdateParams = TMenuItemCreateParams & {
  id: number;
};

export type TMenuItemsListParams = {
  menuId?: string;
  search?: string;
  branchId?: string;
  parentId?: string;
  status?: E_MENU_ITEM_STATUS;
} & TListQueryParams;

export type TMenuListAdditional = {
  menuName?: string;
  hasChildren?: boolean;
};

// export interface IMenuItemsListItemModel {
//   id: string;
//   name: string;
//   product: IMenuItemsListItemModelProduct;
//   price: number;
//   unit: IMenuItemsListItemModelUnit;
//   portion: number;
//   photo: IMenuItemsListItemModelPhoto;
// }
//
// export interface IMenuItemsListItemModelProduct {
//   id: string;
//   name: string;
//   barcode: string;
//   packageCode: string;
//   packageName: string;
//   catalogCode: string;
//   catalogName: string;
//   vat: string | null;
// }
//
// export interface IMenuItemsListItemModelUnit {
//   id: string;
//   name: string;
// }
//
// export interface IMenuItemsListItemModelPhoto {
//   id: string;
//   name: string;
//   url: string;
// }

export enum E_MENU_ITEM_STATUS {
  ACTIVE = "ACTIVE",
  IN_ACTIVE = "IN_ACTIVE",
}

export interface IMenuItemsListItemModel {
  favourite: boolean;
  id: number;
  name: string;
  status: TCodeNameModel<E_MENU_ITEM_STATUS>;
  product: {
    barcode: string;
    catalogCode: string;
    category: TNumberIdNameModel;
    hasMark: boolean;
    id: number;
    name: string;
    origin: {
      id: number;
      name: string;
      code: string;
    };
    packageName: string;
    packageCode: string;
    vat: {
      name: string;
      code: string;
      amount: number;
    };
  };
  units: IMenuItemsListItemModelUnits[];
  photo: IMenuItemsListItemModelPhoto;
  minPrice: number;
  parentMenu?: TNumberIdNameModel;
}

export interface IMenuItemsListItemModelUnits {
  id: number;
  weight: number;
  price: number;
  unit: TNumberIdNameModel;
  techCard?: TNumberIdNameModel;
}
export interface IMenuItemsListItemModelPhoto {
  id: number;
  name: string;
  url: string;
}

export interface IMenuItemDetailsModel {
  id: string;
  name: string;
  menu: { id: number; name: string };
  product: {
    id: number;
    name: string;
  };
  price: number;
  unit: TIdNameModel;
  photo: null | IMenuItemDetailsModelPhoto;
  units: {
    id: number;
    price: number;
    weight: number;
    unit: {
      id: number;
      name: string;
    };
    techCard: { id: number; name: string };
  }[];
}

// export interface IMenuItemDetailsModelProduct {
//   id: string;
//   name: string;
//   barcode: string;
//   packageCode: string;
//   packageName: string;
//   catalogCode: string;
//   catalogName: string;
//   vat: null | string;
// }

export interface IMenuItemDetailsModelPhoto {
  id: number;
  name: string;
  url: string;
}

export type TMenuItemsUploadPhotoParams = {
  id: number;
  data: FormData;
};

export type TMenuItemsUploadExternalPhotoParams = {
  id: number;
  url: string;
  contentType: string;
};

export type TMenuItemsListSearchByParams = {
  gtin?: string;
  markCode?: string;
  branchId?: number;
};

export type TMenusLookupParams = {
  branchId: string;
};

export type TMenusLookup = {
  id: number;
  name: string;
};
