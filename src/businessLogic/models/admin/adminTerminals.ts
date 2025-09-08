import { TListQueryParams } from "#businessLogic/models";

export type TAdminTerminalListParams = {
  search?: string;
  userId?: number;
  companyId?: number;
  branchId?: number;
  regionId?: number;
  districtId?: number;
  from?: string;
  to?: string;
  status?: string;
  tin?: string;
  type?: string;
} & TListQueryParams;

export interface IAdminTerminalsListItemModel {
  id: number;
  name: string;
  branch: IAdminTerminalsListItemModelBranch;
  fiscalModuleSerialNumber: string;
}
export interface IAdminTerminalsListItemModelBranch {
  id: number;
  name: string;
}
