import { SortOrderFromAntMap } from "#ui/table";

export interface IFullNameModel {
  firstName: string;
  lastName: string;
  name?: string;
  patronymic?: string;
  phone?: string;
}

export type TCodeNameModel<T = string> = {
  code: T;
  name: string;
};

export type TCodeNameRuModel<T = string> = {
  code: T;
  nameRu: string;
};

export type TIdNameModel<T = string> = {
  id: T;
  name: string;
};

export type TNumberIdNameModel = {
  id: number;
  name: string;
};

export type TWithCodeModel<T = string> = {
  code: T;
};

export type TWithIdModel<T = number> = {
  id: T;
};

export interface ICodeWithLocaleModel {
  code: string;
  nameRu: string;
  nameUzCyrillic: string;
  nameUzLatin: string;
}

export type TListQueryParams = {
  page?: number;
  size?: number;
  orderBy?: string;
  sortOrder?: SortOrderFromAntMap;
};

export interface StringMapI<T = string> {
  [key: string]: T;
}
