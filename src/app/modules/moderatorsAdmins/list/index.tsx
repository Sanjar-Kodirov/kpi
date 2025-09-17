import React, { FC, useEffect, useMemo } from "react";

import { TPendingEvaluationsListParams } from "#businessLogic/models/evaluations";
import { useQueryParams } from "#hooks/useQueryParams";
import { ContentUI } from "#ui/content";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";
import { $usersModeratorsAdminsFilterProps, usersModeratorsAdminsFilterPropsDefault } from "../model";
import { $usersModeratorsAdminsList } from "#stores/users";
import { UsersModeratorsAdminsListFilter } from "../listFilter";
import {
  TUsersModeratorsAdminsListParams,
  TUsersModeratorsAdminsListAdditionalParams,
  IUsersModeratorsAdminsUser,
} from "#businessLogic/models/users";

export const UsersModeratorsAdminsList: FC = () => {
  const usersModeratorsAdminsFilterState = $usersModeratorsAdminsFilterProps.store();
  const usersModeratorsAdminsState = $usersModeratorsAdminsList.store();

  const { t, i18n } = useTranslation();

  const { queryParams, updateQueryParams, clearQueryParams } = useQueryParams<
    TUsersModeratorsAdminsListParams,
    TUsersModeratorsAdminsListAdditionalParams
  >(
    usersModeratorsAdminsFilterPropsDefault,
    {
      queryParams: usersModeratorsAdminsFilterState.queryParams,
      additionalParams: usersModeratorsAdminsFilterState.additionalParams,
    },
    $usersModeratorsAdminsFilterProps.update,
    $usersModeratorsAdminsFilterProps.reset,
  );

  const { data: usersModeratorsAdminsData, loading: usersModeratorsAdminsLoading } = usersModeratorsAdminsState;
  const getUsersModeratorsAdminsList = () => {
    $usersModeratorsAdminsList.request({ ...queryParams });
  };

  useEffect(() => {
    getUsersModeratorsAdminsList();
  }, [queryParams]);

  const tableColumns: ColumnsType<IUsersModeratorsAdminsUser> = useMemo(() => {
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
        dataIndex: "name",
        key: "name",
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
        dataIndex: "type",
        key: "type",
        render: (_, row) => row.role,
        sorter: false,
      },

      {
        title: "Количество оценок",
        dataIndex: "count",
        key: "count",
        render: (_, row) => row.approved_count,
        sorter: false,
      },
      {
        title: "Оценка",
        dataIndex: "score",
        key: "score",
        render: (_, row) => row.average_score,
        sorter: false,
      },
      {
        title: "Общий балл",
        dataIndex: "total_score",
        key: "total_score",
        render: (_, row) => row.total_score,
        sorter: false,
      },
    ];
  }, [usersModeratorsAdminsState, i18n.language, t]);

  const onFilterChange = (params: TPendingEvaluationsListParams) => {
    updateQueryParams({ ...params });
  };

  const onSortChange = (field: string, order?: SortOrderFromAntMap) => {
    onFilterChange({ orderBy: field, sortOrder: order });
  };

  return (
    <ContentUI fixed>
      <ContentUI.Header title="Users" total={usersModeratorsAdminsData?.total_users}></ContentUI.Header>
      <UsersModeratorsAdminsListFilter
        queryParams={queryParams}
        updateQueryParams={updateQueryParams}
        clearQueryParams={clearQueryParams}
        onFilterChange={onFilterChange}
      />
      <ContentUI.Middle>
        <TableUI
          dataSource={usersModeratorsAdminsData?.users}
          loading={usersModeratorsAdminsLoading}
          columns={tableColumns}
          onSortChange={onSortChange}
        />
      </ContentUI.Middle>
    </ContentUI>
  );
};
