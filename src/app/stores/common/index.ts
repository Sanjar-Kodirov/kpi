import { api } from "#businessLogic/api";
import { TCodeNameModel } from "#businessLogic/models";
import { createXHRStore } from "#core/store";
import { XHRDataStoreState } from "#core/store/constructors";
import { XHRDataStoreType } from "#core/store/types/store";
import { IVatListType } from "#businessLogic/models/vat";
import { DistrictListType, RegionListType } from "#businessLogic/models/public/common";

export const $regions = createXHRStore<void, RegionListType, XHRDataStoreType<RegionListType>>(
  api.common.getRegions,
  new XHRDataStoreState([]),
);

export const $districts = createXHRStore(api.common.getDistricts, new XHRDataStoreState<DistrictListType>([]));

export const $vats = createXHRStore<any, IVatListType[], XHRDataStoreType<IVatListType[]>>(
  api.common.getVats,
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
