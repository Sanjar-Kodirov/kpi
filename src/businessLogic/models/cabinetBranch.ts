enum SORT_ORDER {
  ASC = "asc",
  DESC = "desc",
}

export type TBranchesListParams = {
  id?: string;
  userId?: string;
  parentId?: string;
  companyId?: string;
  branchId?: string;
  regionId?: string;
  districtId?: string;
  categoryId?: string;
  from?: string;
  to?: string;
  warehouseId?: string;
  status?: string;
  tin?: string;
  type?: string;
  page?: number;
  search?: string;
  orderBy?: string;
  sortOrder?: SORT_ORDER;
};

export interface IBranchesListItemResponseModel {
  id: string;
  name: string;
  feeMin: number;
  feeMax: number;
  address: null | {
    region: {
      id: string;
      name: string;
    };
    district: {
      id: string;
      name: string;
    };
    street: string;
    house: string;
    apartment: string;
    longitude: string;
    latitude: string;
  };
  owner: {
    id: number;
    name: string;
  };
  status: {
    name: string;
    code: string;
  };
  feePercent: number;
  vat: {
    amount: 0;
    code: string;
    name: string;
  };
}

export interface IBranchDetailResponseModel extends IBranchesListItemResponseModel {}

export interface ICreateBranchModel {
  name: string;
  address: {
    regionId: string;
    districtId: string;
    street: string;
    house: string;
    apartment: string;
    longitude?: string;
    latitude?: string;
  };
  companyId: number;
  isMain?: boolean;
}

export type TBranchesRegisterParams = {
  id?: string;
  name: string;
  smartposId?: number;
  address: {
    regionId: string;
    districtId: string;
    street: string;
    house: string;
    apartment: string;
    longitude: string;
    latitude: string;
  };
  manager?: {
    smartposId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    login: string;
  };
  terminals?: Array<string>;
};

export interface IUpdateBranchModel extends ICreateBranchModel {
  id: string;
}
