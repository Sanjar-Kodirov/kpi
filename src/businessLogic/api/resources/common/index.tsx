import { TCodeNameModel } from "#businessLogic/models";

import { httpGet } from "#core/httpClient";
import { HandlerType } from "#core/store/types/handler";
import { IBusinessType } from "#businessLogic/models/cabinetCompany";
import { IVatListType } from "#businessLogic/models/vat";
import { DistrictListType, RegionListType, IProductOriginItem } from "#businessLogic/models/public/common";
import { IProductTypeModel } from "#businessLogic/models/productTypes";

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

export const downloadFile: HandlerType<string, Blob> = (fileId) =>
  httpGet({
    url: `/api/files/${fileId}`,
    responseType: "blob",
    headers: { Accept: "*/*" },
  });
