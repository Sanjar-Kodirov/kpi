import React, { FC, useEffect, useMemo } from "react";

import {
  DEPARTMENT_STATUS,
  IDepartmentsListItemModel,
  TDepartmentsListAdditionalParams,
  TDepartmentsListParams,
} from "#businessLogic/models/department";
import { useModalControl } from "#hooks/useModalControl";
import { useQueryParams } from "#hooks/useQueryParams";
import { AddEditDepartmentDrawer, AddEditDepartmentDrawerModalProps } from "../addEditDrawer";
import { $departmentsFilterProps, departmentsFilterPropsDefault } from "../model";
import { DepartmentsListFilter } from "../listFilter";
import { notificationSuccess } from "#src/app/ui";
import { $deleteDepartment, $departmentsList, $updateDepartmentStatus } from "#stores/department";
import { $runtime } from "#stores/index";
import { ButtonUI } from "#ui/button";
import { ContentUI } from "#ui/content";
import { ContextPopoverUI } from "#ui/contextPopover";
import { DrawerModalUI } from "#ui/drawerModal";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";
import { E_APP_TYPE, isAppTypeAdmin } from "#constants/index";
import { StatusTagUI } from "#ui/statusTag";
import { WithPermission } from "#src/hocs/withPermission";
import { PERMISSIONS } from "#src/hocs/withPermission/constants";

