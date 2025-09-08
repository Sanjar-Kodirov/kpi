import { TIdNameModel } from ".";

export interface ICompanyDetailsByTinResponse {
  smartposId: number;
  name: string;
  brand: string;
  tin: string;
  businessType: IBusinessType | null;
  activityType: ActivityType | null;
  address: Address;
  bank: {
    id: string;
    name: string;
    accountNumber: string;
    mfo: string;
    oked: string;
    tin: string;
    parent: string;
  } | null;
  vatRate: number;
  vat: {
    name: string;
    code: string;
    amount: any;
  } | null;
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    login: string;
    tin: string;
    pinfl: string;
    smartposId: number;
  } | null;
  editable: boolean;
  branches: Branch[] | null;
}

export interface IBusinessType {
  name: string;
  code: string;
}

export interface ActivityType {
  id: string;
  name?: string;
  parentId: string;
  code?: number;
  parent?: {
    id: string;
    name: string;
    parentId: any;
    code: number;
    parent: any;
  };
}

export interface Address {
  region: Region;
  district: District;
  street: string;
  house: string;
  apartment: string;
  longitude: string;
  latitude: string;
}

export interface Region {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
}

export interface Branch {
  id: string;
  name: string;
  smartposId: number;
  address: {
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
  manager?: {
    smartposId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    login: string;
  };
  terminals?: string[];
}

export interface ICreateCompany {
  name: string;
  tin: string;
  businessType: string;
  address: {
    regionId: string;
    districtId: string;
    street: string;
    house?: string;
    apartment: string;
  };
  phone: string;
  vat: string;
}

export type TCompanyUpdatePayload = {
  name: string;
  tin: string;
  businessType: string;
  activityTypeId: string;
  phone: string;
};

export type TCompanyUploadLogoPayload = {
  companyId: string | number;
  data: FormData;
};

// Create company
export interface ICreateCompanyFromCts {
  phone: string;
  name: string;
  tin: string;
  businessType: string;
  smartposId: number;
  vat: string;
  address: {
    regionId: string;
    districtId: string;
    street: string;
    house: string;
    apartment: string;
    longitude: string;
    latitude: string;
  };
  activityTypeId: string;
  bank?: {
    bankId: string;
    accountNumber: string;
    oked: string;
    isMain?: boolean;
  };
  branches?: Array<{
    name: string;
    address: {
      regionId: string;
      districtId: string;
      street: string;
      house: string;
      apartment: string;
      longitude: string;
      latitude: string;
    };
    companyId: string;
    isMain?: boolean;
  }>;
}

export interface ICurrentCompanyResponseLogo {
  id: string;
  name: string;
  url: string;
}

// Current company
export interface ICurrentCompanyResponse {
  id: string;
  name: string;
  tin: string;
  brand: string;
  businessType: {
    name: string;
    code: string;
  };
  logo?: ICurrentCompanyResponseLogo;
  backgroundPhoto: any;
  activityType: any;
  director: {
    id: string;
    name: string;
  };
  manager: TIdNameModel;
  phone: string;
}

export interface ICompanyBankModel {
  id: string;
  bank?: {
    id: string;
    name: string;
    mfo: string;
  };
  parentBank: {
    id: string;
    name: string;
    mfo: string;
  };
  accountNumber: string;
  oked: string;
}

export interface ICreateCompanyBankModel {
  bankId: string;
  companyId: string;
  accountNumber: string;
  oked: string;
}

export interface IUpdateCompanyBankModel extends ICreateCompanyBankModel {
  id: string;
}

export interface ICompanyAddressModel {
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
}

export interface IUpdateCompanyAddressModel {
  regionId: string;
  districtId: string;
  street: string;
  house: string;
  apartment: string;
  longitude?: string;
  latitude?: string;
}

export interface Bank {
  id: string;
  name: string;
  accountNumber: string;
  mfo: string;
  oked: string;
  tin: string;
  parent: string;
}

export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  login: string;
  phone: string;
  tin: string;
  pinfl: string;
}

export interface IRegisterCompanyBankModel {
  bankId: string;
  companyId: string;
  accountNumber: string;
  oked: string;
}
