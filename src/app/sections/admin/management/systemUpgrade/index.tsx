import React, { FC, useEffect, useMemo } from "react";
import { useQueryParams } from "#hooks/useQueryParams";
import { ContentUI } from "#ui/content";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { TAdminCompaniesListParams } from "#businessLogic/models/admin/adminCompany";
import { formatDate } from "#utils/formatters";
import { useParams } from "react-router-dom";
import { $adminSystemUpgradeList } from "#stores/admin/adminSystemUpgrade/index";
import {
  $adminSystemUpgradeFilterProps,
  adminSystemUpgradeFilterPropsDefault,
} from "#src/app/sections/admin/management/systemUpgrade/model";
import { AdminSystemUpgradeListFilter } from "./filter";
import {
  IAdminSystemUpgradeListItemModel,
  TAdminSystemUpgradeListParams,
} from "#businessLogic/models/admin/adminSystemUpgrade";
import { ButtonUI } from "#ui/button";
import { DrawerModalUI } from "#ui/drawerModal";
import { useModalControl } from "#hooks/useModalControl";
import {
  AddEditUserDrawerModalProps,
  AddEditSystemUpgradeDrawer,
} from "#src/app/sections/admin/management/systemUpgrade/addEditSystemUpgradeDrawer/index";
import { ContextPopoverUI } from "#ui/popoverUi";
import { useTranslation } from "react-i18next";

export const AdminSystemUpgradeList: FC = () => {
  const adminSystemUpgradeState = $adminSystemUpgradeList.store();
  const adminSystemUpgradeFilterState = $adminSystemUpgradeFilterProps.store();

  const addUserModalControl = useModalControl<AddEditUserDrawerModalProps>();

  const { t } = useTranslation();

  const { companyId } = useParams<{ companyId: string }>();

  const { queryParams, updateQueryParams, clearQueryParams } = useQueryParams<TAdminCompaniesListParams>(
    adminSystemUpgradeFilterPropsDefault,
    {
      queryParams: adminSystemUpgradeFilterState.queryParams,
      additionalParams: adminSystemUpgradeFilterState.additionalParams,
    },
    $adminSystemUpgradeFilterProps.update,
    $adminSystemUpgradeFilterProps.reset,
  );

  const { data: adminSystemUpgradeData, loading: adminSystemUpgradeLoading } = adminSystemUpgradeState;
  const {
    content: adminSystemUpgrade,
    number: adminSystemUpgradePage,
    size: adminSystemUpgradeSize,
    totalElements: adminSystemUpgradeTotal,
  } = adminSystemUpgradeData;

  const getAdminSystemUpgradeList = () => {
    $adminSystemUpgradeList.request({ ...queryParams });
  };

  useEffect(() => {
    getAdminSystemUpgradeList();
  }, [queryParams, companyId]);

  const tableColumns: ColumnsType<IAdminSystemUpgradeListItemModel> = useMemo(() => {
    return [
      {
        width: 80,
        title: "№",
        dataIndex: "num",
        key: "num",
        render: (_, row, index) => (
          <div className="w-s-n">{adminSystemUpgradeSize * adminSystemUpgradePage + index + 1}</div>
        ),
        sorter: false,
      },
      {
        title: "Тип",
        dataIndex: "type",
        key: "type",
        render: (_, row) => row?.platformType,
        sorter: false,
      },
      {
        title: "Версия",
        dataIndex: "name",
        key: "name",
        sorter: false,
        render: (_, row) => row.name,
      },
      {
        title: "Дата выпуска",
        dataIndex: "releaseDate",
        key: "releaseDate",
        render: (_, row) => formatDate(row.releaseDate),
        sorter: false,
      },
      {
        title: "Описание",
        dataIndex: "description",
        key: "description",
        render: (_, row) => row.description,
        sorter: false,
      },
      {
        title: "",
        dataIndex: "actions",
        key: "actions",
        fixed: "right",
        width: 60,
        render: (_, row) => (
          <ContextPopoverUI
            content={
              <>
                <ContextPopoverUI.Item>
                  <ButtonUI onClick={() => addUserModalControl.openModal({ systemUpgradeDetails: row })}>
                    {t("buttons.edit")}
                  </ButtonUI>
                </ContextPopoverUI.Item>
              </>
            }
          />
        ),
      },
    ];
  }, [adminSystemUpgradeSize, adminSystemUpgradePage]);

  const onFilterChange = (params: TAdminSystemUpgradeListParams) => {
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
      <ContentUI.Header title="Релизы" total={adminSystemUpgradeTotal}>
        <ButtonUI type="primary" onClick={() => addUserModalControl.openModal()}>
          Добавить релиз
        </ButtonUI>
      </ContentUI.Header>
      <AdminSystemUpgradeListFilter
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        clearQueryParams={clearQueryParams}
        onFilterChange={onFilterChange}
      />
      <ContentUI.Middle>
        <TableUI
          dataSource={adminSystemUpgrade}
          loading={adminSystemUpgradeLoading}
          columns={tableColumns}
          onSortChange={onSortChange}
          pagination={{
            total: adminSystemUpgradeTotal,
            pageSize: adminSystemUpgradeSize,
            current: adminSystemUpgradePage + 1,
            hideOnSinglePage: true,
            onChange: onChangePagination,
          }}
        />
      </ContentUI.Middle>

      <DrawerModalUI open={addUserModalControl.modalProps.visible} onClose={addUserModalControl.closeModal}>
        <AddEditSystemUpgradeDrawer modalControl={addUserModalControl} callBack={getAdminSystemUpgradeList} />
      </DrawerModalUI>
    </ContentUI>
  );
};
