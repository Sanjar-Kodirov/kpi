import { TAdminSystemUpgradeListParams } from "#businessLogic/models/admin/adminSystemUpgrade";
import { createAdvancedFilterStore } from "#core/store";

export const adminSystemUpgradeFilterPropsDefault = {
  queryParams: {
    size: 20,
    page: 0,
  },
};

export const $adminSystemUpgradeFilterProps = createAdvancedFilterStore<TAdminSystemUpgradeListParams>(
  adminSystemUpgradeFilterPropsDefault,
);
