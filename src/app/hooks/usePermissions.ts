import { $cabinetPermissionUsers } from "#stores/permissions";
export const usePermissions = () => {
  const { data: authorities } = $cabinetPermissionUsers.store();

  if (!authorities) {
    return [];
  }

  return authorities;
};
