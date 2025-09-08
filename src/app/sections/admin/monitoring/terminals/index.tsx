import React, { FC, useEffect, useMemo } from "react";
import { useQueryParams } from "#hooks/useQueryParams";
import { ContentUI } from "#ui/content";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { TAdminCompaniesListParams } from "#businessLogic/models/admin/adminCompany";
import { $adminTerminalsList } from "#stores/admin/adminTerminals";
import {
  $adminTerminalsFilterProps,
  adminTerminalsFilterPropsDefault,
} from "#src/app/sections/admin/monitoring/terminals/model";
import { IAdminTerminalsListItemModel, TAdminTerminalListParams } from "#businessLogic/models/admin/adminTerminals";
import { AdminTerminalsListFilter } from "#src/app/sections/admin/monitoring/terminals/filter";
import { useTranslation } from "react-i18next";

export const AdminTerminalsList: FC = () => {
  const adminTerminalsState = $adminTerminalsList.store();
  const adminTerminalsFilterState = $adminTerminalsFilterProps.store();

  const { t } = useTranslation();

  const { queryParams, updateQueryParams, clearQueryParams } = useQueryParams<TAdminCompaniesListParams>(
    adminTerminalsFilterPropsDefault,
    {
      queryParams: adminTerminalsFilterState.queryParams,
      additionalParams: adminTerminalsFilterState.additionalParams,
    },
    $adminTerminalsFilterProps.update,
    $adminTerminalsFilterProps.reset,
  );

  const { data: adminTerminalsData, loading: adminTerminalsLoading } = adminTerminalsState;
  const {
    content: adminTerminals,
    number: adminTerminalsPage,
    size: adminTerminalsSize,
    totalElements: adminTerminalsTotal,
  } = adminTerminalsData;

  const getAdminTerminalsList = () => {
    $adminTerminalsList.request(queryParams);
  };

  useEffect(() => {
    getAdminTerminalsList();
  }, [queryParams]);

  const tableColumns: ColumnsType<IAdminTerminalsListItemModel> = useMemo(() => {
    return [
      {
        width: 80,
        title: "№",
        dataIndex: "num",
        key: "num",
        render: (_, row, index) => <div className="w-s-n">{adminTerminalsSize * adminTerminalsPage + index + 1}</div>,
        sorter: false,
      },
      {
        title: t("fields.title"),
        dataIndex: "name",
        key: "name",
        sorter: false,
      },
      {
        title: "Серийный номер",
        dataIndex: "fiscalModuleSerialNumber",
        key: "fiscalModuleSerialNumber",
        sorter: false,
      },
      {
        title: "Филиал",
        dataIndex: "owner",
        key: "owner",
        render: (_, row) => row.branch?.name,
        sorter: false,
      },
    ];
  }, [adminTerminalsSize, adminTerminalsPage]);

  const onFilterChange = (params: TAdminTerminalListParams) => {
    updateQueryParams({ page: undefined, ...params });
  };

  const onChangePagination = (page: number, size: number) => {
    onFilterChange({ page: page - 1, size });
  };

  const onSortChange = (field: string, order?: SortOrderFromAntMap) => {
    onFilterChange({ orderBy: field, sortOrder: order });
  };

  return (
    <ContentUI fixed>
      <ContentUI.Header title="ККМ" total={adminTerminalsTotal} />
      <AdminTerminalsListFilter
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        clearQueryParams={clearQueryParams}
        onFilterChange={onFilterChange}
      />
      <ContentUI.Middle>
        <TableUI
          dataSource={adminTerminals}
          loading={adminTerminalsLoading}
          columns={tableColumns}
          onSortChange={onSortChange}
          pagination={{
            total: adminTerminalsTotal,
            pageSize: adminTerminalsSize,
            current: adminTerminalsPage + 1,
            hideOnSinglePage: true,
            onChange: onChangePagination,
          }}
        />
      </ContentUI.Middle>
    </ContentUI>
  );
};
