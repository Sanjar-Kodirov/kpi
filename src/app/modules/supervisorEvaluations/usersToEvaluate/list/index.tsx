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
import { formatDate } from "#utils/formatters";

const supervisorUsersToEvaluateFilterDefault: TSupervisorUsersToEvaluateParams = {
  page: 1,
  size: 10,
};

export const SupervisorUsersToEvaluateList: FC = () => {
  const supervisorUsersToEvaluateState = $supervisorUsersToEvaluateList.store();

  const { t, i18n } = useTranslation();

  const { queryParams, updateQueryParams, clearQueryParams } = useQueryParams<
    TSupervisorUsersToEvaluateParams,
    TSupervisorUsersToEvaluateAdditionalParams
  >({ queryParams: supervisorUsersToEvaluateFilterDefault });

  const { data: listData, loading } = supervisorUsersToEvaluateState;
  const getList = () => {
    $supervisorUsersToEvaluateList.request({ ...queryParams });
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
        title: "Регион",
        dataIndex: "region",
        key: "region",
        render: (_, row) => row.region,
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
        title: "Телефон",
        dataIndex: "phone_number",
        key: "phone_number",
        render: (_, row) => row.phone_number,
        sorter: false,
      },
      {
        title: "Дата создания",
        dataIndex: "created_at",
        key: "created_at",
        render: (_, row) => (row.created_at ? formatDate(row.created_at) : "-"),
        sorter: false,
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
      <ContentUI.Header title="Пользователи для оценки" total={listData?.count}></ContentUI.Header>
      <ContentUI.Middle>
        <TableUI dataSource={listData?.users} loading={loading} columns={tableColumns} onSortChange={onSortChange} />
      </ContentUI.Middle>
    </ContentUI>
  );
};
