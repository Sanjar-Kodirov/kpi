import { Empty, Menu, Popconfirm, Popover } from "antd";
import React, { useEffect, MouseEvent } from "react";

import { useStyles } from "./styles";
import { AddAndEditAminEndpoint } from "../modal/adminEndpoints";
import { $adminPermissions, $deleteAdminPermissions } from "#stores/permissions";
import { useModalControl } from "#hooks/useModalControl";
import { notificationSuccess } from "#ui/notifications";
import { IAdminPermissionsListItemModel } from "#businessLogic/models/permissions";
import { ButtonUI } from "#ui/button";
import { SettingsMenuSvgIcon } from "#svgIcons/navigation";
import { Spinner } from "#ui/spinner";
import { ContentUI } from "#ui/content";
import { DrawerModalUI } from "#ui/drawerModal";
import { AddAndEditEndpointPropTypes } from "#src/app/sections/admin/permissionAdmin/components/modal/adminEndpoints/index";

type TProps = {
  permissionType: string;
};

export const AdminEndpoints = ({ permissionType }: TProps) => {
  const classes = useStyles();
  const permissionListState = $adminPermissions.store();
  const deleteEndpointState = $deleteAdminPermissions.store();

  const addEndpointModalControl = useModalControl<AddAndEditEndpointPropTypes>();

  const getEndpoints = () => {
    $adminPermissions.request({ type: permissionType });
  };

  useEffect(() => {
    getEndpoints();
  }, [permissionType]);

  useEffect(() => {
    if (deleteEndpointState.success) {
      notificationSuccess("Успешно!", "Эндпоинт удалён");
      $deleteAdminPermissions.reset();
      getEndpoints();
    }
  }, [deleteEndpointState.success]);

  const onAddEndpoint = (e: MouseEvent<HTMLElement>, parentIdOfCreatingItem: number) => {
    e.stopPropagation();

    addEndpointModalControl.openModal({ parentIdOfCreatingItem });
  };

  const onEditEndpoint = (e: MouseEvent<HTMLElement>, endpoint: IAdminPermissionsListItemModel) => {
    e.stopPropagation();

    addEndpointModalControl.openModal({ endpoint });
  };

  const onDeleteEndpoint = (e: MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation();

    $deleteAdminPermissions.request(id);
  };

  const getActionButton = (item: any) => (
    <Popover
      overlayClassName={classes.custom__popover}
      placement="rightTop"
      trigger="click"
      content={
        <div>
          <div className={classes.custom__popover__item}>
            <ButtonUI onClick={(e) => onAddEndpoint(e, item.id)}>Добавить</ButtonUI>
          </div>
          <div className={classes.custom__popover__item}>
            <ButtonUI onClick={(e) => onEditEndpoint(e, item)}>Редактировать</ButtonUI>
          </div>
          <div className={classes.custom__popover__item}>
            <Popconfirm
              title="Вы уверены?"
              onConfirm={(e: any) => onDeleteEndpoint(e, item.id)}
              okText="Да"
              cancelText="Нет"
            >
              <ButtonUI
                className="ant-btn-danger"
                type="primary"
                loading={deleteEndpointState.loading}
                onClick={(e) => e.stopPropagation()}
              >
                Удалить
              </ButtonUI>
            </Popconfirm>
          </div>
        </div>
      }
    >
      <ButtonUI
        className={`${classes.custom_button} ${classes.onlyicon} ${classes.b_r_30}`}
        onClick={(e) => e.stopPropagation()}
      >
        <SettingsMenuSvgIcon />
      </ButtonUI>
    </Popover>
  );

  const getItem = (item: any) => ({
    key: item.id,
    children: item.children.map((i: any) => getItem(i)),
    label: item.name,
    type: "divider",
    className: item.children.length < 1 ? "empty_child" : "child",
    icon: getActionButton(item),
  });

  return (
    <>
      <Spinner spinning={permissionListState.loading}>
        <ContentUI.Header className={classes.header} title="Эндпоинты">
          <ButtonUI type="primary" onClick={() => addEndpointModalControl.openModal()}>
            Создать эндпоинт
          </ButtonUI>
        </ContentUI.Header>

        <ContentUI.Middle>
          <div className={classes.in}>
            <div>
              <div>
                {!!permissionListState.data.length ? (
                  <Menu
                    mode="inline"
                    className={classes.permissions__tree__menu}
                    items={permissionListState?.data?.map((i) => getItem(i))}
                  />
                ) : (
                  <div>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </ContentUI.Middle>

        <DrawerModalUI open={addEndpointModalControl.modalProps.visible} onClose={addEndpointModalControl.closeModal}>
          <AddAndEditAminEndpoint
            modalControl={addEndpointModalControl}
            callBack={getEndpoints}
            permissionType={permissionType}
            endpoints={permissionListState.data}
          />
        </DrawerModalUI>
      </Spinner>
    </>
  );
};
