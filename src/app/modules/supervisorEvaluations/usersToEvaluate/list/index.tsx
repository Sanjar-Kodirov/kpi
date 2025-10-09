import React, { FC, useEffect, useMemo } from "react";

import { useQueryParams } from "#hooks/useQueryParams";
import { ContentUI } from "#ui/content";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";
import { $supervisorUsersToEvaluateList } from "#stores/supervisorEvaluations";
import {
  ISupervisorUser,
  TSupervisorUsersToEvaluateParams,
  TSupervisorUsersToEvaluateAdditionalParams,
} from "#businessLogic/models/supervisorEvaluations";
import { useModalControl } from "#hooks/useModalControl";
import { DrawerModalUI } from "#ui/drawerModal";
import { AcceptUsersDrawer } from "../addEditDrawer";
import { ButtonUI } from "#ui/button";

const supervisorUsersToEvaluateFilterDefault: TSupervisorUsersToEvaluateParams = {
  page: 1,
  size: 10,
};

export const SupervisorUsersToEvaluateList: FC = () => {
  const supervisorUsersToEvaluateState = $supervisorUsersToEvaluateList.store();

  const { t, i18n } = useTranslation();

  const { queryParams, updateQueryParams } = useQueryParams<
    TSupervisorUsersToEvaluateParams,
    TSupervisorUsersToEvaluateAdditionalParams
  >({ queryParams: supervisorUsersToEvaluateFilterDefault });

  const acceptUser = useModalControl<AcceptUsersDrawer>();

  const { data: listData, loading } = supervisorUsersToEvaluateState;
  const getList = () => {
    $supervisorUsersToEvaluateList.request({});
  };

  useEffect(() => {
    getList();
  }, [queryParams]);

  const tableColumns: ColumnsType<ISupervisorUser> = useMemo(() => {
    return [
      {
        width: 80,
        title: "№",
        dataIndex: "num",
        key: "num",
        render: (_, row, index) => <div className="w-s-n">{index + 1}</div>,
        sorter: false,
      },
      {
        title: "ФИО",
        dataIndex: "full_name",
        key: "full_name",
        render: (_, row) => row.full_name,
        sorter: false,
      },
      {
        title: "Роль",
        dataIndex: "role",
        key: "role",
        render: (_, row) => row.role,
        sorter: false,
      },
      {
        title: "Доступ",
        dataIndex: "membership_type",
        key: "membership_type",
        render: (_, row) => row.membership_type,
        sorter: false,
      },
      {
        title: "Закреплённый регион",
        dataIndex: "assigned_region",
        key: "assigned_region",
        render: (_, row) => row.assigned_region.name,
        sorter: false,
      },
      {
        title: "Количество оценочных критериев",
        dataIndex: "pending_criteria_count",
        key: "pending_criteria_count",
        render: (_, row) => row.pending_criteria_count,
        sorter: false,
      },
      {
        title: "Общее количество критериев",
        dataIndex: "total_criteria_count",
        key: "total_criteria_count",
        render: (_, row) => row.total_criteria_count,
        sorter: false,
      },
      {
        title: "",
        dataIndex: "action",
        key: "action",
        render: (_, row) => {
          console.log("row", row);
          return (
            <ButtonUI type="primary" onClick={() => acceptUser.openModal({ userId: row.id })}>
              Принять
            </ButtonUI>
          );
        },
      },
    ];
  }, [i18n.language, t]);

  const onFilterChange = (params: TSupervisorUsersToEvaluateParams) => {
    updateQueryParams({ ...params });
  };

  const onSortChange = (field: string, order?: SortOrderFromAntMap) => {
    onFilterChange({ orderBy: field, sortOrder: order });
  };

  return (
    <ContentUI fixed>
      <ContentUI.Header title="Пользователи для оценки" total={listData?.users.length}></ContentUI.Header>
      <ContentUI.Middle>
        <TableUI dataSource={listData?.users} loading={loading} columns={tableColumns} onSortChange={onSortChange} />
      </ContentUI.Middle>

      <DrawerModalUI
        open={acceptUser.modalProps.visible}
        onClose={acceptUser.closeModal}
        afterClose={acceptUser.resetModal}
      >
        <AcceptUsersDrawer modalControl={acceptUser} />
      </DrawerModalUI>
    </ContentUI>
  );
};
