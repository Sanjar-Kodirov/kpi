import React from "react";

import { DefaultOptionType } from "antd/lib/select";

export const handleChangeUserSelectFilter = (userId, option) => {
  if (option) {
    return [{ userId }, { userName: option.children }];
  }

  return [{ userId }];
};

export const handleChangeDatePeriodFilter = (param: any) => {
  return [{ from: param.from, to: param.to }];
};

export const handleChangeSearchFilter = (e: React.ChangeEvent<HTMLInputElement>, search) => {
  return [{ search }];
};

export const handleChangeCompanyFilter = (companyId: number, option?: DefaultOptionType | DefaultOptionType[]) => {
  if (option) {
    const companyName = (option as DefaultOptionType)?.children as unknown as string;
    return [{ companyId }, { companyName }];
  }
  return [{ companyId }];
};
export const handleChangeEntityFilter = (entityType: string) => {
  return [{ entityType }];
};

export const handleChangeFieldFilter = (field: string) => {
  return [{ field }];
};

export const handleChangeServiceTypeFilter = (v: string) => {
  return [{ serviceType: v }];
};

export const handleChangeStatusFilter = (status) => {
  return [{ status }];
};

export const handleChangeBranchFilter = (branchId, option) => {
  const branchName = option ? option.children : undefined;
  return [{ branchId }, { branchName }];
};
