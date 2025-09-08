import { api } from "#businessLogic/api";
import { IBusinessType } from "#businessLogic/models/cabinetCompany";
import { TCodeNameModel } from "#businessLogic/models";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState } from "#core/store/constructors";
import { XHRDataStoreType } from "#core/store/types/store";
import { IVatListType } from "#businessLogic/models/vat";
import { DistrictListType, RegionListType, IProductOriginItem } from "#businessLogic/models/public/common";
import { IProductTypeModel } from "#businessLogic/models/productTypes";
import { IReceiptPaymentTypesModel, IReceiptStatusModel } from "#businessLogic/models/receipt";

export const $regions = createXHRStore<void, RegionListType, XHRDataStoreType<RegionListType>>(
  api.common.getRegions,
  new XHRDataStoreState([]),
);

export const $districts = createXHRStore(api.common.getDistricts, new XHRDataStoreState<DistrictListType>([]));

export const $vats = createXHRStore<any, IVatListType[], XHRDataStoreType<IVatListType[]>>(
  api.common.getVats,
  new XHRDataStoreState([]),
);

export const $platformTypes = createXHRStore<any, string[], XHRDataStoreType<string[]>>(
  api.common.getPlatformTypes,
  new XHRDataStoreState([]),
);

export const $receiptPaymentTypes = createXHRStore<
  any,
  IReceiptPaymentTypesModel[],
  XHRDataStoreType<IReceiptPaymentTypesModel[]>
>(api.common.getReceiptsPaymentTypes, new XHRDataStoreState([]));

export const $productTypes = createXHRStore<any, IProductTypeModel[], XHRDataStoreType<IProductTypeModel[]>>(
  api.common.getProducts,
  new XHRDataStoreState([]),
);

export const $businessTypes = createXHRStore<void, IBusinessType[], XHRDataStoreType<IBusinessType[]>>(
  api.common.getBusinessTypes,
  new XHRDataStoreState([]),
);

export const $categoryTypes = createXHRStore<any, TCodeNameModel[], XHRDataStoreType<TCodeNameModel[]>>(
  api.common.getCategoryTypes,
  new XHRDataStoreState([]),
);

export const $hallItemShapes = createXHRStore<any, TCodeNameModel[], XHRDataStoreType<TCodeNameModel[]>>(
  api.common.getHallItemShapes,
  new XHRDataStoreState([]),
);

export const $hallItemReasons = createXHRStore<any, TCodeNameModel[], XHRDataStoreType<TCodeNameModel[]>>(
  api.common.getHallITemsReasons,
  new XHRDataStoreState([]),
);

export const $productOrigins = createXHRStore<any, IProductOriginItem[], XHRDataStoreType<IProductOriginItem[]>>(
  api.common.getProductOrigins,
  new XHRDataStoreState([]),
);

export const $receiptStatuses = createXHRStore<any, IReceiptStatusModel[], XHRDataStoreType<IReceiptStatusModel[]>>(
  api.common.getReceiptStatuses,
  new XHRDataStoreState([]),
);

export const $branchStatuses = createXHRStore<any, TCodeNameModel[], XHRDataStoreType<TCodeNameModel[]>>(
  api.common.getBranchStatuses,
  new XHRDataStoreState([]),
);

export const $ageGroups = createXHRStore<any, TCodeNameModel[], XHRDataStoreType<TCodeNameModel[]>>(
  api.common.getAgeGroups,
  new XHRDataStoreState([]),
);

export const $gender = createXHRStore<any, TCodeNameModel[], XHRDataStoreType<TCodeNameModel[]>>(
  api.common.getGender,
  new XHRDataStoreState([]),
);

export const $departmentStatuses = createXHRStore<void, TCodeNameModel[], XHRDataStoreType<TCodeNameModel[]>>(
  api.common.getDepartmentStatuses,
  new XHRDataStoreState([]),
);
