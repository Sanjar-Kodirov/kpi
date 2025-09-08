import React, { useEffect, useMemo } from "react";
import { useQueryParams } from "#hooks/useQueryParams";
import { DrawerModalUI, notificationSuccess } from "#src/app/ui";
import { TUsersListAdditionalParams, TUsersListParams } from "#businessLogic/models/user";
import { namespaces } from "#src/localization/i18n.constants";
import { ButtonUI } from "#ui/button";
import { ContentUI } from "#ui/content";
import { ContextPopoverUI } from "#ui/contextPopover";
import { ModalConfirmUI } from "#ui/modalConfirm";
import { SortOrderFromAntMap, TableUI } from "#ui/table";
import { getFullName } from "#utils/index";
import { ColumnsType } from "antd/lib/table/interface";
import { useTranslation } from "react-i18next";
import { $adminUsersFilterProps, adminUsersFilterPropsDefault } from "#src/app/sections/admin/management/users/model";
import { $adminDeleteUser, $adminUsersList } from "#stores/admin/adminUsers";
import { IAdminUsersListItemModel } from "#businessLogic/models/admin/adminUsers";
import { useModalControl } from "#hooks/useModalControl";
import {
  AddEditAdminUserDrawer,
  TAddEditAdminUserDrawerModalProps,
} from "#src/app/sections/admin/management/users/components/addEditUserDrawer";

export const AdminUsers = () => {
  const adminUsersFilterState = $adminUsersFilterProps.store();
  const adminUsersState = $adminUsersList.store();
  const deleteUserState = $adminDeleteUser.store();
  const { t, i18n } = useTranslation();
  const addEditAdminUserModalControl = useModalControl<TAddEditAdminUserDrawerModalProps>();

  const { queryParams, updateQueryParams } = useQueryParams<TUsersListParams, TUsersListAdditionalParams>(
    {
      queryParams: adminUsersFilterState.queryParams,
      additionalParams: adminUsersFilterState.additionalParams,
    },
    adminUsersFilterPropsDefault,
    $adminUsersFilterProps.update,
    $adminUsersFilterProps.reset,
  );

  const { data: adminUsersData, loading: adminUsersLoading } = adminUsersState;
  const {
    content: adminUsers,
    number: adminUsersPage,
    size: adminUsersSize,
    totalElements: adminUsersTotal,
  } = adminUsersData;

  const getUserList = () => {
    $adminUsersList.request(queryParams);
  };

  useEffect(() => {
    getUserList();
  }, [queryParams]);

  const tableColumns: ColumnsType<IAdminUsersListItemModel> = useMemo(() => {
    return [
      {
        width: 80,
        title: "№",
        dataIndex: "num",
        key: "num",
        render: (_, row, index) => <div className="w-s-n">{adminUsersSize * adminUsersPage + index + 1}</div>,
        sorter: false,
      },
      {
        title: t("fields.fullNameShort"),
        dataIndex: "name",
        key: "name",
        render: (_, row) => {
          return (
            <div>
              {getFullName({
                firstName: row.firstName || "",
                lastName: row.lastName || "",
                patronymic: row.patronymic || "",
              })}
            </div>
          );
        },

        sorter: false,
      },
      // {
      //     title: t("fields.branch"),
      //     dataIndex: "branchName",
      //     key: "branchName",
      //     render: (_, row) => row.branch?.name,
      //     sorter: false,
      // },
      {
        title: t("fields.jobTitle"),
        dataIndex: "authorities",
        key: "authorities",
        render: (_, row) => row?.role?.name,
        sorter: false,
      },
      {
        title: "Логин",
        dataIndex: "login",
        key: "login",
        render: (_, row) => row.login,
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
                  <ButtonUI onClick={() => addEditAdminUserModalControl.openModal({ userId: row.id })}>
                    {t("buttons.edit")}
                  </ButtonUI>
                </ContextPopoverUI.Item>
                <ContextPopoverUI.Item>
                  <ModalConfirmUI
                    title={"Вы точно хотите удалить пользователя?"}
                    onOk={() => $adminDeleteUser.request(row.id)}
                  >
                    <ButtonUI danger loading={deleteUserState.loading}>
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
  }, [adminUsersSize, adminUsersPage, i18n.language]);

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
      <ContentUI.Header title="Пользователи" total={adminUsersTotal}>
        <ButtonUI type="primary" onClick={() => addEditAdminUserModalControl.openModal()}>
          {t("buttons.add")}
        </ButtonUI>
      </ContentUI.Header>

      <ContentUI.Middle>
        <TableUI
          dataSource={adminUsers}
          loading={adminUsersLoading}
          columns={tableColumns}
          onSortChange={onSortChange}
          pagination={{
            total: adminUsersTotal,
            pageSize: adminUsersSize,
            current: adminUsersPage + 1,
            hideOnSinglePage: true,
            onChange: onChangePagination,
          }}
        />
      </ContentUI.Middle>
      <DrawerModalUI
        open={addEditAdminUserModalControl.modalProps.visible}
        onClose={addEditAdminUserModalControl.closeModal}
      >
        <AddEditAdminUserDrawer modalControl={addEditAdminUserModalControl} callBack={getUserList} />
      </DrawerModalUI>
    </ContentUI>
  );
};