export const DepartmentsList: FC = () => {
  const addDepartmentModalControl = useModalControl<AddEditDepartmentDrawerModalProps>();

  const departmentsFilterState = $departmentsFilterProps.store();
  const { branchId } = $runtime();
  const departmentsState = $departmentsList.store();
  const deleteDepartmentState = $deleteDepartment.store();
  const updateDepartmentStatusState = $updateDepartmentStatus.store();

  const { t, i18n } = useTranslation();

  const { queryParams, updateQueryParams, clearQueryParams } = useQueryParams<
    TDepartmentsListParams,
    TDepartmentsListAdditionalParams
  >(
    departmentsFilterPropsDefault,
    {
      queryParams: departmentsFilterState.queryParams,
      additionalParams: departmentsFilterState.additionalParams,
    },
    $departmentsFilterProps.update,
    $departmentsFilterProps.reset,
  );

  const { data: departmentsData, loading: departmentsLoading } = departmentsState;
  const {
    content: departments,
    number: departmentsPage,
    size: departmentsSize,
    totalElements: departmentsTotal,
  } = departmentsData;

  const getDepartmentList = () => {
    if (isAppTypeAdmin) {
      if (queryParams.branchId) {
        $departmentsList.request({ ...queryParams });
      }
    } else {
      $departmentsList.request({ ...queryParams, branchId });
    }
  };

  useEffect(() => {
    getDepartmentList();
  }, [branchId, queryParams]);

  useEffect(() => {
    if (deleteDepartmentState.success) {
      getDepartmentList();

      notificationSuccess(t("notifications.success"), "Цех удален");
      $deleteDepartment.reset();
    }
  }, [deleteDepartmentState.success]);

  useEffect(() => {
    if (updateDepartmentStatusState.success) {
      getDepartmentList();

      notificationSuccess(t("notifications.success"), "Статус обновлен");
      $updateDepartmentStatus.reset();
    }
  }, [updateDepartmentStatusState.success]);

  const updateStatus = (id: string, status: DEPARTMENT_STATUS) => {
    $updateDepartmentStatus.request({ id, status });
  };

  const tableColumns: ColumnsType<IDepartmentsListItemModel> = useMemo(() => {
    return [
      {
        width: 80,
        title: "№",
        dataIndex: "num",
        key: "num",
        render: (_, row, index) => <div className="w-s-n">{departmentsSize * departmentsPage + index + 1}</div>,
        sorter: false,
      },
      {
        title: t("fields.title"),
        dataIndex: "name",
        key: "name",
        sorter: false,
      },
      {
        title: t("fields.department"),
        dataIndex: "type",
        key: "type",
        render: (_, row) => row.type.name,
        sorter: false,
      },
      {
        title: t("fields.branch"),
        dataIndex: "branchName",
        key: "branchName",
        render: (_, row) => row.branch.name,
        sorter: false,
      },
      {
        dataIndex: "status",
        key: "status",
        sorter: false,
        render: (_, row) => {
          return (
            <>
              <StatusTagUI status={row.status.code}>{row.status?.name}</StatusTagUI>
            </>
          );
        },
      },
      {
        title: "",
        dataIndex: "actions",
        key: "actions",
        fixed: "right",
        width: 60,
        render: (_, row) => (
          <WithPermission annotations={{ [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.MANAGEMENT_DEPARTMENTS_BTN_EDIT }}>
            <ContextPopoverUI
              content={
                <>
                  <ContextPopoverUI.Item>
                    <ButtonUI onClick={() => addDepartmentModalControl.openModal({ departmentId: row.id })}>
                      {t("buttons.edit")}
                    </ButtonUI>
                  </ContextPopoverUI.Item>
                  {/*<ContextPopoverUI.Item>*/}
                  {/*  <ModalConfirmUI*/}
                  {/*    title={"Вы уверены что хотите удалить цех?"}*/}
                  {/*    onOk={() => $deleteDepartment.request(row.id)}*/}
                  {/*  >*/}
                  {/*    <ButtonUI danger loading={deleteDepartmentState.loading}>*/}
                  {/*      {t("buttons.delete")}*/}
                  {/*    </ButtonUI>*/}
                  {/*  </ModalConfirmUI>*/}
                  {/*</ContextPopoverUI.Item>*/}

                  <ContextPopoverUI.Item>
                    <ButtonUI
                      disabled={row.status.code === DEPARTMENT_STATUS.ACTIVE}
                      loading={updateDepartmentStatusState.loading}
                      onClick={() => updateStatus(row.id, DEPARTMENT_STATUS.ACTIVE)}
                    >
                      {t("buttons.activate")}
                    </ButtonUI>
                  </ContextPopoverUI.Item>
                  <ContextPopoverUI.Item>
                    <ButtonUI
                      disabled={row.status.code === DEPARTMENT_STATUS.IN_ACTIVE}
                      loading={updateDepartmentStatusState.loading}
                      onClick={() => updateStatus(row.id, DEPARTMENT_STATUS.IN_ACTIVE)}
                    >
                      {t("buttons.deactivate")}
                    </ButtonUI>
                  </ContextPopoverUI.Item>
                </>
              }
            />
          </WithPermission>
        ),
      },
    ];
  }, [departmentsSize, departmentsPage, i18n.language, t]);

  const onFilterChange = (params: TDepartmentsListParams) => {
    updateQueryParams({ page: undefined, ...params });
  };

  const onChangePagination = (page: number, size: number) => {
    onFilterChange({ page: page - 1, size });
  };

  const onAddDepartment = () => {
    addDepartmentModalControl.openModal();
  };

  const onSortChange = (field: string, order?: SortOrderFromAntMap) => {
    onFilterChange({ orderBy: field, sortOrder: order });
  };

  return (
    <ContentUI fixed>
      <ContentUI.Header title={t("fields.departments")} total={departmentsTotal}>
        <WithPermission annotations={{ [E_APP_TYPE.CABINET]: PERMISSIONS.CABINET.MANAGEMENT_DEPARTMENTS_BTN_ADD }}>
          <ButtonUI type="primary" onClick={onAddDepartment}>
            {t("buttons.addDepartment")}
          </ButtonUI>
        </WithPermission>
      </ContentUI.Header>
      <DepartmentsListFilter
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        clearQueryParams={clearQueryParams}
        onFilterChange={onFilterChange}
      />
      <ContentUI.Middle>
        <TableUI
          dataSource={departments}
          loading={departmentsLoading}
          columns={tableColumns}
          onSortChange={onSortChange}
          pagination={{
            total: departmentsTotal,
            pageSize: departmentsSize,
            current: departmentsPage + 1,
            hideOnSinglePage: true,
            onChange: onChangePagination,
          }}
        />
      </ContentUI.Middle>
      <DrawerModalUI open={addDepartmentModalControl.modalProps.visible} onClose={addDepartmentModalControl.closeModal}>
        <AddEditDepartmentDrawer
          adminBranchId={String(queryParams.branchId)}
          modalControl={addDepartmentModalControl}
          callBack={getDepartmentList}
        />
      </DrawerModalUI>
    </ContentUI>
  );
};
