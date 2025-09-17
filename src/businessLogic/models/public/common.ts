export enum E_PRODUCT_ORIGIN {
  SELF_PRODUCED = "SELF_PRODUCED",
  PURCHASED = "PURCHASED",
  SERVICE = "SERVICE",
  NOT_PARTICIPATE = "NOT_PARTICIPATE",
}

export const PRODUCT_SERVICE_ORIGIN = { id: 3, code: E_PRODUCT_ORIGIN.SERVICE, name: "Услуга" };

export interface IProductOriginItem {
  id: number;
  name: string;
  code: E_PRODUCT_ORIGIN;
}

type RegionType = {
  id: string;
  name: string;
  code: string;
  mapValue: string;
};

export type RegionListType = Array<RegionType>;

export type DistrictListType = Array<
  RegionType & {
    regionId: number;
  }
>;

export interface IRegion {
  id: string;
}
