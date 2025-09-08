import { TCodeNameModel, TIdNameModel, TListQueryParams, TNumberIdNameModel } from "#businessLogic/models";

export type TTechCardsListParams = {
  productId?: string;
  id?: string;
  userId?: string;
  parentId?: string;
  companyId?: string;
  branchId?: string;
} & TListQueryParams;

export interface ITechCardsListItemModel {
  id: string;
  product: TIdNameModel;
  description: string;
  price: number;
}

export type TTechCardsCreateParams = {
  productId: number;
  description?: string;
  price?: number;
  unitId: number;
  size: number | string;
  items: TTechCardsCreateParamsItems[];
};
export type TTechCardsCreateParamsItems = {
  ingredientId: number;
  cookingTypes: string[];
  gross: number;
  net: number;
  unitId: number;
};

export type TTechCardsUpdateParams = {
  id: number;
  productId: number;
  description?: string;
  price?: number;
  unitId: number;
  size: number | string;
  items: TTechCardsUpdateParamsItems[];
};
export type TTechCardsUpdateParamsItems = {
  id?: number | null;
  ingredientId: number;
  cookingTypes: string[];
  gross: number;
  net: number;
  unitId: number;
};

export interface ITechCardDetailsModel {
  id: number;
  product: TIdNameModel;
  description: string;
  price: number;
  size: number;
  unit: {
    id: number;
    name: string;
    code: string;
  };
  items: ITechCardDetailsModelItems[];
}

export interface ITechCardDetailsModelItems {
  id: number;
  ingredient: TIdNameModel;
  cookingTypes: TCodeNameModel[];
  gross: number;
  net: number;
  unit: TNumberIdNameModel;
}
