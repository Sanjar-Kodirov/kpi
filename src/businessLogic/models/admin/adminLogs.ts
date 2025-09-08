import { TListQueryParams, TNumberIdNameModel } from "#businessLogic/models";

export type IAdminLogsListItemModel = {
  id: number;
  entityType: string;
  field: string;
  fromValue: string;
  toValue: string;
  updateDate: string;
  updater: TNumberIdNameModel;
  company: {
    id: number;
    name: string;
    tin: string;
  };
};

export type TAdminLogsListParams = {
  companyId?: string;
  search?: string;
  from?: string;
  to?: string;
  status?: string;
  entityType?: string;
} & TListQueryParams;
