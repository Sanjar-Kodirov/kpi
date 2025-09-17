import { TCodeNameModel } from "#businessLogic/models";

import { httpGet } from "#core/httpClient";
import { HandlerType } from "#core/store/types/handler";
import { IVatListType } from "#businessLogic/models/vat";
import { DistrictListType, RegionListType } from "#businessLogic/models/public/common";

export const getRegions: HandlerType<void, RegionListType> = () =>
  httpGet({
    url: "/api/public/v1/regions/items",
  });

export const getDistricts: HandlerType<string, DistrictListType> = (regionId) =>
  httpGet({
    url: `/api/public/v1/districts/items/${regionId}`,
  });

export const getVats: HandlerType<any, IVatListType[]> = () =>
  httpGet({
    url: `/api/public/v1/commons/vats`,
  });

export const getAgeGroups: HandlerType<any, TCodeNameModel[]> = () =>
  httpGet({
    url: `/api/public/v1/commons/age-groups`,
  });

export const getGender: HandlerType<any, TCodeNameModel[]> = () =>
  httpGet({
    url: `/api/public/v1/commons/genders`,
  });
