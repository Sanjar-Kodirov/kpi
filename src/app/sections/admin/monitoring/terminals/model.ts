import { createAdvancedFilterStore } from "#core/store";
import { TAdminTerminalListParams } from "#businessLogic/models/admin/adminTerminals";

export const adminTerminalsFilterPropsDefault = {
  queryParams: {
    size: 20,
    page: 0,
  },
};

export const $adminTerminalsFilterProps = createAdvancedFilterStore<TAdminTerminalListParams>(
  adminTerminalsFilterPropsDefault,
);
