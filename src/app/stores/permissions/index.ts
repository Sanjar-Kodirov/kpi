import { createXHRStore } from "#core/store";
import { XHRDataStoreState, XHRSuccessStoreState } from "#core/store/constructors";
import { XHRSuccessStoreType } from "#core/store/types/store";
import { api } from "#src/businessLogic/api";
import {
  IAdminPermissionsListItemModel,
  TAdminPermissionsListParams,
  IAdminPermissionDetailsModel,
  ICreateAdminPermissionModel,
  IUpdateAdminPermissionModel,
} from "#businessLogic/models/permissions";

// permissions
export const $adminPermissions = createXHRStore(
  api.adminPermissions.getAdminPermissions,
  new XHRDataStoreState<IAdminPermissionsListItemModel[]>([]),
);

export const $adminPermissionsDetails = createXHRStore<
  TAdminPermissionsListParams,
  IAdminPermissionDetailsModel,
  XHRDataStoreState<IAdminPermissionDetailsModel | undefined>
>(
  api.adminPermissions.getAdminPermissionDetails,
  new XHRDataStoreState<IAdminPermissionDetailsModel | undefined>(undefined),
);

export const $createAdminPermissions = createXHRStore<ICreateAdminPermissionModel, any, XHRSuccessStoreType>(
  api.adminPermissions.createAdminPermission,
  new XHRSuccessStoreState(),
);

export const $updateAdminPermissions = createXHRStore<IUpdateAdminPermissionModel, any, XHRSuccessStoreType>(
  api.adminPermissions.updateAdminPermission,
  new XHRSuccessStoreState(),
);

export const $deleteAdminPermissions = createXHRStore(
  api.adminPermissions.deleteAdminPermission,
  new XHRSuccessStoreState(false),
);

// permissions/users

export const $cabinetPermissionUsers = createXHRStore(
  api.adminPermissions.getCabinetPermissionUsers,
  new XHRDataStoreState<object | undefined>(undefined),
  {
    doneReducer: (state, response) => {
      const data = response.result.data.reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      return {
        ...state,
        data,
        fulfilled: true,
        loading: false,
        success: true,
        error: undefined,
      };
    },
  },
);

export const $adminPermissionUsers = createXHRStore(
  api.adminPermissions.getAdminPermissionUsersByUserId,
  new XHRDataStoreState<string[]>([]),
);

export const $createAdminPermissionUser = createXHRStore(
  api.adminPermissions.createAdminPermissionUser,
  new XHRSuccessStoreState(false),
);

// permissions/roles
export const $adminPermissionRolesByRoleId = createXHRStore(
  api.adminPermissions.getAdminPermissionRolesByRoleId,
  new XHRDataStoreState<string[]>([]),
);

export const $createAdminPermissionsRole = createXHRStore(
  api.adminPermissions.createAdminPermissionRole,
  new XHRSuccessStoreState(false),
);

export const $adminPermissionsRoles = createXHRStore(
  api.adminPermissions.getAdminPermissionRoles,
  new XHRDataStoreState<string[]>([]),
);

export const allPermissions = createXHRStore(
  api.adminPermissions.getAllPermissions,
  new XHRDataStoreState<string[]>([]),
);
