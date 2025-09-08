import { TCodeNameModel } from "#businessLogic/models";
import {
  ICompanyAddressModel,
  ICompanyBankModel,
  ICompanyDetailsByTinResponse,
  ICurrentCompanyResponse,
  IUpdateCompanyBankModel,
} from "#businessLogic/models/cabinetCompany";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { XHRSuccessStoreType } from "#core/store/types/store";
import { api } from "src/businessLogic/api";

export const $companyDetailsByTin = createXHRStore(
  api.cabinetCompany.getCompanyDetailsByTin,
  new XHRDataStoreState<ICompanyDetailsByTinResponse | null>(null),
);

export const $currentCompany = createXHRStore(
  api.cabinetCompany.getCurrentCompany,
  new XHRDataStoreState<ICurrentCompanyResponse | null>(null),
);

export const $cabinetCompanyAddress = createXHRStore(
  api.cabinetCompany.getCabinetCompanyAddress,
  new XHRDataStoreState<ICompanyAddressModel | null>(null),
);

export const $updateCabinetCompanyAddress = createXHRStore(
  api.cabinetCompany.updateCabinetCompanyAddress,
  new XHRSuccessStoreState(),
);

export const $registerCompanyBank = createXHRStore(
  api.cabinetCompany.registerCabinetCompanyBank,
  new XHRSuccessStoreState(),
);

export const $currentCompanyBank = createXHRStore(
  api.cabinetCompany.getCurrentCompanyBank,
  new XHRDataStoreState<ICompanyBankModel | null>(null),
);

export const $createCabinetCompanyBank = createXHRStore(
  api.cabinetCompany.createCompanyBank,
  new XHRSuccessStoreState(),
);

export const $updateCabinetCompanyBank = createXHRStore<IUpdateCompanyBankModel, any, XHRSuccessStoreType>(
  api.cabinetCompany.updateCompanyBank,
  new XHRSuccessStoreState(),
);

export const $createCompany = createXHRStore(api.cabinetCompany.createCompany, new XHRSuccessStoreState());

export const $updateCompany = createXHRStore(api.cabinetCompany.updateCompany, new XHRSuccessStoreState());

export const $uploadCompanyAvatar = createXHRStore(api.cabinetCompany.uploadCompanyAvatar, new XHRSuccessStoreState());

export const $deleteCompanyAvatar = createXHRStore(api.cabinetCompany.deleteCompanyAvatar, new XHRSuccessStoreState());

export const $syncCompanyWithSmartpos = createXHRStore(
  api.cabinetCompany.syncCompanyWithSmartpos,
  new XHRSuccessStoreState(),
);

export const $companyStatuses = createXHRStore(
  api.cabinetCompany.getCompanyStatuses,
  new XHRDataStoreState<TCodeNameModel[]>([]),
);

export const $updateCompanyStatus = createXHRStore(api.cabinetCompany.updateCompanyStatus, new XHRSuccessStoreState());
