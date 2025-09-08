import React, { FC, useEffect, useMemo } from "react";
import { useQueryParams } from "#hooks/useQueryParams";
import { ContentUI } from "#ui/content";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import {
  $adminCompaniesFilterProps,
  adminCompaniesFilterPropsDefault,
} from "#src/app/sections/admin/monitoring/companies/model";
import { $adminCompaniesList } from "src/app/stores/admin/adminCompany";
import { IAdminCompaniesListItemModel, TAdminCompaniesListParams } from "#businessLogic/models/admin/adminCompany";
import { ROUTES } from "#constants/index";
import { Link } from "react-router-dom";
import { formatDate, formatPhoneNumber } from "#utils/formatters";
import { AdminCompaniesListFilter } from "#src/app/sections/admin/monitoring/companies/filter";
import { useTranslation } from "react-i18next";
import { StatusTagUI } from "#ui/statusTag";
import { ButtonUI } from "#ui/button";
import { ContextPopoverUI } from "#ui/contextPopover";
import { useModalControl } from "#hooks/useModalControl";
import { DrawerModalUI } from "#ui/drawerModal";

export const AdminCompaniesList: FC = () => {
  const adminCompaniesState = $adminCompaniesList.store();
  const adminCompaniesFilterState = $adminCompaniesFilterProps.store();

  const changeCompanyStatusModal = useModalControl<{ companyId: number; currentStatus: string }>();

  const { t } = useTranslation();
  const { queryParams, updateQueryParams, clearQueryParams } = useQueryParams<TAdminCompaniesListParams>(
    adminCompaniesFilterPropsDefault,
    {
      queryParams: adminCompaniesFilterState.queryParams,
      additionalParams: adminCompaniesFilterState.additionalParams,
    },
    $adminCompaniesFilterProps.update,
    $adminCompaniesFilterProps.reset,
  );

  const { data: adminCompaniesData, loading: adminCompaniesLoading } = adminCompaniesState;
  const {
    content: adminCompanies,
    number: adminCompaniesPage,
    size: adminCompaniesSize,
    totalElements: adminCompaniesTotal,
  } = adminCompaniesData;

  const getAdminCompaniesList = () => {
    $adminCompaniesList.request(queryParams);
  };

  useEffect(() => {
    getAdminCompaniesList();
  }, [queryParams]);

  const tableColumns: ColumnsType<IAdminCompaniesListItemModel> = useMemo(() => {
    return [
      {
        width: 80,
        title: "№",
        dataIndex: "num",
        key: "num",
        render: (_, row, index) => <div className="w-s-n">{adminCompaniesSize * adminCompaniesPage + index + 1}</div>,
        sorter: false,
      },
      {
        title: t("fields.title"),
        dataIndex: "name",
        key: "name",
        render: (_, row) => <Link to={`${ROUTES.MONITORING_COMPANIES}/${row.id}`}>{row.name}</Link>,
        sorter: false,
      },
      {
        title: "ИНН",
        dataIndex: "tin",
        key: "tin",
        sorter: false,
      },
      {
        title: "Владелец",
        dataIndex: "owner",
        key: "owner",
        render: (_, row) => row.owner?.name,
        sorter: false,
      },
      {
        title: "Дата регистрации",
        dataIndex: "registrationDate",
        key: "registrationDate",
        render: (_, row) => (row.registrationDate ? formatDate(row.registrationDate) : "-"),
        sorter: false,
      },
      {
        title: "Телефон",
        dataIndex: "phone",
        key: "phone",
        render: (_, row) => formatPhoneNumber(row.phone),
        sorter: false,
      },
      {
        title: t("statuses.status"),
        dataIndex: "status",
        key: "status",
        render: (_, row) => <StatusTagUI status={row.status?.code}>{row.status?.name}</StatusTagUI>,
        sorter: false,
      },

      {
        title: "",
        dataIndex: "actions",
        key: "action",
        fixed: "right",
        width: 60,
        render: (_, row) => (
          <ContextPopoverUI
            content={
              <>
                <ContextPopoverUI.Item>
                  <>
                    <ButtonUI
                      onClick={() => {
                        changeCompanyStatusModal.openModal({ companyId: row.id, currentStatus: row.status?.code });
                      }}
                      type="primary-light"
                      size="small"
                    >
                      Изменить статус
                    </ButtonUI>
                  </>
                </ContextPopoverUI.Item>
              </>
            }
          />
        ),
      },
    ];
  }, [adminCompaniesSize, adminCompaniesPage]);

  const onFilterChange = (params: any) => {
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
      <ContentUI.Header title="Компании" total={adminCompaniesTotal} />
      <AdminCompaniesListFilter
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        clearQueryParams={clearQueryParams}
        onFilterChange={onFilterChange}
      />
      <ContentUI.Middle>
        <TableUI
          dataSource={adminCompanies}
          loading={adminCompaniesLoading}
          columns={tableColumns}
          onSortChange={onSortChange}
          pagination={{
            total: adminCompaniesTotal,
            pageSize: adminCompaniesSize,
            current: adminCompaniesPage + 1,
            hideOnSinglePage: true,
            onChange: onChangePagination,
          }}
        />
      </ContentUI.Middle>
    </ContentUI>
  );
};
