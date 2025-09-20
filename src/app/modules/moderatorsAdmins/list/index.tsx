import React, { FC, useEffect, useMemo } from "react";

import { TPendingEvaluationsListParams } from "#businessLogic/models/evaluations";
import { useQueryParams } from "#hooks/useQueryParams";
import { ContentUI } from "#ui/content";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { ColumnsType } from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";
import { $usersModeratorsAdminsFilterProps, usersModeratorsAdminsFilterPropsDefault } from "../model";
import { $deleteModeratorAdmin, $usersModeratorsAdminsList } from "#stores/users";
import { UsersModeratorsAdminsListFilter } from "../listFilter";
import {
  TUsersModeratorsAdminsListParams,
  TUsersModeratorsAdminsListAdditionalParams,
  IUsersModeratorsAdminsUser,
} from "#businessLogic/models/users";
import { ContextPopoverUI } from "#ui/contextPopover";
import { ButtonUI } from "#ui/button";
import { ModalConfirmUI } from "#ui/modalConfirm";
import { StatusTagUI } from "#ui/statusTag";
import { formatDate } from "#utils/formatters";

export const UsersModeratorsAdminsList: FC = () => {
  const usersModeratorsAdminsFilterState = $usersModeratorsAdminsFilterProps.store();
  const usersModeratorsAdminsState = $usersModeratorsAdminsList.store();
  const deleteModeratorAdminState = $deleteModeratorAdmin.store();

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
        title: "Роль",
        dataIndex: "type",
        key: "type",
        render: (_, row) => row.role,
        sorter: false,
      },
      {
        title: "Телеграм ID",
        dataIndex: "telegram_id",
        key: "telegram_id",
        render: (_, row) => row.telegram_id,
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
        render: (_, row) => formatDate(row.created_at),
        sorter: false,
      },
      {
        title: "Статус",
        dataIndex: "status",
        key: "status",
        render: (_, row) => (row.is_active ? <StatusTagUI status="ACTIVE">Активный</StatusTagUI> : "Неактивный"),
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
                  <ModalConfirmUI
                    title={t("branchNotifications.confirmDeleteBranch", "Вы уверены, что хотите удалить?")}
                    onOk={() => $deleteModeratorAdmin.request({ user_id: row.id })}
                    okText={undefined}
                  >
                    <ButtonUI
                      onClick={() => $deleteModeratorAdmin.request({ user_id: row.id })}
                      danger
                      loading={deleteModeratorAdminState.loading}
                    >
                      {t("buttons.delete")}
                    </ButtonUI>
                  </ModalConfirmUI>
                </ContextPopoverUI.Item>
              </>
            }
          />
        ),
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
      <ContentUI.Header title="Модераторы" total={usersModeratorsAdminsData?.count}></ContentUI.Header>
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
