import { TListQueryParams } from "#businessLogic/models";

export interface IAdminSystemUpgradeListItemModel {
  id: number;
  name: string;
  description: string;
  available: boolean;
  platformType: string;
  releaseDate: string;
  forceUpdate: boolean;
}

export interface ISystemUpgradeDetailsModel {
  id: number;
  name: string;
  description: string;
  available: boolean;
  platformType: string;
  releaseDate: string;
  forceUpdate: boolean;
}

export interface ICreateAdminSystemUpgradeModel {
  name: string;
  description: string;
  available: boolean;
  platformType: string;
  releaseDate: string;
  forceUpdate: boolean;
}

export interface IUpdateAdminSystemUpgradeModel extends ICreateAdminSystemUpgradeModel {
  id: number;
}

export type TAdminSystemUpgradeListParams = {
  companyId?: string;
  search?: string;
  from?: string;
  to?: string;
  status?: string;
  entityType?: string;
} & TListQueryParams;
