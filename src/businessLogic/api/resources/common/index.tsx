import { TCodeNameModel } from "#businessLogic/models";

import { httpGet } from "#core/httpClient";
import { HandlerType } from "#core/store/types/handler";
import { IBusinessType } from "#businessLogic/models/cabinetCompany";
import { IVatListType } from "#businessLogic/models/vat";
import { DistrictListType, RegionListType, IProductOriginItem } from "#businessLogic/models/public/common";
import { IProductTypeModel } from "#businessLogic/models/productTypes";
import { IReceiptPaymentTypesModel, IReceiptStatusModel } from "#businessLogic/models/receipt";

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

export const getPlatformTypes: HandlerType<any, string[]> = () =>
  httpGet({
    url: `/api/public/v1/commons/platform-types`,
  });

export const getReceiptsPaymentTypes: HandlerType<any, IReceiptPaymentTypesModel[]> = () =>
  httpGet({
    url: `/api/public/v1/commons/receipt/payment-types`,
  });
export const getProducts: HandlerType<any, IProductTypeModel[]> = () =>
  httpGet({
    url: `/api/public/v1/commons/product/types`,
  });

export const getBusinessTypes: HandlerType<void, IBusinessType[]> = () =>
  httpGet({
    url: "/api/public/v1/commons/business/types",
  });

export const getCategoryTypes: HandlerType<void, TCodeNameModel[]> = () =>
  httpGet({
    url: "/api/public/v1/commons/category/types",
  });

export const getHallItemShapes: HandlerType<void, TCodeNameModel[]> = () =>
  httpGet({
    url: "/api/public/v1/commons/hall-items/shapes",
  });

export const getHallITemsReasons: HandlerType<void, TCodeNameModel[]> = () =>
  httpGet({
    url: "/api/public/v1/commons/hall-items/reasons",
  });

export const getCookingTypes: HandlerType<void, TCodeNameModel[]> = () =>
  httpGet({
    url: "/api/public/v1/commons/cooking/types",
  });

export const getOrderCancelReasons: HandlerType<void, TCodeNameModel[]> = () =>
  httpGet({
    url: "/api/public/v1/commons/order/reasons",
  });

export const getProductOrigins: HandlerType<void, IProductOriginItem[]> = () =>
  httpGet({
    url: "/api/public/v1/commons/product/origins",
  });

export const getReceiptStatuses: HandlerType<void, IReceiptStatusModel[]> = () =>
  httpGet({
    url: "/api/public/v1/commons/receipt/statuses",
  });

export const getBranchStatuses: HandlerType<void, TCodeNameModel[]> = () =>
  httpGet({
    url: "/api/public/v1/commons/branch/statuses",
  });

export const getAgeGroups: HandlerType<any, TCodeNameModel[]> = () =>
  httpGet({
    url: `/api/public/v1/commons/age-groups`,
  });

export const getGender: HandlerType<any, TCodeNameModel[]> = () =>
  httpGet({
    url: `/api/public/v1/commons/genders`,
  });

export const getDepartmentStatuses: HandlerType<void, TCodeNameModel[]> = () =>
  httpGet({
    url: `/api/public/v1/commons/department/statuses`,
  });
