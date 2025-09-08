import { createXHRStore } from "#core/store";
import { api } from "#businessLogic/api";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { PaginationListModel } from "#types/api";
import { PaginationList } from "#constructors/data";
import {
  IAdminSystemUpgradeListItemModel,
  ICreateAdminSystemUpgradeModel,
  IUpdateAdminSystemUpgradeModel,
  ISystemUpgradeDetailsModel,
} from "#businessLogic/models/admin/adminSystemUpgrade";
import { XHRSuccessStoreType } from "#core/store/types/store";

export const $adminSystemUpgradeList = createXHRStore(
  api.adminSystemUpgrade.getAdminSystemUpgradeList,
  new XHRDataStoreState<PaginationListModel<IAdminSystemUpgradeListItemModel>>(new PaginationList()),
);

export const $systemUpgradeDetails = createXHRStore(
  api.adminSystemUpgrade.getUserDetails,
  new XHRDataStoreState<ISystemUpgradeDetailsModel | null>(null),
);

export const $createSystemUpgrade = createXHRStore<
  ICreateAdminSystemUpgradeModel,
  XHRSuccessStoreType,
  XHRSuccessStoreType
>(api.adminSystemUpgrade.createSystemUpgrade, new XHRSuccessStoreState());

export const $updateSystemUpgrade = createXHRStore<
  IUpdateAdminSystemUpgradeModel,
  XHRSuccessStoreType,
  XHRSuccessStoreType
>(api.adminSystemUpgrade.updateSystemUpgrade, new XHRSuccessStoreState());
